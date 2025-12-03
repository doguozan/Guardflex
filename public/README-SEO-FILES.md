# SEO Dosyaları Ekleme Rehberi

Bu klasöre aşağıdaki dosyaları eklemeniz gerekiyor:

## 1. Open Graph Image (og-image.jpg)

**Dosya Adı:** `og-image.jpg`  
**Boyut:** 1200x630 piksel (önerilen)  
**Format:** JPG veya PNG  
**İçerik:** GuardFlex logosu ve marka görseli içeren bir görsel

### Nasıl Oluşturulur:
1. Canva, Figma veya Photoshop gibi bir tasarım aracı kullanın
2. 1200x630 piksel boyutunda bir görsel oluşturun
3. GuardFlex logosunu ve "Fliegengitter, Sonnenschutz & Plissee Lösungen" yazısını ekleyin
4. JPG formatında kaydedin ve `public/og-image.jpg` olarak kaydedin

### Alternatif:
- Mevcut logo dosyanızı (`src/assets/06e4e24f87a742479886d893331277b8ab950bb5.png`) kullanarak bir görsel oluşturabilirsiniz
- Online araçlar: https://www.canva.com/ veya https://www.figma.com/

---

## 2. Favicon Dosyaları

### 2.1. favicon.png
**Dosya Adı:** `favicon.png`  
**Boyut:** 32x32 veya 64x64 piksel  
**Format:** PNG  
**İçerik:** GuardFlex logosu (küçük versiyonu)

### 2.2. apple-touch-icon.png (Opsiyonel ama önerilen)
**Dosya Adı:** `apple-touch-icon.png`  
**Boyut:** 180x180 piksel  
**Format:** PNG  
**İçerik:** GuardFlex logosu (iOS cihazlar için)

### Nasıl Oluşturulur:
1. Mevcut logo dosyanızı (`src/assets/06e4e24f87a742479886d893331277b8ab950bb5.png`) kullanın
2. Bir görsel düzenleme programı ile boyutlandırın:
   - favicon.png: 32x32 veya 64x64 piksel
   - apple-touch-icon.png: 180x180 piksel
3. PNG formatında kaydedin ve `public/` klasörüne ekleyin

### Online Araçlar:
- https://favicon.io/ - Favicon oluşturma
- https://realfavicongenerator.net/ - Tüm platformlar için favicon oluşturma

---

## 3. Dosyaları Ekleme Adımları

1. **Dosyaları hazırlayın:**
   - `og-image.jpg` (1200x630 px)
   - `favicon.png` (32x32 veya 64x64 px)
   - `apple-touch-icon.png` (180x180 px) - opsiyonel

2. **Dosyaları kopyalayın:**
   - Dosyaları `public/` klasörüne sürükleyip bırakın
   - Veya dosya yöneticisinde kopyalayıp yapıştırın

3. **Kontrol edin:**
   - `public/og-image.jpg` ✓
   - `public/favicon.png` ✓
   - `public/apple-touch-icon.png` ✓ (opsiyonel)

---

## 4. Hızlı Çözüm (Mevcut Logo Kullanarak)

Eğer hızlı bir çözüm istiyorsanız, mevcut logo dosyanızı kullanabilirsiniz:

1. `src/assets/06e4e24f87a742479886d893331277b8ab950bb5.png` dosyasını kopyalayın
2. Bir görsel düzenleme programı ile:
   - **og-image.jpg için:** 1200x630 px boyutuna getirin ve JPG olarak kaydedin
   - **favicon.png için:** 64x64 px boyutuna getirin ve PNG olarak kaydedin
3. Dosyaları `public/` klasörüne ekleyin

---

## Notlar

- Dosyalar eklendikten sonra projeyi yeniden build etmeniz gerekebilir
- Production build'de bu dosyalar otomatik olarak root dizine kopyalanacaktır
- Tarayıcı cache'i nedeniyle değişiklikler hemen görünmeyebilir (hard refresh: Ctrl+F5)

