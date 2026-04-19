import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[data-cursor="interactive"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

type CursorVisualState = 'default' | 'interactive' | 'pressed'
export type CursorMode = 'replace' | 'follow'

export interface CustomCursorProps {
  mode?: CursorMode
  magneticStrength?: number
}

export default function CustomCursor({ mode = 'replace', magneticStrength = 0.28 }: CustomCursorProps) {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState<CursorVisualState>('default')

  const pressedRef = useRef(false)
  const stateRef = useRef<CursorVisualState>('default')

  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const springX = useSpring(pointerX, { stiffness: 520, damping: 42, mass: 0.35 })
  const springY = useSpring(pointerY, { stiffness: 520, damping: 42, mass: 0.35 })

  useEffect(() => {
    const reduceMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointerMedia = window.matchMedia('(pointer: fine) and (hover: hover)')

    const syncCapability = () => {
      const canUse = !reduceMotionMedia.matches && finePointerMedia.matches
      setEnabled(canUse)
    }

    syncCapability()

    reduceMotionMedia.addEventListener('change', syncCapability)
    finePointerMedia.addEventListener('change', syncCapability)

    return () => {
      reduceMotionMedia.removeEventListener('change', syncCapability)
      finePointerMedia.removeEventListener('change', syncCapability)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('custom-cursor-replace', enabled && mode === 'replace')

    return () => {
      document.body.classList.remove('custom-cursor-replace')
    }
  }, [enabled, mode])

  useEffect(() => {
    if (!enabled) return

    const updateState = (next: CursorVisualState) => {
      if (stateRef.current === next) return
      stateRef.current = next
      setState(next)
    }

    const updatePointer = (event: PointerEvent) => {
      const targetElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null
      const interactive = targetElement?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null

      let targetX = event.clientX
      let targetY = event.clientY

      if (interactive) {
        const rect = interactive.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const snap = Math.max(0, Math.min(1, magneticStrength))
        targetX = event.clientX + (centerX - event.clientX) * snap
        targetY = event.clientY + (centerY - event.clientY) * snap
      }

      pointerX.set(targetX)
      pointerY.set(targetY)

      if (pressedRef.current) {
        updateState('pressed')
      } else if (interactive) {
        updateState('interactive')
      } else {
        updateState('default')
      }

      if (!visible) setVisible(true)
    }

    const onPointerDown = () => {
      pressedRef.current = true
      updateState('pressed')
    }

    const onPointerUp = () => {
      pressedRef.current = false
    }

    const onPointerLeave = () => {
      setVisible(false)
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('blur', onPointerLeave)
    document.addEventListener('mouseleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('blur', onPointerLeave)
      document.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [enabled, magneticStrength, pointerX, pointerY, visible])

  const variants = useMemo(
    () => ({
      default: {
        width: mode === 'replace' ? 16 : 22,
        height: mode === 'replace' ? 16 : 22,
        borderRadius: 999,
        opacity: visible ? 1 : 0,
      },
      interactive: {
        width: mode === 'replace' ? 38 : 44,
        height: mode === 'replace' ? 38 : 44,
        borderRadius: 999,
        opacity: visible ? 1 : 0,
      },
      pressed: {
        width: mode === 'replace' ? 24 : 28,
        height: mode === 'replace' ? 24 : 28,
        borderRadius: 999,
        opacity: visible ? 1 : 0,
      },
    }),
    [mode, visible],
  )

  if (!enabled) return null

  return (
    <motion.div
      className={`custom-cursor custom-cursor--${mode} custom-cursor--${state}`}
      style={{ x: springX, y: springY }}
      animate={state}
      variants={variants}
      transition={{ type: 'spring', stiffness: 350, damping: 12, mass: 0.02}}
    >
      <span className="custom-cursor__dot" />
    </motion.div>
  )
}
