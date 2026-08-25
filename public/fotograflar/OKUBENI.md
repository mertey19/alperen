# Fotoğraf slotları

| Slot | Dosya | Durum |
| --- | --- | --- |
| `hero` | `alperen-govrek-portre.jpg` | **Var** — yapay zeka ile üretilmiş/işlenmiş portre |
| `about` | `alperen-ailesiyle.jpg` | **Var** — Alperen anne ve babasıyla |
| `detail` | — | Boş; slot üretimde hiç render edilmiyor |

Yeni fotoğraf eklerken dosyayı bu klasöre koyun, sonra `src/config/teacher.ts`
içindeki ilgili `photos` girdisinde `src` alanını güncelleyin. Başka dosyaya
dokunmak gerekmez; `src: null` iken slot üretimde hiç oluşturulmaz.

## Notlar

**`hero` portresi yapay zeka üretimi.** Kaynak dosya adı
`Gemini_Generated_Image...`. Alperen'in kendi benzerliği ve kendisi tarafından
verildi; başka birinin fotoğrafı değil. Yine de gerçek bir stüdyo çekimi
yapıldığında bu dosyanın değiştirilmesi önerilir — kişi markası sitesinde
gerçek fotoğraf her zaman daha güçlüdür.

**`about` karesinde başka kişiler var.** Alperen'in anne ve babası görünüyor;
yayımlanması onların rızasına bağlıdır.

## Bekleyen: `detail`

Ortam detayı: defter, kitap, kalem, tahta notu ya da çalışan eller.
İnsan yüzü olmayabilir. Kare (1:1), en az 1200 × 1200 px.

## Çocuk gizliliği

Öğrenci fotoğrafı kullanılmaz. Tanınabilir çocuk görseli, yalnızca velinin
yazılı izni varsa ve gerçekten gerekliyse eklenir. Alperen'in öğrencisiymiş gibi
gösterilen stok ya da yapay zeka üretimi çocuk fotoğrafı bu sitede yer almaz.
