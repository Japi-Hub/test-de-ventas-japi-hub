export const metadata = {
  title: 'Test de Ventas JAPI HUB',
  description:
    'Diagnóstico para evaluar qué tan bien está vendiendo tu negocio por WhatsApp.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: 'Montserrat, sans-serif',
          margin: 0,
          padding: 0,
          backgroundColor: '#ffffff',
          color: '#1f1f1f',
        }}
      >
        {children}
      </body>
    </html>
  );
}
