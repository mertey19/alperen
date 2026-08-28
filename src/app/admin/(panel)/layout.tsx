import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/AdminNav";
import { hasSession } from "@/lib/cms/auth";
import { cmsPersistsOnThisHost } from "@/lib/cms/store";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await hasSession())) redirect("/admin/login");
  const ephemeral = !cmsPersistsOnThisHost();

  return (
    <div className="min-h-screen bg-paper-2 lg:grid lg:grid-cols-[16rem_1fr]">
      <AdminNav />
      <div>
        {ephemeral ? (
          <p className="border-b border-clay/30 bg-clay-soft px-5 py-3 text-sm text-clay-strong lg:px-10">
            Bu ortamda kayıtlar kalıcı olmayabilir. Vercel&apos;de Blob deposu
            (`BLOB_READ_WRITE_TOKEN`) tanımlayın; yerelde `data/cms.json` dosyasına yazılır.
          </p>
        ) : null}
        <div className="px-5 py-8 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
