"use client";
import { useState } from "react";
import Link from "next/link";

const regimenes = [
  { valor: "resico", label: "⚡ RESICO" },
  { valor: "honorarios", label: "💼 Honorarios / Act. Profesional" },
  { valor: "plataformas_transporte", label: "🚗 Plataformas — Transporte/Entrega (Uber, DiDi, Rappi)" },
  { valor: "plataformas_hospedaje", label: "🏨 Plataformas — Hospedaje (Airbnb, Booking)" },
  { valor: "plataformas_ventas", label: "📦 Plataformas — Venta de bienes (Mercado Libre, Amazon)" },
  { valor: "arrendamiento_habitacional", label: "🏠 Arrendamiento — Casa/Depto sin amueblar" },
  { valor: "arrendamiento_amueblado", label: "🛋️ Arrendamiento — Amueblado o local comercial" },
];

const tasaResico = (ingresos: number) =>
  ingresos <= 25000 ? 0.01 :
  ingresos <= 50000 ? 0.011 :
  ingresos <= 83333 ? 0.015 :
  ingresos <= 208333 ? 0.02 : 0.025;

const calcular = (regimen: string, ingresos: number) => {
  switch (regimen) {
    case "resico": {
      const tasa = tasaResico(ingresos);
      const isr = ingresos * tasa;
      return {
        filas: [
          { label: `ISR RESICO (${(tasa * 100).toFixed(1)}%)`, monto: isr, color: "blue" },
        ],
        total: isr,
        notas: [
          "✅ El IVA del 16% lo cobras a tu cliente y lo declaras aparte — no es un costo directo tuyo.",
          "📅 Paga antes del día 17 del mes siguiente en el portal del SAT.",
          "⚠️ Aplica solo si tus ingresos anuales no superan $3,500,000 MXN.",
        ],
      };
    }
    case "honorarios": {
      const isrEstimado = ingresos * 0.2;
      const ivaTraslado = ingresos * 0.16;
      const ivaACargo = ivaTraslado * 0.33;
      return {
        filas: [
          { label: "ISR estimado ~20% (varía con deducciones)", monto: isrEstimado, color: "blue" },
          { label: "IVA estimado a cargo (~33% del IVA cobrado)", monto: ivaACargo, color: "purple" },
          { label: "IVA que cobras a tu cliente (16%)", monto: ivaTraslado, color: "gray" },
        ],
        total: isrEstimado + ivaACargo,
        notas: [
          "💼 Puedes reducir el ISR deduciendo gastos reales con factura (renta, equipo, internet, etc.).",
          "🏢 Si tu cliente es empresa, te retiene 10% ISR y 10.67% IVA directo en la factura.",
          "📅 Declara ISR e IVA antes del día 17 de cada mes.",
        ],
      };
    }
    case "plataformas_transporte": {
      const isrRetenido = ingresos * 0.021;
      const ivaRetenido = ingresos * 0.08;
      return {
        filas: [
          { label: "ISR retenido por la plataforma (2.1%)", monto: isrRetenido, color: "blue" },
          { label: "IVA retenido por la plataforma (8%)", monto: ivaRetenido, color: "orange" },
        ],
        total: isrRetenido + ivaRetenido,
        notas: [
          "🚗 Uber, DiDi y Rappi retienen estos impuestos automáticamente y los pagan al SAT.",
          "✅ Si ganas menos de $300,000/año puedes usar las retenciones como pago definitivo.",
          "⚠️ Sin RFC registrado en la plataforma te retienen 20% de ISR.",
          "📅 Aun así debes presentar declaración mensual informativa.",
        ],
      };
    }
    case "plataformas_hospedaje": {
      const isrRetenido = ingresos * 0.04;
      const ivaRetenido = ingresos * 0.08;
      return {
        filas: [
          { label: "ISR retenido por la plataforma (4%)", monto: isrRetenido, color: "blue" },
          { label: "IVA retenido por la plataforma (8%)", monto: ivaRetenido, color: "orange" },
        ],
        total: isrRetenido + ivaRetenido,
        notas: [
          "🏨 Airbnb y Booking retienen estos impuestos y los entregan al SAT.",
          "✅ Si ganas menos de $300,000/año puedes usar las retenciones como pago definitivo.",
          "⚠️ Sin RFC registrado te retienen 20% de ISR.",
        ],
      };
    }
    case "plataformas_ventas": {
      const isrRetenido = ingresos * 0.025;
      const ivaRetenido = ingresos * 0.08;
      return {
        filas: [
          { label: "ISR retenido por la plataforma (2.5%)", monto: isrRetenido, color: "blue" },
          { label: "IVA retenido por la plataforma (8%)", monto: ivaRetenido, color: "orange" },
        ],
        total: isrRetenido + ivaRetenido,
        notas: [
          "📦 Tasa actualizada 2026: subió de 1% a 2.5% para venta de bienes.",
          "✅ Aplica para Mercado Libre, Amazon y similares.",
          "⚠️ Sin RFC registrado te retienen 20% de ISR.",
        ],
      };
    }
    case "arrendamiento_habitacional": {
      const deduccion = ingresos * 0.35;
      const base = ingresos - deduccion;
      const isr = base * 0.1;
      return {
        filas: [
          { label: "Deducción ciega automática (35%)", monto: deduccion, color: "green" },
          { label: "ISR (10% sobre base gravable)", monto: isr, color: "blue" },
        ],
        total: isr,
        notas: [
          "🏠 Arrendamiento habitacional sin amueblar: exento de IVA.",
          "✅ Deducción ciega del 35% sin necesitar comprobantes.",
          "📅 Declara antes del día 17 de cada mes.",
        ],
      };
    }
    case "arrendamiento_amueblado": {
      const deduccion = ingresos * 0.35;
      const base = ingresos - deduccion;
      const isr = base * 0.1;
      const iva = ingresos * 0.16;
      return {
        filas: [
          { label: "Deducción ciega automática (35%)", monto: deduccion, color: "green" },
          { label: "ISR (10% sobre base gravable)", monto: isr, color: "blue" },
          { label: "IVA que cobras al inquilino (16%)", monto: iva, color: "purple" },
        ],
        total: isr + iva,
        notas: [
          "🛋️ Amueblado o local comercial SÍ causa IVA del 16%.",
          "💡 El IVA lo cobras al inquilino — no es un gasto tuyo directo.",
          "📅 Declara ISR e IVA antes del día 17 de cada mes.",
        ],
      };
    }
    default:
      return { filas: [], total: 0, notas: [] };
  }
};

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

const colorClasses: Record<string, string> = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  green: "text-green-600",
  gray: "text-gray-400",
};

export default function Calculadora() {
  const [regimen, setRegimen] = useState("resico");
  const [ingresos, setIngresos] = useState("");
  const [resultado, setResultado] = useState<null | ReturnType<typeof calcular>>(null);

  const handleCalcular = () => {
    const monto = parseFloat(ingresos.replace(/,/g, ""));
    if (!monto || monto <= 0) return;
    setResultado(calcular(regimen, monto));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 py-16">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧮</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Calculadora de impuestos</h1>
          <p className="text-gray-400 text-sm mt-2">Estimación aproximada — los montos exactos los calcula el SAT</p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tu régimen fiscal</label>
          <select
            value={regimen}
            onChange={(e) => { setRegimen(e.target.value); setResultado(null); }}
            className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
          >
            {regimenes.map((r) => (
              <option key={r.valor} value={r.valor}>{r.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ingresos del mes (MXN, sin IVA)
          </label>
          <input
            type="number"
            placeholder="Ej: 30000"
            value={ingresos}
            onChange={(e) => { setIngresos(e.target.value); setResultado(null); }}
            className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          onClick={handleCalcular}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition mb-6"
        >
          Calcular →
        </button>

        {resultado && (
          <div className="bg-blue-50 rounded-2xl p-6 space-y-3 mb-6">
            {resultado.filas.map((f, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{f.label}</span>
                <span className={`font-bold ${colorClasses[f.color]}`}>{fmt(f.monto)}</span>
              </div>
            ))}
            <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
              <span className="text-gray-800 font-bold">Total estimado a pagar</span>
              <span className="text-blue-600 font-extrabold text-2xl">{fmt(resultado.total)}</span>
            </div>
            <div className="pt-2 space-y-1">
              {resultado.notas.map((n, i) => (
                <p key={i} className="text-xs text-gray-500">{n}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/guia" className="text-center bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-700 transition">
            Ver guía paso a paso →
          </Link>
          <Link href="/quiz" className="text-center text-gray-400 text-sm hover:text-gray-600">
            ← Volver al quiz
          </Link>
        </div>
      </div>
    </main>
  );
}