import Reveal from "./Reveal";

const STEPS = [
  { step: "01", title: "Driver Requests", desc: "Driver opens the app, selects the service they need, and shares their location and vehicle details." },
  { step: "02", title: "Skill Expert Notified", desc: "The nearest contracted skill expert receives an instant notification and accepts the job." },
  { step: "03", title: "Expert Arrives", desc: "Expert is en route within 20 minutes, GPS-tracked, with job status updated in real time." },
  { step: "04", title: "Done & Paid", desc: "Service completed. Driver pays via M-PESA. Skill expert receives 80% within 24 hours — the loop continues." },
];

export default function SiteProcess() {
  return (
    <section id="process" className="bg-[#F6F8FC] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <span className="text-[#2563EB] font-bold text-sm uppercase tracking-[0.2em]">How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 text-[#0D1B2A] tracking-tight leading-tight">
            Simple by design.
          </h2>
          <p className="text-gray-500 text-lg mt-5 leading-relaxed">
            Driver requests help, a verified skill expert responds — and every job feeds back into the community and the loop.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="h-full bg-white rounded-3xl p-7 border border-gray-100 shadow-sm relative">
                <p className="text-6xl font-black text-[#2563EB]/10 leading-none mb-3">{s.step}</p>
                <h3 className="font-black text-lg text-[#0D1B2A] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}