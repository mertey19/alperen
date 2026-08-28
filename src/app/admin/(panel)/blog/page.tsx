import Link from "next/link";

import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePostAction } from "@/lib/cms/actions";
import { readCms } from "@/lib/cms/store";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function AdminBlogPage() {
  const cms = await readCms();
  const posts = [...cms.posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Blog</p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Yazılar</h1>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper"
        >
          Yeni yazı
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <li key={post.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <p className="font-display text-lg text-ink">{post.title}</p>
              <p className="mt-1 text-sm text-muted">
                {dateFormatter.format(new Date(post.publishedAt))}
                {" · "}
                {post.published ? "Yayımlı" : "Taslak"}
                {" · "}
                /blog/{post.slug}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/blog/${post.id}`} className="text-sm font-semibold text-clay-strong">
                Düzenle
              </Link>
              <DeleteButton
                confirmText={`“${post.title}” silinsin mi?`}
                action={deletePostAction.bind(null, post.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
