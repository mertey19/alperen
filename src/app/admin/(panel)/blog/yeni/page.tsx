import { PostEditor } from "@/components/admin/PostEditor";

export default function AdminNewPostPage() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Blog</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Yeni yazı</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Öğrenci sayısı, başarı oranı veya sınav sonucu gibi doğrulanamayacak iddialar yazmayın.
      </p>
      <div className="mt-8">
        <PostEditor />
      </div>
    </div>
  );
}
