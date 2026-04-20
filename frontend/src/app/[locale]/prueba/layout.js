export default async function Layout({ children, params }) {
  const { locale } = await params;
  return <>{children}</>;
}
