"use client";
import { useState } from "react";
import Link from "next/link";

const guias: Record<string, {
  titulo: string;
  emoji: string;
  fechaLimite: string;
  pasos: { titulo: string; descripcion: string; tip?: string; alerta?: string }[];
}> = {
  resico: {
    emoji: "⚡",
    titulo: "RESICO",
    fechaLimite: "Día 17 de cada mes",
    pasos: [
      {
        titulo: "Entra al portal del SAT",
        descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y contraseña CIEC o e.firma.",
        tip: "Usa Chrome o Edge para evitar problemas de compatibilidad con el portal.",
      },
      {
        titulo: "Ve a Declaraciones → RESICO",
        descripcion: "En el menú principal: Declaraciones → Presenta tu declaración → Régimen Simplificado de Confianza (RESICO).",
      },
      {
        titulo: "Selecciona el período a declarar",
        descripcion: "Elige el mes que vas a declarar. Recuerda: tienes hasta el día 17 del mes siguiente para pagar sin recargos.",
        alerta: "Si declaras después del día 17 se generan recargos y multas automáticamente.",
      },
      {
        titulo: "Verifica tus ingresos precargados",
        descripcion: "El SAT carga automáticamente tus facturas (CFDI) emitidas. Revisa que el monto coincida con lo que cobraste.",
        tip: "Si hay diferencias, revisa tus facturas en el portal del SAT → Factura electrónica → Consultar CFDI emitidos.",
      },
      {
        titulo: "Revisa el ISR calculado",
        descripcion: "El SAT aplica automáticamente la tasa correspondiente (1% al 2.5%) según tus ingresos del mes. Verifica que sea correcto.",
      },
      {
        titulo: "Declara el IVA por separado",
        descripcion: "Además del ISR, debes presentar tu declaración de IVA mensual. El IVA que cobras (16%) menos el IVA de tus gastos = lo que pagas al SAT.",
        tip: "Ambas declaraciones (ISR e IVA) se presentan en el mismo portal pero son trámites separados.",
      },
      {
        titulo: "Presenta y paga",
        descripcion: "Revisa el resumen, acepta y da clic en 'Presentar declaración'. Si hay cantidad a pagar, el SAT genera una línea de captura.",
        tip: "Puedes pagar en BBVA, Banamex, HSBC o por transferencia SPEI con la línea de captura.",
      },
      {
        titulo: "Guarda tu acuse",
        descripcion: "Descarga y guarda el acuse de presentación. Es tu comprobante oficial de que cumpliste con tu obligación.",
        alerta: "Guarda todos tus acuses por al menos 5 años — el SAT puede auditarte en ese período.",
      },
    ],
  },
  honorarios: {
    emoji: "💼",
    titulo: "Honorarios / Actividades Profesionales",
    fechaLimite: "Día 17 de cada mes",
    pasos: [
      {
        titulo: "Entra al portal del SAT",
        descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y CIEC o e.firma.",
        tip: "Usa Chrome o Edge para mejor compatibilidad.",
      },
      {
        titulo: "Ve a Declaraciones provisionales de ISR",
        descripcion: "Menú → Declaraciones → Pagos provisionales y definitivos → ISR Actividades Empresariales y Profesionales.",
      },
      {
        titulo: "Captura tus ingresos del mes",
        descripcion: "Escribe el total de ingresos efectivamente cobrados en el mes (no facturados, sino lo que realmente recibiste en tu cuenta).",
        tip: "Incluye solo lo que ya cobraste, aunque hayas facturado más.",
      },
      {
        titulo: "Captura tus deducciones",
        descripcion: "Agrega tus gastos deducibles del mes: renta de oficina, equipo de cómputo, internet, software, papelería, etc. Todos deben tener factura.",
        tip: "Entre más gastos deducibles con factura, menos ISR pagas.",
      },
      {
        titulo: "Revisa el ISR calculado",
        descripcion: "El sistema aplica la tarifa progresiva (1.92% al 35%) sobre tu utilidad (ingresos menos deducciones). Verifica el resultado.",
        alerta: "Si tu cliente empresa ya te retuvo 10% de ISR, ese monto se resta del total a pagar.",
      },
      {
        titulo: "Presenta tu declaración de IVA",
        descripcion: "Adicionalmente presenta la declaración de IVA mensual. IVA cobrado (16%) menos IVA de tus gastos = diferencia a pagar.",
        tip: "También debes presentar la DIOT (relación de proveedores) antes del día 17.",
      },
      {
        titulo: "Paga si hay saldo a cargo",
        descripcion: "Si hay cantidad a pagar, el SAT genera una línea de captura. Paga en banco o por SPEI antes del día 17.",
      },
      {
        titulo: "Guarda tu acuse",
        descripcion: "Descarga el acuse de presentación de ISR e IVA. Guárdalos por mínimo 5 años.",
        alerta: "Si no presentas la DIOT también puedes recibir multas aunque hayas pagado ISR e IVA.",
      },
    ],
  },
  plataformas: {
    emoji: "🚗",
    titulo: "Plataformas Tecnológicas",
    fechaLimite: "Día 17 de cada mes",
    pasos: [
      {
        titulo: "Descarga tu resumen de retenciones",
        descripcion: "En la app de Uber, DiDi o Rappi ve a Ganancias → Resumen fiscal o Estado de cuenta. Descarga el resumen del mes.",
        tip: "Guarda estos documentos cada mes — son tu evidencia de lo que la plataforma pagó al SAT por ti.",
      },
      {
        titulo: "Verifica tu RFC en la plataforma",
        descripcion: "Asegúrate de tener tu RFC registrado correctamente en la app. Sin RFC registrado, la plataforma retiene 20% de ISR en lugar del 2.1%.",
        alerta: "Esta diferencia puede representar miles de pesos al mes. Registra tu RFC cuanto antes.",
      },
      {
        titulo: "Entra al portal del SAT",
        descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y CIEC.",
      },
      {
        titulo: "Ve a Declaraciones de Plataformas Tecnológicas",
        descripcion: "Menú → Declaraciones → Plataformas Tecnológicas → selecciona el mes a declarar.",
      },
      {
        titulo: "Verifica las retenciones precargadas",
        descripcion: "El SAT ya tiene las retenciones que hizo la plataforma. Verifica contra tu resumen descargado que los montos coincidan.",
        tip: "Si no coinciden, contacta primero a la plataforma para obtener el CFDI de retenciones oficial.",
      },
      {
        titulo: "Agrega ingresos fuera de plataforma (si aplica)",
        descripcion: "Si también cobraste por fuera de la app (efectivo, transferencias directas), agrégalos manualmente.",
      },
      {
        titulo: "Elige pago definitivo si calificas",
        descripcion: "Si tus ingresos anuales no superan $300,000 MXN (incluyendo salarios e intereses), puedes optar porque las retenciones sean pago definitivo — sin más trámites.",
        tip: "Esta opción te simplifica mucho la vida. Actívala en el portal si calificas.",
      },
      {
        titulo: "Presenta y guarda tu acuse",
        descripcion: "Presenta la declaración y descarga el acuse. Guárdalo junto con el resumen de la plataforma.",
      },
    ],
  },
  arrendamiento: {
    emoji: "🏠",
    titulo: "Arrendamiento",
    fechaLimite: "Día 17 de cada mes",
    pasos: [
      {
        titulo: "Identifica tu tipo de arrendamiento",
        descripcion: "Primero determina si tu propiedad es: (A) Casa o depto sin amueblar = exento de IVA. (B) Amueblado o local comercial = sí causa IVA del 16%.",
        alerta: "Esta distinción es importante — si rentas amueblado y no cobras IVA puedes recibir multas del SAT.",
      },
      {
        titulo: "Entra al portal del SAT",
        descripcion: "Ve a sat.gob.mx e inicia sesión con tu RFC y CIEC o e.firma.",
        tip: "Usa Chrome o Edge para mejor compatibilidad.",
      },
      {
        titulo: "Ve a Declaraciones de Arrendamiento",
        descripcion: "Menú → Declaraciones → Pagos provisionales → Arrendamiento.",
      },
      {
        titulo: "Captura tus ingresos por renta",
        descripcion: "Escribe el total de rentas cobradas en el mes. Si tienes varias propiedades, suma todas.",
      },
      {
        titulo: "Elige tu tipo de deducción",
        descripcion: "Opción A — Deducción ciega: el SAT aplica 35% automático sin necesitar comprobantes. Opción B — Gastos reales: deduces mantenimiento, predial, intereses hipotecarios, etc. con facturas.",
        tip: "La deducción ciega es más simple. Los gastos reales convienen solo si tus gastos superan el 35% de tus ingresos.",
      },
      {
        titulo: "Revisa el ISR calculado",
        descripcion: "El sistema aplica 10% sobre la base gravable (ingresos menos deducción). Verifica que el monto sea correcto.",
      },
      {
        titulo: "Declara IVA si aplica",
        descripcion: "Si rentas amueblado o local comercial, presenta también tu declaración de IVA mensual (16% sobre el monto de la renta).",
        alerta: "Arrendamiento habitacional sin amueblar está exento de IVA — no lo declares en ese caso.",
      },
      {
        titulo: "Presenta y paga",
        descripcion: "Revisa el resumen, presenta la declaración y paga con la línea de captura que genera el SAT.",
        tip: "Puedes pagar en cualquier banco o por SPEI. Guarda siempre el comprobante de pago y el acuse.",
      },
    ],
  },
};

export default function Guia() {
  const [regimen, setRegimen] = useState("resico");
  const [pasoActual, setPasoActual] = useState(0);

  const guia = guias[regimen];
  const paso = guia.pasos[pasoActual];
  const esUltimo = pasoActual === guia.pasos.length - 1;

  const cambiarRegimen = (nuevoRegimen: string) => {
    setRegimen(nuevoRegimen);
    setPasoActual(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center px-6 py-16">
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📋</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Guía paso a paso</h1>
          <p className="text-gray-400 text-sm mt-2">Sigue estos pasos exactos en el portal del SAT</p>
        </div>

        {/* Selector régimen */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona tu régimen</label>
          <select
            value={regimen}
            onChange={(e) => cambiarRegimen(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
          >
            {Object.entries(guias).map(([k, v]) => (
              <option key={k} value={k}>{v.emoji} {v.titulo}</option>
            ))}
          </select>
        </div>

        {/* Fecha límite */}
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-6 flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <div>
            <p className="text-red-700 font-bold text-sm">Fecha límite de pago</p>
            <p className="text-red-600 text-sm">{guia.fechaLimite} — después generan recargos automáticos</p>
          </div>
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

        {/* Paso actual */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              {pasoActual + 1}
            </span>
            <h2 className="text-xl font-extrabold text-gray-900">{paso.titulo}</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">{paso.descripcion}</p>
          {paso.tip && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 mb-3">
              <p className="text-yellow-700 text-sm">💡 <strong>Tip:</strong> {paso.tip}</p>
            </div>
          )}
          {paso.alerta && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
              <p className="text-red-700 text-sm">⚠️ <strong>Importante:</strong> {paso.alerta}</p>
            </div>
          )}
        </div>

        {/* Navegación */}
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
              <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-4 text-center">
                <p className="text-green-700 font-bold text-lg">🎉 ¡Listo!</p>
                <p className="text-green-600 text-sm mt-1">Guarda tu acuse como comprobante oficial.</p>
              </div>
              <Link href="/calculadora" className="text-center bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Calcular mis impuestos →
              </Link>
              <Link href="/" className="text-center text-gray-400 text-sm hover:text-gray-600">
                ← Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}