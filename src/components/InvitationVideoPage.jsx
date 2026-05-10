import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CANVAS_W = 1080
const CANVAS_H = 1920
const TOTAL_DURATION = 12 // seconds
const FPS = 30

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function InvitationVideoPage() {
  const canvasRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [coupleImg, setCoupleImg] = useState(null)
  const animFrameRef = useRef(null)

  // Load couple image
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => setCoupleImg(img)
    img.src = '/couple.jpg'
  }, [])

  // Draw a single frame
  const drawFrame = useCallback((ctx, t, img) => {
    const w = CANVAS_W
    const h = CANVAS_H

    // Background - warm cream gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
    bgGrad.addColorStop(0, '#fdfbf7')
    bgGrad.addColorStop(0.5, '#f9f5ef')
    bgGrad.addColorStop(1, '#f5f0e8')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, w, h)

    // Subtle gold radial glow
    const glowGrad = ctx.createRadialGradient(w / 2, h * 0.35, 0, w / 2, h * 0.35, 400)
    glowGrad.addColorStop(0, 'rgba(184, 134, 11, 0.06)')
    glowGrad.addColorStop(1, 'rgba(184, 134, 11, 0)')
    ctx.fillStyle = glowGrad
    ctx.fillRect(0, 0, w, h)

    // Floating particles
    for (let i = 0; i < 15; i++) {
      const px = (Math.sin(t * 0.5 + i * 1.7) * 0.5 + 0.5) * w
      const py = ((t * 0.08 + i * 0.07) % 1) * h
      const size = 2 + Math.sin(i) * 2
      const alpha = 0.1 + Math.sin(t + i) * 0.08
      ctx.beginPath()
      ctx.arc(px, py, size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(184, 134, 11, ${Math.max(0, alpha)})`
      ctx.fill()
    }

    // --- Scene timing ---
    // 0-2s:   Title fade in
    // 1.5-3s: Ornament lines
    // 2-7s:   Image fade in & stay
    // 4-8s:   Names fade in
    // 5-9s:   Subtitle
    // 6-10s:  Event details
    // 8-12s:  "You are invited" + fade

    // TOP ORNAMENT
    const ornAlpha = Math.min(1, Math.max(0, (t - 0.5) / 1))
    if (ornAlpha > 0) {
      ctx.globalAlpha = ornAlpha
      ctx.strokeStyle = 'rgba(184, 134, 11, 0.5)'
      ctx.lineWidth = 2
      const lineW = 60
      ctx.beginPath()
      ctx.moveTo(w / 2 - lineW - 15, 160)
      ctx.lineTo(w / 2 - 15, 160)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(w / 2 + 15, 160)
      ctx.lineTo(w / 2 + lineW + 15, 160)
      ctx.stroke()
      // Star
      ctx.fillStyle = 'rgba(184, 134, 11, 0.7)'
      ctx.font = '20px serif'
      ctx.textAlign = 'center'
      ctx.fillText('✦', w / 2, 167)
      ctx.globalAlpha = 1
    }

    // TITLE - "Silver Jubilee Celebration"
    const titleAlpha = Math.min(1, Math.max(0, (t - 0.3) / 1.2))
    const titleY = 240 - (1 - easeInOut(Math.min(1, Math.max(0, (t - 0.3) / 1)))) * 20
    if (titleAlpha > 0) {
      ctx.globalAlpha = titleAlpha
      ctx.fillStyle = '#6b5e54'
      ctx.font = '500 52px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.fillText('Silver Jubilee Celebration', w / 2, titleY)
      ctx.globalAlpha = 1
    }

    // COUPLE IMAGE
    const imgAlpha = Math.min(1, Math.max(0, (t - 1.5) / 1.5))
    const imgScale = 0.95 + easeInOut(Math.min(1, Math.max(0, (t - 1.5) / 1.5))) * 0.05
    if (imgAlpha > 0 && img) {
      ctx.globalAlpha = imgAlpha
      ctx.save()
      const imgW = 680
      const imgH = 880
      const imgX = (w - imgW) / 2
      const imgY = 300

      ctx.translate(w / 2, imgY + imgH / 2)
      ctx.scale(imgScale, imgScale)
      ctx.translate(-w / 2, -(imgY + imgH / 2))

      // Gold frame glow
      ctx.shadowColor = 'rgba(184, 134, 11, 0.3)'
      ctx.shadowBlur = 30

      // Gold frame border
      const frameP = 6
      const grad = ctx.createLinearGradient(imgX - frameP, imgY - frameP, imgX + imgW + frameP, imgY + imgH + frameP)
      grad.addColorStop(0, '#b8860b')
      grad.addColorStop(0.5, '#e0c56c')
      grad.addColorStop(1, '#8b6508')
      ctx.fillStyle = grad
      drawRoundedRect(ctx, imgX - frameP, imgY - frameP, imgW + frameP * 2, imgH + frameP * 2, 28)
      ctx.fill()

      ctx.shadowBlur = 0

      // Image
      ctx.save()
      drawRoundedRect(ctx, imgX, imgY, imgW, imgH, 22)
      ctx.clip()
      ctx.drawImage(img, imgX, imgY, imgW, imgH)
      // Vignette
      const vigGrad = ctx.createLinearGradient(0, imgY + imgH * 0.7, 0, imgY + imgH)
      vigGrad.addColorStop(0, 'rgba(0,0,0,0)')
      vigGrad.addColorStop(1, 'rgba(0,0,0,0.12)')
      ctx.fillStyle = vigGrad
      ctx.fillRect(imgX, imgY, imgW, imgH)
      ctx.restore()

      // Corner accents
      ctx.strokeStyle = 'rgba(184, 134, 11, 0.5)'
      ctx.lineWidth = 2.5
      const cSize = 24
      const cOff = 12
      // TL
      ctx.beginPath(); ctx.moveTo(imgX - cOff, imgY - cOff + cSize); ctx.lineTo(imgX - cOff, imgY - cOff); ctx.lineTo(imgX - cOff + cSize, imgY - cOff); ctx.stroke()
      // TR
      ctx.beginPath(); ctx.moveTo(imgX + imgW + cOff - cSize, imgY - cOff); ctx.lineTo(imgX + imgW + cOff, imgY - cOff); ctx.lineTo(imgX + imgW + cOff, imgY - cOff + cSize); ctx.stroke()
      // BL
      ctx.beginPath(); ctx.moveTo(imgX - cOff, imgY + imgH + cOff - cSize); ctx.lineTo(imgX - cOff, imgY + imgH + cOff); ctx.lineTo(imgX - cOff + cSize, imgY + imgH + cOff); ctx.stroke()
      // BR
      ctx.beginPath(); ctx.moveTo(imgX + imgW + cOff - cSize, imgY + imgH + cOff); ctx.lineTo(imgX + imgW + cOff, imgY + imgH + cOff); ctx.lineTo(imgX + imgW + cOff, imgY + imgH + cOff - cSize); ctx.stroke()

      // 25 YEARS badge
      const badgeAlpha = Math.min(1, Math.max(0, (t - 3) / 0.8))
      if (badgeAlpha > 0) {
        ctx.globalAlpha = imgAlpha * badgeAlpha
        const badgeY = imgY + imgH + cOff + 8
        ctx.fillStyle = 'rgba(255,255,255,0.92)'
        ctx.shadowColor = 'rgba(184, 134, 11, 0.15)'
        ctx.shadowBlur = 12
        drawRoundedRect(ctx, w / 2 - 80, badgeY, 160, 40, 20)
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.fillStyle = '#8b6508'
        ctx.font = '600 18px "Playfair Display", serif'
        ctx.textAlign = 'center'
        ctx.fillText('✦  25 YEARS  ✦', w / 2, badgeY + 26)
      }

      ctx.restore()
      ctx.globalAlpha = 1
    }

    // COUPLE NAMES
    const nameAlpha = Math.min(1, Math.max(0, (t - 3.5) / 1.2))
    const nameY = 1320 + (1 - easeInOut(Math.min(1, Math.max(0, (t - 3.5) / 1)))) * 15
    if (nameAlpha > 0) {
      ctx.globalAlpha = nameAlpha
      ctx.fillStyle = '#b8860b'
      ctx.font = '78px "Great Vibes", cursive'
      ctx.textAlign = 'center'
      ctx.fillText('Vani & Lingareddy', w / 2, nameY)

      // Divider
      const divAlpha = Math.min(1, Math.max(0, (t - 4.2) / 0.8))
      if (divAlpha > 0) {
        ctx.globalAlpha = nameAlpha * divAlpha
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.4)'
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(w / 2 - 60, nameY + 20); ctx.lineTo(w / 2 - 10, nameY + 20); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(w / 2 + 10, nameY + 20); ctx.lineTo(w / 2 + 60, nameY + 20); ctx.stroke()
        ctx.fillStyle = 'rgba(184, 134, 11, 0.6)'
        ctx.font = '14px serif'
        ctx.fillText('✦', w / 2, nameY + 25)
      }

      ctx.globalAlpha = 1
    }

    // SUBTITLE
    const subAlpha = Math.min(1, Math.max(0, (t - 4.8) / 1))
    if (subAlpha > 0) {
      ctx.globalAlpha = subAlpha
      ctx.fillStyle = '#6b5e54'
      ctx.font = '300 30px "Poppins", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Celebrating 25 Beautiful Years of Love', w / 2, 1390)
      ctx.globalAlpha = 1
    }

    // EVENT DETAILS
    const detailAlpha = Math.min(1, Math.max(0, (t - 6) / 1.2))
    const detailY = 1490 + (1 - easeInOut(Math.min(1, Math.max(0, (t - 6) / 1)))) * 20
    if (detailAlpha > 0) {
      ctx.globalAlpha = detailAlpha

      // Detail cards background
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      drawRoundedRect(ctx, 100, detailY - 20, w - 200, 260, 24)
      ctx.fill()
      ctx.strokeStyle = 'rgba(232, 221, 208, 0.8)'
      ctx.lineWidth = 1
      drawRoundedRect(ctx, 100, detailY - 20, w - 200, 260, 24)
      ctx.stroke()

      // Date
      ctx.fillStyle = '#2d2520'
      ctx.font = '600 36px "Poppins", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('📅  13 May 2026, Wednesday', w / 2, detailY + 45)

      // Time
      ctx.fillText('⏰  6:30 PM Onwards', w / 2, detailY + 110)

      // Venue
      ctx.fillText('📍  Anha Farmstay', w / 2, detailY + 175)
      ctx.font = '400 28px "Poppins", sans-serif'
      ctx.fillStyle = '#6b5e54'
      ctx.fillText('Garrepalle, Telangana', w / 2, detailY + 215)

      ctx.globalAlpha = 1
    }

    // "YOU ARE INVITED" closing
    const closeAlpha = Math.min(1, Math.max(0, (t - 8.5) / 1.2))
    if (closeAlpha > 0) {
      ctx.globalAlpha = closeAlpha
      ctx.fillStyle = '#b8860b'
      ctx.font = '500 40px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.fillText('You are cordially invited', w / 2, 1830)
      ctx.globalAlpha = 1
    }

    // Final fade to cream at the end
    if (t > 10.5) {
      const fadeAlpha = Math.min(1, (t - 10.5) / 1.5)
      ctx.fillStyle = `rgba(253, 251, 247, ${fadeAlpha})`
      ctx.fillRect(0, 0, w, h)
    }

    // Initial fade from cream
    if (t < 0.5) {
      const fadeAlpha = 1 - t / 0.5
      ctx.fillStyle = `rgba(253, 251, 247, ${fadeAlpha})`
      ctx.fillRect(0, 0, w, h)
    }
  }, [])

  // Preview animation
  const playPreview = useCallback(() => {
    if (!coupleImg) return
    setIsPlaying(true)
    const canvas = previewCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const startTime = performance.now()

    const animate = (now) => {
      const t = (now - startTime) / 1000
      if (t > TOTAL_DURATION) {
        setIsPlaying(false)
        return
      }
      setProgress(t / TOTAL_DURATION)
      drawFrame(ctx, t, coupleImg)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)
  }, [coupleImg, drawFrame])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Draw initial frame on load
  useEffect(() => {
    if (coupleImg && previewCanvasRef.current) {
      const ctx = previewCanvasRef.current.getContext('2d')
      drawFrame(ctx, 0, coupleImg)
    }
  }, [coupleImg, drawFrame])

  // Generate and download video
  const generateVideo = useCallback(async () => {
    if (!coupleImg) return
    setIsGenerating(true)
    setProgress(0)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const stream = canvas.captureStream(FPS)
    const chunks = []

    const recorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm',
      videoBitsPerSecond: 8000000,
    })

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setIsGenerating(false)
      setProgress(1)
    }

    recorder.start()

    const totalFrames = TOTAL_DURATION * FPS
    for (let frame = 0; frame <= totalFrames; frame++) {
      const t = frame / FPS
      drawFrame(ctx, t, coupleImg)
      setProgress(frame / totalFrames)
      // Yield to main thread every few frames
      if (frame % 5 === 0) {
        await new Promise((r) => setTimeout(r, 0))
      }
    }

    recorder.stop()
  }, [coupleImg, drawFrame])

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-cream to-warm flex flex-col items-center px-4 py-8 md:py-12">
      {/* Hidden full-res canvas for recording */}
      <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="hidden" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-8 bg-gold/40" />
          <span className="text-gold text-sm">✦</span>
          <div className="h-[1px] w-8 bg-gold/40" />
        </div>
        <h1 className="text-xl md:text-3xl font-serif text-text tracking-wide">
          Invitation Video
        </h1>
        <p className="text-text-light text-xs md:text-sm mt-1 font-light">
          Preview & download the cinematic invitation
        </p>
      </motion.div>

      {/* Preview Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-[320px] md:max-w-[360px] mb-6"
      >
        {/* Gold frame around preview */}
        <div className="p-[3px] rounded-2xl bg-gradient-to-br from-gold via-[#e0c56c] to-gold-dark shadow-xl shadow-gold/20">
          <div className="rounded-[13px] overflow-hidden bg-cream">
            <canvas
              ref={previewCanvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Play overlay when not playing */}
        {!isPlaying && !isGenerating && (
          <button
            onClick={playPreview}
            disabled={!coupleImg}
            className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-2xl cursor-pointer border-none"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/80 backdrop-blur-md shadow-lg shadow-gold/20 flex items-center justify-center border border-gold/20">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </motion.div>

      {/* Progress bar */}
      <AnimatePresence>
        {(isPlaying || isGenerating) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[320px] mb-4"
          >
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="text-text-light text-[10px] text-center mt-1.5 tracking-wider">
              {isGenerating ? 'Generating video...' : 'Playing preview...'}
              {' '}{Math.round(progress * 100)}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col gap-3 items-center w-full max-w-[320px]"
      >
        {!downloadUrl ? (
          <button
            onClick={generateVideo}
            disabled={isGenerating || !coupleImg}
            className="gold-button w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed font-sans"
          >
            {isGenerating ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z" fill="currentColor" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Generate & Download Video
              </>
            )}
          </button>
        ) : (
          <a
            href={downloadUrl}
            download="Silver-Jubilee-Invitation-Vani-Lingareddy.webm"
            className="gold-button w-full justify-center font-sans"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Invitation Video
          </a>
        )}

        {/* Back link */}
        <a
          href="/"
          className="text-text-light text-xs tracking-wide hover:text-gold transition-colors no-underline mt-2"
        >
          ← Back to Invitation
        </a>
      </motion.div>

      {/* Loading state */}
      {!coupleImg && (
        <div className="text-text-light text-sm mt-4 animate-pulse">
          Loading assets...
        </div>
      )}
    </div>
  )
}

export default InvitationVideoPage
