'use client';

import { useMemo, useState } from 'react';

type Level = 'Crítico' | 'Inestable' | 'Con potencial' | 'Estratégico';

type ChoiceQuestion = {
  id: string;
  type: 'choice';
  text: string;
  required?: boolean;
  scoring?: boolean;
  options: {
    label: string;
    value?: number;
  }[];
};

type TextQuestion = {
  id: string;
  type: 'text';
  text: string;
  required?: boolean;
  placeholder?: string;
};

type Question = ChoiceQuestion | TextQuestion;

const questions: Question[] = [
  {
    id: 'velocidad',
    type: 'choice',
    scoring: true,
    required: true,
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
    type: 'choice',
    scoring: true,
    required: true,
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
    type: 'choice',
    scoring: true,
    required: true,
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
    type: 'choice',
    scoring: true,
    required: true,
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
    type: 'choice',
    scoring: true,
    required: true,
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
    type: 'choice',
    scoring: true,
    required: true,
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
    type: 'choice',
    scoring: true,
    required: true,
    text: '¿Tu equipo sigue el mismo proceso de venta?',
    options: [
      { label: 'Sí, hay un proceso claro', value: 10 },
      { label: 'Hay pautas, pero cada quien adapta', value: 7 },
      { label: 'Cada vendedor vende distinto', value: 3 },
      { label: 'No hay proceso definido', value: 0 },
    ],
  },
  {
    id: 'quien_responde',
    type: 'choice',
    required: true,
    text: '¿Quién responde hoy la mayoría de los mensajes de venta en tu WhatsApp?',
    options: [
      { label: 'Yo solo/a' },
      { label: 'Yo y otra persona' },
      { label: 'Un pequeño equipo' },
      { label: 'Varias personas según disponibilidad' },
    ],
  },
  {
    id: 'cantidad_equipo',
    type: 'choice',
    required: true,
    text: '¿Cuántas personas participan hoy en responder o vender por WhatsApp?',
    options: [
      { label: '1' },
      { label: '2' },
      { label: '3 a 5' },
      { label: 'Más de 5' },
    ],
  },
  {
    id: 'criterio_equipo',
    type: 'choice',
    required: true,
    text: '¿Tu equipo responde con el mismo criterio o cada quien maneja los chats a su manera?',
    options: [
      { label: 'Todos siguen una misma estructura' },
      { label: 'Hay una base, pero cada quien adapta' },
      { label: 'Cada quien responde distinto' },
      { label: 'No tengo claridad sobre eso' },
    ],
  },
  {
    id: 'volumen_chats',
    type: 'choice',
    required: true,
    text: '¿Cuántos chats de venta o consultas manejan aproximadamente por semana?',
    options: [
      { label: 'Menos de 20' },
      { label: 'Entre 20 y 50' },
      { label: 'Entre 51 y 100' },
      { label: 'Más de 100' },
    ],
  },
  {
    id: 'objetivo_90_dias',
    type: 'choice',
    required: true,
    text: '¿Qué te gustaría lograr en los próximos 90 días con tu WhatsApp comercial?',
    options: [
      { label: 'Responder más rápido y mejor' },
      { label: 'Cerrar más ventas' },
      { label: 'Ordenar al equipo' },
      { label: 'Escalar con más estructura y seguimiento' },
    ],
  },
  {
    id: 'obstaculo_principal',
    type: 'text',
    required: true,
    text: '¿Cuál sentís que es hoy tu mayor obstáculo para vender más por WhatsApp?',
    placeholder: 'Contame brevemente qué es lo que más te frena hoy...',
  },
  {
    id: 'despues_del_precio',
    type: 'text',
    required: true,
    text: '¿Qué suele pasar después de que un cliente te pide precio o información?',
    placeholder:
      'Ejemplo: me dejan en visto, preguntan y desaparecen, me comparan por precio...',
  },
  {
    id: 'como_manejan_hoy',
    type: 'text',
    required: true,
    text: 'Contame brevemente cómo manejan hoy los mensajes en tu negocio.',
    placeholder:
      'Ejemplo: responde una persona, varias personas, no hay orden, usamos plantillas...',
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
          'Hoy tu WhatsApp está funcionando más como un buzón que como un sistema real de ventas.',
        strengths: [
          'Ya detectaste que algo no está funcionando',
          'Hay mucho espacio para mejorar',
          'Podés ordenar rápido si tomás acción',
        ],
        gaps: [
          'Respuesta lenta o inconsistente',
          'Poco seguimiento',
          'Mensajes sin estructura clara',
        ],
        nextStep:
          'Necesitás ordenar la base de tu proceso comercial antes de escalar.',
      };
    case 'Inestable':
      return {
        interpretation:
          'Hay intención comercial, pero todavía dependés demasiado de improvisación.',
        strengths: [
          'Ya existe esfuerzo comercial',
          'El canal tiene potencial',
          'Hay oportunidades claras de mejora',
        ],
        gaps: [
          'Falta consistencia en mensajes y seguimiento',
          'El proceso todavía no es repetible',
          'La venta depende demasiado de la persona que responde',
        ],
        nextStep:
          'Necesitás estructura, seguimiento y más orden en la operación diaria.',
      };
    case 'Con potencial':
      return {
        interpretation:
          'Ya tenés bases buenas, pero todavía hay fugas que frenan mejores resultados.',
        strengths: [
          'Buen punto de partida',
          'Mensajes con algo de criterio',
          'Hay capacidad de optimizar',
        ],
        gaps: [
          'Fugas en cierre',
          'Seguimiento mejorable',
          'Persuasión inconsistente',
        ],
        nextStep:
          'Necesitás optimizar los puntos donde hoy perdés ventas.',
      };
    case 'Estratégico':
      return {
        interpretation:
          'Tu WhatsApp ya tiene una lógica comercial fuerte y está cerca de comportarse como un sistema real.',
        strengths: [
          'Hay base estratégica',
          'Mejor consistencia operativa',
          'Buen nivel de claridad comercial',
        ],
        gaps: [
          'Automatización inteligente',
          'Escalabilidad del proceso',
          'Refinar conversión en puntos clave',
        ],
        nextStep:
          'El foco ahora es escalar, medir mejor y multiplicar resultados sin perder calidad.',
      };
  }
}

export default function DiagnosticoPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [lead, setLead] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scoringQuestions = questions.filter(
    (q): q is ChoiceQuestion => q.type === 'choice' && q.scoring
  );

  const rawScore = useMemo(() => {
    return scoringQuestions.reduce((sum, question) => {
      const value = answers[question.id];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  }, [answers, scoringQuestions]);

  const finalScore = Math.round((rawScore / 70) * 100);
  const level = getLevel(finalScore);
  const summary = getSummary(level);

  const currentQuestion = questions[step];
  const allAnswered = questions.every((q) => {
    const value = answers[q.id];
    if (!q.required) return true;
    if (q.type === 'text') {
      return typeof value === 'string' && value.trim().length > 0;
    }
    return value !== undefined;
  });

  const canSubmitLead = Boolean(
    lead.name.trim() &&
      lead.email.trim() &&
      lead.whatsapp.trim() &&
      lead.company.trim()
  );

  const handleChoiceAnswer = (value: number | string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleTextContinue = () => {
    const value = answers[currentQuestion.id];
    if (typeof value !== 'string' || !value.trim()) return;

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleLeadSubmit = async () => {
    if (!canSubmitLead) return;

    setIsSubmitting(true);

    try {
      await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          totalScore: finalScore,
          nivel: level,
          answers,
          questionnaireVersion: 'LIGHT_PLUS',
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
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
            <h1
              style={{
                fontSize: 36,
                lineHeight: 1.1,
                color: '#2F165F',
                marginBottom: 12,
              }}
            >
              Paso {step + 1} de {questions.length}
            </h1>

            <p
              style={{
                fontSize: 24,
                lineHeight: 1.4,
                marginBottom: 28,
              }}
            >
              {currentQuestion.text}
            </p>

            {currentQuestion.type === 'choice' ? (
              <div style={{ display: 'grid', gap: 14 }}>
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() =>
                      handleChoiceAnswer(
                        option.value !== undefined ? option.value : option.label
                      )
                    }
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
            ) : (
              <div style={{ display: 'grid', gap: 16 }}>
                <textarea
                  placeholder={currentQuestion.placeholder || ''}
                  value={
                    typeof answers[currentQuestion.id] === 'string'
                      ? (answers[currentQuestion.id] as string)
                      : ''
                  }
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '18px',
                    borderRadius: 16,
                    border: '1px solid #ddd',
                    fontSize: 16,
                    lineHeight: 1.5,
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />

                <button
                  onClick={handleTextContinue}
                  disabled={
                    typeof answers[currentQuestion.id] !== 'string' ||
                    !(answers[currentQuestion.id] as string).trim()
                  }
                  style={{
                    display: 'inline-block',
                    background:
                      typeof answers[currentQuestion.id] === 'string' &&
                      (answers[currentQuestion.id] as string).trim()
                        ? '#7C3AED'
                        : '#cdbef5',
                    color: '#ffffff',
                    padding: '16px 22px',
                    borderRadius: 14,
                    border: 'none',
                    cursor:
                      typeof answers[currentQuestion.id] === 'string' &&
                      (answers[currentQuestion.id] as string).trim()
                        ? 'pointer'
                        : 'not-allowed',
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  Continuar
                </button>
              </div>
            )}
          </>
        )}

        {allAnswered && !submitted && (
          <>
            <h2
              style={{
                fontSize: 34,
                lineHeight: 1.1,
                color: '#2F165F',
                marginBottom: 12,
              }}
            >
              Antes de mostrarte tu resultado
            </h2>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Dejanos tus datos para enviarte seguimiento y ayudarte a mejorar tu WhatsApp comercial.
            </p>

            <div style={{ display: 'grid', gap: 14 }}>
              <input
                placeholder="Nombre"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                style={{
                  padding: '16px',
                  borderRadius: 12,
                  border: '1px solid #ddd',
                  fontSize: 16,
                }}
              />
              <input
                placeholder="Email"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                style={{
                  padding: '16px',
                  borderRadius: 12,
                  border: '1px solid #ddd',
                  fontSize: 16,
                }}
              />
              <input
                placeholder="WhatsApp"
                value={lead.whatsapp}
                onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })}
                style={{
                  padding: '16px',
                  borderRadius: 12,
                  border: '1px solid #ddd',
                  fontSize: 16,
                }}
              />
              <input
                placeholder="Empresa"
                value={lead.company}
                onChange={(e) => setLead({ ...lead, company: e.target.value })}
                style={{
                  padding: '16px',
                  borderRadius: 12,
                  border: '1px solid #ddd',
                  fontSize: 16,
                }}
              />

              <button
                onClick={handleLeadSubmit}
                disabled={!canSubmitLead || isSubmitting}
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
                {isSubmitting ? 'Guardando...' : 'Ver mi resultado'}
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

            <h2
              style={{
                fontSize: 34,
                lineHeight: 1.1,
                color: '#2F165F',
                margin: '0 0 12px',
              }}
            >
              Tu score fue: {finalScore}/100
            </h2>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
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
