# GuardFlex

**Fliegengitter, Sonnenschutz & Plissee Lösungen aus der Schweiz**

GuardFlex, İsviçre'den özel tasarım sineklik, güneş koruması ve plise çözümleri sunan modern bir web uygulamasıdır.

## 🚀 Özellikler

- **Responsive Design:** Mobil, tablet ve desktop için optimize edilmiş tasarım
- **Admin Panel:** İçerik yönetimi için kapsamlı admin paneli
- **MongoDB Entegrasyonu:** Ürünler, iletişim formları ve ayarlar için veritabanı desteği
- **Görsel Optimizasyonu:** Lazy loading, responsive images ve performans optimizasyonları
- **SEO Optimizasyonu:** Meta tags, structured data ve sitemap desteği
- **Çoklu Dil:** Almanca dil desteği

## 🛠️ Teknoloji Stack

### Frontend
- **React 18.3** - UI framework
- **Vite 6.3.5** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Lucide React** - Icons

### Backend
- **Express.js** - Server framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing

### Deployment
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Database hosting

## 📋 Gereksinimler

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas hesabı (veya local MongoDB)

## 🔧 Kurulum

### 1. Repository'yi klonlayın

```bash
git clone https://github.com/doguozan/Guardflex.git
cd GuardFlex
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Environment Variables

Proje kök dizininde `.env` dosyası oluşturun:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/guardflex?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
```

### 4. Veritabanını seed edin

```bash
npm run seed
```

Bu komut:
- 22 ürün ekler
- Admin kullanıcısı oluşturur (username: `GuardFlex`, password: `GuardFlex2025`)
- Varsayılan ayarları oluşturur

### 5. Development server'ı başlatın

```bash
# Frontend
npm run dev

# Backend (yeni terminal)
npm run server
```

## 📜 Komutlar

```bash
# Development
npm run dev              # Frontend development server
npm run server           # Backend server
npm run server:dev       # Backend with auto-reload

# Build
npm run build            # Production build
npm run preview          # Preview production build

# Database
npm run db:check         # MongoDB bağlantısını test et
npm run seed             # Veritabanını doldur
```

## 🌐 Deployment

### Vercel Deployment

1. GitHub repository'yi Vercel'e bağlayın
2. Environment Variables ekleyin:
   - `MONGODB_URI`
   - `PORT`
   - `NODE_ENV`
3. Vercel otomatik olarak deploy eder

### Domain Ayarları

- Custom domain eklemek için Vercel Dashboard → Settings → Domains
- DNS ayarlarını domain sağlayıcınızda yapılandırın

## 📁 Proje Yapısı

```
GuardFlex/
├── src/
│   ├── components/      # React bileşenleri
│   │   ├── admin/      # Admin panel bileşenleri
│   │   └── ui/         # UI bileşenleri
│   ├── pages/          # Sayfa bileşenleri
│   ├── assets/         # Görseller ve medya
│   └── utils/          # Utility fonksiyonları
├── server/
│   ├── models/         # MongoDB modelleri
│   ├── routes/         # API route'ları
│   ├── config/         # Yapılandırma dosyaları
│   └── scripts/        # Seed ve utility script'leri
├── public/             # Statik dosyalar
└── vercel.json         # Vercel yapılandırması
```

## 🔐 Admin Panel

- **URL:** `/admin`
- **Username:** `GuardFlex`
- **Password:** `GuardFlex2025`

Admin panelinden:
- Ürünleri yönetebilirsiniz
- İletişim formlarını görüntüleyebilirsiniz
- Site ayarlarını düzenleyebilirsiniz
- Galeri görsellerini yönetebilirsiniz

## 📊 API Endpoints

- `GET /api/products` - Tüm ürünleri getir
- `GET /api/products/:id` - Tek ürün getir
- `POST /api/contact` - İletişim formu gönder
- `GET /api/admin/settings` - Site ayarlarını getir
- `POST /api/admin/login` - Admin girişi

## 🎨 Özellikler

### Görsel Optimizasyonları
- Hero image preloading
- Lazy loading
- Responsive images (`sizes` attribute)
- Content Visibility API
- Intersection Observer

### SEO
- Meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Canonical URLs

## 🐛 Sorun Giderme

### MongoDB Bağlantı Sorunu
```bash
npm run db:check
```

### Build Hatası
```bash
npm run build
```

### Port Çakışması
`.env` dosyasında `PORT` değerini değiştirin.

## 📝 Lisans

ISC

## 👥 Katkıda Bulunanlar

- [doguozan](https://github.com/doguozan)

## 🔗 Linkler

- **Canlı Site:** https://guardflex.ch
- **Admin Panel:** https://guardflex.ch/admin
- **GitHub:** https://github.com/doguozan/Guardflex

## 📞 İletişim

- **Email:** guard.flex@hotmail.com
- **Telefon:** +41 765230726
- **WhatsApp:** +41 765230726

---

**GuardFlex** - Massgeschneiderte Lösungen für jeden Bedarf
