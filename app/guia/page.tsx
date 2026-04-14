"use client";
import { useState } from "react";
import Link from "next/link";

const guias: Record<string, { titulo: string; emoji: string; pasos: { titulo: string; descripcion: string; tip?: string }[] }> = {
  resico: {
    emoji: "⚡",
    titulo: "RESICO",
    pasos: [
      { titulo: "Entra al portal del SAT", descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y contraseña CIEC o e.firma.", tip: "Usa Chrome o Edge para evitar problemas de compatibilidad." },
      { titulo: "Ve a 'Declaraciones'", descripcion: "En el menú principal busca 'Declaraciones' → 'Presenta tu declaración' → 'RESICO'." },
      { titulo: "Selecciona el período", descripcion: "Elige el mes que vas a declarar. Recuerda que tienes hasta el día 17 de cada mes." },
      { titulo: "Verifica tus ingresos", descripcion: "El SAT precarga tus facturas emitidas. Revisa que el monto sea correcto." , tip: "Si hay diferencias, revisa tus CFDIs en el portal de facturación." },
      { titulo: "Confirma y envía", descripcion: "Revisa el ISR calculado automáticamente, acepta y da clic en 'Presentar declaración'." },
      { titulo: "Paga si hay cantidad a cargo", descripcion: "Si tienes impuesto a pagar, el SAT te genera una línea de captura para pagar en banco o en línea.", tip: "Puedes pagar en BBVA, Banamex, HSBC o por transferencia SPEI." },
    ],
  },
  honorarios: {
    emoji: "💼",
    titulo: "Honorarios / Act. Profesional",
    pasos: [
      { titulo: "Entra al portal del SAT", descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y contraseña CIEC o e.firma." },
      { titulo: "Ve a 'Declaraciones provisionales'", descripcion: "Menú → 'Declaraciones' → 'Pagos provisionales y definitivos' → 'ISR Actividad Empresarial y Profesional'." },
      { titulo: "Captura tus ingresos del mes", descripcion: "Escribe el total de ingresos cobrados en el mes (no facturados, sino cobrados).", tip: "Si usas una cuenta bancaria para cobros, suma todos los depósitos de clientes." },
      { titulo: "Captura tus deducciones", descripcion: "Agrega tus gastos deducibles: renta de oficina, equipo, internet, software, etc. Deben tener factura." },
      { titulo: "Calcula y presenta", descripcion: "El sistema calcula tu ISR. Revisa, acepta y presenta tu declaración." },
      { titulo: "Declara también el IVA", descripcion: "Adicionalmente debes presentar tu declaración de IVA mensual por separado en el mismo portal.", tip: "El IVA que cobras (16%) menos el IVA de tus gastos = lo que pagas." },
    ],
  },
  plataformas: {
    emoji: "🚗",
    titulo: "Plataformas Tecnológicas",
    pasos: [
      { titulo: "Descarga tu resumen de retenciones", descripcion: "Entra a la app de Uber/DiDi/Rappi → Ganancias → Descarga el resumen de retenciones del mes." },
      { titulo: "Entra al portal del SAT", descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y CIEC." },
      { titulo: "Ve a declaraciones de plataformas", descripcion: "Menú → 'Declaraciones' → 'Plataformas tecnológicas' → selecciona el mes." },
      { titulo: "Verifica las retenciones", descripcion: "El SAT ya tiene precargadas las retenciones que hizo la plataforma. Verifícalas contra tu resumen.", tip: "Si no coinciden, contacta primero a la plataforma para obtener el CFDI de retenciones." },
      { titulo: "Complementa si es necesario", descripcion: "Si tuviste ingresos de fuera de la plataforma, agrégalos manualmente." },
      { titulo: "Presenta y paga", descripcion: "Revisa el total, presenta la declaración y paga si hay diferencia a cargo." },
    ],
  },
  arrendamiento: {
    emoji: "🏠",
    titulo: "Arrendamiento",
    pasos: [
      { titulo: "Entra al portal del SAT", descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y CIEC o e.firma." },
      { titulo: "Ve a declaraciones de arrendamiento", descripcion: "Menú → 'Declaraciones' → 'Pagos provisionales' → 'Arrendamiento'." },
      { titulo: "Captura tus ingresos por renta", descripcion: "Escribe el total de rentas cobradas en el mes.", tip: "Incluye todas las propiedades que rentas." },
      { titulo: "Elige tu tipo de deducción", descripcion: "Opción A: Deducción ciega (35% automático, sin comprobantes). Opción B: Gastos reales (necesitas facturas de mantenimiento, predial, etc.)." },
      { titulo: "Revisa el ISR calculado", descripcion: "El sistema aplica la tasa del 10% sobre tu base gravable. Verifica que sea correcto." },
      { titulo: "Presenta y paga", descripcion: "Acepta, presenta tu declaración y paga antes del día 17 del mes siguiente.", tip: "Guarda siempre el acuse de presentación como comprobante." },
    ],
  },
};

export default function Guia() {
  const [regimen, setRegimen] = useState("resico");
  const [pasoActual, setPasoActual] = useState(0);

  const guia = guias[regimen];
  const paso = guia.pasos[pasoActual];
  const esUltimo = pasoActual === guia.pasos.length - 1;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center px-6 py-16">
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📋</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Guía paso a paso</h1>
          <p className="text-gray-400 text-sm mt-2">Sigue estos pasos en el portal del SAT</p>
        </div>

        {/* Selector régimen */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona tu régimen</label>
          <select
            value={regimen}
            onChange={(e) => { setRegimen(e.target.value); setPasoActual(0); }}
            className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
          >
            {Object.entries(guias).map(([k, v]) => (
              <option key={k} value={k}>{v.emoji} {v.titulo}</option>
            ))}
          </select>
        </div>

        {/* Progress */}
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Paso {pasoActual + 1} de {guia.pasos.length}</span>
          <span>{Math.round(((pasoActual + 1) / guia.pasos.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((pasoActual + 1) / guia.pasos.length) * 100}%` }}
          />
        </div>

        {/* Paso */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {pasoActual + 1}
            </span>
            <h2 className="text-xl font-extrabold text-gray-900">{paso.titulo}</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">{paso.descripcion}</p>
          {paso.tip && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3">
              <p className="text-yellow-700 text-sm">💡 <strong>Tip:</strong> {paso.tip}</p>
            </div>
          )}
        </div>

        {/* Botones navegación */}
        <div className="flex gap-3">
          {pasoActual > 0 && (
            <button
              onClick={() => setPasoActual(pasoActual - 1)}
              className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-full font-bold hover:border-gray-400 transition"
            >
              ← Anterior
            </button>
          )}
          {!esUltimo ? (
            <button
              onClick={() => setPasoActual(pasoActual + 1)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Siguiente →
            </button>
          ) : (
            <div className="flex-1 flex flex-col gap-3">
              <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 text-center">
                <p className="text-green-700 font-bold">🎉 ¡Declaración completada!</p>
                <p className="text-green-600 text-sm">Guarda tu acuse como comprobante.</p>
              </div>
              <Link
                href="/"
                className="text-center text-gray-400 text-sm hover:text-gray-600"
              >
                ← Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}