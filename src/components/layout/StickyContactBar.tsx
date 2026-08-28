import { teacher } from "@/config/teacher";

/**
 * Telefonda ekranın altına sabitlenen tek çağrı.
 *
 * Kurallar:
 * - Yalnızca gerçek bir iletişim kanalı varsa render edilir.
 * - Yalnızca `lg` altında görünür; masaüstünde menüdeki çağrı zaten var.
 * - Altındaki boşluk tutucu, çubuğun içeriğin ya da alt bilginin üstünü
 *   kapatmasını engeller ve düzen kaymasını (CLS) sıfırlar.
 * - Animasyon yok, balon yok, kapatma düğmesi gerektirecek kadar yer kaplamıyor.
 * - `env(safe-area-inset-bottom)` ile çentikli ekranlarda ev düğmesinin
 *   üstünde kalır.
 */
const BAR_HEIGHT = "calc(4.5rem + env(safe-area-inset-bottom))";

export function StickyContactBar({
  whatsappUrl,
  phoneHref,
}: {
  whatsappUrl: string | null;
  phoneHref: string | null;
}) {
  const href = whatsappUrl ?? phoneHref;
  if (!href) return null;

  const isWhatsapp = Boolean(whatsappUrl);

  return (
    <>
      <div aria-hidden="true" className="lg:hidden" style={{ height: BAR_HEIGHT }} />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-6xl gap-3 px-5 pt-3">
          <a
            href={href}
            {...(isWhatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`flex min-h-12 flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-150 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 ${
              isWhatsapp
                ? "bg-whatsapp text-white focus-visible:outline-whatsapp"
                : "bg-ink text-paper focus-visible:outline-ink"
            }`}
          >
            {isWhatsapp ? `WhatsApp'tan Görüş` : `${teacher.informalName}'yı Arayın`}
          </a>
          {whatsappUrl && phoneHref ? (
            <a
              href={phoneHref}
              aria-label={`${teacher.informalName}'yı telefonla arayın`}
              className="flex min-h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}
