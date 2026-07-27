import { skills } from "../data/skills";

function Skills() {
  return (
    <section id="skills" className="border-t border-slate-800 bg-slate-900/40 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-white">Skills</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
            >
              <h3 className="text-xl font-semibold text-cyan-300">{group.category}</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;