import { projects } from "../data/projects";

function Projects() {
  return (
    <section id="projects" className="border-t border-slate-800 bg-slate-900/40 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white">Projects</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-cyan-400/60"
            >
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>

              <p className="mt-3 text-slate-300">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-300">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  GitHub
                </a>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Live Demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;