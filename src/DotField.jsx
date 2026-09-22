import { useEffect, useRef } from 'react'

export default function DotField() {
  const artRef = useRef(null), canvasRef = useRef(null), buttonRef = useRef(null)
  useEffect(() => {
    const art = artRef.current, canvas = canvasRef.current, button = buttonRef.current
    const context = canvas.getContext('2d')
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let paused = preference.matches
    let width = 0, height = 0, frame = 0, visible = true, clock = 0, lastTime = 0
    const pointer = { x: -1000, y: -1000 }
    const sync = () => { button.setAttribute('aria-pressed', String(paused)); button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} blue-dot animation`) }
    function draw(time) {
      if (!context || !width || !height) return
      context.clearRect(0, 0, width, height)
      const shift = Math.min(scrollY / Math.max(innerHeight, 1), 1), count = width < 400 ? 70 : 88
      for (let ribbon = 0; ribbon < 11; ribbon++) {
        for (let index = 0; index < count; index++) {
          const t = index / (count - 1), envelope = Math.sin(t * Math.PI)
          const phase = t * Math.PI * 2.1 + time * 0.18 + shift * 0.7
          let x = width * (0.065 + t * 0.87)
          let y = height * (0.52 + Math.sin(phase) * 0.15) + (ribbon - 5) * height * 0.031 * (0.22 + envelope)
          y += Math.cos(t * 7 + ribbon * 0.22 + time * 0.32) * height * 0.034 * envelope
          x += Math.sin(phase + ribbon * 0.16) * width * 0.024 * envelope
          const dx = x - pointer.x, dy = y - pointer.y, distance = Math.hypot(dx, dy)
          if (!paused && distance < 85 && distance > 0) { const force = Math.pow(1 - distance / 85, 2) * 19; x += dx / distance * force; y += dy / distance * force }
          context.beginPath(); context.arc(x, y, (0.85 + envelope * 0.55) * (ribbon % 3 === 0 ? 1.08 : 1), 0, Math.PI * 2)
          context.fillStyle = `rgba(23,92,255,${0.34 + envelope * 0.55})`; context.fill()
        }
      }
      for (let index = 0; index < 32; index++) {
        const a = Math.sin(index * 129.51) * 43758.5453, b = Math.sin(index * 78.233 + 3) * 43758.5453
        context.beginPath(); context.arc(width * (0.08 + (a - Math.floor(a)) * 0.84), height * (0.18 + (b - Math.floor(b)) * 0.62) + Math.sin(time * 0.2 + index) * 2, index % 5 === 0 ? 1.8 : 1, 0, Math.PI * 2)
        context.fillStyle = 'rgba(23,92,255,.22)'; context.fill()
      }
    }
    function tick(timestamp) {
      frame = 0
      if (paused || !visible || document.hidden) { lastTime = 0; return }
      if (lastTime) clock += Math.min((timestamp - lastTime) / 1000, 0.05)
      lastTime = timestamp; draw(clock); frame = requestAnimationFrame(tick)
    }
    function start() { if (!frame && !paused && visible && !document.hidden) frame = requestAnimationFrame(tick) }
    function stop() { cancelAnimationFrame(frame); frame = 0; lastTime = 0 }
    function resize() {
      const rect = art.getBoundingClientRect(); width = rect.width; height = rect.height
      const scale = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale)
      context?.setTransform(scale, 0, 0, scale, 0, 0); draw(clock); start()
    }
    const move = event => { if (!paused) { const rect = art.getBoundingClientRect(); pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top } }
    const leave = () => { pointer.x = pointer.y = -1000 }
    const toggle = () => { paused = !paused; sync(); if (paused) { stop(); leave(); draw(clock) } else start() }
    const change = event => { paused = event.matches; sync(); if (paused) { stop(); draw(clock) } else start() }
    const visibility = () => { if (document.hidden) stop(); else start() }
    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) start(); else stop() }, { threshold: 0 })
    resizeObserver.observe(art); intersectionObserver.observe(art)
    art.addEventListener('pointermove', move); art.addEventListener('pointerleave', leave)
    button.addEventListener('click', toggle); preference.addEventListener('change', change)
    document.addEventListener('visibilitychange', visibility); sync(); resize()
    return () => { stop(); resizeObserver.disconnect(); intersectionObserver.disconnect(); art.removeEventListener('pointermove', move); art.removeEventListener('pointerleave', leave); button.removeEventListener('click', toggle); preference.removeEventListener('change', change); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  return <div ref={artRef} className="data-art" aria-label="Interactive blue-dot illustration of connected data systems">
    <div className="art-heading"><span className="micro-label">CONNECTED BY DESIGN</span><span className="art-cross" aria-hidden="true">+</span></div>
    <canvas ref={canvasRef} id="dot-canvas" aria-hidden="true" />
    <div className="art-node node-ingest" aria-hidden="true"><span /> INGEST</div><div className="art-node node-transform" aria-hidden="true"><span /> TRANSFORM</div><div className="art-node node-serve" aria-hidden="true"><span /> SERVE</div>
    <div className="art-footer"><span className="art-caption">A little structure. A lot of possibility.</span><button ref={buttonRef} id="motion-toggle" type="button" aria-pressed="false" aria-label="Pause blue-dot animation"><svg className="pause-symbol" width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 4h3v12H5zm7 0h3v12h-3z" /></svg><svg className="play-symbol" width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="m6 3 11 7-11 7z" /></svg></button></div>
  </div>
}
