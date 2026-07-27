function About() {
  return (
    <section id="about" className="border-t border-slate-800 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white">About Me</h2>

        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
          I am a Data Engineer focused on building reliable data pipelines, cloud-based analytics
          workflows, and business reporting systems. My work includes SQL optimization, ETL/ELT
          development, Databricks workflows, AWS-based data processing, and automation for marketing
          and media analytics.
        </p>

        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
          I am also building AI-powered portfolio projects that combine data engineering, analytics,
          and modern application development.
        </p>
      </div>
    </section>
  );
}

export default About;