"use client";
import { useState } from "react";
import Link from "next/link";

const preguntas = [
  {
    id: 1,
    pregunta: "¿Cómo generas tus ingresos principalmente?",
    opciones: [
      { texto: "Doy servicios profesionales independientes (diseño, consultoría, desarrollo, medicina, derecho, etc.)", valor: "honorarios" },
      { texto: "Vendo productos o tengo un pequeño negocio", valor: "resico_negocio" },
      { texto: "Trabajo en Uber, DiDi, Rappi, Airbnb u otra plataforma digital", valor: "plataformas" },
      { texto: "Rento una propiedad (casa, departamento o local)", valor: "arrendamiento" },
    ],
  },
  {
    id: 2,
    pregunta: "¿Cuánto ganas aproximadamente al año?",
    opciones: [
      { texto: "Menos de $3,500,000 MXN al año (~$291,000/mes)", valor: "bajo" },
      { texto: "Más de $3,500,000 MXN al año", valor: "alto" },
    ],
  },
  {
    id: 3,
    pregunta: "¿Eres socio o accionista de alguna empresa (persona moral)?",
    opciones: [
      { texto: "Sí, soy socio o accionista de una empresa", valor: "si" },
      { texto: "No, trabajo de forma independiente", valor: "no" },
    ],
  },
  {
    id: 4,
    pregunta: "¿Emites facturas (CFDI) a tus clientes?",
    opciones: [
      { texto: "Sí, siempre facturo", valor: "si" },
      { texto: "A veces o apenas voy a empezar", valor: "aveces" },
      { texto: "No, nunca he facturado", valor: "no" },
    ],
  },
  {
    id: 5,
    pregunta: "¿Tienes empleo formal además de tus ingresos independientes?",
    opciones: [
      { texto: "Sí, tengo empleo y además ingresos extra", valor: "mixto" },
      { texto: "No, solo vivo de mis ingresos independientes", valor: "independiente" },
    ],
  },
];

const calcularRegimen = (respuestas: string[]) => {
  if (respuestas[0] === "plataformas") return "plataformas";
  if (respuestas[0] === "arrendamiento") return "arrendamiento";
  if (respuestas[1] === "alto") return "general";
  if (respuestas[2] === "si") return "general"; // socios no pueden entrar a RESICO
  if (respuestas[0] === "honorarios") return "honorarios";
  return "resico";
};

const resultados: Record<string, {
  titulo: string;
  descripcion: string;
  emoji: string;
  obligaciones: string[];
  alerta?: string;
}> = {
  resico: {
    emoji: "⚡",
    titulo: "RESICO — Régimen Simplificado de Confianza",
    descripcion: "Perfecto para ti. Pagas entre 1% y 2.5% de ISR sobre tus ingresos mensuales facturados. Sin deducciones complejas, sin contabilidad complicada.",
    obligaciones: [
      "Declaración mensual de ISR antes del día 17 de cada mes",
      "Declaración mensual de IVA (16% cobrado menos IVA de tus gastos)",
      "Emitir facturas CFDI 4.0 por todos tus ingresos",
      "Declaración anual en abril del año siguiente",
    ],
    alerta: "Solo aplica si tus ingresos anuales no superan $3,500,000 MXN y no eres socio/accionista de una empresa.",
  },
  honorarios: {
    emoji: "💼",
    titulo: "Actividades Profesionales (Honorarios)",
    descripcion: "Eres un profesionista independiente. Pagas ISR mensual con base en tus ingresos menos gastos deducibles, más IVA del 16% que trasladas a tus clientes.",
    obligaciones: [
      "Pago provisional de ISR antes del día 17 de cada mes",
      "Declaración de IVA mensual antes del día 17",
      "DIOT mensual (relación de proveedores)",
      "Emitir CFDI 4.0 por cada servicio",
      "Declaración anual en abril",
    ],
    alerta: "Si tu cliente es empresa (persona moral), te retiene 10% de ISR y 10.67% de IVA directo en la factura.",
  },
  plataformas: {
    emoji: "🚗",
    titulo: "Plataformas Tecnológicas",
    descripcion: "Uber, DiDi, Rappi, Airbnb, Mercado Libre, etc. La plataforma ya te retiene parte del ISR e IVA y lo entrega directamente al SAT.",
    obligaciones: [
      "La plataforma retiene 2.1% de ISR (transporte/entrega) o 4% (hospedaje)",
      "La plataforma retiene 8% de IVA",
      "Declaración mensual complementaria si tuviste ingresos fuera de la plataforma",
      "Si ganas menos de $300,000/año puedes considerar las retenciones como pago definitivo",
    ],
    alerta: "Si no tienes RFC registrado ante la plataforma, te retienen 20% de ISR automáticamente.",
  },
  arrendamiento: {
    emoji: "🏠",
    titulo: "Régimen de Arrendamiento",
    descripcion: "Rentas una propiedad. Puedes deducir el 35% de tus ingresos de forma automática (deducción ciega) sin necesitar comprobantes.",
    obligaciones: [
      "Pago provisional de ISR antes del día 17 de cada mes",
      "ISR = 10% sobre ingresos después de deducción ciega del 35%",
      "IVA del 16% solo si rentas local comercial o propiedad amueblada",
      "Arrendamiento habitacional sin amueblar: exento de IVA",
      "Declaración anual en abril",
    ],
    alerta: "Si rentas amueblado o es local comercial, SÍ debes cobrar y declarar IVA del 16%.",
  },
  general: {
    emoji: "🏢",
    titulo: "Régimen General de Actividad Empresarial y Profesional",
    descripcion: "Tu situación requiere el régimen general: ya sea porque tus ingresos superan $3.5M al año, eres socio de una empresa, o tu actividad no encaja en regímenes simplificados.",
    obligaciones: [
      "Contabilidad electrónica completa",
      "Pagos provisionales de ISR mensuales",
      "Declaración de IVA mensual y DIOT",
      "Declaración anual obligatoria con deducciones reales",
    ],
    alerta: "Te recomendamos asesoría con un contador para este régimen, ya que tiene mayor complejidad administrativa.",
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
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-xl w-full">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{r.emoji}</div>
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">Tu régimen fiscal es</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{r.titulo}</h2>
            <p className="text-gray-500 text-sm">{r.descripcion}</p>
          </div>

          {/* Obligaciones */}
          <div className="bg-blue-50 rounded-2xl p-5 mb-4">
            <p className="text-sm font-bold text-blue-700 mb-3">📋 Tus obligaciones fiscales:</p>
            <ul className="space-y-2">
              {r.obligaciones.map((ob, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>{ob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alerta */}
          {r.alerta && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 mb-6">
              <p className="text-yellow-700 text-sm">⚠️ {r.alerta}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link
              href="/calculadora"
              className="text-center bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Calcular mis impuestos →
            </Link>
            <Link
              href="/guia"
              className="text-center bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-700 transition"
            >
              Ver guía paso a paso →
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
      <div className="w-full max-w-xl mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Pregunta {actual + 1} de {preguntas.length}</span>
          <span>{Math.round((actual / preguntas.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(actual / preguntas.length) * 100}%` }}
          />
        </div>
      </div>

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