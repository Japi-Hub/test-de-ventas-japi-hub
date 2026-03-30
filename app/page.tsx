export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        color: '#1f1f1f',
      }}
    >
      <section
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '72px 24px 48px',
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
            marginBottom: 24,
          }}
        >
          Diagnóstico JAPI HUB
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.02,
            margin: '0 0 20px',
            color: '#2F165F',
          }}
        >
          Descubrí qué tan bien está vendiendo tu negocio por WhatsApp
        </h1>

        <p
          style={{
            fontSize: 20,
            lineHeight: 1.5,
            maxWidth: 760,
            margin: '0 0 28px',
          }}
        >
          Hacé este diagnóstico y descubrí si tu equipo está vendiendo con
          estrategia… o solo respondiendo mensajes sin rumbo.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          <a
            href="/diagnostico"
            style={{
              background: '#7C3AED',
              color: '#ffffff',
              padding: '16px 22px',
              borderRadius: 14,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Empezar diagnóstico
          </a>

          <a
            href="#beneficios"
            style={{
              background: '#FFF4EC',
              color: '#7C3AED',
              padding: '16px 22px',
              borderRadius: 14,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Ver beneficios
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: 16,
          }}
        >
          {[
            'Detectá tus principales fugas de venta',
            'Entendé qué está frenando tus cierres',
            'Recibí una lectura más estratégica de tu WhatsApp',
          ].map((item) => (
            <div
              key={item}
              style={{
                border: '1px solid #ece7f6',
                borderRadius: 18,
                padding: 20,
                background: '#faf7ff',
              }}
            >
              <p style={{ margin: 0, fontWeight: 600 }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="beneficios" style={{ background: '#F8F7FB' }}>
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '56px 24px',
          }}
        >
          <h2
            style={{
              fontSize: 34,
              color: '#2F165F',
              margin: '0 0 12px',
            }}
          >
            Esto no es un quiz cualquiera
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              maxWidth: 860,
              margin: '0 0 28px',
            }}
          >
            Este diagnóstico fue diseñado para ayudarte a detectar qué está
            frenando tus ventas por WhatsApp: desde respuestas poco claras hasta
            falta de seguimiento, poca persuasión o ausencia de un proceso
            comercial real.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 18,
            }}
          >
            {[
              'Velocidad de respuesta',
              'Claridad del mensaje',
              'Seguimiento',
              'Objeciones y persuasión',
              'CTA y cierre',
              'Sistema y repetibilidad',
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: '#ffffff',
                  borderRadius: 18,
                  padding: 22,
                  border: '1px solid #ebe8f3',
                }}
              >
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostico">
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '56px 24px 80px',
          }}
        >
          <div
            style={{
              background: '#2F165F',
              color: '#ffffff',
              borderRadius: 28,
              padding: '36px 28px',
            }}
          >
            <h2 style={{ fontSize: 32, margin: '0 0 12px' }}>
              ¿Listo para descubrir cuánta estrategia hay realmente detrás de tu
              WhatsApp?
            </h2>

            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                maxWidth: 760,
                margin: '0 0 24px',
              }}
            >
              En pocos minutos vas a ver qué tan eficiente está siendo tu
              WhatsApp comercial hoy y dónde tenés la mayor oportunidad de
              mejora para vender mejor.
            </p>

            <a
              href="/diagnostico"
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
              Comenzar ahora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
