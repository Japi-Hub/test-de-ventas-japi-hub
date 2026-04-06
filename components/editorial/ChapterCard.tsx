import Link from 'next/link';
import type { Chapter } from '@/lib/editorial/data';

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const isAvailable = chapter.status === 'available';

  return (
    <article
      style={{
        border: '1px solid #ece7f6',
        borderRadius: 24,
        padding: 24,
        background: '#ffffff',
        display: 'grid',
        gap: 16,
        boxShadow: '0 8px 30px rgba(47,22,95,0.06)',
      }}
    >
      <div
        style={{
          width: 64,
          height: 8,
          borderRadius: 999,
          background: chapter.accent,
        }}
      />

      <div style={{ display: 'grid', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#6b6180' }}>
          Capítulo {chapter.order}
        </span>
        <h3 style={{ margin: 0, fontSize: 28, lineHeight: 1.05, color: '#2F165F' }}>
          {chapter.title}
        </h3>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#43385c' }}>
          {chapter.subtitle}
        </p>
      </div>

      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#5e5472' }}>
        {chapter.summary}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <span style={metaPill}>{chapter.readTime}</span>
        <span style={metaPill}>{chapter.pages} páginas</span>
        <span style={metaPill}>USD {chapter.priceUsd}</span>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {isAvailable ? (
          <Link href={`/capitulo/${chapter.slug}`} style={primaryButton}>
            Ver capítulo
          </Link>
        ) : (
          <span style={disabledButton}>Próximamente</span>
        )}
      </div>
    </article>
  );
}

const metaPill: React.CSSProperties = {
  display: 'inline-block',
  padding: '8px 12px',
  borderRadius: 999,
  background: '#f6f2ff',
  color: '#2F165F',
  fontWeight: 700,
  fontSize: 13,
};

const primaryButton: React.CSSProperties = {
  display: 'inline-block',
  textDecoration: 'none',
  background: '#2F165F',
  color: '#ffffff',
  padding: '14px 18px',
  borderRadius: 14,
  fontWeight: 800,
};

const disabledButton: React.CSSProperties = {
  display: 'inline-block',
  background: '#efedf5',
  color: '#7b748a',
  padding: '14px 18px',
  borderRadius: 14,
  fontWeight: 800,
};
