export type BlockType = 'insight' | 'example' | 'exercise' | 'checklist' | 'quote' | 'cta';

export type ChapterBlock = {
  type: BlockType;
  title?: string;
  content?: string;
  items?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type Chapter = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  order: number;
  accent: string;
  readTime: string;
  pages: number;
  priceUsd: number;
  status: 'available' | 'coming-soon';
  summary: string;
  blocks: ChapterBlock[];
};

export const chapters: Chapter[] = [
  {
    id: 'cap-1',
    slug: 'por-que-no-te-responden',
    title: 'Por qué no te responden',
    subtitle: 'El problema no es solo el mensaje, sino cómo pensás la conversación.',
    order: 1,
    accent: '#FFB36B',
    readTime: '45 min',
    pages: 18,
    priceUsd: 19,
    status: 'available',
    summary:
      'Una introducción visual y estratégica para entender por qué tus chats no avanzan y cómo diagnosticar la raíz del problema.',
    blocks: [
      {
        type: 'quote',
        content: 'La mayoría no pierde ventas por no contestar. Las pierde por contestar sin arquitectura.',
      },
      {
        type: 'insight',
        title: 'El mito del mensaje perfecto',
        content:
          'No existe un mensaje mágico que cierre por sí solo. Lo que sí existe es una conversación mal diseñada que empuja al cliente a enfriarse, comparar o desaparecer.',
      },
      {
        type: 'example',
        title: 'Ejemplo real de fuga',
        content:
          'Cliente: “Hola, precio por favor”. Negocio: “Cuesta 35 mil”. Fin de la conversación. No hubo contexto, valor, guía ni siguiente paso.',
      },
      {
        type: 'exercise',
        title: 'Ejercicio rápido',
        content:
          'Abrí tus últimos 10 chats. Marcá cuántos terminaron en visto después de compartir precio. Ese número te va a decir cuánto estás vendiendo por información y no por dirección.',
      },
      {
        type: 'checklist',
        title: 'Checklist de diagnóstico',
        items: [
          '¿Tus mensajes arrancan con conexión o van directo al dato?',
          '¿Explicás valor antes de mandar precio?',
          '¿Siempre cerrás con un siguiente paso claro?',
          '¿Tenés seguimiento o dependés de que el cliente vuelva solo?'
        ],
      },
      {
        type: 'cta',
        title: 'Siguiente paso',
        content: 'Si este capítulo te hizo sentido, el siguiente te enseña cómo estructurar mensajes que sí generan respuesta.',
        ctaLabel: 'Ver Capítulo 2',
        ctaHref: '/capitulo/mensajes-que-captan-atencion'
      }
    ],
  },
  {
    id: 'cap-2',
    slug: 'mensajes-que-captan-atencion',
    title: 'Mensajes que captan atención',
    subtitle: 'Arquitectura del mensaje, claridad, ABC-CTA y fluidez.',
    order: 2,
    accent: '#A3FF2E',
    readTime: '50 min',
    pages: 22,
    priceUsd: 19,
    status: 'coming-soon',
    summary: 'Bloques y fórmulas para escribir mensajes que se entienden, conectan y mueven a la acción.',
    blocks: [],
  },
  {
    id: 'cap-3',
    slug: 'psicologia-e-influencia',
    title: 'Psicología e influencia',
    subtitle: 'Cómo persuadir sin sonar vendedor ni intenso.',
    order: 3,
    accent: '#C7B7FF',
    readTime: '55 min',
    pages: 24,
    priceUsd: 19,
    status: 'coming-soon',
    summary: 'Gatillos mentales, empatía y adaptación del tono según el tipo de cliente.',
    blocks: [],
  },
  {
    id: 'cap-4',
    slug: 'seguimiento-inteligente',
    title: 'Seguimiento inteligente',
    subtitle: 'Cómo insistir sin molestar y sin sonar desesperado.',
    order: 4,
    accent: '#FF9D7A',
    readTime: '45 min',
    pages: 20,
    priceUsd: 19,
    status: 'coming-soon',
    summary: 'Timing, señales y secuencia JAPI 3 Toques + 1 para seguir sin espantar.',
    blocks: [],
  },
  {
    id: 'cap-5',
    slug: 'win-back',
    title: 'Win Back',
    subtitle: 'Cómo recuperar leads fríos con estrategia, valor y calidez.',
    order: 5,
    accent: '#8EE6C2',
    readTime: '40 min',
    pages: 18,
    priceUsd: 19,
    status: 'coming-soon',
    summary: 'Sistemas para reactivar conversaciones dormidas sin sonar reciclado.',
    blocks: [],
  },
];

export const bundle = {
  slug: 'coleccion-completa-japi',
  title: 'Colección completa JAPI',
  subtitle: 'Los 5 capítulos en una sola experiencia editorial digital.',
  priceUsd: 67,
  savingsText: 'Ahorro vs compra individual: USD 28',
};

export function getChapterBySlug(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}
