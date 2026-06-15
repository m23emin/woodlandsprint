# Öncelik Sırası — 100 Gün Planı

## Büyük resim

```
Aşama 1 (0–30 gün)     → Nakit: Marketplace, controller, tamir → $500–$5.000
Aşama 2 (30–60 gün)    → DTF satış + B2B local → $5.000–$20.000+
Aşama 3 (60–100 gün)   → Otomasyon (satış başladıktan sonra)
```

**Yapmaman gerekenler:** Shopify'da aylarca beklemek, domain/logo detayına takılmak, çok projeye aynı anda başlamak, otomasyona erken yatırım.

**Şu anki hedef (7 gün):** İlk $500–$1.000 nakit akışı + quote alabilen site.

---

## Woodlands Print repo — durum

### Tamamlandı
- [x] Next.js App Router + TypeScript + Tailwind
- [x] Mobil-first landing page (Hero, Services, Why Us, Quote, Areas, Footer)
- [x] Sticky mobil CTA
- [x] Quote form (name, phone, email, service, quantity, need-by, design upload, notes)
- [x] `/api/quote` — Resend email + attachment
- [x] SEO metadata (layout.tsx)

### Sıradaki (site — yüksek öncelik)
- [x] `.env.example` + Resend env şablonu
- [ ] Resend canlı test (gerçek email)
- [x] Artwork Requirements sayfası
- [x] Policy sayfaları (custom order, refund, shipping, privacy, terms)
- [x] B2B / wholesale sayfası (`/business-printing`)
- [x] 4 local SEO sayfası (Woodlands, Spring, Houston, Conroe)
- [x] Galeri bölümü (placeholder — gerçek foto ekle)
- [x] Fiyatlandırma bölümü + FAQ
- [x] sitemap.xml + robots.txt
- [ ] Domain + deploy
- [ ] Galeriye gerçek ürün fotoğrafları

### V2 (hacim artınca)
- [ ] Stripe Checkout + webhook
- [ ] Supabase (orders, customers, files)
- [ ] Admin panel + production status
- [ ] Reorder sistemi
- [ ] Abandoned checkout email
- [ ] Analytics dashboard

### Kod dışı (eşit öncelik)
- [ ] Google Business Profile
- [ ] Günlük outreach rutini
- [ ] Patron ile $6 all-in baskı maliyeti netleştirme (Etsy / toptan için)
- [ ] Texas sales tax / işletme yapısı yazılı netleştirme

---

## Cursor'da sıradaki kod işleri (önerilen sıra)

1. **Artwork Requirements + policy sayfaları** — risk azaltır, hızlı
2. **B2B sayfası** — yüksek kârlı müşteri tipi
3. **Local SEO sayfaları** — uzun vadeli organik
4. **Galeri bölümü** — güven
5. **Deploy + env dokümantasyonu**

Yeni sohbette: *"oncelik-sirasi.md'deki sıradaki kod maddesini yap"* yeterli.

---

## Yan gelir kanalları (paralel, site dışı)

| Kanal | Rol | Not |
|-------|-----|-----|
| Controller / Marketplace | İlk nakit | Günlük hacim, foto/fiyat test |
| Phone repair | Hızlı servis | Local |
| DTF B2B | Ana büyüme | $300–700 / sipariş |
| Etsy ($6 all-in) | Yan gelir | Turkish-American + Texas niche, 20–30 listing |
| Otomasyon (n8n) | Ertele | İlk $500–$1.000 sonrası |

---

## AI araç stratejisi

| Araç | Rol |
|------|-----|
| **Cursor Pro** | Site kodu — ana build aracı |
| **ChatGPT** | Plan, mimari, karar |
| **Gemini** | Araştırma, fiyat, rakip |
| **Claude** | Risk eleştirisi (opsiyonel) |
| **v0** | İlk tasarım demo (opsiyonel) |

Otomasyon (Telegram + n8n + Sheets): **ilk $500–$1.000 gelene kadar kopyala-yapıştır CEO prompt sistemi yeter.**

---

## Kâr mantığı (neden B2B?)

- 1 controller ≈ $40 kâr
- 1 business tişört siparişi (50 adet) ≈ $400–500 kâr
- Tekrar eden B2B müşteri = aylık gelir

Site vitrin değil; **tekrar sipariş + B2B + local SEO** ile büyüyen DTF platformu hedefleniyor.
