"use client";
import { useState } from "react";
import Link from "next/link";

const preguntas = [
  {
    id: 1,
    pregunta: "¿Cómo generas tus ingresos principalmente?",
    opciones: [
      { texto: "Doy servicios profesionales (diseño, consultoría, desarrollo, etc.)", valor: "honorarios" },
      { texto: "Vendo productos o tengo un negocio pequeño", valor: "resico" },
      { texto: "Trabajo en Uber, DiDi, Rappi u otra plataforma", valor: "plataformas" },
      { texto: "Rento una propiedad", valor: "arrendamiento" },
    ],
  },
  {
    id: 2,
    pregunta: "¿Cuánto ganas aproximadamente al año?",
    opciones: [
      { texto: "Menos de $900,000 MXN", valor: "bajo" },
      { texto: "Entre $900,000 y $3,500,000 MXN", valor: "medio" },
      { texto: "Más de $3,500,000 MXN", valor: "alto" },
    ],
  },
  {
    id: 3,
    pregunta: "¿Emites facturas (CFDI) a tus clientes?",
    opciones: [
      { texto: "Sí, siempre", valor: "si" },
      { texto: "A veces", valor: "aveces" },
      { texto: "No, nunca", valor: "no" },
    ],
  },
  {
    id: 4,
    pregunta: "¿Tienes empleados a tu cargo?",
    opciones: [
      { texto: "Sí", valor: "si" },
      { texto: "No, trabajo solo", valor: "no" },
    ],
  },
  {
    id: 5,
    pregunta: "¿Cómo describes mejor tu situación?",
    opciones: [
      { texto: "Soy freelancer o independiente", valor: "freelancer" },
      { texto: "Tengo mi propio negocio o empresa", valor: "negocio" },
      { texto: "Tengo empleo formal Y además ingresos extra", valor: "mixto" },
    ],
  },
];

const calcularRegimen = (respuestas: string[]) => {
  if (respuestas[0] === "plataformas") return "plataformas";
  if (respuestas[0] === "arrendamiento") return "arrendamiento";
  if (respuestas[1] === "alto") return "general";
  if (respuestas[0] === "honorarios" || respuestas[4] === "freelancer") return "honorarios";
  return "resico";
};

const resultados: Record<string, { titulo: string; descripcion: string; color: string; emoji: string }> = {
  resico: {
    emoji: "⚡",
    titulo: "RESICO — Régimen Simplificado de Confianza",
    descripcion: "Perfecto para ti. Pagas entre 1% y 2.5% de ISR sobre tus ingresos. Es el régimen más sencillo y con menor carga fiscal para pequeños negocios.",
    color: "blue",
  },
  honorarios: {
    emoji: "💼",
    titulo: "Actividades Profesionales (Honorarios)",
    descripcion: "Eres un profesionista independiente. Pagas ISR mensual con base en tus ingresos menos gastos, más IVA del 16% que trasladas a tus clientes.",
    color: "purple",
  },
  plataformas: {
    emoji: "🚗",
    titulo: "Plataformas Tecnológicas",
    descripcion: "Uber, DiDi, Rappi, Airbnb, etc. La plataforma ya te retiene parte del ISR e IVA. Solo debes complementar y declarar mensualmente.",
    color: "orange",
  },
  arrendamiento: {
    emoji: "🏠",
    titulo: "Régimen de Arrendamiento",
    descripcion: "Rentas una propiedad. Puedes deducir el 35% de tus ingresos de forma ciega, o tus gastos reales. Declaras mensualmente.",
    color: "green",
  },
  general: {
    emoji: "🏢",
    titulo: "Régimen General de Actividad Empresarial",
    descripcion: "Tus ingresos superan el límite de RESICO. Necesitas llevar contabilidad formal. Te recomendamos asesoría de un contador.",
    color: "red",
  },
};

export default function Quiz() {
  const [actual, setActual] = useState(0);
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<string | null>(null);

  const responder = (valor: string) => {
    const nuevas = [...respuestas, valor];
    setRespuestas(nuevas);
    if (actual + 1 < preguntas.length) {
      setActual(actual + 1);
    } else {
      setResultado(calcularRegimen(nuevas));
    }
  };

  const reiniciar = () => {
    setActual(0);
    setRespuestas([]);
    setResultado(null);
  };

  if (resultado) {
    const r = resultados[resultado];
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-xl w-full text-center">
          <div className="text-6xl mb-4">{r.emoji}</div>
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">Tu régimen fiscal es</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{r.titulo}</h2>
          <p className="text-gray-500 mb-8">{r.descripcion}</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/calculadora"
              className="bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Calcular mis impuestos →
            </Link>
            <button
              onClick={reiniciar}
              className="text-gray-400 text-sm hover:text-gray-600 transition"
            >
              Volver a responder
            </button>
          </div>
        </div>
      </main>
    );
  }

  const pregunta = preguntas[actual];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 py-16">
      {/* Progress */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Pregunta {actual + 1} de {preguntas.length}</span>
          <span>{Math.round(((actual) / preguntas.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(actual / preguntas.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-xl w-full">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
          {pregunta.pregunta}
        </h2>
        <div className="flex flex-col gap-3">
          {pregunta.opciones.map((op) => (
            <button
              key={op.valor}
              onClick={() => responder(op.valor)}
              className="text-left border-2 border-gray-100 rounded-2xl px-6 py-4 text-gray-700 font-medium hover:border-blue-400 hover:bg-blue-50 transition"
            >
              {op.texto}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}