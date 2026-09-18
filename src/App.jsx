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
    let animationFrame = 0
    let width = 0
    let height = 0
    let ratio = 1
    let points = []
    const pointer = { x: -1000, y: -1000, active: false }

    const createPoints = () => {
      const area = width * height
      const count = Math.max(48, Math.min(115, Math.round(area / 14500)))
      points = Array.from({ length: count }, (_, index) => {
        const bias = index % 3 === 0 ? 0.58 : 1
        return {
          x: width * (0.05 + Math.random() * 0.92),
          y: height * (0.05 + Math.random() * 0.90),
          vx: (Math.random() - 0.5) * 0.16 * bias,
          vy: (Math.random() - 0.5) * 0.16 * bias,
          radius: 0.8 + Math.random() * 1.25,
          alpha: 0.28 + Math.random() * 0.46,
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
      createPoints()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index]

        if (!reducedMotion) {
          point.x += point.vx
          point.y += point.vy

          if (point.x < 0 || point.x > width) point.vx *= -1
          if (point.y < 0 || point.y > height) point.vy *= -1

          if (pointer.active) {
            const dx = point.x - pointer.x
            const dy = point.y - pointer.y
            const distance = Math.hypot(dx, dy)
            const radius = 145

            if (distance > 0 && distance < radius) {
              const force = (radius - distance) / radius
              point.x += (dx / distance) * force * 1.3
              point.y += (dy / distance) * force * 1.3
            }
          }
        }

        for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
          const other = points[nextIndex]
          const dx = point.x - other.x
          const dy = point.y - other.y
          const distance = Math.hypot(dx, dy)

          if (distance < 105) {
            const opacity = (1 - distance / 105) * 0.11
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(102, 184, 255, ${opacity})`
            context.lineWidth = 0.7
            context.stroke()
          }
        }

        let glow = point.alpha
        if (pointer.active) {
          const distanceToPointer = Math.hypot(point.x - pointer.x, point.y - pointer.y)
          if (distanceToPointer < 155) {
            glow = Math.min(1, glow + (1 - distanceToPointer / 155) * 0.55)
          }
        }

        context.beginPath()
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(117, 205, 255, ${glow})`
        context.shadowColor = 'rgba(102, 177, 255, 0.58)'
        context.shadowBlur = glow > 0.55 ? 9 : 4
        context.fill()
        context.shadowBlur = 0
      }

      if (pointer.active) {
        const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 120)
        gradient.addColorStop(0, 'rgba(92, 170, 255, 0.07)')
        gradient.addColorStop(1, 'rgba(92, 170, 255, 0)')
        context.fillStyle = gradient
        context.beginPath()
        context.arc(pointer.x, pointer.y, 120, 0, Math.PI * 2)
        context.fill()
      }

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event) => {
      const bounds = hero.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const observer = new ResizeObserver(resize)
    observer.observe(hero)
    hero.addEventListener('pointermove', handlePointerMove)
    hero.addEventListener('pointerleave', handlePointerLeave)

    resize()
    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      hero.removeEventListener('pointermove', handlePointerMove)
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

        <div className="hero-proof reveal reveal-delay">
          <span>Production data systems</span>
          <strong>Built for scale, reliability and clarity.</strong>
          <div>
            <i /><span>Batch + streaming</span>
            <i /><span>Lakehouse + warehouse</span>
            <i /><span>Quality + observability</span>
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
