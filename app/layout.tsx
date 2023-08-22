export const metadata = {
  title: "Accueil | AB Distribution",
  description: "Airbnb Clone",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}