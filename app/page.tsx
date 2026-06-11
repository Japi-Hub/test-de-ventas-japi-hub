import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Ventas por WhatsApp | Diagnóstico gratis — JAPI HUB",
  description:
    "Descubrí en 4 minutos dónde estás perdiendo ventas por WhatsApp: velocidad de respuesta, seguimiento, cierre y proceso comercial. Diagnóstico gratuito de JAPI HUB para negocios en LATAM.",
  openGraph: {
    title: "Test de Ventas por WhatsApp — ¿Cuántas ventas estás perdiendo?",
    description:
      "Diagnóstico gratuito de JAPI HUB: detectá tus fugas de venta en WhatsApp en 4 minutos y recibí una lectura estratégica de tu proceso comercial.",
    url: "https://test-de-ventas-japi-hub.vercel.app/",
    locale: "es_LA",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Test de Ventas por WhatsApp — JAPI HUB",
      url: "https://test-de-ventas-japi-hub.vercel.app/",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Diagnóstico gratuito que evalúa qué tan bien vende un negocio por WhatsApp: velocidad de respuesta, seguimiento, estructura de mensajes, manejo de objeciones, cierre y proceso comercial.",
      provider: { "@type": "Organization", name: "JAPI HUB", url: "https://www.japihub.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo cerrar más ventas por WhatsApp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Las ventas por WhatsApp se cierran con velocidad de respuesta, mensajes con estructura, seguimiento estratégico y un cierre claro en cada conversación. La mayoría de los negocios en LATAM no pierde ventas por falta de leads, sino por falta de proceso. El Test de Ventas de JAPI HUB detecta en 4 minutos cuál de estas piezas te está costando ventas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Por qué mis clientes me dejan en visto en WhatsApp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cuando un cliente pide precio y deja el mensaje en visto, casi siempre es porque el mensaje no le dio una razón clara para responder: precio sin contexto de valor, sin pregunta de avance y sin seguimiento posterior. No es un problema del cliente, es una fuga del proceso comercial. El diagnóstico de JAPI HUB identifica si el visto es tu fuga principal.",
          },
        },
        {
          "@type": "Question",
          name: "¿Sirve usar un speech o plantillas para vender por WhatsApp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, siempre que el speech tenga estructura comercial y no suene robótico. Un equipo que improvisa cada mensaje vende distinto cada día; un equipo con estructura vende de forma consistente. JAPI HUB enseña a construir esa estructura con el Método JAPI, un mix de psicología de ventas, comunicación y estrategia.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo hacer seguimiento por WhatsApp sin parecer insistente?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El seguimiento efectivo no repite '¿pudiste verlo?'. Aporta una razón nueva para retomar la conversación: un dato, un beneficio, una fecha límite real. El problema no es escribir de nuevo, es escribir sin dirección. El test de JAPI HUB mide qué tan sólido es tu seguimiento hoy.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué mide el Test de Ventas por WhatsApp de JAPI HUB?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mide 7 dimensiones de tu WhatsApp comercial: velocidad de respuesta, seguimiento, estructura del mensaje, manejo de objeciones, tono comercial, llamado a la acción y proceso de equipo. Toma 4 minutos, es gratuito y entrega un nivel con tus fugas principales y tu siguiente paso.",
          },
        },
      ],
    },
  ],
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&display=swap');
  :root{--violeta:#4831E9;--violeta-dark:#3422B8;--lima:#CEF13B;--naranja:#FF782C;--negro:#111111;--blanco:#FFFFFF;--gris:#F4F3FB}
  .lp{font-family:'Montserrat',sans-serif;color:var(--negro);background:var(--blanco);line-height:1.6;margin:0}
  .lp h1,.lp h2,.lp h3{font-family:'Bricolage Grotesque','Montserrat',sans-serif;line-height:1.12;letter-spacing:-.01em}
  .lp .wrap{max-width:1080px;margin:0 auto;padding:0 24px}
  .lp .pill{display:inline-block;background:var(--lima);color:var(--negro);font-weight:700;font-size:.8rem;padding:.45em 1.1em;border-radius:999px;letter-spacing:.02em}
  .lp .hero{background:var(--violeta);color:var(--blanco);padding:88px 0 96px;position:relative;overflow:hidden}
  .lp .hero::after{content:"";position:absolute;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(206,241,59,.22),transparent 70%);top:-140px;right:-140px}
  .lp .hero h1{font-size:clamp(2.1rem,5vw,3.4rem);font-weight:800;max-width:780px;margin:26px 0 20px}
  .lp .hero h1 em{font-style:normal;color:var(--lima)}
  .lp .hero p.lead{font-size:1.15rem;max-width:620px;opacity:.94;margin-bottom:36px}
  .lp .btns{display:flex;gap:16px;flex-wrap:wrap;position:relative;z-index:1}
  .lp .btn{display:inline-block;font-weight:700;text-decoration:none;border-radius:14px;padding:1em 2.1em;font-size:1.02rem;transition:transform .15s ease,box-shadow .15s ease}
  .lp .btn:hover{transform:translateY(-2px)}
  .lp .btn-lima{background:var(--lima);color:var(--negro);box-shadow:0 8px 26px rgba(0,0,0,.22)}
  .lp .btn-ghost{border:2px solid rgba(255,255,255,.55);color:var(--blanco)}
  .lp .hero-checks{display:flex;gap:26px;flex-wrap:wrap;margin-top:44px;position:relative;z-index:1}
  .lp .hero-checks span{font-size:.92rem;font-weight:600;display:flex;align-items:center;gap:8px}
  .lp .hero-checks b{color:var(--lima);font-size:1.1rem}
  .lp section{padding:84px 0}
  .lp .kicker{color:var(--violeta);font-weight:700;font-size:.85rem;text-transform:uppercase;letter-spacing:.12em;margin-bottom:14px}
  .lp h2{font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:800;margin-bottom:18px;max-width:720px}
  .lp .muted{color:#444;max-width:640px;font-size:1.05rem}
  .lp .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;margin-top:48px}
  .lp .card{background:var(--gris);border-radius:20px;padding:30px 28px;border:1.5px solid transparent;transition:border-color .2s}
  .lp .card:hover{border-color:var(--violeta)}
  .lp .card .num{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:1rem;color:var(--blanco);background:var(--violeta);width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
  .lp .card:nth-child(3n) .num{background:var(--naranja)}
  .lp .card h3{font-size:1.12rem;margin-bottom:8px}
  .lp .card p{font-size:.95rem;color:#3c3c3c}
  .lp .faq{background:var(--gris)}
  .lp details{background:var(--blanco);border-radius:16px;padding:22px 26px;margin-top:14px;border:1.5px solid #E4E1F7}
  .lp details[open]{border-color:var(--violeta)}
  .lp summary{font-weight:700;cursor:pointer;font-size:1.03rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px}
  .lp summary::after{content:"+";font-family:'Bricolage Grotesque';font-size:1.5rem;color:var(--violeta);flex-shrink:0}
  .lp details[open] summary::after{content:"–"}
  .lp details p{margin-top:12px;color:#3c3c3c;font-size:.97rem}
  .lp .cta-final{background:var(--violeta);color:var(--blanco);text-align:center;padding:96px 0}
  .lp .cta-final h2{margin:0 auto 16px}
  .lp .cta-final p{max-width:560px;margin:0 auto 36px;opacity:.93}
  .lp footer{background:var(--negro);color:#999;text-align:center;font-size:.85rem;padding:28px 20px}
  .lp footer a{color:var(--lima);text-decoration:none}
  @media(max-width:640px){.lp .hero{padding:64px 0 72px}.lp section{padding:64px 0}}
`;

const DIMS = [
  ["Velocidad de respuesta", "Cuánto tarda tu negocio en responder cuando un cliente pide precio. Cada hora de silencio enfría la venta."],
  ["Seguimiento", "Qué pasa después del “visto”. La mayoría de las ventas no se pierden en el primer mensaje: se pierden en el silencio que sigue."],
  ["Estructura del mensaje", "Si tu equipo escribe con un speech claro o improvisa cada chat desde cero."],
  ["Objeciones", "Cómo respondés cuando te dicen “es muy caro”. Ahí se define gran parte del cierre."],
  ["Tono comercial", "Lo que tus chats transmiten: claridad y propósito, o reactividad y caos."],
  ["Cierre y CTA", "Si tus mensajes terminan con una acción clara o con un “cualquier cosa me avisás”."],
  ["Sistema y equipo", "Si tu proceso de venta es repetible o depende del humor y el criterio de cada persona."],
];

const FAQS = [
  ["¿Cómo cerrar más ventas por WhatsApp?", "Con velocidad de respuesta, mensajes con estructura, seguimiento estratégico y un cierre claro en cada conversación. La mayoría de los negocios no pierde ventas por falta de leads: las pierde por falta de proceso. Este test detecta cuál de esas piezas te está costando ventas hoy."],
  ["¿Por qué mis clientes me dejan en visto?", "Casi siempre porque el mensaje no dio una razón clara para responder: precio sin contexto de valor, sin pregunta de avance y sin seguimiento después. No es un problema del cliente — es una fuga de tu proceso. El test te dice si el “visto” es tu fuga principal."],
  ["¿Sirve usar un speech o plantillas para vender por WhatsApp?", "Sí, siempre que tengan estructura comercial y no suenen robóticas. Un equipo que improvisa vende distinto cada día; un equipo con estructura vende de forma consistente. Eso es parte de lo que JAPI HUB enseña con el Método JAPI."],
  ["¿Cómo hago seguimiento sin parecer insistente?", "El seguimiento efectivo no repite “¿pudiste verlo?”. Aporta una razón nueva para retomar: un dato, un beneficio, una fecha real. El problema no es escribir de nuevo — es escribir sin dirección."],
  ["¿Cuánto tarda el test y qué recibo al final?", "Tarda unos 4 minutos. Al final ves tu score sobre 100, tu nivel comercial, tus fugas principales y el siguiente paso recomendado. Es gratis."],
];

export default function Home() {
  return (
    <div className="lp">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="hero">
        <div className="wrap">
          <span className="pill">Diagnóstico JAPI HUB · Gratis · 4 minutos</span>
          <h1>
            Descubrí cuántas ventas estás <em>perdiendo</em> hoy en tu WhatsApp
          </h1>
          <p className="lead">
            Tu negocio recibe mensajes todos los días. La pregunta es si tu WhatsApp los está
            convirtiendo en ventas… o si tu equipo solo responde sin rumbo. Este test lo detecta en
            15 preguntas.
          </p>
          <div className="btns">
            <a className="btn btn-lima" href="/diagnostico">Empezar el test gratis</a>
            <a className="btn btn-ghost" href="#dimensiones">¿Qué mide?</a>
          </div>
          <div className="hero-checks">
            <span><b>✓</b> Detectá tus fugas de venta principales</span>
            <span><b>✓</b> Entendé por qué te dejan en visto</span>
            <span><b>✓</b> Recibí tu nivel y siguiente paso</span>
          </div>
        </div>
      </header>

      <section id="dimensiones">
        <div className="wrap">
          <p className="kicker">No es un quiz cualquiera</p>
          <h2>7 dimensiones que deciden si tu WhatsApp vende o solo responde</h2>
          <p className="muted">
            Cada pregunta del test apunta a un punto exacto donde los negocios en LATAM pierden
            ventas sin darse cuenta. Al final ves tu nivel, tus fugas principales y qué ordenar
            primero.
          </p>
          <div className="grid">
            {DIMS.map(([t, d], i) => (
              <div className="card" key={t}>
                <div className="num">{i + 1}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap">
          <p className="kicker">Preguntas frecuentes</p>
          <h2>Ventas por WhatsApp: lo que todos preguntan</h2>
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-final">
        <div className="wrap">
          <h2>¿Listo para ver cuánta estrategia hay detrás de tu WhatsApp?</h2>
          <p>15 preguntas. 4 minutos. Una lectura honesta de tu proceso comercial y de dónde se te está yendo la venta.</p>
          <a className="btn btn-lima" href="/diagnostico">Hacer el diagnóstico ahora</a>
        </div>
      </section>

      <footer>
        <p>© 2026 <a href="https://www.japihub.com">JAPI HUB</a> · Ventas por WhatsApp para negocios en LATAM</p>
      </footer>
    </div>
  );
}
