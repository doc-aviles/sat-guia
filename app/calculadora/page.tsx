"use client";
import { useState } from "react";
import Link from "next/link";

const regimenes = [
  { valor: "resico", label: "RESICO" },
  { valor: "honorarios", label: "Honorarios / Act. Profesional" },
  { valor: "plataformas", label: "Plataformas Tecnológicas" },
  { valor: "arrendamiento", label: "Arrendamiento" },
];

const calcular = (regimen: string, ingresos: number) => {
  switch (regimen) {
    case "resico": {
      const tasa = ingresos <= 300000 ? 0.01 : ingresos <= 600000 ? 0.015 : ingresos <= 1000000 ? 0.02 : 0.025;
      const isr = ingresos * tasa;
      const iva = ingresos * 0.16;
      return { isr, iva, total: isr + iva, tasa: tasa * 100, nota: "En RESICO el IVA se traslada al cliente, no es un gasto tuyo." };
    }
    case "honorarios": {
      const base = ingresos * 0.8;
      const isr = base * 0.3;
      const iva = ingresos * 0.16;
      return { isr, iva, total: isr + iva, tasa: 30, nota: "Puedes deducir gastos reales para reducir tu ISR." };
    }
    case "plataformas": {
      const isr = ingresos * 0.04;
      const iva = ingresos * 0.16;
      return { isr, iva, total: isr + iva, tasa: 4, nota: "La plataforma ya retiene parte. Solo pagas el complemento." };
    }
    case "arrendamiento": {
      const base = ingresos * 0.65;
      const isr = base * 0.1;
      return { isr, iva: 0, total: isr, tasa: 10, nota: "Se aplica deducción ciega del 35%. No aplica IVA en arrendamiento habitacional." };
    }
    default:
      return { isr: 0, iva: 0, total: 0, tasa: 0, nota: "" };
  }
};

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧮</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Calculadora de impuestos</h1>
          <p className="text-gray-400 text-sm mt-2">Estimación aproximada antes de entrar al SAT</p>
        </div>

        {/* Régimen */}
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

        {/* Ingresos */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ingresos del mes (MXN)
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

        {/* Resultado */}
        {resultado && (
          <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">ISR estimado</span>
              <span className="text-gray-900 font-bold text-lg">{fmt(resultado.isr)}</span>
            </div>
            {resultado.iva > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">IVA (16%)</span>
                <span className="text-gray-900 font-bold text-lg">{fmt(resultado.iva)}</span>
              </div>
            )}
            <div className="border-t border-blue-200 pt-4 flex justify-between items-center">
              <span className="text-gray-800 font-bold">Total a pagar</span>
              <span className="text-blue-600 font-extrabold text-2xl">{fmt(resultado.total)}</span>
            </div>
            <p className="text-xs text-gray-400 pt-2">💡 {resultado.nota}</p>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col gap-3 mt-6">
          <Link
            href="/guia"
            className="text-center bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-700 transition"
          >
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