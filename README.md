# GuardFlex

**Fliegengitter, Sonnenschutz & Plissee Lösungen aus der Schweiz**

GuardFlex, İsviçre'den özel tasarım sineklik, güneş koruması ve plise çözümleri sunan modern bir web uygulaması.

Özellikler

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
Proje Yapısı
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



 API Endpoints

- `GET /api/products` - Tüm ürünleri getir
- `GET /api/products/:id` - Tek ürün getir
- `POST /api/contact` - İletişim formu gönder
- `GET /api/admin/settings` - Site ayarlarını getir
- `POST /api/admin/login` - Admin girişi Özellikler

### SEO
- Meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Canonical URL

Katkıda Bulunanlar:

- [doguozan](https://github.com/doguozan)

Linkler

- **Canlı Site:** https://guardflex.ch
- **Admin Panel:** https://guardflex.ch/admin
- **GitHub:** https://github.com/doguozan/Guardflex




**GuardFlex** - Massgeschneiderte Lösungen für jeden Bedarf
