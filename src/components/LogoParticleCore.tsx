import { useEffect, useRef, useState } from 'react'

type Vec3 = { x: number; y: number; z: number }

type Particle = {
  baseX: number
  baseY: number
  baseZ: number
  size: number
  phase: number
}

type Face = [number, number, number]

const PARTICLE_COUNT = 8000
const MOBILE_PARTICLE_COUNT = 1800
const OBJ_ASSET_VERSION = '2026-04-18'
const OBJ_URL = `/sticker-dark.obj?v=${OBJ_ASSET_VERSION}`
const COLOR = 'rgba(255, 183, 50, 0.92)'
const AUTO_ROTATION_SPEED = 0.004
const RETURN_TO_NEUTRAL_SPEED = 0.02
const BREATHING_SPEED = 0.0009
const BREATHING_AMPLITUDE = 0.18
const HERO_FILL_SCALE = 4
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
        baseX: p.x,
        baseY: p.y,
        baseZ: p.z,
        size: 0.9 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2
      }))
    }

    const loadObjAndBuildParticles = async () => {
      try {
        const response = await fetch(OBJ_URL, { cache: 'no-store' })
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

      rotationX += (0 - rotationX) * RETURN_TO_NEUTRAL_SPEED
      rotationY += (0 - rotationY) * RETURN_TO_NEUTRAL_SPEED
      autoRotationY += AUTO_ROTATION_SPEED

      rotationX = clamp(rotationX, -1.35, 1.35)
      rotationY = clamp(rotationY, -1.9, 1.9)

      const centerX = width * 0.5
      const centerY = height * 0.5
      const cameraDistance = 340
      const timePhase = time * BREATHING_SPEED
      const breathingBase = 1 + Math.sin(timePhase) * BREATHING_AMPLITUDE
      const cloudScale = HERO_FILL_SCALE * (compactMode ? 0.82 : 1)

      context.fillStyle = COLOR

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]
        const localBreathing = breathingBase + Math.sin(timePhase + particle.phase) * (BREATHING_AMPLITUDE * 0.2)
        const rotatedY = rotateY(
          {
            x: particle.baseX * localBreathing * cloudScale,
            y: particle.baseY * localBreathing * cloudScale,
            z: particle.baseZ * localBreathing * cloudScale
          },
          autoRotationY + rotationY
        )
        const rotated = rotateX(rotatedY, rotationX)

        const perspective = cameraDistance / (cameraDistance - rotated.z)
        const drawX = centerX + rotated.x * perspective
        const drawY = centerY + rotated.y * perspective
        const radius = Math.max(particle.size * perspective * 0.8, 0.45)

        context.globalAlpha = clamp(0.28 + (rotated.z + 120) / 320, 0.18, 1)
        context.beginPath()
        context.arc(drawX, drawY, radius, 0, Math.PI * 2)
        context.fillStyle = COLOR
        context.fill()
      }

      context.globalAlpha = 1
      animationId = window.requestAnimationFrame(animate)
    }

    setCanvasSize()
    loadObjAndBuildParticles()
    animationId = window.requestAnimationFrame(animate)

    window.addEventListener('resize', setCanvasSize)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [isMobileViewport])

  return <canvas ref={canvasRef} className="h-full w-full pointer-events-auto" />
}
