export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-4xl">🇲🇽</span>
          <span className="font-bold text-3xl text-white">SAT Guía</span>
        </div>

        {/* Badge */}
        <span className="bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-8 inline-block">
          🚀 Próximamente
        </span>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Haz tu declaración del SAT tú mismo, sin estrés
        </h1>

        <p className="text-blue-100 text-lg mb-10">
          Estamos trabajando en algo increíble. Pronto podrás hacer tu declaración fiscal sin contadores ni complicaciones.
        </p>

        {/* Email capture */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <p className="text-gray-700 font-bold text-lg mb-2">
            ¿Quieres ser el primero en enterarte?
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Déjanos tu correo y te avisamos cuando lancemos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="tucorreo@email.com"
              className="flex-1 border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition whitespace-nowrap">
              Avisarme →
            </button>
          </div>
          <p className="text-gray-300 text-xs mt-4">
            Sin spam. Solo te escribimos cuando lancemos.
          </p>
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { emoji: "🎯", texto: "Detecta tu régimen" },
            { emoji: "🧮", texto: "Calcula tus impuestos" },
            { emoji: "📋", texto: "Guía paso a paso" },
          ].map((f) => (
            <div key={f.texto} className="bg-white/10 rounded-2xl p-4 text-white">
              <div className="text-2xl mb-2">{f.emoji}</div>
              <p className="text-xs font-semibold">{f.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}