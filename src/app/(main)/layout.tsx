import PageLayout from "@/Components/layout/PageLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
