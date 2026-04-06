import Link from 'next/link';
import { bundle, chapters } from '@/lib/editorial/data';

export default function BundlePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fcfbff', color: '#1f1f1f' }}>
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '72px 24px' }}>
        <Link href="/coleccion" style={{ color: '#2F165F', fontWeight: 800, textDecoration: 'none' }}>
          Volver a la coleccion
        </Link>
        <div style={{ marginTop: 24, background: '#2F165F', color: '#fff', borderRadius: 32, padding: 32, display: 'grid', gap: 18 }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.02 }}>
            {bundle.title}
          </h1>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.7, maxWidth: 760 }}>
            {bundle.subtitle}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 34, fontWeight: 800 }}>USD {bundle.priceUsd}</span>
            <span style={{ background: '#ffffff', color: '#2F165F', padding: '8px 12px', borderRadius: 999, fontWeight: 800, fontSize: 13 }}>
              {bundle.savingsText}
            </span>
          </div>
        </div>
        <div style={{ marginTop: 24, display: 'grid', gap: 14 }}>
          {chapters.map((chapter) => (
            <div key={chapter.id} style={{ background: '#ffffff', border: '1px solid #ece7f6', borderRadius: 22, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ display: 'block', color: '#2F165F', fontSize: 22 }}>{chapter.title}</strong>
                  <span style={{ color: '#5e5472', lineHeight: 1.6 }}>{chapter.subtitle}</span>
                </div>
                <span style={{ fontWeight: 800, color: '#2F165F' }}>USD {chapter.priceUsd}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
