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
      'Designed Python, SQL, Databricks, S3, Redshift and REST API pipelines across 20+ external platforms.',
      'Migrated 50+ legacy Alteryx workflows to Databricks with PySpark and SQL, reducing execution time by 35%.',
      'Built reusable API, SFTP and cloud-storage ingestion patterns supporting analytics across 100+ dashboards.',
      'Automated reconciliation, schema-change detection and source-to-target QA, saving about 10 hours per week.',
    ],
    stack: ['Databricks', 'PySpark', 'Python', 'SQL', 'AWS', 'Redshift', 'REST APIs'],
  },
  {
    company: 'JPMorgan Chase & Co.',
    role: 'Data Engineer',
    period: 'Sep 2023 — Aug 2024',
    summary: 'Developed distributed processing and orchestration for enterprise financial datasets.',
    impact: [
      'Developed PySpark ETL pipelines processing 20M+ financial and transactional records daily.',
      'Built 100+ SQL and dbt transformations in Snowflake and Hive for analytical workloads.',
      'Optimized Spark and Hive workloads with partition-aware processing, Parquet storage and Spark SQL tuning.',
      'Automated 25+ Airflow workflows and strengthened reliability across downstream reporting.',
    ],
    stack: ['PySpark', 'Airflow', 'Snowflake', 'Hive', 'Parquet', 'dbt'],
  },
  {
    company: 'Dixon Technologies',
    role: 'Data Engineer',
    period: 'Aug 2020 — Jul 2021',
    summary: 'Built warehouse, streaming and automation systems across AWS and distributed data tools.',
    impact: [
      'Developed custom Airflow operators in Python integrating Snowflake, Slack and Tableau workflows.',
      'Designed Redshift warehouse schemas and ETL pipelines for high-volume analytics workloads.',
      'Built Spark Streaming and AWS Lambda pipelines processing 5M+ real-time events daily.',
      'Automated S3 ingestion and object management with Boto3 to improve cloud efficiency.',
    ],
    stack: ['Airflow', 'Spark Streaming', 'AWS Lambda', 'S3', 'Glue', 'Boto3', 'Redshift'],
  },
]

const capabilities = [
  {
    number: '01',
    title: 'Data pipelines',
    copy: 'Reliable batch, streaming and API-driven pipelines built for scale, observability and maintainability.',
    tools: ['Python', 'SQL', 'PySpark', 'Airflow', 'REST APIs'],
  },
  {
    number: '02',
    title: 'Analytics platforms',
    copy: 'Lakehouse, warehouse and cloud data systems that make trusted data easier to use downstream.',
    tools: ['Databricks', 'Snowflake', 'Redshift', 'AWS', 'Delta Lake'],
  },
  {
    number: '03',
    title: 'Applied AI systems',
    copy: 'Tested AI-assisted analytics experiences grounded in structured data, validation and clear system boundaries.',
    tools: ['OpenAI API', 'Pydantic', 'Streamlit', 'Pandas', 'GitHub Actions'],
  },
]

const projects = [
  {
    number: '01',
    title: 'AI Analytics Assistant',
    label: 'Applied AI / Analytics',
    description: 'A tested Streamlit application that profiles CSV datasets, answers deterministic analytics questions, and uses schema-validated AI responses for open-ended analysis.',
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
    description: 'A reproducible PySpark medallion pipeline with incremental Bronze processing, typed Silver records, rejected-row quarantine, partitioned Gold KPIs and Terraform-defined AWS storage.',
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

function InteractiveDots() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.parentElement
    if (!canvas || !hero) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = {
      x: -1000,
      y: -1000,
      px: -1000,
      py: -1000,
      vx: 0,
      vy: 0,
      active: false,
    }

    let width = 0
    let height = 0
    let ratio = 1
    let frame = 0
    let points = []
    let ripples = []
    let lastTime = performance.now()

    const seeded = (index, salt = 1) => {
      const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
      return value - Math.floor(value)
    }

    const makePoints = () => {
      const density = width < 700 ? 19000 : width > 1600 ? 11500 : 14000
      const count = Math.max(56, Math.min(155, Math.round((width * height) / density)))

      points = Array.from({ length: count }, (_, index) => {
        const normalizedX = seeded(index, 1)
        const normalizedY = seeded(index, 2)

        // Keep the text side quieter and concentrate more energy to the right.
        const weightedX = normalizedX < 0.38
          ? normalizedX * 0.88
          : 0.30 + Math.pow(normalizedX, 0.72) * 0.70

        const homeX = width * (0.025 + weightedX * 0.95)
        const homeY = height * (0.045 + normalizedY * 0.90)

        return {
          x: homeX,
          y: homeY,
          homeX,
          homeY,
          vx: 0,
          vy: 0,
          size: 0.85 + seeded(index, 3) * 1.35,
          alpha: 0.26 + seeded(index, 4) * 0.52,
          phase: seeded(index, 5) * Math.PI * 2,
          drift: 7 + seeded(index, 6) * 14,
        }
      })
    }

    const resize = () => {
      const bounds = hero.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      ratio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      makePoints()
    }

    const addRipple = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 10,
        alpha: 0.30,
        speed: 5.5,
      })
      if (ripples.length > 3) ripples = ripples.slice(-3)
    }

    const handlePointerMove = (event) => {
      const bounds = hero.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top

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
      const bounds = hero.getBoundingClientRect()
      addRipple(event.clientX - bounds.left, event.clientY - bounds.top)
    }

    const handlePointerLeave = () => {
      pointer.active = false
      pointer.vx = 0
      pointer.vy = 0
    }

    const draw = (now = performance.now()) => {
      const elapsed = Math.min(32, now - lastTime)
      const dt = elapsed / 16.667
      lastTime = now
      context.clearRect(0, 0, width, height)

      // Update ripple waves.
      if (!reducedMotion) {
        ripples = ripples
          .map((ripple) => ({
            ...ripple,
            radius: ripple.radius + ripple.speed * dt,
            alpha: ripple.alpha * Math.pow(0.975, dt),
          }))
          .filter((ripple) => ripple.alpha > 0.015 && ripple.radius < Math.max(width, height) * 0.55)
      }

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index]

        if (!reducedMotion) {
          const ambientX = Math.cos(now * 0.00028 + point.phase) * point.drift
          const ambientY = Math.sin(now * 0.00022 + point.phase * 1.3) * point.drift * 0.55
          const targetX = point.homeX + ambientX
          const targetY = point.homeY + ambientY

          // Spring back to home position for a smooth, elastic feel.
          point.vx += (targetX - point.x) * 0.0055 * dt
          point.vy += (targetY - point.y) * 0.0055 * dt

          if (pointer.active) {
            const dx = pointer.x - point.x
            const dy = pointer.y - point.y
            const distance = Math.hypot(dx, dy)
            const influence = 210

            if (distance > 0.001 && distance < influence) {
              const normalized = 1 - distance / influence
              const ease = normalized * normalized

              // Magnetic pull plus a little lateral flow based on pointer speed.
              point.vx += (dx / distance) * ease * 0.34 * dt
              point.vy += (dy / distance) * ease * 0.34 * dt
              point.vx += pointer.vx * ease * 0.012
              point.vy += pointer.vy * ease * 0.012
            }
          }

          ripples.forEach((ripple) => {
            const dx = point.x - ripple.x
            const dy = point.y - ripple.y
            const distance = Math.hypot(dx, dy)
            const ringDistance = Math.abs(distance - ripple.radius)

            if (distance > 0.001 && ringDistance < 42) {
              const wave = (1 - ringDistance / 42) * ripple.alpha
              point.vx += (dx / distance) * wave * 1.25 * dt
              point.vy += (dy / distance) * wave * 1.25 * dt
            }
          })

          point.vx *= Math.pow(0.90, dt)
          point.vy *= Math.pow(0.90, dt)
          point.x += point.vx * dt
          point.y += point.vy * dt
        }

        // Only connect close points, and keep the network faint.
        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next]
          const dx = point.x - other.x
          const dy = point.y - other.y
          const distance = Math.hypot(dx, dy)

          if (distance < 92) {
            let opacity = (1 - distance / 92) * 0.085

            if (pointer.active) {
              const midpointX = (point.x + other.x) / 2
              const midpointY = (point.y + other.y) / 2
              const cursorDistance = Math.hypot(midpointX - pointer.x, midpointY - pointer.y)
              if (cursorDistance < 185) {
                opacity += (1 - cursorDistance / 185) * 0.075
              }
            }

            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(92, 169, 255, ${opacity})`
            context.lineWidth = 0.6
            context.stroke()
          }
        }

        let brightness = point.alpha
        let scale = 1

        if (pointer.active) {
          const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y)
          if (distance < 190) {
            const amount = 1 - distance / 190
            brightness = Math.min(1, brightness + amount * 0.48)
            scale += amount * 0.65
          }
        }

        context.beginPath()
        context.arc(point.x, point.y, point.size * scale, 0, Math.PI * 2)
        context.fillStyle = `rgba(104, 195, 255, ${brightness})`
        context.shadowColor = 'rgba(82, 159, 255, 0.55)'
        context.shadowBlur = brightness > 0.58 ? 10 : 4
        context.fill()
        context.shadowBlur = 0
      }

      // Subtle cursor halo.
      if (pointer.active) {
        const halo = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 155)
        halo.addColorStop(0, 'rgba(80, 157, 255, 0.075)')
        halo.addColorStop(0.5, 'rgba(80, 157, 255, 0.025)')
        halo.addColorStop(1, 'rgba(80, 157, 255, 0)')
        context.fillStyle = halo
        context.beginPath()
        context.arc(pointer.x, pointer.y, 155, 0, Math.PI * 2)
        context.fill()
      }

      // Draw ripple rings last so clicks/taps feel responsive but restrained.
      ripples.forEach((ripple) => {
        context.beginPath()
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        context.strokeStyle = `rgba(109, 190, 255, ${ripple.alpha * 0.45})`
        context.lineWidth = 1
        context.stroke()
      })

      pointer.vx *= 0.80
      pointer.vy *= 0.80

      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(hero)
    hero.addEventListener('pointermove', handlePointerMove)
    hero.addEventListener('pointerdown', handlePointerDown)
    hero.addEventListener('pointerleave', handlePointerLeave)

    resize()
    draw()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerdown', handlePointerDown)
      hero.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="interactive-dots" aria-hidden="true" />
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <InteractiveDots />
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

        <div className="interaction-hint reveal reveal-delay" aria-hidden="true">
          <span />
          Move your cursor · click to ripple
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
  return (
    <section id="experience" className="section-shell section-block">
      <SectionHeader
        label="Experience"
        title="Production data engineering across enterprise environments."
        copy="Advertising, eCommerce and financial data systems with measurable improvements in scale, reliability and delivery."
      />
      <div className="experience-list">
        {experiences.map((job, index) => (
          <article className="experience-card reveal" key={job.company}>
            <div className="experience-side">
              <span className="card-number">0{index + 1}</span>
              <div>
                <small>{job.period}</small>
                <h3>{job.company}</h3>
                <p>{job.role}</p>
              </div>
            </div>
            <div className="experience-main">
              <h4>{job.summary}</h4>
              <ul>
                {job.impact.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="tool-list">{job.stack.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </article>
        ))}
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
    <section className="section-shell contact-section">
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
