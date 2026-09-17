import { useEffect, useMemo, useState } from 'react'
import './App.css'

const profile = {
  email: 'anveshsvemuri@gmail.com',
  github: 'https://github.com/anveshsvemuri',
  linkedin: 'https://www.linkedin.com/in/anveshvemuri',
  resume: '/resume/AnveshSVemuri_Resume.pdf',
}

const signals = [
  ['PYTHON', 'Production pipelines'],
  ['SPARK', '20M+ records / day'],
  ['DATABRICKS', '50+ workflows migrated'],
  ['AWS', 'Lakehouse & warehouse'],
  ['AIRFLOW', '25+ workflows'],
  ['QUALITY', '10h QA saved / week'],
]

const experiences = [
  {
    company: 'Publicis Groupe',
    role: 'Data Engineer',
    period: 'Sep 2024 — Aug 2026',
    summary: 'Advertising and eCommerce data infrastructure across enterprise analytics workloads.',
    metrics: [['20+', 'platforms integrated'], ['40%', 'lower reporting latency'], ['50+', 'workflows migrated']],
    bullets: [
      'Built Python, SQL, Databricks, S3, Redshift and REST API pipelines across 20+ external platforms.',
      'Migrated 50+ legacy Alteryx workflows to PySpark and SQL in Databricks, reducing execution time by 35%.',
      'Built reusable API, SFTP and cloud-storage ingestion patterns supporting analytics across 100+ dashboards.',
      'Automated reconciliation, schema-change detection and source-to-target QA, saving about 10 hours per week.',
    ],
    stack: ['Databricks', 'PySpark', 'Python', 'SQL', 'AWS', 'Redshift', 'REST APIs'],
  },
  {
    company: 'JPMorgan Chase & Co.',
    role: 'Data Engineer',
    period: 'Sep 2023 — Aug 2024',
    summary: 'Distributed processing and governed orchestration for enterprise-scale financial datasets.',
    metrics: [['20M+', 'records / day'], ['45%', 'processing improvement'], ['25+', 'Airflow workflows']],
    bullets: [
      'Developed distributed PySpark ETL pipelines processing 20M+ financial and transactional records daily.',
      'Built 100+ SQL and dbt transformations in Snowflake and Hive for analytical workloads.',
      'Optimized Spark and Hive workloads with partition-aware processing, Parquet storage and Spark SQL tuning.',
      'Automated 25+ Airflow workflows and strengthened data reliability across downstream reporting.',
    ],
    stack: ['PySpark', 'Airflow', 'Snowflake', 'Hive', 'Parquet', 'Data Quality'],
  },
  {
    company: 'Dixon Technologies',
    role: 'Data Engineer',
    period: 'Aug 2020 — Jul 2021',
    summary: 'Warehouse, streaming and automation systems across AWS, Spark, Airflow and Snowflake.',
    metrics: [['5M+', 'events / day'], ['15+', 'Airflow operators'], ['25%', 'cloud cost reduction']],
    bullets: [
      'Developed custom Airflow operators in Python integrating Snowflake, Slack and Tableau workflows.',
      'Designed Redshift warehouse schemas and ETL pipelines for high-volume analytics workloads.',
      'Built Spark Streaming and AWS Lambda pipelines processing 5M+ real-time events daily.',
      'Automated S3 ingestion and object management with Boto3 to improve cloud efficiency.',
    ],
    stack: ['Airflow', 'Spark Streaming', 'AWS Lambda', 'S3', 'Glue', 'Boto3', 'Redshift'],
  },
]

const skillGroups = [
  {
    index: '01',
    label: 'Processing',
    title: 'Distributed data systems',
    copy: 'Batch, streaming, incremental processing and transformation patterns for large datasets.',
    items: ['Apache Spark', 'PySpark', 'Databricks', 'Kafka', 'Hadoop', 'Hive', 'Pandas'],
  },
  {
    index: '02',
    label: 'Cloud',
    title: 'Analytics infrastructure',
    copy: 'Storage, compute, warehouses and governed cloud platforms for reliable analytical systems.',
    items: ['Amazon S3', 'AWS Glue', 'Lambda', 'Redshift', 'Athena', 'Lake Formation', 'Snowflake', 'Terraform'],
  },
  {
    index: '03',
    label: 'Engineering',
    title: 'Delivery & intelligence',
    copy: 'Orchestration, testing, APIs, observability and AI-enabled analytics application development.',
    items: ['Python', 'SQL', 'Airflow', 'dbt', 'REST APIs', 'OpenAI API', 'Pydantic', 'Docker', 'GitHub Actions'],
  },
]

const projects = [
  {
    number: '01',
    title: 'AI Analytics Assistant',
    status: 'Tested application',
    description: 'A Streamlit analytics assistant that safely profiles CSV datasets, answers deterministic analytics questions, and uses schema-validated AI responses for open-ended analysis.',
    href: 'https://github.com/anveshsvemuri/ai-analytics-assistant',
    image: '/projects/ai-analytics-preview.svg',
    imageAlt: 'AI Analytics Assistant interface preview',
    flow: ['Upload', 'Profile', 'Analyze', 'Explain'],
    stats: [['25 MB', 'guarded uploads'], ['200K', 'rows supported'], ['27', 'automated tests']],
    tech: ['Python', 'Streamlit', 'Pandas', 'OpenAI API', 'Pydantic', 'GitHub Actions'],
  },
  {
    number: '02',
    title: 'Housing Data Lakehouse',
    status: 'Tested pipeline',
    description: 'A reproducible PySpark medallion pipeline with incremental Bronze processing, typed Silver records, rejected-row quarantine, partitioned Gold KPIs and Terraform-defined AWS storage.',
    href: 'https://github.com/anveshsvemuri/housing-data-lakehouse',
    image: '/projects/housing-lakehouse-preview.svg',
    imageAlt: 'Housing Data Lakehouse architecture preview',
    flow: ['Generate', 'Bronze', 'Silver', 'Gold'],
    stats: [['3', 'data layers'], ['24', 'automated tests'], ['AWS', 'infra as code']],
    tech: ['Python', 'PySpark', 'Parquet', 'AWS S3', 'Terraform', 'GitHub Actions'],
  },
]

const education = [
  ['Ph.D. in Technology & Artificial Intelligence', 'Southwest Baptist University', 'Sep 2026 — Present', 'Doctoral study'],
  ['M.S. in Computer Information Systems', 'New England College', 'Completed 2023', 'Graduate degree'],
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
  const links = [['Experience', '#experience'], ['Projects', '#projects'], ['Stack', '#stack'], ['Education', '#education']]

  return (
    <header className="nav-wrap">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Anvesh Vemuri home">
          <span className="brand-glyph">A</span>
          <span>Anvesh Vemuri</span>
        </a>
        <div className="nav-links desktop-nav">
          {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </div>
        <div className="nav-actions">
          <a className="nav-text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="nav-cta" href={profile.resume} target="_blank" rel="noreferrer">Résumé <ExternalIcon size={12} /></a>
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

function SignalStrip() {
  return (
    <div className="signal-strip" aria-label="Engineering signals">
      <div className="signal-track">
        {[...signals, ...signals].map(([label, value], index) => (
          <div className="signal-item" key={`${label}-${index}`}>
            <span>{label}</span><strong>{value}</strong><i>↗</i>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlatformPanel() {
  const stages = ['Ingest', 'Orchestrate', 'Transform', 'Serve', 'Observe']
  return (
    <div className="platform-panel reveal reveal-delay-2">
      <div className="panel-bar">
        <span><i /> DATA PLATFORM / LIVE PROFILE</span>
        <span>AV-01</span>
      </div>
      <div className="panel-hero">
        <div>
          <span className="mono-label">Current focus</span>
          <h3>Reliable systems for analytics & AI</h3>
        </div>
        <div className="status-orb"><span /></div>
      </div>
      <div className="panel-metrics">
        <div><strong>4+</strong><span>years</span></div>
        <div><strong>20M+</strong><span>rows / day</span></div>
        <div><strong>100+</strong><span>dashboards</span></div>
      </div>
      <div className="flow-map">
        <div className="flow-line" />
        {stages.map((stage, index) => (
          <div className="flow-step" key={stage}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <i />
            <strong>{stage}</strong>
          </div>
        ))}
      </div>
      <div className="panel-terminal">
        <div><span>$</span> stack --core</div>
        <p>python sql pyspark databricks aws airflow</p>
        <div><span>$</span> reliability --status</div>
        <p className="terminal-ok">healthy / monitored / tested</p>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <>
      <SignalStrip />
      <section id="top" className="hero section-shell">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span>DATA ENGINEERING</span><i />JERSEY CITY · NEW YORK METRO</div>
          <h1>Data systems<br /><em>at production scale.</em></h1>
          <p className="hero-lede">I design and build scalable pipelines, distributed processing systems, lakehouse architecture and analytics infrastructure—then make them observable, testable and useful.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">Explore selected work <ArrowIcon /></a>
            <a className="secondary-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a>
          </div>
          <div className="hero-footnote">
            <span>Python</span><span>SQL</span><span>PySpark</span><span>Databricks</span><span>AWS</span><span>Snowflake</span>
          </div>
        </div>
        <PlatformPanel />
      </section>
    </>
  )
}

function SectionHeader({ code, kicker, title, copy }) {
  return (
    <div className="section-header reveal">
      <div className="section-code">{code}</div>
      <div>
        <span className="mono-label">{kicker}</span>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function Experience() {
  return (
    <section id="experience" className="section-shell section-block">
      <SectionHeader code="01" kicker="OPERATING HISTORY" title="Experience built around measurable systems." copy="Production work across advertising, eCommerce and financial data environments." />
      <div className="experience-table">
        {experiences.map((job, index) => (
          <article className="experience-row reveal" key={job.company}>
            <div className="experience-index">0{index + 1}</div>
            <div className="experience-meta">
              <span>{job.period}</span>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
            </div>
            <div className="experience-main">
              <p className="experience-summary">{job.summary}</p>
              <div className="metric-row">
                {job.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
              </div>
              <ul className="clean-list">
                {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
              <div className="tag-row">{job.stack.map((item) => <span key={item}>{item}</span>)}</div>
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
      <SectionHeader code="02" kicker="SELECTED SYSTEMS" title="Builds that show the architecture, not just the outcome." copy="Two hands-on projects focused on reliable analytics, AI-assisted workflows and reproducible data infrastructure." />
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card reveal" key={project.title}>
            <div className="project-bar">
              <span>{project.number} / PROJECT</span>
              <span className="project-status"><i />{project.status}</span>
            </div>
            <figure className="project-visual">
              <img src={project.image} alt={project.imageAlt} loading="lazy" />
              <figcaption>{project.flow.join(' → ')}</figcaption>
            </figure>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-stats">
                {project.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
              </div>
              <div className="tag-row">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
              <a className="inline-link" href={project.href} target="_blank" rel="noreferrer">Open repository <ExternalIcon /></a>
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
      <SectionHeader code="03" kicker="ENGINEERING LAYERS" title="A connected data engineering stack." copy="Grouped by the job each technology does inside a production system." />
      <div className="stack-grid">
        {skillGroups.map((group) => (
          <article className="stack-card reveal" key={group.title}>
            <div className="stack-card-top"><span>{group.index}</span><i>{group.label}</i></div>
            <h3>{group.title}</h3>
            <p>{group.copy}</p>
            <div className="stack-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </article>
        ))}
      </div>
      <div className="architecture-strip reveal">
        {['Source', 'Ingestion', 'Orchestration', 'Transform', 'Warehouse', 'Quality', 'Analytics'].map((item, index) => (
          <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < 6 && <i>→</i>}</div>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section-shell section-block">
      <SectionHeader code="04" kicker="FOUNDATION" title="Education & continuous development." copy="Academic study and technical training supporting data platforms and applied AI." />
      <div className="education-layout">
        <div className="education-list">
          {education.map(([degree, school, period, status], index) => (
            <article className="education-row reveal" key={degree}>
              <span>0{index + 1}</span>
              <div><i>{status}</i><h3>{degree}</h3><p>{school}</p></div>
              <small>{period}</small>
            </article>
          ))}
        </div>
        <div className="credential-panel reveal">
          <span className="mono-label">CREDENTIALS</span>
          <h3>Professional training</h3>
          {credentials.map(([title, issuer, year]) => (
            <div className="credential-row" key={title}><div><strong>{title}</strong><span>{issuer}</span></div><small>{year}</small></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-shell contact-section">
      <div className="contact-panel reveal">
        <div className="contact-copy">
          <span className="mono-label">OPEN CHANNEL</span>
          <h2>Building a serious data platform?</h2>
          <p>I’m interested in data engineering, platform and applied AI roles where reliability, scale and business impact matter.</p>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowIcon size={18} /></a>
          <div><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a><a href={profile.resume} target="_blank" rel="noreferrer">Résumé <ExternalIcon /></a></div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])
  return <footer className="section-shell footer"><span>© {year} Anvesh Sai Vemuri</span><span>DATA ENGINEERING / ANALYTICS / AI</span><a href="#top">Back to top ↑</a></footer>
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
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content"><Hero /><Experience /><Projects /><Stack /><Education /><Contact /></main>
      <Footer />
    </div>
  )
}

export default App
