function Contact() {
  return (
    <section id="contact" className="border-t border-slate-800 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white">Contact</h2>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          I am open to data engineering roles, cloud data platform work, and analytics engineering opportunities.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:anvesh.vemuri@publicis.com"
            className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Email Me
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
            href="www.linkedin.com/in/anveshvemuri"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;