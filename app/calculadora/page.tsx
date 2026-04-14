const calcular = (regimen: string, ingresos: number) => {
  switch (regimen) {
    case "resico": {
      // Tasas oficiales SAT 2025 por ingreso mensual
      const tasa =
        ingresos <= 25000 ? 0.01 :
        ingresos <= 50000 ? 0.011 :
        ingresos <= 83333 ? 0.015 :
        ingresos <= 208333 ? 0.02 : 0.025;
      const isr = ingresos * tasa;
      const ivaAFavor = ingresos * 0.16; // IVA que cobras a tu cliente
      return {
        isr,
        iva: ivaAFavor,
        total: isr,
        tasa: tasa * 100,
        nota: `Tu ISR es ${(tasa*100).toFixed(1)}% sobre tus ingresos. El IVA del 16% lo cobras a tu cliente y lo declaras aparte — no es un gasto tuyo.`,
      };
    }
    case "honorarios": {
      // ISR provisional: 20% sobre ingresos como estimado (se ajusta con deducciones reales)
      const isr = ingresos * 0.2;
      const iva = ingresos * 0.16; // IVA que cobras
      const ivaACargo = iva * 0.33; // Estimado después de acreditar gastos
      return {
        isr,
        iva: ivaACargo,
        total: isr + ivaACargo,
        tasa: 20,
        nota: "ISR estimado al 20% (varía según deducciones). Si tu cliente es empresa te retiene 10% de ISR y 10.67% de IVA directo en la factura.",
      };
    }
    case "plataformas": {
      const retencionISR = ingresos * 0.0125; // 1.25% retención de la plataforma
      const retencionIVA = ingresos * 0.1066; // 10.66% retención IVA
      return {
        isr: retencionISR,
        iva: retencionIVA,
        total: retencionISR + retencionIVA,
        tasa: 1.25,
        nota: "La plataforma ya retiene 1.25% de ISR y 10.66% de IVA. Solo pagas el complemento si tuviste ingresos fuera de la plataforma.",
      };
    }
    case "arrendamiento": {
      const deduccionCiega = ingresos * 0.35;
      const base = ingresos - deduccionCiega;
      const isr = base * 0.1;
      return {
        isr,
        iva: 0,
        total: isr,
        tasa: 10,
        nota: "Se aplica deducción ciega del 35% automáticamente. ISR del 10% sobre el resto. No aplica IVA en arrendamiento habitacional.",
      };
    }
    default:
      return { isr: 0, iva: 0, total: 0, tasa: 0, nota: "" };
  }
};