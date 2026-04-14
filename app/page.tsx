import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-blue-100 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇲🇽</span>
          <span className="font-bold text-xl text-blue-700">SAT Guía</span>
        </div>
        <Link
          href="/quiz"
          className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
        >
          Empezar gratis
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
          100% gratis · Sin registro
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 max-w-2xl leading-tight mb-6">
          Haz tu declaración del SAT{" "}
          <span className="text-blue-600">tú mismo</span>, sin estrés
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mb-10">
          Te guiamos paso a paso según tu régimen fiscal: RESICO, Honorarios,
          Plataformas tecnológicas y más. Sin contadores, sin complicaciones.
        </p>
        <Link
          href="/quiz"
          className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg"
        >
          ¿Cuál es mi régimen? →
        </Link>
        <p className="text-sm text-gray-400 mt-4">
          Tarda menos de 2 minutos
        </p>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6 pb-20">
        {[
          {
            icon: "🎯",
            title: "Detecta tu régimen",
            desc: "Responde 5 preguntas y te decimos exactamente en qué régimen estás.",
          },
          {
            icon: "🧮",
            title: "Calcula tus impuestos",
            desc: "Ingresa tus ingresos y ve cuánto pagas de ISR e IVA antes de entrar al SAT.",
          },
          {
            icon: "📋",
            title: "Guía paso a paso",
            desc: "Te decimos exactamente qué hacer en el portal del SAT, pantalla por pantalla.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm pb-8">
        SAT Guía no almacena tus datos ni accede a tu RFC. Tú tienes el control.
      </footer>
    </main>
  );
}