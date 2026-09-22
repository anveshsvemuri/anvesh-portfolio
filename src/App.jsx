import { useEffect, useRef, useState } from 'react'
import content from './content.json'
import DotField from './DotField.jsx'

const links = [['Experience', '#experience'], ['Projects', '#projects'], ['Education', '#education'], ['Certifications', '#certifications']]
const { contact, experience, education, certifications, projects, toolkit, skills } = content

function Arrow({ external = false, size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={external ? 'M7 17 17 7M7 7h10v10' : 'M5 12h14m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function ExternalLink({ href, children, className, label }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label ? `${label} (opens in new tab)` : undefined}>{children}<Arrow external size={15} />{!label && <span className="sr-only"> (opens in new tab)</span>}</a>
}

function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('overview')
  const button = useRef(null)
  useEffect(() => {
    const media = matchMedia('(min-width: 901px)')
    const reset = event => { if (event.matches) setOpen(false) }
    const escape = event => { if (event.key === 'Escape' && open) { setOpen(false); button.current?.focus() } }
    media.addEventListener('change', reset)
    document.addEventListener('keydown', escape)
    return () => { media.removeEventListener('change', reset); document.removeEventListener('keydown', escape) }
  }, [open])
  useEffect(() => {
    let queued = false, frame = 0
    const update = () => {
      const range = document.documentElement.scrollHeight - innerHeight
      document.querySelector('.reading-progress')?.style.setProperty('transform', `scaleX(${range > 0 ? scrollY / range : 0})`)
      let current = 'overview'
      document.querySelectorAll('main section[id]').forEach(section => { if (section.getBoundingClientRect().top < innerHeight * 0.4) current = section.id })
      setActive(current); queued = false
    }
    const request = () => { if (!queued) { queued = true; frame = requestAnimationFrame(update) } }
    addEventListener('scroll', request, { passive: true }); addEventListener('resize', request)
    document.addEventListener('toggle', request, true); update()
    return () => { removeEventListener('scroll', request); removeEventListener('resize', request); document.removeEventListener('toggle', request, true); cancelAnimationFrame(frame) }
  }, [])
  return <header className="site-header"><nav className="nav container" aria-label="Main navigation">
    <a className="wordmark" href="#overview" aria-label="Anvesh Vemuri, home"><span className="brand-dots" aria-hidden="true"><i /><i /><i /><i /></span>Anvesh Vemuri<span className="wordmark-period">.</span></a>
    <div className="desktop-nav">{links.map(([label, href]) => <a key={href} href={href} aria-current={active === href.slice(1) ? 'location' : undefined}>{label}</a>)}</div>
    <a className="nav-contact" href={`mailto:${contact.email}`}>Let’s talk <Arrow /></a>
    <button ref={button} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><span className="sr-only">{open ? 'Close' : 'Open'} navigation</span><span className="menu-lines" aria-hidden="true" /></button>
    </nav><nav id="mobile-nav" className="mobile-nav container" aria-label="Mobile navigation" hidden={!open}>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href={contact.resume} target="_blank" rel="noopener noreferrer">Résumé <span className="sr-only">(PDF, opens in new tab)</span></a><a href={`mailto:${contact.email}`}>Let’s talk</a></nav></header>
}

function Overview() {
  return <section id="overview" className="hero container" aria-labelledby="hero-title"><div className="hero-grid"><div className="hero-copy">
    <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> DATA ENGINEER <span className="eyebrow-divider">/</span> JERSEY CITY, NJ</p>
    <h1 id="hero-title">Data that works.<br />Systems that <span>scale.</span></h1>
    <p className="hero-intro">I’m Anvesh. I build reliable data pipelines, cloud platforms, and practical AI applications that turn complex data into something useful.</p>
    <div className="hero-actions"><a className="button button-primary" href={`mailto:${contact.email}`}>Get in touch <Arrow /></a><a className="text-link" href="#projects">Explore my work <span aria-hidden="true">↘</span></a></div>
    <div className="hero-social"><ExternalLink href={contact.github}>GitHub</ExternalLink><span aria-hidden="true">/</span><ExternalLink href={contact.linkedin}>LinkedIn</ExternalLink><ExternalLink className="hero-resume" href={contact.resume}>View résumé <span className="sr-only">PDF</span></ExternalLink></div>
    </div><DotField /></div><div className="capability-strip"><p className="micro-label">MY TOOLKIT</p><ul aria-label="Core technologies">{toolkit.map(tool => <li key={tool}>{tool}</li>)}</ul><a className="toolkit-note" href="#skills" onClick={() => { document.getElementById('skills').open = true }}>View full toolkit ↗</a></div></section>
}

function Experience() {
  return <section id="experience" className="section experience-section" aria-labelledby="experience-title"><div className="container section-layout">
    <div className="section-heading"><p className="eyebrow section-index">01 / EXPERIENCE</p><h2 id="experience-title">Built in the<br />real world.</h2><p>Data engineering across advertising, financial services, and technology.</p><span className="section-hint"><span aria-hidden="true">+</span> Open a role for the details</span></div>
    <div className="experience-content"><div className="experience-list">{experience.map((job, index) => <details className="experience-card" key={job.company}>
      <summary><span className="role-number">0{index + 1}</span><span className="role-heading"><span className="company">{job.company}</span><span className="role-title">{job.role}{job.division && <> · {job.division}</>}</span></span><span className="role-period">{job.period}</span><span className="expand-icon" aria-hidden="true" /></summary>
      <div className="experience-body"><p>{job.summary}</p><ul className="impact-list">{job.impact.map(item => <li key={item}>{item}</li>)}</ul><ul className="tags" aria-label="Technologies used">{job.stack.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
    </details>)}</div>
    <details id="skills" className="background-details"><summary>Full technical toolkit <span aria-hidden="true">+</span></summary><div className="skills-grid">{skills.map(group => <div key={group.title}><h3>{group.title}</h3><ul className="tags">{group.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>)}</div></details>
    <div className="credentials-grid">
      <section id="education" className="credential-section" aria-labelledby="education-title"><p className="micro-label">ACADEMIC BACKGROUND</p><h2 id="education-title">Education</h2>{education.map(item => <article className="credential-entry" key={item.institution}><h3>{item.degree}</h3><p>{item.institution}</p><div className="credential-meta"><span>{item.period}</span>{item.status === 'In progress' && <span className="credential-badge">In progress</span>}</div></article>)}</section>
      <section id="certifications" className="credential-section" aria-labelledby="certifications-title"><p className="micro-label">CONTINUED LEARNING</p><h2 id="certifications-title">Certifications</h2>{certifications.map(item => <article className="credential-entry" key={item.name}><h3>{item.name}</h3><p>{item.issuer}</p><div className="credential-meta"><span>{item.year}</span><span className="credential-badge">{item.type}</span></div>{item.details && <p className="credential-detail">{item.details}</p>}</article>)}</section>
    </div></div></div></section>
}

function ProjectDialog({ project, onClose, trigger }) {
  const dialog = useRef(null), close = useRef(null)
  useEffect(() => {
    const element = dialog.current
    if (!project) return
    element.showModal(); document.body.classList.add('modal-open'); close.current?.focus()
    return () => { if (element.open) element.close(); document.body.classList.remove('modal-open'); trigger?.focus({ preventScroll: true }) }
  }, [project, trigger])
  return <dialog ref={dialog} id="image-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-caption" onClose={onClose} onClick={event => {
    const rect = dialog.current.getBoundingClientRect()
    if (event.target === dialog.current && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.current.close()
  }}><div className="dialog-header"><div><p className="micro-label">PROJECT PREVIEW</p><h2 id="dialog-title">{project?.title}</h2></div><button ref={close} id="close-dialog" type="button" aria-label="Close project preview" onClick={() => dialog.current.close()}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" /></svg></button></div><div className="dialog-image-wrap">{project && <img id="dialog-image" src={project.image} alt={project.imageAlt} />}</div><p id="dialog-caption">{project?.note}</p></dialog>
}

function Projects() {
  const [filter, setFilter] = useState('all'), [preview, setPreview] = useState(null)
  const visible = projects.filter(project => filter === 'all' || project.category === filter)
  const filters = [['all', 'All'], ['platforms', 'Data platforms'], ['ai', 'Applied AI'], ['ml', 'MLOps']]
  return <section id="projects" className="section projects-section container" aria-labelledby="projects-title">
    <div className="projects-heading"><div><p className="eyebrow section-index">02 / SELECTED PROJECTS</p><h2 id="projects-title">From idea to implementation.</h2><p>Four hands-on projects in data platforms, analytics, and applied AI.</p></div><ExternalLink className="text-link all-repos" href={`${contact.github}?tab=repositories`}>All repositories</ExternalLink></div>
    <div className="project-toolbar"><div className="filters" role="group" aria-label="Filter projects">{filters.map(([key, label]) => <button key={key} type="button" className={`filter ${filter === key ? 'active' : ''}`} data-filter={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}{key === 'all' && <span>04</span>}</button>)}</div><span className="project-helper">Click an image to take a closer look</span></div>
    <p id="filter-status" className="sr-only" aria-live="polite" aria-atomic="true">Showing {visible.length} {filter === 'all' ? '' : filters.find(([key]) => key === filter)[1]} project{visible.length === 1 ? '' : 's'}</p>
    <div className="project-grid">{projects.map((project, index) => <article className="project-card" data-category={project.category} hidden={filter !== 'all' && filter !== project.category} key={project.title}>
      <div className="project-top"><span className="project-number">0{index + 1}</span><span className="project-category">{project.label}</span><ExternalLink className="source-icon" href={project.href} label={`${project.title} source on GitHub`} /></div>
      <div className="project-main"><button className="project-preview" type="button" aria-label={`Enlarge ${project.title} preview`} onClick={event => setPreview({ project, trigger: event.currentTarget })}><img src={project.image} alt={project.imageAlt} width="192" height="120" loading="lazy" /><span className="zoom-label" aria-hidden="true"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" stroke="currentColor" strokeWidth="1.8" /></svg> View</span></button><div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p></div></div>
      <ul className="project-features">{project.proof.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="project-bottom"><ul className="tech-line" aria-label="Project technologies">{project.tech.map(tool => <li key={tool}>{tool}</li>)}</ul><a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title} code (opens in new tab)`}>Explore code <Arrow /></a></div>
    </article>)}</div><ProjectDialog project={preview?.project} trigger={preview?.trigger} onClose={() => setPreview(null)} /></section>
}

function Footer() {
  return <footer id="contact" className="site-footer"><div className="container"><div className="footer-main"><div><p className="eyebrow">LET’S BUILD SOMETHING USEFUL</p><h2>Your next data challenge,<br />my next conversation.</h2></div><div className="footer-contact"><a href={`mailto:${contact.email}`}>{contact.email}<Arrow /></a><span>Data engineering · Cloud platforms · Applied AI</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Anvesh Sai Vemuri</span><span className="footer-location">Jersey City, NJ</span><a href="#overview">Back to top <span aria-hidden="true">↑</span></a></div></div></footer>
}

export default function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><div className="reading-progress" aria-hidden="true" /><Navigation /><main id="main" tabIndex={-1}><Overview /><Experience /><Projects /></main><Footer /></>
}
