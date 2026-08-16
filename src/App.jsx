import { useEffect, useMemo, useRef, useState } from 'react'

const profile = {
  email: 'anveshsvemuri@gmail.com',
  github: 'https://github.com/anveshsvemuri',
  linkedin: 'https://www.linkedin.com/in/anveshvemuri',
  resume: '/resume/AnveshSVemuri_Resume.pdf',
}

const metrics = [
  { value: '20M+', label: 'records processed daily', note: 'Distributed PySpark workloads' },
  { value: '50+', label: 'legacy workflows migrated', note: 'Alteryx → Databricks' },
  { value: '20+', label: 'external platforms integrated', note: 'APIs, SFTP & cloud storage' },
  { value: '100+', label: 'dashboards supported', note: 'Standardized reporting pipelines' },
]

const experiences = [
  {
    company: 'Publicis Groupe',
    role: 'Data Engineer',
    period: 'Sep 2024 — Present',
    index: '01',
    summary:
      'Designing and operating cloud data pipelines that unify data from external platforms into reliable analytics systems.',
    highlights: [
      ['40%', 'lower reporting latency', 'Python, SQL, Databricks, S3, Redshift and REST API pipelines across 20+ external platforms.'],
      ['35%', 'faster execution', 'Led migration of 50+ legacy Alteryx workflows to scalable PySpark and SQL workloads in Databricks.'],
      ['10h', 'weekly QA effort saved', 'Built automated data quality, reconciliation, schema-change and mapping validation frameworks.'],
    ],
    stack: ['Databricks', 'PySpark', 'Python', 'SQL', 'AWS', 'Redshift', 'REST APIs'],
    details: [
      'Designed and maintained ETL/ELT pipelines across 20+ external platforms, reducing reporting latency by 40%.',
      'Led the migration of 50+ Alteryx workflows to Databricks using PySpark and SQL, cutting execution time by 35%.',
      'Built reusable API, SFTP, and cloud-storage ingestion patterns supporting standardized reporting across 100+ dashboards.',
      'Engineered Redshift SQL transformations and stored procedures for incremental processing and large-scale aggregations.',
      'Automated reconciliation, schema-change detection, mapping validation, and source-to-target QA, saving about 10 hours per week.',
    ],
  },
  {
    company: 'JPMorgan Chase & Co.',
    role: 'Data Engineer',
    period: 'Sep 2023 — Aug 2024',
    index: '02',
    summary:
      'Built distributed data processing and governed orchestration for enterprise-scale financial datasets.',
    highlights: [
      ['20M+', 'records processed daily', 'Developed PySpark ETL pipelines for high-volume transactional data.'],
      ['45%', 'processing improvement', 'Optimized distributed processing patterns for downstream analytics and reporting.'],
      ['25+', 'Airflow workflows automated', 'Integrated orchestration with AWS Lake Formation while strengthening governance.'],
    ],
    stack: ['PySpark', 'Airflow', 'Hive', 'Snowflake', 'AWS Lake Formation', 'Parquet'],
    details: [
      'Developed distributed PySpark ETL pipelines processing 20M+ enterprise records daily from transactional systems.',
      'Built 100+ HiveQL and Snowflake SQL transformations for enterprise-scale financial datasets.',
      'Optimized Spark and Hive workloads with partition-aware processing, Parquet storage, and Spark SQL tuning.',
      'Automated 25+ Airflow workflows integrated with AWS Lake Formation, reducing manual intervention by 12 hours per week.',
    ],
  },
  {
    company: 'Dixon Technologies',
    role: 'Data Engineer',
    period: 'Aug 2020 — Jul 2021',
    index: '03',
    summary:
      'Developed warehouse, streaming, and automation systems across AWS, Spark, Airflow, Snowflake, and Tableau.',
    highlights: [
      ['5M+', 'real-time events daily', 'Built Spark Streaming and AWS Lambda pipelines for low-latency anomaly detection.'],
      ['15+', 'custom Airflow operators', 'Automated Snowflake, Slack, and Tableau workflow integrations in Python.'],
      ['25%', 'cloud compute cost reduction', 'Improved S3 ingestion and object management with Boto3-powered automation.'],
    ],
    stack: ['Airflow', 'Spark Streaming', 'AWS Lambda', 'S3', 'Glue', 'Boto3', 'Redshift'],
    details: [
      'Developed 15+ custom Airflow operators in Python to integrate Snowflake, Slack, and Tableau workflows.',
      'Designed Redshift warehouse schemas and ETL pipelines that improved query performance and reporting speed.',
      'Built Spark Streaming and AWS Lambda pipelines processing 5M+ real-time events daily for anomaly detection.',
      'Automated S3 ingestion and object management with Boto3, contributing to a 25% reduction in cloud compute costs.',
    ],
  },
]

const skillGroups = [
  {
    eyebrow: 'Processing',
    title: 'Distributed data engineering',
    copy: 'Batch, streaming, incremental processing and large-scale transformation patterns.',
    items: ['Apache Spark', 'PySpark', 'Databricks', 'Kafka', 'Hadoop', 'Hive', 'Pandas'],
  },
  {
    eyebrow: 'Cloud',
    title: 'Analytics platforms',
    copy: 'Cloud-native storage, compute, warehouses and governed analytics infrastructure.',
    items: ['Amazon S3', 'AWS Glue', 'AWS Lambda', 'Redshift', 'Athena', 'Lake Formation', 'Snowflake'],
  },
  {
    eyebrow: 'Engineering',
    title: 'Reliable delivery',
    copy: 'Orchestration, modeling, automation, APIs, version control and production quality.',
    items: ['Python', 'SQL', 'Airflow', 'dbt', 'REST APIs', 'Docker', 'GitHub', 'Jenkins'],
  },
]

const projects = [
  {
    number: '01',
    status: 'Built',
    title: 'AI Analytics Assistant',
    description:
      'A Streamlit analytics application for uploading CSV data, profiling datasets, generating charts, and asking AI-powered questions about the data.',
    tech: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'OpenAI API'],
    href: 'https://github.com/anveshsvemuri/ai-analytics-assistant',
    flow: ['CSV', 'Profile', 'Visualize', 'Ask AI'],
  },
  {
    number: '02',
    status: 'In progress',
    title: 'Housing Data Lakehouse',
    description:
      'A work-in-progress data engineering repository structured around ingestion, transformations, data quality, and tests—the foundation for a complete lakehouse case study.',
    tech: ['Python', 'Lakehouse', 'Data Quality', 'Testing'],
    href: 'https://github.com/anveshsvemuri/housing-data-lakehouse',
    flow: ['Ingest', 'Transform', 'Validate', 'Serve'],
  },
]

const overviewItems = [
  {
    label: 'Experience',
    title: 'Data Engineer · 4+ years',
    copy: 'Production experience across cloud data platforms, distributed processing, warehouse engineering, orchestration, APIs, and data quality.',
  },
  {
    label: 'Core stack',
    title: 'Python · SQL · Spark · Databricks · AWS',
    copy: 'Also hands-on with Airflow, Kafka, dbt, Redshift, Snowflake, S3, Glue, Lambda, Hive, REST APIs, Docker, and Git.',
  },
  {
    label: 'Focus',
    title: 'Reliable data platforms at scale',
    copy: 'I focus on dependable ingestion, large-scale transformations, cloud analytics infrastructure, and the data foundation behind AI-ready systems.',
  },
]

const foundations = [
  {
    kind: 'Education',
    title: 'M.S. Computer Information Systems',
    meta: 'New England College · 2023',
  },
  {
    kind: 'Certification',
    title: 'SQL (Advanced) Certificate',
    meta: 'HackerRank · 2026',
  },
  {
    kind: 'Training',
    title: 'Advanced Data Engineering',
    meta: 'Databricks Academy · 2025',
  },
]

function ArrowIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 5h5v5M10 14 19 5M19 13v6H5V5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
      <i />
      <i />
    </span>
  )
}

function SectionHeading({ index, eyebrow, title, copy }) {
  return (
    <div className="section-heading reveal">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div className="section-heading-main">
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Experience', '#experience'],
    ['Skills', '#stack'],
    ['Projects', '#projects'],
    ['Education', '#about'],
  ]

  return (
    <header className="nav-wrap">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Anvesh Vemuri home">
          <span className="brand-mark">AV</span>
          <span className="brand-name">Anvesh Vemuri</span>
        </a>

        <div className="nav-links desktop-nav">
          {links.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé <ExternalIcon size={13} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        {links.map(([label, href], index) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>{label}
          </a>
        ))}
        <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>
          <span>05</span>Contact
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="hero section-shell">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <div className="availability"><span /> Jersey City, NJ · New York metro</div>
          <div className="hero-role-line">DATA ENGINEER · 4+ YEARS EXPERIENCE</div>
          <h1>
            Building data systems
            <span>at production scale.</span>
          </h1>
          <p className="hero-lede">
            Scalable pipelines, distributed processing, cloud analytics platforms, API ingestion, and automated data quality with Python, SQL, Spark, Databricks, and AWS.
          </p>

          <div className="hero-facts" aria-label="Key qualifications">
            <div><strong>20M+</strong><span>records processed daily</span></div>
            <div><strong>20+</strong><span>external platforms integrated</span></div>
            <div><strong>50+</strong><span>workflows migrated to Databricks</span></div>
          </div>

          <div className="hero-actions">
            <a className="primary-button" href="#experience">
              View experience <ArrowIcon />
            </a>
            <a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">
              Open résumé <ExternalIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-foot reveal reveal-delay-2">
        <span>Python · SQL · Spark · PySpark · Databricks · AWS · Airflow · Redshift</span>
        <a href="#experience">Explore experience <span className="scroll-arrow">↓</span></a>
      </div>
    </section>
  )
}

function Overview() {
  return (
    <section id="overview" className="section-shell snapshot-section">
      <div className="snapshot-heading reveal">
        <span className="micro-label">At a glance</span>
        <h2>Production data engineering, clearly defined.</h2>
      </div>
      <div className="snapshot-grid">
        {overviewItems.map((item, index) => (
          <article className={`snapshot-card reveal reveal-delay-${index + 1}`} key={item.label}>
            <span>0{index + 1} · {item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Proof() {
  return (
    <section id="proof" className="section-shell proof-section">
      <div className="proof-intro reveal">
        <p className="micro-label">Proof, not buzzwords</p>
        <h2>Engineering measured in throughput, reliability, and time returned.</h2>
      </div>
      <div className="metric-grid">
        {metrics.map((metric, index) => (
          <article className={`metric-card reveal reveal-delay-${(index % 3) + 1}`} key={metric.label}>
            <div className="metric-index">0{index + 1}</div>
            <strong>{metric.value}</strong>
            <h3>{metric.label}</h3>
            <p>{metric.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section-shell section-block">
      <SectionHeading
        index="01"
        eyebrow="Professional experience"
        title="Building reliable data systems at production scale."
        copy="Across each role, I focus on scalable processing, dependable delivery, measurable performance improvements, and systems teams can trust."
      />

      <div className="experience-list">
        {experiences.map((job) => (
          <article className="experience-row reveal" key={job.company}>
            <div className="experience-meta">
              <span>{job.index}</span>
              <div>
                <p>{job.period}</p>
                <h3>{job.company}</h3>
                <span>{job.role}</span>
              </div>
            </div>

            <div className="experience-body">
              <p className="experience-summary">{job.summary}</p>
              <div className="highlight-grid">
                {job.highlights.map(([value, label, copy]) => (
                  <div className="highlight" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>

              <div className="responsibilities">
                <span className="micro-label">Selected responsibilities & impact</span>
                <ul>
                  {job.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>

              <div className="stack-line" aria-label={`${job.company} technology stack`}>
                {job.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
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
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Projects that demonstrate the work."
        copy="Selected projects that show how I approach data products, analytics workflows, and the foundation for AI-enabled systems."
      />

      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-case reveal" key={project.title}>
            <div className="project-copy">
              <div className="project-topline">
                <span>{project.number}</span>
                <span className={`project-status ${project.status === 'Built' ? 'is-built' : ''}`}>
                  <i /> {project.status}
                </span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
              <a className="case-link" href={project.href} target="_blank" rel="noreferrer">
                View repository <ExternalIcon />
              </a>
            </div>

            <div className="project-visual" aria-label={`${project.title} workflow`}>
              <div className="visual-toolbar">
                <span /><span /><span />
                <p>{project.title.toLowerCase().replaceAll(' ', '-')}.pipeline</p>
              </div>
              <div className="visual-flow">
                {project.flow.map((step, index) => (
                  <div className="flow-step-wrap" key={step}>
                    <div className="flow-step">
                      <span>0{index + 1}</span>
                      <strong>{step}</strong>
                    </div>
                    {index < project.flow.length - 1 && <div className="flow-connector"><i /></div>}
                  </div>
                ))}
              </div>
              <div className="visual-console">
                <span className="console-prompt">›</span>
                <span>pipeline.status</span>
                <span className="console-result">ready</span>
                <span className="console-cursor" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" className="section-shell section-block">
      <SectionHeading
        index="02"
        eyebrow="Technical skills"
        title="Technical skills, grouped by how I use them."
        copy="Languages, processing frameworks, cloud services, databases, orchestration, and engineering tools I use to build production data systems."
      />

      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article className={`skill-panel reveal reveal-delay-${index + 1}`} key={group.title}>
            <span className="skill-eyebrow">{group.eyebrow}</span>
            <h3>{group.title}</h3>
            <p>{group.copy}</p>
            <div className="skill-tags">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>

      <div className="marquee reveal" aria-label="Technology stack">
        <div className="marquee-track">
          {[...skillGroups.flatMap((group) => group.items), ...skillGroups.flatMap((group) => group.items)].map((item, index) => (
            <span key={`${item}-${index}`}>{item}<i>·</i></span>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section-shell section-block about-section">
      <SectionHeading index="04" eyebrow="Education & direction" title="Foundation now. Applied AI next." />

      <div className="about-grid">
        <div className="about-statement reveal">
          <p>
            I’m most interested in the layer where <strong>data infrastructure meets real decisions</strong>: dependable ingestion, scalable processing, understandable models, and quality checks that make teams trust what they see.
          </p>
          <p>
            My current work is centered on production data engineering. I’m also building toward deeper applied AI and ML systems work, with a strong data-platform foundation underneath it.
          </p>
        </div>

        <div className="foundation-list reveal reveal-delay-2">
          {foundations.map((item, index) => (
            <div className="foundation-row" key={item.title}>
              <span>0{index + 1}</span>
              <div>
                <p>{item.kind}</p>
                <h3>{item.title}</h3>
                <small>{item.meta}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-shell contact-section">
      <div className="contact-card reveal">
        <div className="contact-kicker"><span /> Open to the right conversation</div>
        <h2>Hiring for a data engineering or platform role?</h2>
        <p>
          My strongest fit is production data engineering: scalable pipelines, distributed processing, cloud analytics platforms, API ingestion, orchestration, and data quality. I’m also building toward ML and AI data infrastructure.
        </p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email} <ArrowIcon size={22} />
        </a>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Résumé <ExternalIcon /></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])
  return (
    <footer className="section-shell footer">
      <span>© {year} Anvesh Sai Vemuri</span>
      <span>Designed for clarity. Built in React.</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}

function App() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const onPointerMove = (event) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`)
      root.style.setProperty('--pointer-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const progress = document.querySelector('.scroll-progress')
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      progress?.style.setProperty('--scroll', `${Math.min(1, Math.max(0, ratio)) * 100}%`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app-shell" ref={rootRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="page-grid" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Experience />
        <Proof />
        <Stack />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
