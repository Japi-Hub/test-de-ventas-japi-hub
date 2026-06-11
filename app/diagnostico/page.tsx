"use client";

import { useEffect, useMemo, useState } from "react";

const VERSION = "V2_JUN2026";
const WA_NUM = "50661951827";

type ScoreOpt = [string, number];
type Q =
  | { key: string; type: "score"; q: string; opts: ScoreOpt[] }
  | { key: string; type: "profile"; q: string; opts: string[] }
  | { key: string; type: "open"; q: string; ph: string };

const QS: Q[] = [
  { key: "velocidad", type: "score", q: "Un cliente potencial te escribe pidiendo precio. ¿Cuánto tarda tu negocio en responder?",
    opts: [["Menos de 5 minutos", 10], ["Entre 5 minutos y 1 hora", 6], ["Entre 1 y 8 horas", 2], ["Más de 8 horas o sin patrón claro", 0]] },
  { key: "seguimiento", type: "score", q: "Pasaste el precio… y te dejaron en visto. ¿Qué hacés?",
    opts: [["Tengo un plan de seguimiento con mensajes y tiempos definidos", 10], ["Escribo de nuevo, pero sin un plan claro", 6], ["Casi nunca hago seguimiento", 2], ["Nada — si no responde, doy la venta por perdida", 0]] },
  { key: "estructura", type: "score", q: "¿Tenés un speech o estructura para tus mensajes de venta?",
    opts: [["Sí, usamos estructuras y plantillas definidas", 10], ["Tengo algunos templates, pero cada quien adapta", 6], ["Escribo casi siempre desde cero", 2], ["Cada mensaje es diferente, depende del día", 0]] },
  { key: "objeciones", type: "score", q: "Un cliente te dice: “Es muy caro”. ¿Cómo respondés?",
    opts: [["Explico el valor y lo que incluye, no solo defiendo el precio", 10], ["Ofrezco descuento o una alternativa más barata", 6], ["Defiendo el precio, pero sin mucha claridad", 2], ["Improviso o no sé bien qué responder", 0]] },
  { key: "tono", type: "score", q: "Si leés tus últimos 10 chats de venta, ¿qué transmiten?",
    opts: [["Claridad, profesionalismo y propósito", 10], ["Cercanía y claridad, pero algo de desorden", 6], ["Reactividad: solo respondemos lo que preguntan", 2], ["Caos: depende del día y de quién responde", 0]] },
  { key: "cta", type: "score", q: "¿Cómo terminan tus mensajes de venta?",
    opts: [["Con una acción clara: agendar, confirmar, elegir", 10], ["Con una pregunta abierta", 6], ["Con “cualquier cosa me avisás”", 2], ["Sin patrón claro", 0]] },
  { key: "sistema", type: "score", q: "¿La venta por WhatsApp en tu negocio sigue un proceso definido?",
    opts: [["Sí, hay un proceso claro y repetible", 10], ["Hay pautas, pero cada quien adapta", 6], ["Cada persona vende distinto", 2], ["No hay proceso definido", 0]] },
  { key: "quien_responde", type: "profile", q: "¿Quién responde hoy la mayoría de los mensajes de venta?",
    opts: ["Yo solo/a", "Yo y otra persona", "Un pequeño equipo", "Varias personas según disponibilidad"] },
  { key: "cantidad_equipo", type: "profile", q: "¿Cuántas personas participan en responder o vender por WhatsApp?",
    opts: ["1", "2", "3 a 5", "Más de 5"] },
  { key: "criterio_equipo", type: "profile", q: "¿Tu equipo responde con el mismo criterio, o cada quien maneja los chats a su manera?",
    opts: ["Todos siguen una misma estructura", "Hay una base, pero cada quien adapta", "Cada quien responde distinto", "No tengo claridad sobre eso"] },
  { key: "volumen_chats", type: "profile", q: "¿Cuántos chats de venta o consultas manejan por semana, aproximadamente?",
    opts: ["Menos de 20", "Entre 20 y 50", "Entre 51 y 100", "Más de 100"] },
  { key: "objetivo_90_dias", type: "profile", q: "¿Qué querés lograr en los próximos 90 días con tu WhatsApp comercial?",
    opts: ["Responder más rápido y mejor", "Cerrar más ventas", "Ordenar al equipo", "Escalar con más estructura y seguimiento"] },
  { key: "obstaculo_principal", type: "open", q: "¿Cuál sentís que es hoy tu mayor obstáculo para vender más por WhatsApp?", ph: "Contame brevemente qué es lo que más te frena hoy…" },
  { key: "despues_del_precio", type: "open", q: "¿Qué suele pasar después de que un cliente te pide precio o información?", ph: "Por ejemplo: responden, desaparecen, piden tiempo…" },
  { key: "como_manejan_hoy", type: "open", q: "Contame brevemente cómo manejan hoy los mensajes en tu negocio.", ph: "Quién responde, con qué herramientas, en qué horarios…" },
];

const NIVELES = [
  { min: 80, nivel: "Estratégico", color: "#4831E9",
    desc: "Tu WhatsApp ya tiene una lógica comercial fuerte y está cerca de comportarse como un sistema real de ventas.",
    next: "El foco ahora es escalar: medir mejor, afinar la conversión en puntos clave y multiplicar resultados sin perder calidad." },
  { min: 55, nivel: "En desarrollo", color: "#FF782C",
    desc: "Hay base comercial real, pero tu proceso todavía depende demasiado de la improvisación y del día a día.",
    next: "Consolidá tu estructura: seguimiento con plan, mensajes con speech definido y un cierre claro en cada chat." },
  { min: 30, nivel: "Reactivo", color: "#FF782C",
    desc: "Tu WhatsApp responde, pero no vende con intención. Las ventas que entran llegan más por demanda que por proceso.",
    next: "Empezá por las dos fugas más caras: velocidad de respuesta y seguimiento después del precio." },
  { min: 0, nivel: "Crítico", color: "#D9304A",
    desc: "Hoy tu WhatsApp funciona más como un buzón que como un canal de ventas. La buena noticia: es donde más rápido se ve el cambio.",
    next: "Necesitás ordenar la base de tu proceso comercial antes de pensar en escalar. Cada día sin estructura son ventas que se van." },
];

const DIM_LABEL: Record<string, string> = {
  velocidad: "Velocidad de respuesta", seguimiento: "Seguimiento después del precio",
  estructura: "Estructura del mensaje", objeciones: "Manejo de objeciones",
  tono: "Tono comercial", cta: "Cierre y llamado a la acción", sistema: "Proceso y repetibilidad",
};
const DIM_FIX: Record<string, string> = {
  velocidad: "Respuesta lenta o inconsistente", seguimiento: "Poco seguimiento — el “visto” se queda sin plan",
  estructura: "Mensajes sin estructura clara", objeciones: "Las objeciones de precio te quitan ventas",
  tono: "El tono no transmite intención comercial", cta: "Mensajes que terminan sin pedir acción",
  sistema: "El proceso depende de cada persona",
};
const SCORE_DIMS = ["velocidad", "seguimiento", "estructura", "objeciones", "tono", "cta", "sistema"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&display=swap');
  .dg{font-family:'Montserrat',sans-serif;background:#4831E9;color:#111;min-height:100vh;line-height:1.55}
  .dg h1,.dg h2,.dg h3{font-family:'Bricolage Grotesque','Montserrat',sans-serif;line-height:1.15}
  .dg .shell{max-width:680px;margin:0 auto;padding:36px 20px 60px}
  .dg .top{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px}
  .dg .pill{background:#CEF13B;color:#111;font-weight:700;font-size:.78rem;padding:.45em 1.1em;border-radius:999px}
  .dg .top a{color:rgba(255,255,255,.85);font-size:.82rem;text-decoration:none;font-weight:600}
  .dg .top a:hover{color:#CEF13B}
  .dg .progress{height:10px;background:rgba(255,255,255,.25);border-radius:999px;overflow:hidden;margin-bottom:10px}
  .dg .progress i{display:block;height:100%;background:#CEF13B;border-radius:999px;transition:width .35s ease}
  .dg .progress-label{color:rgba(255,255,255,.9);font-size:.8rem;font-weight:600;margin-bottom:22px}
  .dg .card{background:#fff;border-radius:24px;padding:38px 34px;box-shadow:0 24px 60px rgba(0,0,0,.25)}
  .dg .card h2{font-size:clamp(1.25rem,3vw,1.55rem);font-weight:800;margin:0 0 8px}
  .dg .hint{color:#666;font-size:.9rem;margin:0 0 24px}
  .dg .opts{display:grid;gap:12px}
  .dg .opt{width:100%;text-align:left;font-family:'Montserrat';font-size:1rem;font-weight:600;padding:16px 18px;border-radius:14px;border:2px solid #E4E1F7;background:#F4F3FB;cursor:pointer;transition:all .15s ease;color:#111}
  .dg .opt:hover{border-color:#4831E9;transform:translateY(-1px)}
  .dg .opt.sel{border-color:#4831E9;background:#EDEAFE;box-shadow:inset 0 0 0 1px #4831E9}
  .dg textarea,.dg input{width:100%;font-family:'Montserrat';font-size:1rem;padding:15px 16px;border-radius:14px;border:2px solid #E4E1F7;background:#F4F3FB;outline:none;transition:border-color .15s;box-sizing:border-box}
  .dg textarea:focus,.dg input:focus{border-color:#4831E9;background:#fff}
  .dg textarea{min-height:120px;resize:vertical}
  .dg .field{margin-bottom:14px}
  .dg .field .err{color:#D9304A;font-size:.8rem;font-weight:600;margin:5px 0 0;display:none}
  .dg .field.bad input{border-color:#D9304A}
  .dg .field.bad .err{display:block}
  .dg .nav{display:flex;gap:12px;margin-top:26px;align-items:center}
  .dg .btn{font-family:'Montserrat';font-weight:700;font-size:1rem;border:none;border-radius:14px;padding:15px 28px;cursor:pointer;transition:all .15s ease}
  .dg .btn-main{background:#4831E9;color:#fff;flex:1}
  .dg .btn-main:hover:not(:disabled){background:#3422B8;transform:translateY(-1px)}
  .dg .btn-main:disabled{background:#C9C3F2;cursor:not-allowed}
  .dg .btn-back{background:transparent;color:#4831E9;border:2px solid #E4E1F7;padding:13px 20px}
  .dg .btn-back:hover{border-color:#4831E9}
  .dg .helper{font-size:.82rem;color:#888;margin:10px 0 0}
  .dg .score-wrap{display:flex;align-items:center;gap:26px;flex-wrap:wrap;margin:6px 0 26px}
  .dg .ring{width:128px;height:128px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .dg .ring-in{background:#fff;width:96px;height:96px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column}
  .dg .ring b{font-family:'Bricolage Grotesque';font-size:2rem;color:#111}
  .dg .ring small{font-size:.65rem;color:#666;font-weight:600}
  .dg .nivel-tag{display:inline-block;font-weight:800;font-family:'Bricolage Grotesque';font-size:1.5rem}
  .dg .res-block{background:#F4F3FB;border-radius:16px;padding:20px 22px;margin-top:16px}
  .dg .res-block h3{font-size:1rem;margin:0 0 10px}
  .dg .dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:8px}
  .dg .res-block ul{list-style:none;margin:0;padding:0}
  .dg .res-block li{padding:5px 0 5px 22px;position:relative;font-size:.95rem}
  .dg .res-block li::before{content:"→";position:absolute;left:0;color:#4831E9;font-weight:700}
  .dg .next-step{border-left:4px solid #FF782C;background:#FFF4ED;border-radius:0 16px 16px 0;padding:18px 22px;margin-top:18px;font-size:.97rem}
  .dg .wa-btn{display:block;text-align:center;background:#CEF13B;color:#111;font-weight:700;text-decoration:none;border-radius:14px;padding:17px 24px;margin-top:26px;font-size:1.05rem;transition:transform .15s}
  .dg .wa-btn:hover{transform:translateY(-2px)}
  .dg .restart{display:block;width:100%;text-align:center;margin-top:16px;color:#777;font-size:.85rem;text-decoration:underline;cursor:pointer;background:none;border:none;font-family:'Montserrat'}
  .dg .send-note{font-size:.8rem;color:#999;text-align:center;margin:14px 0 0}
  @media(max-width:540px){.dg .card{padding:28px 22px}}
`;

type Answers = Record<string, string | number>;
type Lead = { name: string; email: string; whatsapp: string; company: string };

export default function Diagnostico() {
  const [step, setStep] = useState(0); // 0..14 preguntas, 15 form, 16 resultado
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState<Lead>({ name: "", email: "", whatsapp: "", company: "" });
  const [badFields, setBadFields] = useState<string[]>([]);
  const [openTxt, setOpenTxt] = useState("");
  const [sendState, setSendState] = useState<"idle" | "ok" | "fail">("idle");
  const [loaded, setLoaded] = useState(false);

  // restaurar progreso
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("japi_diag") || "null");
      if (saved && saved.version === VERSION && saved.step < QS.length + 1) {
        setStep(saved.step); setAnswers(saved.answers || {});
      }
    } catch {}
    setLoaded(true);
  }, []);

  // guardar progreso
  useEffect(() => {
    if (!loaded || step > QS.length) return;
    try { sessionStorage.setItem("japi_diag", JSON.stringify({ version: VERSION, step, answers })); } catch {}
  }, [step, answers, loaded]);

  // textarea por pregunta
  useEffect(() => {
    if (step < QS.length) {
      const q = QS[step];
      setOpenTxt(q.type === "open" ? String(answers[q.key] || "") : "");
    }
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => {
    const sum = SCORE_DIMS.reduce((s, k) => s + (Number(answers[k]) || 0), 0);
    const score = Math.round((sum / 70) * 100);
    const nivel = NIVELES.find((n) => score >= n.min) || NIVELES[3];
    const sorted = SCORE_DIMS.map((k) => [k, Number(answers[k]) || 0] as [string, number]).sort((a, b) => a[1] - b[1]);
    const fugas = sorted.slice(0, 3).filter(([, v]) => v < 10).map(([k]) => DIM_FIX[k]);
    const fuertes = sorted.slice(-3).filter(([, v]) => v >= 6).map(([k]) => DIM_LABEL[k]);
    return { score, nivel, fugas, fuertes };
  }, [answers]);

  // envío del lead al mostrar resultado
  useEffect(() => {
    if (step !== QS.length + 1) return;
    try { sessionStorage.removeItem("japi_diag"); } catch {}
    const payload = {
      name: lead.name, email: lead.email, whatsapp: lead.whatsapp, company: lead.company,
      totalScore: result.score, nivel: result.nivel.nivel, questionnaireVersion: VERSION,
      answers,
    };
    fetch("/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => setSendState(r.ok ? "ok" : "fail"))
      .catch(() => setSendState("fail"));
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!loaded) return <div className="dg"><style dangerouslySetInnerHTML={{ __html: css }} /><div className="shell" /></div>;

  const total = QS.length + 1;
  const pct = Math.round((Math.min(step, total) / total) * 100);
  const progressLabel = step < QS.length ? `Pregunta ${step + 1} de ${QS.length}` : step === QS.length ? "Último paso" : "Tu resultado";

  const pickOption = (q: Q, i: number) => {
    const val = q.type === "score" ? (q.opts as ScoreOpt[])[i][1] : (q.opts as string[])[i];
    setAnswers((a) => ({ ...a, [q.key]: val }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const submitOpen = (q: Q) => {
    setAnswers((a) => ({ ...a, [q.key]: openTxt.trim() }));
    setStep((s) => s + 1);
  };

  const submitLead = () => {
    const bad: string[] = [];
    if (lead.name.trim().length < 2) bad.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email.trim())) bad.push("email");
    if (lead.whatsapp.replace(/\D/g, "").length < 7) bad.push("whatsapp");
    if (lead.company.trim().length < 2) bad.push("company");
    setBadFields(bad);
    if (bad.length) return;
    setStep((s) => s + 1);
  };

  const restart = () => {
    try { sessionStorage.removeItem("japi_diag"); } catch {}
    setAnswers({}); setLead({ name: "", email: "", whatsapp: "", company: "" });
    setSendState("idle"); setStep(0);
  };

  return (
    <div className="dg">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="shell">
        <div className="top">
          <span className="pill">Diagnóstico JAPI HUB</span>
          <a href="/">← Volver al inicio</a>
        </div>
        <div className="progress"><i style={{ width: `${pct}%` }} /></div>
        <div className="progress-label">{progressLabel}</div>

        <div className="card">
          {step < QS.length && (() => {
            const q = QS[step];
            if (q.type === "open") {
              const ok = openTxt.trim().length >= 3;
              return (
                <>
                  <h2>{q.q}</h2>
                  <p className="hint">Respuesta libre — con una o dos frases alcanza.</p>
                  <textarea value={openTxt} placeholder={q.ph} maxLength={600} onChange={(e) => setOpenTxt(e.target.value)} autoFocus />
                  <div className="nav">
                    {step > 0 && <button className="btn btn-back" onClick={() => setStep((s) => s - 1)}>Atrás</button>}
                    <button className="btn btn-main" disabled={!ok} onClick={() => submitOpen(q)}>Continuar</button>
                  </div>
                  {!ok && <p className="helper">Escribí tu respuesta para continuar.</p>}
                </>
              );
            }
            const labels = q.type === "score" ? (q.opts as ScoreOpt[]).map(([t]) => t) : (q.opts as string[]);
            const current = answers[q.key];
            return (
              <>
                <h2>{q.q}</h2>
                <p className="hint">Elegí la opción que más se parezca a tu realidad hoy.</p>
                <div className="opts">
                  {labels.map((txt, i) => {
                    const val = q.type === "score" ? (q.opts as ScoreOpt[])[i][1] : txt;
                    return (
                      <button key={txt} className={`opt${current === val ? " sel" : ""}`} onClick={() => pickOption(q, i)}>
                        {txt}
                      </button>
                    );
                  })}
                </div>
                {step > 0 && (
                  <div className="nav">
                    <button className="btn btn-back" onClick={() => setStep((s) => s - 1)}>Atrás</button>
                  </div>
                )}
              </>
            );
          })()}

          {step === QS.length && (
            <>
              <h2>Antes de mostrarte tu resultado</h2>
              <p className="hint">Dejanos tus datos para enviarte tu lectura completa y ayudarte a mejorar tu WhatsApp comercial.</p>
              {([
                ["name", "Nombre", "Escribí tu nombre.", "text", "name"],
                ["email", "Email", "Ese email no parece válido.", "email", "email"],
                ["whatsapp", "WhatsApp (con código de país)", "Escribí tu número de WhatsApp.", "tel", "tel"],
                ["company", "Empresa o negocio", "Contanos el nombre de tu negocio.", "text", "organization"],
              ] as const).map(([k, ph, err, type, ac]) => (
                <div className={`field${badFields.includes(k) ? " bad" : ""}`} key={k}>
                  <input type={type} placeholder={ph} autoComplete={ac} value={lead[k]} onChange={(e) => setLead((l) => ({ ...l, [k]: e.target.value }))} />
                  <p className="err">{err}</p>
                </div>
              ))}
              <div className="nav">
                <button className="btn btn-back" onClick={() => setStep((s) => s - 1)}>Atrás</button>
                <button className="btn btn-main" onClick={submitLead}>Ver mi resultado</button>
              </div>
            </>
          )}

          {step === QS.length + 1 && (() => {
            const r = result;
            const deg = Math.round((r.score / 100) * 360);
            const waMsg = encodeURIComponent(`Hola JAPI HUB. Hice el diagnóstico y quedé en nivel ${r.nivel.nivel} con score ${r.score}. Quiero ayuda para mejorar mi WhatsApp comercial.`);
            return (
              <>
                <h2>{lead.name ? `${lead.name}, este` : "Este"} es tu resultado</h2>
                <div className="score-wrap">
                  <div className="ring" style={{ background: `conic-gradient(${r.nivel.color} ${deg}deg, #EDEAFE ${deg}deg)` }}>
                    <div className="ring-in"><b>{r.score}</b><small>de 100</small></div>
                  </div>
                  <div>
                    <span className="nivel-tag" style={{ color: r.nivel.color }}>Nivel: {r.nivel.nivel}</span>
                    <p style={{ marginTop: 8, fontSize: ".97rem", color: "#333", maxWidth: 380 }}>{r.nivel.desc}</p>
                  </div>
                </div>
                {r.fuertes.length > 0 && (
                  <div className="res-block">
                    <h3><span className="dot" style={{ background: "#CEF13B" }} />Lo que ya está jugando a tu favor</h3>
                    <ul>{r.fuertes.map((f) => <li key={f}>{f}</li>)}</ul>
                  </div>
                )}
                {r.fugas.length > 0 && (
                  <div className="res-block">
                    <h3><span className="dot" style={{ background: "#FF782C" }} />Tus fugas principales</h3>
                    <ul>{r.fugas.map((f) => <li key={f}>{f}</li>)}</ul>
                  </div>
                )}
                <div className="next-step"><strong>Siguiente paso:</strong> {r.nivel.next}</div>
                <a className="wa-btn" href={`https://wa.me/${WA_NUM}?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
                  Quiero hablar sobre mi diagnóstico
                </a>
                <button className="restart" onClick={restart}>Hacer el test de nuevo</button>
                <p className="send-note">
                  {sendState === "idle" && "Guardando tu diagnóstico…"}
                  {sendState === "ok" && "Tu diagnóstico quedó registrado. Te llega seguimiento por email."}
                  {sendState === "fail" && "Tu resultado está listo. (No pudimos registrar el envío — escribinos por WhatsApp.)"}
                </p>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
