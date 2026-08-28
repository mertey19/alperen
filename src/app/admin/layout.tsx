import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Yönetim" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="icerik" className="min-h-screen bg-paper">
      {children}
    </div>
  );
}
