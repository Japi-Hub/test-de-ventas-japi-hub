import Link from 'next/link';
import ContentBlock from '@/components/editorial/ContentBlock';
import { chapters, getChapterBySlug } from '@/lib/editorial/data';

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div style={{ maxWidth: 680, textAlign: 'center' }}>
          <h1 style={{ fontSize: 42, color: '#2F165F' }}>Capitulo no encontrado</h1>
          <Link href="/coleccion" style={{ color: '#2F165F', fontWeight: 800 }}>
            Volver a la coleccion
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#fcfbff', color: '#1f1f1f' }}>
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '72px 24px 32px' }}>
        <Link href="/coleccion" style={{ color: '#2F165F', fontWeight: 800, textDecoration: 'none' }}>
          Volver a la coleccion
        </Link>
        <div style={{ marginTop: 24, borderRadius: 32, padding: 32, background: '#ffffff', border: '1px solid #ece7f6', boxShadow: '0 14px 40px rgba(47,22,95,0.06)' }}>
          <div style={{ width: 80, height: 8, borderRadius: 999, background: chapter.accent, marginBottom: 22 }} />
          <span style={{ display: 'inline-block', padding: '8px 12px', borderRadius: 999, background: '#f6f2ff', color: '#2F165F', fontWeight: 800, fontSize: 13, marginBottom: 16 }}>
            Capitulo {chapter.order}
          </span>
          <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.03, color: '#2F165F' }}>
            {chapter.title}
          </h1>
          <p style={{ margin: '0 0 22px', fontSize: 20, lineHeight: 1.7, color: '#43385c', maxWidth: 760 }}>
            {chapter.subtitle}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}>
            <span style={metaPill}>{chapter.readTime}</span>
            <span style={metaPill}>{chapter.pages} paginas</span>
            <span style={metaPill}>USD {chapter.priceUsd}</span>
          </div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: '#5e5472' }}>
            {chapter.summary}
          </p>
        </div>
      </section>
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gap: 18 }}>
        {chapter.status === 'available' ? chapter.blocks.map((block, index) => (
          <ContentBlock key={chapter.id + '-' + index} block={block} />
        )) : (
          <section style={{ borderRadius: 24, padding: 24, background: '#ffffff', border: '1px solid #ece7f6' }}>
            <h2 style={{ margin: '0 0 10px', color: '#2F165F' }}>Proximamente</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#43385c' }}>
              Este capitulo ya tiene estructura, pero todavia no le cargamos el contenido final.
            </p>
          </section>
        )}
      </section>
    </main>
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
