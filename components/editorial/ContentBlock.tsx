import Link from 'next/link';
import type { ChapterBlock } from '@/lib/editorial/data';

export default function ContentBlock({ block }: { block: ChapterBlock }) {
  const styles = variants[block.type];

  return (
    <section
      style={{
        ...baseBlock,
        ...styles,
      }}
    >
      {block.title ? (
        <h3 style={{ margin: '0 0 10px', fontSize: 24, lineHeight: 1.1, color: '#2F165F' }}>
          {block.title}
        </h3>
      ) : null}

      {block.content ? (
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: '#3f3652' }}>{block.content}</p>
      ) : null}

      {block.items?.length ? (
        <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 10, color: '#3f3652' }}>
          {block.items.map((item) => (
            <li key={item} style={{ fontSize: 17, lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
      ) : null}

      {block.type === 'cta' && block.ctaLabel && block.ctaHref ? (
        <div style={{ marginTop: 18 }}>
          <Link href={block.ctaHref} style={ctaLink}>
            {block.ctaLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}

const baseBlock: React.CSSProperties = {
  borderRadius: 24,
  padding: 24,
  display: 'grid',
  gap: 14,
  border: '1px solid #ece7f6',
};

const variants: Record<string, React.CSSProperties> = {
  insight: { background: '#faf7ff' },
  example: { background: '#fffaf4' },
  exercise: { background: '#f7fff1' },
  checklist: { background: '#ffffff' },
  quote: {
    background: '#2F165F',
    borderColor: '#2F165F',
    color: '#ffffff',
  },
  cta: { background: '#fff4ec' },
};

const ctaLink: React.CSSProperties = {
  display: 'inline-block',
  textDecoration: 'none',
  background: '#2F165F',
  color: '#ffffff',
  padding: '14px 18px',
  borderRadius: 14,
  fontWeight: 800,
};
