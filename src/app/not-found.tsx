import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { routes, teacher } from "@/config/teacher";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        Aradığınız sayfa burada değil.
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        Bağlantı değişmiş olabilir. Ana sayfadan devam edebilir ya da {teacher.informalName} ile
        doğrudan iletişime geçebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={routes.home}>Ana Sayfaya Dönün</Button>
        <Button href={routes.contact} variant="secondary">
          İletişim
        </Button>
      </div>
    </Container>
  );
}
