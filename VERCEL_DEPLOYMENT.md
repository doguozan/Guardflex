# Vercel Deployment Rehberi

Bu dosya GuardFlex projesini Vercel'e deploy etmek için adım adım talimatları içerir.

## 📋 Ön Gereksinimler

1. **GitHub/GitLab/Bitbucket hesabı** (kodunuzun Git repository'sinde olması gerekir)
2. **Vercel hesabı** (ücretsiz hesap yeterli)
   - https://vercel.com adresinden kayıt olabilirsiniz

## 🚀 Deployment Adımları

### Yöntem 1: Vercel Dashboard Üzerinden (Önerilen)

1. **Vercel'e giriş yapın**
   - https://vercel.com/login adresine gidin
   - GitHub/GitLab/Bitbucket hesabınızla giriş yapın

2. **Yeni Proje Oluşturun**
   - Dashboard'da "Add New..." → "Project" seçin
   - Git repository'nizi seçin veya import edin

3. **Proje Ayarlarını Yapılandırın**
   Vercel otomatik olarak Vite projesini algılayacaktır, ancak şu ayarları kontrol edin:
   
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (proje kök dizini)
   - **Build Command:** `npm run build` (otomatik algılanır)
   - **Output Directory:** `build` (otomatik algılanır)
   - **Install Command:** `npm install` (otomatik algılanır)

4. **Environment Variables (Gerekirse)**
   Eğer projede environment variable'lar varsa:
   - Settings → Environment Variables bölümünden ekleyin
   - Production, Preview ve Development için ayrı ayrı tanımlayabilirsiniz

5. **Deploy Et**
   - "Deploy" butonuna tıklayın
   - Build işlemi tamamlanana kadar bekleyin (2-5 dakika)
   - Deployment başarılı olduğunda URL'inizi alacaksınız

### Yöntem 2: Vercel CLI ile (Gelişmiş)

1. **Vercel CLI'yi yükleyin**
   ```bash
   npm install -g vercel
   ```

2. **Vercel'e giriş yapın**
   ```bash
   vercel login
   ```

3. **Projeyi deploy edin**
   ```bash
   vercel
   ```
   
   İlk deployment için:
   - Proje adını onaylayın
   - Root directory'yi onaylayın (genellikle `./`)
   - Build ayarlarını onaylayın

4. **Production'a deploy edin**
   ```bash
   vercel --prod
   ```

## ⚙️ Konfigürasyon Dosyaları

Projede aşağıdaki dosyalar hazırlanmıştır:

### `vercel.json`
- Build ve routing ayarlarını içerir
- React Router için SPA routing konfigürasyonu
- Cache headers için optimizasyonlar

### `package.json`
- Build script'leri tanımlı
- Tüm dependencies listelenmiş

## 🔧 Önemli Notlar

### React Router (SPA Routing)
Proje React Router kullanıyor, bu yüzden `vercel.json` dosyasında tüm route'lar `index.html`'e yönlendiriliyor. Bu sayede:
- `/products` → `/index.html`
- `/services` → `/index.html`
- `/contact` → `/index.html`
- vb. tüm route'lar çalışır

### Build Output
- Build çıktısı `build/` klasörüne yazılır
- Vercel otomatik olarak bu klasörü algılar

### Environment Variables
Eğer projede environment variable kullanıyorsanız:
1. Vercel Dashboard → Project Settings → Environment Variables
2. Key-Value çiftlerini ekleyin
3. Production, Preview, Development için ayrı ayrı tanımlayın

## 📝 Deployment Sonrası Kontroller

Deployment tamamlandıktan sonra şunları kontrol edin:

- [ ] Ana sayfa yükleniyor mu?
- [ ] Tüm route'lar çalışıyor mu? (`/products`, `/services`, `/contact`, vb.)
- [ ] Responsive tasarım mobilde çalışıyor mu?
- [ ] Resimler ve videolar yükleniyor mu?
- [ ] Formlar çalışıyor mu?
- [ ] WhatsApp butonu çalışıyor mu?

## 🔄 Güncelleme Yapmak

Kodunuzu güncelledikten sonra:

1. **Git'e push edin**
   ```bash
   git add .
   git commit -m "Update: ..."
   git push
   ```

2. **Vercel otomatik deploy eder**
   - Vercel Git repository'nizi izler
   - Her push'ta otomatik olarak yeni deployment başlatır
   - Preview URL'i oluşturur (test için)
   - Production'a merge edince otomatik deploy eder

## 🌐 Custom Domain Ekleme

1. Vercel Dashboard → Project Settings → Domains
2. "Add Domain" butonuna tıklayın
3. Domain adınızı girin (örn: `guardflex.ch`)
4. DNS ayarlarını yapın (Vercel size talimat verecek)
5. SSL sertifikası otomatik olarak oluşturulur

## 🐛 Sorun Giderme

### Build Hatası
- `npm run build` komutunu local'de çalıştırıp hataları kontrol edin
- Console log'larını Vercel Dashboard'dan kontrol edin

### Route Çalışmıyor
- `vercel.json` dosyasının doğru olduğundan emin olun
- Rewrites konfigürasyonunu kontrol edin

### Resimler Yüklenmiyor
- Public klasöründeki dosyaların doğru yerde olduğundan emin olun
- Path'lerin doğru olduğunu kontrol edin

## 📞 Destek

Sorun yaşarsanız:
- Vercel Dokümantasyonu: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions

---

**Başarılar! 🎉**

