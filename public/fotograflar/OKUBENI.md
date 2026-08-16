# Fotoğraf slotları

Fotoğraflar hazır olduğunda dosyaları bu klasöre kopyalayın, sonra
`src/config/teacher.ts` içindeki `photos` bölümünde `src: null` satırını dosya
yoluyla değiştirin. Başka hiçbir dosyaya dokunmanız gerekmez.

```ts
hero: photo({
  src: "/fotograflar/alperen-hero.jpg",   // <- null yerine bu
  ...
}),
```

## 1. `hero` — Ana sayfa portresi (dikey, 4:5)

Alperen kameraya hafif açıyla bakıyor. Bel üstü ya da 3/4 portre.
Doğal gün ışığı, sade ve düzenli arka plan: masa, kitaplık ya da çalışma odası.
Kadrajda tipografi için nefes payı bırakın.

Önerilen: en az 1200 × 1500 px, JPG veya WebP.

## 2. `about` — Hakkında sayfası (yatay, 3:2)

Daha doğal bir kare: masada çalışırken, ders notu hazırlarken, defter/kitap
incelerken. Poz verilmiş "ders anlatma" sahnesi olmasın.

Önerilen: en az 1600 × 1067 px.

## 3. `detail` — Ortam detayı (kare, 1:1)

Defter, kitap, kalem, tahta notu ya da çalışan eller. İnsan yüzü içermeyebilir.

Önerilen: en az 1200 × 1200 px.

## Çocuk gizliliği

Öğrenci fotoğrafı kullanılmaz. Tanınabilir çocuk görseli, yalnızca velinin
yazılı izni varsa ve gerçekten gerekliyse eklenir. Alperen'in öğrencisiymiş gibi
gösterilen stok çocuk fotoğrafı bu sitede kesinlikle yer almaz.
