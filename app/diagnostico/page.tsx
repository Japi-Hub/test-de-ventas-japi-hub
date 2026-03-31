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
    placeholder: 'Ejemplo: me dejan en visto, preguntan y desaparecen, me comparan por precio...',
  },
  {
    id: 'como_manejan_hoy',
    type: 'text',
    required: true,
    text: 'Contame brevemente cómo manejan hoy los mensajes en tu negocio.',
    placeholder: 'Ejemplo: responde una persona, varias personas, no hay orden, usamos plantillas...',
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
