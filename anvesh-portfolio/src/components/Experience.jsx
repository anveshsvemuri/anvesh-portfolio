import { experience } from "../data/experience";

function Experience() {
  return (
    <section id="experience" className="border-t border-slate-800 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white">Experience</h2>

        <div className="mt-10 space-y-6">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.role}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            >
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                  <p className="text-cyan-300">{job.company}</p>
                </div>

                <div className="text-sm text-slate-400 md:text-right">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
              </div>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;