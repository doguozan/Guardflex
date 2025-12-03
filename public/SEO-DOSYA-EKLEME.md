# SEO Dosyaları Ekleme - Hızlı Rehber

## 📁 Public Klasörüne Eklenecek Dosyalar

### 1. og-image.jpg
- **Boyut:** 1200x630 piksel
- **Format:** JPG
- **Konum:** `public/og-image.jpg`
- **Kullanım:** Facebook, LinkedIn gibi sosyal medya paylaşımlarında görünecek görsel

### 2. favicon.png
- **Boyut:** 32x32 veya 64x64 piksel
- **Format:** PNG
- **Konum:** `public/favicon.png`
- **Kullanım:** Tarayıcı sekmesinde görünecek küçük ikon

### 3. apple-touch-icon.png (Opsiyonel)
- **Boyut:** 180x180 piksel
- **Format:** PNG
- **Konum:** `public/apple-touch-icon.png`
- **Kullanım:** iOS cihazlarda ana ekrana eklenince görünecek ikon

---

## 🎨 Nasıl Oluşturulur?

### Yöntem 1: Mevcut Logo Kullanarak (Hızlı)

1. **Logo dosyanızı bulun:**
   - `src/assets/06e4e24f87a742479886d893331277b8ab950bb5.png`

2. **Görsel düzenleme programı kullanın:**
   - Windows: Paint, Paint.NET, GIMP
   - Mac: Preview, Pixelmator
   - Online: Canva.com, Figma.com

3. **Boyutlandırın:**
   - **og-image.jpg:** Logo + arka plan ile 1200x630 px
   - **favicon.png:** Logo 64x64 px
   - **apple-touch-icon.png:** Logo 180x180 px

4. **Kaydedin:**
   - Dosyaları `public/` klasörüne kaydedin

### Yöntem 2: Online Araçlar

**Favicon için:**
- https://favicon.io/
- https://realfavicongenerator.net/

**OG Image için:**
- https://www.canva.com/ (1200x630 template)
- https://www.figma.com/

---

## ✅ Kontrol Listesi

- [ ] `public/og-image.jpg` dosyası eklendi (1200x630 px)
- [ ] `public/favicon.png` dosyası eklendi (32x32 veya 64x64 px)
- [ ] `public/apple-touch-icon.png` dosyası eklendi (180x180 px) - opsiyonel
- [ ] Dosyalar doğru isimlerle kaydedildi
- [ ] Proje yeniden build edildi (`npm run build`)

---

## 🔍 Test Etme

Dosyaları ekledikten sonra:

1. **Local test:**
   - `npm run dev` ile çalıştırın
   - Tarayıcıda `http://localhost:3000/favicon.png` adresine gidin
   - Dosya görünüyorsa başarılı!

2. **Production test:**
   - `npm run build` ile build edin
   - `build/` klasöründe dosyaların olduğunu kontrol edin

---

## 📝 Notlar

- Dosyalar eklendikten sonra tarayıcı cache'ini temizlemek için: `Ctrl + F5` (Windows) veya `Cmd + Shift + R` (Mac)
- Production'da dosyalar otomatik olarak root dizine kopyalanır
- Domain adresini (`https://guardflex.ch`) gerçek domain ile değiştirmeyi unutmayın

