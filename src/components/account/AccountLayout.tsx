import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountSidebar from "./AccountSidebar";
import Reveal from "@/components/Reveal";

export default function AccountLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <div className="container-x py-10">
          <p className="text-xs text-gray-400">
            <span className="hover:text-ink">Home</span> / <span className="text-ink">{title}</span>
          </p>
          <div className="mt-2">
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <AccountSidebar />
            <Reveal className="flex-1">{children}</Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}