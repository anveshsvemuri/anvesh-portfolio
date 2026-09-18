import { useEffect, useMemo, useRef, useState } from 'react'

const profile = {
  email: 'anveshsvemuri@gmail.com',
  github: 'https://github.com/anveshsvemuri',
  linkedin: 'https://www.linkedin.com/in/anveshvemuri',
  resume: '/resume/AnveshSVemuri_Resume.pdf',
}

const metrics = [
  ['4+', 'years in data engineering'],
  ['20M+', 'records processed daily'],
  ['20+', 'external platforms integrated'],
  ['50+', 'workflows migrated'],
]

const experiences = [
  {
    company: 'Publicis Groupe',
    role: 'Data Engineer',
    period: 'Sep 2024 — Aug 2026',
    summary: 'Built and modernized enterprise data pipelines for advertising and eCommerce analytics.',
    impact: [
      'Built Python, SQL, Databricks and AWS pipelines across 20+ advertising and eCommerce platforms.',
      'Migrated 50+ Alteryx workflows to PySpark/SQL in Databricks, reducing execution time by 35%.',
      'Automated ingestion and data-quality checks supporting 100+ dashboards and saving about 10 hours of QA per week.',
    ],
    stack: ['Databricks', 'PySpark', 'Python', 'SQL', 'AWS', 'Redshift', 'REST APIs'],
  },
  {
    company: 'JPMorgan Chase & Co.',
    role: 'Data Engineer',
    period: 'Sep 2023 — Aug 2024',
    summary: 'Developed distributed processing and orchestration for enterprise financial datasets.',
    impact: [
      'Built PySpark ETL pipelines processing 20M+ financial and transactional records daily.',
      'Developed 100+ SQL/dbt transformations in Snowflake and Hive and improved distributed processing performance.',
      'Automated 25+ Airflow workflows with testing and monitoring for reliable downstream reporting.',
    ],
    stack: ['PySpark', 'Airflow', 'Snowflake', 'Hive', 'Parquet', 'dbt'],
  },
  {
    company: 'Dixon Technologies',
    role: 'Data Engineer',
    period: 'Aug 2020 — Jul 2021',
    summary: 'Built warehouse, streaming and automation systems across AWS and distributed data tools.',
    impact: [
      'Built Python/Airflow automation integrating Snowflake, Slack and Tableau workflows.',
      'Designed Redshift ETL and warehouse structures for high-volume analytics.',
      'Developed Spark Streaming and AWS Lambda pipelines processing 5M+ events daily.',
    ],
    stack: ['Airflow', 'Spark Streaming', 'AWS Lambda', 'S3', 'Glue', 'Boto3', 'Redshift'],
  },
]

const capabilities = [
  {
    number: '01',
    title: 'Data pipelines',
    copy: 'Batch, streaming and API pipelines built for scale and reliability.',
    tools: ['Python', 'SQL', 'PySpark', 'Airflow', 'REST APIs'],
  },
  {
    number: '02',
    title: 'Analytics platforms',
    copy: 'Lakehouse and warehouse systems that turn raw data into trusted analytics.',
    tools: ['Databricks', 'Snowflake', 'Redshift', 'AWS', 'Delta Lake'],
  },
  {
    number: '03',
    title: 'Applied AI systems',
    copy: 'AI-assisted analytics built with validation, testing and clear system boundaries.',
    tools: ['OpenAI API', 'Pydantic', 'Streamlit', 'Pandas', 'GitHub Actions'],
  },
]

const projects = [
  {
    number: '01',
    title: 'AI Analytics Assistant',
    label: 'Applied AI / Analytics',
    description: 'A tested analytics assistant for profiling datasets, answering structured questions and generating validated AI analysis.',
    href: 'https://github.com/anveshsvemuri/ai-analytics-assistant',
    image: '/projects/ai-analytics-preview.svg',
    imageAlt: 'AI Analytics Assistant interface preview',
    proof: ['25 MB guarded uploads', '200K rows supported', '27 automated tests'],
    tech: ['Python', 'Streamlit', 'Pandas', 'OpenAI API', 'Pydantic'],
  },
  {
    number: '02',
    title: 'Housing Data Lakehouse',
    label: 'Lakehouse / Data Platform',
    description: 'A reproducible PySpark medallion pipeline with incremental processing, data-quality controls and Terraform-defined AWS storage.',
    href: 'https://github.com/anveshsvemuri/housing-data-lakehouse',
    image: '/projects/housing-lakehouse-preview.svg',
    imageAlt: 'Housing Data Lakehouse architecture preview',
    proof: ['Bronze → Silver → Gold', '24 automated tests', 'AWS infrastructure as code'],
    tech: ['Python', 'PySpark', 'Parquet', 'AWS S3', 'Terraform'],
  },
]

const education = [
  ['Ph.D. in Technology & Artificial Intelligence', 'Southwest Baptist University', 'Sep 2026 — Present'],
  ['M.S. in Computer Information Systems', 'New England College', 'Completed 2023'],
]

const credentials = [
  ['SQL (Advanced) Certificate', 'HackerRank', '2026'],
  ['Advanced Data Engineering', 'Databricks Academy', '2025'],
]

function ArrowIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 5h5v5M10 14 19 5M19 13v6H5V5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return <span className={`menu-icon ${open ? 'is-open' : ''}`}><i /><i /></span>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['Experience', '#experience'], ['Projects', '#projects'], ['Skills', '#skills'], ['Education', '#education']]

  return (
    <header className="nav-wrap">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Anvesh Vemuri home">
          <span className="brand-mark">AV</span>
          <span className="brand-name">Anvesh Vemuri</span>
        </a>

        <div className="nav-links desktop-nav">
          {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </div>

        <div className="nav-actions">
          <a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer">Résumé <ExternalIcon size={12} /></a>
          <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>Contact</a>
      </div>
    </header>
  )
}

function ScrollInteractiveField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stageIds = ['top', 'skills', 'experience', 'projects', 'education', 'contact']
    const pointer = { x: -1000, y: -1000, px: -1000, py: -1000, vx: 0, vy: 0, active: false }

    let width = 0
    let height = 0
    let ratio = 1
    let frame = 0
    let points = []
    let ripples = []
    let anchors = []
    let scrollState = { from: 0, to: 0, mix: 0 }
    let lastTime = performance.now()

    const seeded = (index, salt = 1) => {
      const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
      return value - Math.floor(value)
    }

    const targetFor = (index, stage) => {
      const a = seeded(index, 1)
      const b = seeded(index, 2)
      const c = seeded(index, 3)
      const angle = a * Math.PI * 2

      if (stage === 0) {
        // Hero: loose field, with a little more visual weight on the right.
        const x = a < 0.36 ? a * 0.86 : 0.28 + Math.pow(a, 0.74) * 0.72
        return { x: 0.03 + x * 0.94, y: 0.05 + b * 0.90 }
      }

      if (stage === 1) {
        // Skills: three calm vertical bands.
        const lane = index % 3
        const centers = [0.22, 0.50, 0.78]
        return {
          x: centers[lane] + (a - 0.5) * 0.18,
          y: 0.10 + b * 0.80 + Math.sin((b + lane) * Math.PI * 2) * 0.025,
        }
      }

      if (stage === 2) {
        // Experience: flowing horizontal data streams.
        const lane = index % 4
        const yCenter = 0.20 + lane * 0.18
        return {
          x: 0.06 + a * 0.88,
          y: yCenter + Math.sin(a * Math.PI * 2.4 + lane) * 0.055 + (b - 0.5) * 0.055,
        }
      }

      if (stage === 3) {
        // Projects: two soft clusters echoing the two showcased builds.
        const cluster = index % 2
        const centerX = cluster === 0 ? 0.30 : 0.72
        const centerY = cluster === 0 ? 0.42 : 0.60
        const radiusX = 0.10 + c * 0.16
        const radiusY = 0.08 + b * 0.14
        return {
          x: centerX + Math.cos(angle) * radiusX,
          y: centerY + Math.sin(angle) * radiusY,
        }
      }

      if (stage === 4) {
        // Education: an ascending diagonal constellation.
        return {
          x: 0.10 + a * 0.80,
          y: 0.72 - a * 0.46 + (b - 0.5) * 0.17,
        }
      }

      // Contact: gather into an open halo, leaving the copy readable.
      const radiusX = 0.18 + c * 0.22
      const radiusY = 0.14 + b * 0.18
      return {
        x: 0.62 + Math.cos(angle) * radiusX,
        y: 0.50 + Math.sin(angle) * radiusY,
      }
    }

    const updateAnchors = () => {
      anchors = stageIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((element) => {
          const rect = element.getBoundingClientRect()
          return rect.top + window.scrollY + rect.height * 0.5
        })
    }

    const updateScrollState = () => {
      if (!anchors.length) return
      const center = window.scrollY + window.innerHeight * 0.52

      if (center <= anchors[0]) {
        scrollState = { from: 0, to: 0, mix: 0 }
        return
      }

      for (let index = 0; index < anchors.length - 1; index += 1) {
        if (center <= anchors[index + 1]) {
          const span = Math.max(1, anchors[index + 1] - anchors[index])
          const raw = (center - anchors[index]) / span
          const mix = raw * raw * (3 - 2 * raw)
          scrollState = { from: index, to: index + 1, mix }
          return
        }
      }

      const last = anchors.length - 1
      scrollState = { from: last, to: last, mix: 0 }
    }

    const makePoints = () => {
      const density = width < 700 ? 11500 : width > 1600 ? 5600 : 7200
      const count = Math.max(88, Math.min(285, Math.round((width * height) / density)))

      points = Array.from({ length: count }, (_, index) => {
        const target = targetFor(index, 0)
        return {
          x: target.x * width,
          y: target.y * height,
          vx: 0,
          vy: 0,
          size: 0.75 + seeded(index, 4) * 1.45,
          alpha: 0.22 + seeded(index, 5) * 0.50,
          phase: seeded(index, 6) * Math.PI * 2,
          drift: 4 + seeded(index, 7) * 10,
        }
      })
    }

    const resize = () => {
      width = Math.max(1, window.innerWidth)
      height = Math.max(1, window.innerHeight)
      ratio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      makePoints()
      updateAnchors()
      updateScrollState()
    }

    const addRipple = (x, y) => {
      ripples.push({ x, y, radius: 8, alpha: 0.28, speed: 5.2 })
      if (ripples.length > 3) ripples = ripples.slice(-3)
    }

    const handlePointerMove = (event) => {
      const x = event.clientX
      const y = event.clientY

      if (!pointer.active) {
        pointer.px = x
        pointer.py = y
      }

      pointer.vx = x - pointer.px
      pointer.vy = y - pointer.py
      pointer.px = x
      pointer.py = y
      pointer.x = x
      pointer.y = y
      pointer.active = true
    }

    const handlePointerDown = (event) => {
      if (event.target.closest('a, button, input, textarea, select')) return
      addRipple(event.clientX, event.clientY)
    }

    const handlePointerLeave = () => {
      pointer.active = false
      pointer.vx = 0
      pointer.vy = 0
    }

    const handleExperiencePulse = (event) => {
      const { x = width * 0.5, y = height * 0.5 } = event.detail || {}
      ripples.push(
        { x, y, radius: 8, alpha: 0.34, speed: 5.6 },
        { x, y, radius: 34, alpha: 0.22, speed: 4.8 },
        { x, y, radius: 62, alpha: 0.14, speed: 4.2 },
      )
      if (ripples.length > 6) ripples = ripples.slice(-6)
    }

    const handleScroll = () => {
      updateScrollState()
    }

    const handleResize = () => {
      resize()
    }

    const draw = (now = performance.now()) => {
      const elapsed = Math.min(32, now - lastTime)
      const dt = elapsed / 16.667
      lastTime = now
      context.clearRect(0, 0, width, height)

      const fromStage = scrollState.from
      const toStage = scrollState.to
      const mix = scrollState.mix

      const lineProfiles = [
        { radius: 95, alpha: 0.060 },
        { radius: 78, alpha: 0.050 },
        { radius: 112, alpha: 0.072 },
        { radius: 92, alpha: 0.056 },
        { radius: 76, alpha: 0.045 },
        { radius: 110, alpha: 0.070 },
      ]
      const lineRadius = lineProfiles[fromStage].radius * (1 - mix) + lineProfiles[toStage].radius * mix
      const lineAlpha = lineProfiles[fromStage].alpha * (1 - mix) + lineProfiles[toStage].alpha * mix

      if (!reducedMotion) {
        ripples = ripples
          .map((ripple) => ({
            ...ripple,
            radius: ripple.radius + ripple.speed * dt,
            alpha: ripple.alpha * Math.pow(0.974, dt),
          }))
          .filter((ripple) => ripple.alpha > 0.014 && ripple.radius < Math.max(width, height) * 0.55)
      }

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index]
        const from = targetFor(index, fromStage)
        const to = targetFor(index, toStage)
        const normalizedX = from.x * (1 - mix) + to.x * mix
        const normalizedY = from.y * (1 - mix) + to.y * mix

        const ambientX = reducedMotion ? 0 : Math.cos(now * 0.00025 + point.phase) * point.drift
        const ambientY = reducedMotion ? 0 : Math.sin(now * 0.00020 + point.phase * 1.2) * point.drift * 0.55
        const targetX = normalizedX * width + ambientX
        const targetY = normalizedY * height + ambientY

        if (!reducedMotion) {
          point.vx += (targetX - point.x) * 0.0065 * dt
          point.vy += (targetY - point.y) * 0.0065 * dt

          if (pointer.active) {
            const dx = pointer.x - point.x
            const dy = pointer.y - point.y
            const distance = Math.hypot(dx, dy)
            const influence = 190

            if (distance > 0.001 && distance < influence) {
              const amount = 1 - distance / influence
              const ease = amount * amount
              point.vx += (dx / distance) * ease * 0.28 * dt
              point.vy += (dy / distance) * ease * 0.28 * dt
              point.vx += pointer.vx * ease * 0.010
              point.vy += pointer.vy * ease * 0.010
            }
          }

          ripples.forEach((ripple) => {
            const dx = point.x - ripple.x
            const dy = point.y - ripple.y
            const distance = Math.hypot(dx, dy)
            const ringDistance = Math.abs(distance - ripple.radius)

            if (distance > 0.001 && ringDistance < 36) {
              const wave = (1 - ringDistance / 36) * ripple.alpha
              point.vx += (dx / distance) * wave * 1.12 * dt
              point.vy += (dy / distance) * wave * 1.12 * dt
            }
          })

          point.vx *= Math.pow(0.895, dt)
          point.vy *= Math.pow(0.895, dt)
          point.x += point.vx * dt
          point.y += point.vy * dt
        } else {
          point.x = targetX
          point.y = targetY
        }

        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next]
          const dx = point.x - other.x
          const dy = point.y - other.y
          const distance = Math.hypot(dx, dy)

          if (distance < lineRadius) {
            let opacity = (1 - distance / lineRadius) * lineAlpha

            if (pointer.active) {
              const midX = (point.x + other.x) / 2
              const midY = (point.y + other.y) / 2
              const cursorDistance = Math.hypot(midX - pointer.x, midY - pointer.y)
              if (cursorDistance < 170) opacity += (1 - cursorDistance / 170) * 0.050
            }

            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(88, 160, 255, ${opacity})`
            context.lineWidth = 0.55
            context.stroke()
          }
        }

        let brightness = point.alpha
        let scale = 1

        if (pointer.active) {
          const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y)
          if (distance < 175) {
            const amount = 1 - distance / 175
            brightness = Math.min(0.95, brightness + amount * 0.44)
            scale += amount * 0.55
          }
        }

        context.beginPath()
        context.arc(point.x, point.y, point.size * scale, 0, Math.PI * 2)
        context.fillStyle = `rgba(104, 190, 255, ${brightness})`
        context.shadowColor = 'rgba(79, 145, 255, 0.52)'
        context.shadowBlur = brightness > 0.58 ? 9 : 3
        context.fill()
        context.shadowBlur = 0
      }

      if (pointer.active) {
        const halo = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 135)
        halo.addColorStop(0, 'rgba(76, 147, 255, 0.060)')
        halo.addColorStop(1, 'rgba(76, 147, 255, 0)')
        context.fillStyle = halo
        context.beginPath()
        context.arc(pointer.x, pointer.y, 135, 0, Math.PI * 2)
        context.fill()
      }

      ripples.forEach((ripple) => {
        context.beginPath()
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        context.strokeStyle = `rgba(108, 185, 255, ${ripple.alpha * 0.38})`
        context.lineWidth = 1
        context.stroke()
      })

      pointer.vx *= 0.78
      pointer.vy *= 0.78

      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('experience-pulse', handleExperiencePulse)
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    resize()
    requestAnimationFrame(() => {
      updateAnchors()
      updateScrollState()
    })
    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('experience-pulse', handleExperiencePulse)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="scroll-interactive-field" aria-hidden="true" />
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero section-shell">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span /> Data Engineer · 4+ years</div>
          <h1>Data engineering<br /><em>at production scale.</em></h1>
          <p>
            I build reliable pipelines, lakehouse systems and analytics infrastructure with Python, SQL, Spark, Databricks and AWS—designed to move from raw data to trusted decisions.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">Explore my work <ArrowIcon /></a>
            <a className="secondary-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a>
          </div>
          <div className="hero-tech">
            {['Python', 'SQL', 'PySpark', 'Databricks', 'AWS', 'Snowflake'].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Metrics() {
  return (
    <section className="metrics section-shell reveal" aria-label="Selected engineering impact">
      {metrics.map(([value, label]) => (
        <div key={label}><strong>{value}</strong><span>{label}</span></div>
      ))}
    </section>
  )
}

function SectionHeader({ label, title, copy }) {
  return (
    <div className="section-heading reveal">
      <span className="section-label">{label}</span>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function Capabilities() {
  return (
    <section id="skills" className="section-shell section-block">
      <SectionHeader
        label="What I build"
        title="Systems that turn complex data into something teams can trust."
        copy="My work spans ingestion, distributed processing, analytics platforms, data quality and applied AI."
      />
      <div className="capability-grid">
        {capabilities.map((item) => (
          <article className="capability-card reveal" key={item.title}>
            <span className="card-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <div className="tool-list">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const [openExperience, setOpenExperience] = useState(null)

  const toggleExperience = (index, event) => {
    const next = openExperience === index ? null : index
    setOpenExperience(next)

    if (next !== null) {
      const rect = event.currentTarget.getBoundingClientRect()
      window.dispatchEvent(new CustomEvent('experience-pulse', {
        detail: {
          x: Math.min(window.innerWidth - 40, rect.left + rect.width * 0.78),
          y: Math.min(window.innerHeight - 40, Math.max(40, rect.top + rect.height * 0.5)),
        },
      }))
    }
  }

  return (
    <section id="experience" className="section-shell section-block experience-section-clean">
      <div className="experience-heading-clean reveal">
        <span className="section-label">Experience</span>
        <h2>Work experience</h2>
      </div>

      <div className="experience-timeline">
        {experiences.map((job, index) => {
          const isOpen = openExperience === index

          return (
            <article className={`experience-row-clean reveal ${isOpen ? 'is-open' : ''}`} key={job.company}>
              <button
                type="button"
                className="experience-row-button"
                aria-expanded={isOpen}
                aria-controls={`experience-details-${index}`}
                onClick={(event) => toggleExperience(index, event)}
              >
                <span className="experience-company-block">
                  <strong>{job.company}</strong>
                  <span>{job.role}</span>
                </span>

                <span className="experience-period-clean">{job.period}</span>

                <span className="experience-plus" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>

              <div
                id={`experience-details-${index}`}
                className="experience-details-clean"
                aria-hidden={!isOpen}
              >
                <div className="experience-details-clean-inner">
                  <p>{job.summary}</p>
                  <ul>
                    {job.impact.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <span className="experience-stack-line">{job.stack.join(' · ')}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section-shell section-block">
      <SectionHeader
        label="Selected work"
        title="Projects built to show the engineering, not just the screenshot."
        copy="Each project is designed as a working system with validation, testing and a clear architecture."
      />
      <div className="project-list">
        {projects.map((project, index) => (
          <article className={`project-card reveal ${index % 2 ? 'is-reversed' : ''}`} key={project.title}>
            <div className="project-copy">
              <div className="project-label"><span>{project.number}</span>{project.label}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="proof-list">{project.proof.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="tool-list">{project.tech.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <a className="project-link" href={project.href} target="_blank" rel="noreferrer">View repository <ExternalIcon /></a>
            </div>
            <figure className="project-visual">
              <img src={project.image} alt={project.imageAlt} loading="lazy" />
            </figure>
          </article>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section-shell section-block">
      <SectionHeader label="Education" title="Academic foundation and continued technical development." />
      <div className="education-grid">
        <div className="education-list">
          {education.map(([degree, school, period]) => (
            <article className="education-item reveal" key={degree}>
              <div><h3>{degree}</h3><p>{school}</p></div>
              <span>{period}</span>
            </article>
          ))}
        </div>
        <aside className="credential-card reveal">
          <span className="section-label">Credentials</span>
          {credentials.map(([title, issuer, year]) => (
            <div className="credential-item" key={title}>
              <div><strong>{title}</strong><span>{issuer}</span></div>
              <small>{year}</small>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-shell contact-section">
      <div className="contact-card reveal">
        <div>
          <span className="section-label">Get in touch</span>
          <h2>Let’s build reliable data systems.</h2>
          <p>I’m open to data engineering, data platform and applied AI opportunities where scale, reliability and business impact matter.</p>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowIcon size={18} /></a>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a>
            <a href={profile.resume} target="_blank" rel="noreferrer">Résumé <ExternalIcon /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])
  return <footer className="section-shell footer"><span>© {year} Anvesh Sai Vemuri</span><span>Data Engineering · Analytics · AI</span><a href="#top">Back to top ↑</a></footer>
}

function App() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' })

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-shell">
      <ScrollInteractiveField />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Metrics />
        <Capabilities />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
