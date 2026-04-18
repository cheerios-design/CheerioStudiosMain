import { useEffect, useRef, useState } from 'react'

type Vec3 = { x: number; y: number; z: number }

type Particle = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  baseX: number
  baseY: number
  baseZ: number
  size: number
  phase: number
}

type Face = [number, number, number]

const PARTICLE_COUNT = 15000
const MOBILE_PARTICLE_COUNT = 13000
const OBJ_URL = '/sticker-dark.obj'
const COLOR = 'rgba(255, 183, 50, 0.92)'
const MIN_ZOOM = 3
const MAX_ZOOM = 4
const AUTO_ROTATION_SPEED = 0.008
const DRAG_SENSITIVITY = 0.005
const MOMENTUM_DAMPING = 0.94
const INITIAL_ZOOM = 3
const PARTICLE_GLOW_BLUR = 0
const PARTICLE_GLOW_COLOR = '(rgba(255, 183, 50, 0.6))'
const MOBILE_GLOW_BLUR = 0
const MOBILE_PIXEL_RATIO_CAP = 2
const MOBILE_BREAKPOINT = '(max-width: 768px)'

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function parseObj(text: string): { vertices: Vec3[]; faces: Face[] } {
  const vertices: Vec3[] = []
  const faces: Face[] = []
  const lines = text.split(/\r?\n/)

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim()
    if (!line || line.startsWith('#')) {
      continue
    }

    if (line.startsWith('v ')) {
      const parts = line.split(/\s+/)
      const x = Number(parts[1])
      const y = Number(parts[2])
      const z = Number(parts[3])
      if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
        vertices.push({ x, y, z })
      }
      continue
    }

    if (line.startsWith('f ')) {
      const parts = line.split(/\s+/).slice(1)
      const indices: number[] = []

      for (let p = 0; p < parts.length; p += 1) {
        const raw = parts[p].split('/')[0]
        const parsed = Number(raw)
        if (!Number.isFinite(parsed)) {
          continue
        }
        const idx = parsed < 0 ? vertices.length + parsed : parsed - 1
        if (idx >= 0 && idx < vertices.length) {
          indices.push(idx)
        }
      }

      for (let j = 1; j < indices.length - 1; j += 1) {
        faces.push([indices[0], indices[j], indices[j + 1]])
      }
    }
  }

  return { vertices, faces }
}

function triangleArea(a: Vec3, b: Vec3, c: Vec3) {
  const abx = b.x - a.x
  const aby = b.y - a.y
  const abz = b.z - a.z
  const acx = c.x - a.x
  const acy = c.y - a.y
  const acz = c.z - a.z
  const cx = aby * acz - abz * acy
  const cy = abz * acx - abx * acz
  const cz = abx * acy - aby * acx
  return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz)
}

function samplePointOnTriangle(a: Vec3, b: Vec3, c: Vec3): Vec3 {
  const r1 = Math.random()
  const r2 = Math.random()
  const s1 = Math.sqrt(r1)
  const u = 1 - s1
  const v = s1 * (1 - r2)
  const w = s1 * r2
  return {
    x: a.x * u + b.x * v + c.x * w,
    y: a.y * u + b.y * v + c.y * w,
    z: a.z * u + b.z * v + c.z * w
  }
}

function normalizePoints(points: Vec3[]): Vec3[] {
  if (!points.length) {
    return points
  }

  let minX = points[0].x
  let minY = points[0].y
  let minZ = points[0].z
  let maxX = points[0].x
  let maxY = points[0].y
  let maxZ = points[0].z

  for (let i = 1; i < points.length; i += 1) {
    const p = points[i]
    minX = Math.min(minX, p.x)
    minY = Math.min(minY, p.y)
    minZ = Math.min(minZ, p.z)
    maxX = Math.max(maxX, p.x)
    maxY = Math.max(maxY, p.y)
    maxZ = Math.max(maxZ, p.z)
  }

  const centerX = (minX + maxX) * 0.5
  const centerY = (minY + maxY) * 0.5
  const centerZ = (minZ + maxZ) * 0.5
  const size = Math.max(maxX - minX, maxY - minY, maxZ - minZ, 0.00001)
  const scale = 120 / size

  return points.map((p) => ({
    x: (p.x - centerX) * scale,
    y: -(p.y - centerY) * scale,
    z: (p.z - centerZ) * scale
  }))
}

function buildTargetCloud(vertices: Vec3[], faces: Face[], count: number): Vec3[] {
  if (!vertices.length) {
    return []
  }

  if (!faces.length) {
    const fallback: Vec3[] = []
    for (let i = 0; i < count; i += 1) {
      const v = vertices[Math.floor(Math.random() * vertices.length)]
      fallback.push({ ...v })
    }
    return normalizePoints(fallback)
  }

  const cumulative: number[] = new Array(faces.length)
  let running = 0
  for (let i = 0; i < faces.length; i += 1) {
    const [ia, ib, ic] = faces[i]
    running += triangleArea(vertices[ia], vertices[ib], vertices[ic])
    cumulative[i] = running
  }

  const sampled: Vec3[] = []
  for (let i = 0; i < count; i += 1) {
    const pick = Math.random() * running
    let low = 0
    let high = cumulative.length - 1
    while (low < high) {
      const mid = Math.floor((low + high) * 0.5)
      if (cumulative[mid] < pick) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    const [ia, ib, ic] = faces[low]
    sampled.push(samplePointOnTriangle(vertices[ia], vertices[ib], vertices[ic]))
  }

  return normalizePoints(sampled)
}

function rotateY(p: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x: p.x * c + p.z * s,
    y: p.y,
    z: -p.x * s + p.z * c
  }
}

function rotateX(p: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return {
    x: p.x,
    y: p.y * c - p.z * s,
    z: p.y * s + p.z * c
  }
}

export default function LogoParticle() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)

    const updateViewport = (event?: MediaQueryListEvent) => {
      setIsMobileViewport(event ? event.matches : mediaQuery.matches)
    }

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => {
      mediaQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    let animationId = 0
    let particles: Particle[] = []
    const compactMode = isMobileViewport
    let width = 1
    let height = 1
    let rotationX = 0
    let rotationY = 0
    let autoRotationY = 0
    let angularVelocityX = 0
    let angularVelocityY = 0
    let isDragging = false
    let lastPointerX = 0
    let lastPointerY = 0
    let lastPointerTime = 0
    let zoom = INITIAL_ZOOM
    let targetZoom = INITIAL_ZOOM
    let targetRotationFromPointerX = 0
    let targetRotationFromPointerY = 0

    const setCanvasSize = () => {
      const parent = canvas.parentElement
      width = Math.max(parent ? parent.clientWidth : window.innerWidth, 1)
      height = Math.max(parent ? parent.clientHeight : window.innerHeight, 1)
      const pixelRatioCap = compactMode ? MOBILE_PIXEL_RATIO_CAP : 2
      const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioCap)

      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const rebuildParticles = (cloud: Vec3[]) => {
      particles = cloud.map((p) => ({
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.5) * 220,
        z: (Math.random() - 0.5) * 140,
        vx: 0,
        vy: 0,
        vz: 0,
        baseX: p.x,
        baseY: p.y,
        baseZ: p.z,
        size: 0.8 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2
      }))
    }

    const loadObjAndBuildParticles = async () => {
      try {
        const response = await fetch(OBJ_URL)
        if (!response.ok) {
          return
        }

        const text = await response.text()
        const parsed = parseObj(text)
        const cloud = buildTargetCloud(
          parsed.vertices,
          parsed.faces,
          compactMode ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT
        )
        rebuildParticles(cloud)
      } catch {
        particles = []
      }
    }

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height)

      if (!compactMode && !isDragging) {
        rotationX += angularVelocityX
        rotationY += angularVelocityY
        angularVelocityX *= MOMENTUM_DAMPING
        angularVelocityY *= MOMENTUM_DAMPING
      }

      if (compactMode) {
        rotationX += (targetRotationFromPointerX - rotationX) * 0.02
        rotationY += (targetRotationFromPointerY - rotationY) * 0.02
      }

      rotationX = clamp(rotationX, -1.35, 1.35)
      zoom += (targetZoom - zoom) * 0.12
      if (!compactMode && !isDragging) {
        autoRotationY += AUTO_ROTATION_SPEED
      }

      const centerX = width * 0.5
      const centerY = height * 0.5
      const cameraDistance = 340

      context.fillStyle = COLOR
      context.strokeStyle = COLOR
      context.shadowBlur = compactMode ? MOBILE_GLOW_BLUR : PARTICLE_GLOW_BLUR
      context.shadowColor = compactMode ? 'rgba(255, 183, 50, 0.6)' : PARTICLE_GLOW_COLOR

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]
        const rotatedY = rotateY(
          { x: particle.baseX * zoom, y: particle.baseY * zoom, z: particle.baseZ * zoom },
          autoRotationY + rotationY
        )
        const rotated = rotateX(rotatedY, rotationX)

        const wobble = Math.sin(time * 0.0011 + particle.phase) * 0.55
        const tx = rotated.x + wobble
        const ty = rotated.y + wobble
        const tz = rotated.z

        particle.vx += (tx - particle.x) * 0.042
        particle.vy += (ty - particle.y) * 0.042
        particle.vz += (tz - particle.z) * 0.05
        particle.vx *= 0.84
        particle.vy *= 0.84
        particle.vz *= 0.82
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        const perspective = cameraDistance / (cameraDistance - particle.z)
        const drawX = centerX + particle.x * perspective
        const drawY = centerY + particle.y * perspective
        const size = particle.size * perspective

        context.globalAlpha = clamp(0.3 + (particle.z + 110) / 300, 0.22, 1)

        // Draw arrow/vector all pointing towards positive X direction (towards viewer in 3D)
        const arrowLen = size * 1.8
        const arrowWidth = size * 0.8

        context.save()
        context.translate(drawX, drawY)
        // All arrows point towards X axis (0 radians)

        // Draw arrow triangle pointing right
        context.beginPath()
        context.moveTo(arrowLen, 0)
        context.lineTo(-arrowLen * 0.4, -arrowWidth)
        context.lineTo(-arrowLen * 0.4, arrowWidth)
        context.closePath()
        context.fill()

        context.restore()
      }

      context.shadowBlur = 0
      context.globalAlpha = 1
      animationId = window.requestAnimationFrame(animate)
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (compactMode) {
        return
      }

      isDragging = true
      lastPointerX = event.clientX
      lastPointerY = event.clientY
      lastPointerTime = performance.now()
      angularVelocityX = 0
      angularVelocityY = 0
      canvas.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (compactMode) {
        return
      }

      if (!isDragging) {
        return
      }

      const now = performance.now()
      const dt = Math.max(now - lastPointerTime, 1)
      const dx = event.clientX - lastPointerX
      const dy = event.clientY - lastPointerY

      const deltaRotationY = dx * DRAG_SENSITIVITY
      const deltaRotationX = -dy * DRAG_SENSITIVITY

      rotationY += deltaRotationY
      rotationX += deltaRotationX

      const momentumScale = 16 / dt
      angularVelocityY = deltaRotationY * momentumScale
      angularVelocityX = deltaRotationX * momentumScale

      lastPointerX = event.clientX
      lastPointerY = event.clientY
      lastPointerTime = now
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (compactMode) {
        return
      }

      if (!isDragging) {
        return
      }

      isDragging = false
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
    }

    const handlePointerCancel = (event: PointerEvent) => {
      if (compactMode) {
        return
      }

      isDragging = false
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
    }

    const handleWheel = (event: WheelEvent) => {
      if (compactMode) {
        return
      }

      event.preventDefault()
      targetZoom = clamp(targetZoom - event.deltaY * 0.00085, MIN_ZOOM, MAX_ZOOM)
    }

    setCanvasSize()
    loadObjAndBuildParticles()
    animationId = window.requestAnimationFrame(animate)

    window.addEventListener('resize', setCanvasSize)
    if (!compactMode) {
      canvas.addEventListener('pointerdown', handlePointerDown)
      canvas.addEventListener('pointermove', handlePointerMove)
      canvas.addEventListener('pointerup', handlePointerUp)
      canvas.addEventListener('pointercancel', handlePointerCancel)
      canvas.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
      if (!compactMode) {
        canvas.removeEventListener('pointerdown', handlePointerDown)
        canvas.removeEventListener('pointermove', handlePointerMove)
        canvas.removeEventListener('pointerup', handlePointerUp)
        canvas.removeEventListener('pointercancel', handlePointerCancel)
        canvas.removeEventListener('wheel', handleWheel)
      }
    }
  }, [isMobileViewport])

  return <canvas ref={canvasRef} className="h-full w-full pointer-events-auto" />
}
