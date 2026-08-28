import { notFound } from "next/navigation";

import { PostEditor } from "@/components/admin/PostEditor";
import { readCms } from "@/lib/cms/store";

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cms = await readCms();
  const post = cms.posts.find((item) => item.id === id);
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Blog</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink">Yazıyı düzenle</h1>
      <div className="mt-8">
        <PostEditor post={post} />
      </div>
    </div>
  );
}
