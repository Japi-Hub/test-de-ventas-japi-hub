import ChapterCard from '@/components/editorial/ChapterCard';
import { bundle, chapters } from '@/lib/editorial/data';

export default function ColeccionPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fcfbff', color: '#1f1f1f' }}>
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div style={{ display: 'inline-block', background: '#A3FF2E', color: '#111', borderRadius: 999, padding: '8px 14px', fontWeight: 700, fontSize: 14, marginBottom: 20 }}>
          JAPI Editorial Series
        </div>
        <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.02, color: '#2F165F', margin: '0 0 18px' }}>
          Una colección digital para vender mejor por WhatsApp
        </h1>
        <p style={{ maxWidth: 860, fontSize: 20, lineHeight: 1.7, margin: '0 0 26px', color: '#43385c' }}>
          Una experiencia editorial moderna para negocios que responden mucho pero venden poco.
        </p>
        <div style={{ background: '#2F165F', color: '#fff', borderRadius: 28, padding: '28px', display: 'grid', gap: 14, marginBottom: 34 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#d9ccff' }}>Bundle completo</span>
          <h2 style={{ margin: 0, fontSize: 34, lineHeight: 1.05 }}>{bundle.title}</h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>{bundle.subtitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 28, fontWeight: 800 }}>USD {bundle.priceUsd}</span>
            <span style={{ background: '#A3FF2E', color: '#111', padding: '8px 12px', borderRadius: 999, fontWeight: 800, fontSize: 13 }}>{bundle.savingsText}</span>
          </div>
          <a href="/bundle" style={{ display: 'inline-block', textDecoration: 'none', background: '#ffffff', color: '#2F165F', padding: '14px 18px', borderRadius: 14, fontWeight: 800, width: 'fit-content' }}>
            Ver bundle
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </section>
    </main>
  );
}
