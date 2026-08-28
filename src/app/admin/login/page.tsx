import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { Container } from "@/components/ui/Section";
import { adminPasswordConfigured, hasSession } from "@/lib/cms/auth";
import { teacher } from "@/config/teacher";

export default async function AdminLoginPage() {
  if (await hasSession()) redirect("/admin");
  const configured = adminPasswordConfigured();

  return (
    <Container className="flex min-h-screen items-center py-16">
      <div className="mx-auto w-full max-w-md rounded-card border border-line bg-paper-2 p-8">
        <p className="eyebrow">Yönetim</p>
        <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Panele giriş</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {teacher.name} sitesinin içerik yönetimi. Bu sayfa arama motorlarına kapalıdır.
        </p>
        <div className="mt-8">
          {configured ? (
            <LoginForm disabled={false} />
          ) : (
            <p className="text-sm leading-relaxed text-clay-strong">
              Yönetim şifresi tanımlı değil. Sunucuya <code>ADMIN_PASSWORD</code> ekleyin.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
