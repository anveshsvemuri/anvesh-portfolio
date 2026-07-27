function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 md:py-32">
      <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
        Data Engineer | AWS | Databricks | SQL | Python | AI Applications
      </div>

      <div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          Building scalable data pipelines, analytics platforms, and AI-powered data applications.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          I am a Data Engineer with experience building ETL pipelines, cloud data workflows,
          SQL-based analytics systems, and automation solutions across marketing, media, and financial data.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          View Projects
        </a>

        <a
          href="https://github.com/anveshsvemuri"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Hero;