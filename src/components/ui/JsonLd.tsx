/**
 * JSON-LD gömme.
 *
 * `dangerouslySetInnerHTML` yok: React `<script>` metin çocuğunu ham basar,
 * `<` kaçışı erken script kapanmasını engellemek için yeterlidir.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data).replace(/</g, "\\u003c")}
    </script>
  );
}
