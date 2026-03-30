'use client';

import { useMemo, useState } from 'react';

type Level = 'Crítico' | 'Inestable' | 'Con potencial' | 'Estratégico';

type Option = {
  label: string;
  value: number;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: 'velocidad',
    text: 'Cuando un cliente potencial te pide precio o información, ¿cuánto tardás en responder?',
    options: [
      { label: 'Menos de 5 minutos', value: 10 },
      { label: 'Entre 5 minutos y 1 hora', value: 7 },
      { label: 'Entre 1 y 8 horas', value: 4 },
      { label: 'Más de 8 horas o sin patrón claro', value: 0 },
    ],
  },
  {
    id: 'seguimiento',
    text: "Pasaste el presupuesto y el cliente dejó tu mensaje en 'Visto'. ¿Qué hacés?",
    options: [
      { label: 'Tengo un plan claro de seguimiento', value: 10 },
      { label: 'A veces hago seguimiento', value: 6 },
      { label: 'Casi nunca hago seguimiento', value: 2 },
      { label: 'No tengo idea qué hacer', value: 0 },
    ],
  },
  {
    id: 'estructura',
    text: '¿Cómo escribís tus mensajes de venta?',
    options: [
      { label: 'Uso plantillas o estructuras definidas', value: 10 },
      { label: 'Tengo algunos templates, pero adapto', value: 7 },
      { label: 'Escribo casi siempre desde cero', value: 3 },
      { label: 'Cada vez es diferente', value: 0 },
    ],
  },
  {
    id: 'objeciones',
    text: "Un cliente te dice: 'Es muy caro'. ¿Cómo respondés?",
    options: [
      { label: 'Explico el valor, no solo el precio', value: 10 },
      { label: 'Ofrezco descuento o alternativa', value: 6 },
      { label: 'Defiendo el precio sin mucha claridad', value: 2 },
      { label: 'Improviso o no sé qué responder', value: 0 },
    ],
  },
  {
    id: 'tono',
    text: 'Si mirás tus últimos 10 chats de venta, ¿qué sentís que transmitís?',
    options: [
      { label: 'Profesional, claro y con propósito', value: 10 },
      { label: 'Amigable y claro, pero algo desordenado', value: 7 },
      { label: 'Reactivo, respondo lo que preguntan', value: 4 },
      { label: 'Caótico, depende del día', value: 0 },
    ],
  },
  {
    id: 'cta',
    text: '¿Cómo terminás tus mensajes de venta?',
    options: [
      { label: 'Con una acción clara', value: 10 },
      { label: 'Con una pregunta abierta', value: 6 },
      { label: "Con 'cualquier duda me avisás'", value: 2 },
      { label: 'Sin patrón claro', value: 0 },
    ],
  },
  {
    id: 'sistema',
    text: '¿Tu equipo sigue el mismo proceso de venta?',
    options: [
      { label: 'Sí, hay un proceso claro', value: 10 },
      { label: 'Hay pautas, pero cada quien adapta', value: 7 },
      { label: 'Cada vendedor vende distinto', value: 3 },
      { label: 'No hay proceso definido', value: 0 },
    ],
  },
];

function getLevel(score: number): Level {
  if (score <= 25) return 'Crítico';
  if (score <= 50) return 'Inestable';
  if (score <= 75) return 'Con potencial';
  return 'Estratégico';
}

function getSummary(level: Level) {
  switch (level) {
    case 'Crítico':
      return {
        interpretation:
          'Tu WhatsApp hoy está funcionando más como un buzón que como un sistema de ventas.',
        strengths: ['Tenés margen enorme de mejora', 'Ya detectaste el problema', 'Podés ordenar rápido si actuás'],
        gaps: ['Respuesta lenta o inconsistente', 'Poco seguimiento', 'Mensajes sin estructura'],
        nextStep: 'Necesitás ordenar tu proceso comercial desde la base.',
      };
    case 'Inestable':
      return {
        interpretation:
          'Hay intención comercial, pero todavía dependés demasiado de improvisación.',
        strengths: ['Ya hay esfuerzo comercial', 'Hay oportunidades claras', 'Podés crecer con estructura'],
        gaps: ['Falta consistencia', 'Seguimiento irregular', 'Poca sistematización'],
        nextStep: 'Necesitás estructura y un proceso repetible.',
      };
    case 'Con potencial':
      return {
        interpretation:
          'Ya tenés bases buenas, pero todavía hay fugas que frenan mejores resultados.',
        strengths: ['Buen punto de partida', 'Mensajes con algo de criterio', 'Hay capacidad de optimizar'],
        gaps: ['Fugas en cierre', 'Seguimiento mejorable', 'Persuasión inconsistente'],
        nextStep: 'Necesitás optimizar los puntos donde hoy perdés ventas.',
      };
    case 'Estratégico':
      return {
        interpretation:
          'Tu WhatsApp ya tiene una lógica comercial fuerte y está cerca de un sistema real.',
        strengths: ['Buena base estratégica', 'Mejor consistencia', 'Más claridad comercial'],
        gaps: ['Escala', 'Automatización inteligente', 'Refinar conversión'],
        nextStep: 'El foco ahora es escalar y optimizar.',
      };
  }
}

export default function DiagnosticoPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [lead, setLead] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0),
    [answers]
  );

  const finalScore = Math.round((totalScore / 70) * 100);
  const level = getLevel(finalScore);
  const summary = getSummary(level);

  const currentQuestion = questions[step];
  const allAnswered = Object.keys(answers).length === questions.length;
  const canSubmitLead =
    lead.name.trim() && lead.email.trim() && lead.whatsapp.trim() && lead.company.trim();

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleLeadSubmit = async () => {
    if (!canSubmitLead) return;

    try {
      await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          totalScore: finalScore,
          nivel: level,
          answers,
          questionnaireVersion: 'LIGHT',
        }),
      });
    } catch (error) {
      console.error(error);
    }

    setSubmitted(true);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        color: '#1f1f1f',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: '#A3FF2E',
            color: '#111111',
            borderRadius: 999,
            padding: '8px 14px',
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          Diagnóstico JAPI HUB
        </div>

        {!allAnswered && (
          <>
            <h1 style={{ fontSize: 36, lineHeight: 1.1, color: '#2F165F', marginBottom: 12 }}>
              Paso {step + 1} de {questions.length}
            </h1>
            <p style={{ fontSize: 24, lineHeight: 1.4, marginBottom: 28 }}>{currentQuestion.text}</p>

            <div style={{ display: 'grid', gap: 14 }}>
              {currentQuestion.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswer(option.value)}
                  style={{
                    textAlign: 'left',
                    padding: '18px 20px',
                    borderRadius: 16,
                    border: '1px solid #e8defa',
                    background: '#faf7ff',
                    cursor: 'pointer',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}

        {allAnswered && !submitted && (
          <>
            <h2 style={{ fontSize: 34, lineHeight: 1.1, color: '#2F165F', marginBottom: 12 }}>
              Antes de mostrarte tu resultado
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
              Dejanos tus datos para enviarte seguimiento y ayudarte a mejorar tu WhatsApp comercial.
            </p>

            <div style={{ display: 'grid', gap: 14 }}>
              <input
                placeholder="Nombre"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                style={{ padding: '16px', borderRadius: 12, border: '1px solid #ddd', fontSize: 16 }}
              />
              <input
                placeholder="Email"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                style={{ padding: '16px', borderRadius: 12, border: '1px solid #ddd', fontSize: 16 }}
              />
              <input
                placeholder="WhatsApp"
                value={lead.whatsapp}
                onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })}
                style={{ padding: '16px', borderRadius: 12, border: '1px solid #ddd', fontSize: 16 }}
              />
              <input
                placeholder="Empresa"
                value={lead.company}
                onChange={(e) => setLead({ ...lead, company: e.target.value })}
                style={{ padding: '16px', borderRadius: 12, border: '1px solid #ddd', fontSize: 16 }}
              />

              <button
                onClick={handleLeadSubmit}
                disabled={!canSubmitLead}
                style={{
                  background: canSubmitLead ? '#7C3AED' : '#cdbef5',
                  color: '#ffffff',
                  padding: '16px 22px',
                  borderRadius: 14,
                  border: 'none',
                  cursor: canSubmitLead ? 'pointer' : 'not-allowed',
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                Ver mi resultado
              </button>
            </div>
          </>
        )}

        {submitted && (
          <div
            style={{
              background: '#faf7ff',
              border: '1px solid #e8defa',
              borderRadius: 24,
              padding: '28px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: '#2F165F',
                color: '#ffffff',
                borderRadius: 999,
                padding: '8px 14px',
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 18,
              }}
            >
              Resultado: {level}
            </div>

            <h2 style={{ fontSize: 34, lineHeight: 1.1, color: '#2F165F', margin: '0 0 12px' }}>
              Tu score fue: {finalScore}/100
            </h2>

            <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
              {summary.interpretation}
            </p>

            <div style={{ display: 'grid', gap: 18, marginBottom: 24 }}>
              <div>
                <h3 style={{ color: '#2F165F' }}>Fortalezas o señales</h3>
                <ul>
                  {summary.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ color: '#2F165F' }}>Fugas principales</h3>
                <ul>
                  {summary.gaps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p style={{ fontWeight: 700, marginBottom: 20 }}>
              Siguiente paso: {summary.nextStep}
            </p>

            <a
              href={`https://wa.me/50661951827?text=${encodeURIComponent(
                `Hola JAPI HUB. Hice el diagnóstico y quedé en nivel ${level} con score ${finalScore}. Quiero ayuda para mejorar mi WhatsApp comercial.`
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                background: '#A3FF2E',
                color: '#111111',
                padding: '16px 22px',
                borderRadius: 14,
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              Quiero hablar sobre mi diagnóstico
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
