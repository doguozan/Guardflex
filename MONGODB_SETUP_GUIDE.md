# 🗄️ MongoDB Veritabanı Kurulum Rehberi

## 📋 İçindekiler
1. [MongoDB Atlas Hesabı Oluşturma](#adım-1-mongodb-atlas-hesabı-oluşturma)
2. [Cluster Oluşturma](#adım-2-cluster-oluşturma)
3. [Database User Oluşturma](#adım-3-database-user-oluşturma)
4. [Network Access Ayarlama](#adım-4-network-access-ayarlama)
5. [Connection String Alma](#adım-5-connection-string-alma)
6. [Projede .env Dosyası Oluşturma](#adım-6-projede-env-dosyası-oluşturma)
7. [Paketleri Yükleme](#adım-7-paketleri-yükleme)
8. [Veritabanını Seed Etme](#adım-8-veritabanını-seed-etme)
9. [Server'ı Başlatma ve Test Etme](#adım-9-serverı-başlatma-ve-test-etme)

---

## Adım 1: MongoDB Atlas Hesabı Oluşturma

1. **MongoDB Atlas'a gidin:**
   - Tarayıcınızda şu adresi açın: https://www.mongodb.com/cloud/atlas

2. **"Try Free" veya "Sign Up" butonuna tıklayın**

3. **Hesap oluşturun:**
   - Email adresinizi girin
   - Şifre oluşturun
   - Kullanıcı adınızı girin
   - Şartları kabul edin
   - "Create your Atlas account" butonuna tıklayın

4. **Email doğrulaması:**
   - Email'inize gelen doğrulama linkine tıklayın

---

## Adım 2: Cluster Oluşturma

1. **"Build a Database" butonuna tıklayın**

2. **Free tier seçin:**
   - "M0 FREE" seçeneğini seçin (ücretsiz)
   - "Create" butonuna tıklayın

3. **Cloud Provider ve Region seçin:**
   - AWS, Google Cloud veya Azure seçin
   - Size en yakın region'ı seçin (örn: Europe - Frankfurt)
   - "Create Cluster" butonuna tıklayın

4. **Cluster oluşturma işlemi:**
   - Cluster'ın oluşturulması 3-5 dakika sürebilir
   - "Create Cluster" butonuna tıklayın ve bekleyin

---

## Adım 3: Database User Oluşturma

1. **"Create Database User" ekranında:**
   - Authentication Method: "Password" seçin

2. **Kullanıcı bilgilerini girin:**
   - **Username:** `guardflex` (veya istediğiniz bir kullanıcı adı)
   - **Password:** Güçlü bir şifre oluşturun (örn: `GuardFlex2025!`)
   - ⚠️ **ÖNEMLİ:** Bu şifreyi bir yere not edin, tekrar göremeyeceksiniz!

3. **"Create Database User" butonuna tıklayın**

---

## Adım 4: Network Access Ayarlama

1. **"Add My Current IP Address" butonuna tıklayın**
   - Bu, bilgisayarınızın IP adresini otomatik ekler

2. **Alternatif olarak tüm IP'lere izin vermek için:**
   - "Add IP Address" butonuna tıklayın
   - "Allow Access from Anywhere" seçeneğini seçin
   - IP adresi: `0.0.0.0/0` olarak ayarlanır
   - "Confirm" butonuna tıklayın

3. **"Finish and Close" butonuna tıklayın**

---

## Adım 5: Connection String Alma

1. **Cluster sayfasında "Connect" butonuna tıklayın**

2. **"Connect your application" seçeneğini seçin**

3. **Connection string'i kopyalayın:**
   - Şu formatta bir string göreceksiniz:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Connection string'i düzenleyin:**
   - `<username>` yerine oluşturduğunuz kullanıcı adını yazın
   - `<password>` yerine oluşturduğunuz şifreyi yazın
   - Sonuna `/guardflex` ekleyin (veritabanı adı)
   
   **Örnek:**
   ```
   mongodb+srv://guardflex:GuardFlex2025!@cluster0.xxxxx.mongodb.net/guardflex?retryWrites=true&w=majority
   ```

5. **"Copy" butonuna tıklayarak kopyalayın**

---

## Adım 6: Projede .env Dosyası Oluşturma

1. **Proje klasörünüze gidin:**
   ```
   C:\Users\User\Desktop\GuardFlex
   ```

2. **Yeni bir dosya oluşturun:**
   - Dosya adı: `.env` (nokta ile başlamalı)
   - ⚠️ **Not:** Windows'ta nokta ile başlayan dosya oluşturmak için:
     - Notepad'i açın
     - Dosyayı kaydederken tırnak içinde `.env` yazın: `".env"`

3. **.env dosyasına şu içeriği ekleyin:**
   ```env
   # Server Configuration
   PORT=3001

   # MongoDB Connection String
   # Adım 5'te kopyaladığınız connection string'i buraya yapıştırın
   MONGODB_URI=mongodb+srv://guardflex:GuardFlex2025!@cluster0.xxxxx.mongodb.net/guardflex?retryWrites=true&w=majority
   ```

4. **Connection string'i güncelleyin:**
   - `cluster0.xxxxx.mongodb.net` kısmını kendi cluster adresinizle değiştirin
   - `guardflex` ve `GuardFlex2025!` kısımlarını kendi kullanıcı adı ve şifrenizle değiştirin

5. **Dosyayı kaydedin**

---

## Adım 7: Paketleri Yükleme

1. **Terminal/PowerShell'i açın**

2. **Proje klasörüne gidin:**
   ```bash
   cd C:\Users\User\Desktop\GuardFlex
   ```

3. **Paketleri yükleyin:**
   ```bash
   npm install
   ```

4. **Yükleme tamamlanana kadar bekleyin** (2-3 dakika sürebilir)

---

## Adım 8: Veritabanını Seed Etme

1. **Seed script'ini çalıştırın:**
   ```bash
   npm run seed
   ```

2. **Beklenen çıktı:**
   ```
   ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
   🌱 Starting database seeding...
   ✅ Cleared existing products
   ✅ Seeded 23 products
   ✅ Created admin user
   ✅ Created default settings
   🎉 Database seeding completed!
   ```

3. **Hata alırsanız:**
   - `.env` dosyasındaki connection string'i kontrol edin
   - MongoDB Atlas'ta network access ayarlarını kontrol edin
   - Kullanıcı adı ve şifrenin doğru olduğundan emin olun

---

## Adım 9: Server'ı Başlatma ve Test Etme

1. **Server'ı başlatın:**
   ```bash
   npm run server
   ```

2. **Beklenen çıktı:**
   ```
   ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
   🚀 Server running on http://localhost:3001
   ```

3. **Tarayıcıda test edin:**
   - `http://localhost:3001/api/health` adresine gidin
   - Şu çıktıyı görmelisiniz:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-12-05T..."
   }
   ```

4. **Ürünleri test edin:**
   - `http://localhost:3001/api/products` adresine gidin
   - Tüm ürünlerin listesini görmelisiniz

---

## ✅ Kontrol Listesi

- [ ] MongoDB Atlas hesabı oluşturuldu
- [ ] Cluster oluşturuldu (M0 FREE)
- [ ] Database user oluşturuldu
- [ ] Network access ayarlandı
- [ ] Connection string alındı ve kopyalandı
- [ ] `.env` dosyası oluşturuldu ve connection string eklendi
- [ ] `npm install` çalıştırıldı
- [ ] `npm run seed` çalıştırıldı ve başarılı oldu
- [ ] `npm run server` çalıştırıldı ve server başladı
- [ ] API endpoint'leri test edildi

---

## 🆘 Sorun Giderme

### Connection Error
- `.env` dosyasındaki connection string'i kontrol edin
- Kullanıcı adı ve şifrenin doğru olduğundan emin olun
- MongoDB Atlas'ta network access ayarlarını kontrol edin

### Authentication Failed
- Database user şifresini kontrol edin
- Connection string'deki `<username>` ve `<password>` kısımlarının doğru olduğundan emin olun

### Network Access Denied
- MongoDB Atlas'ta "Network Access" bölümüne gidin
- IP adresinizin ekli olduğundan emin olun
- Veya "0.0.0.0/0" ekleyerek tüm IP'lere izin verin

### Seed Script Hatası
- MongoDB bağlantısının çalıştığından emin olun
- `.env` dosyasının doğru konumda olduğundan emin olun
- Connection string'in sonunda `/guardflex` olduğundan emin olun

---

## 📞 Yardım

Sorun yaşarsanız:
1. Terminal çıktısını kontrol edin
2. MongoDB Atlas dashboard'da cluster durumunu kontrol edin
3. `.env` dosyasındaki connection string'i tekrar kontrol edin

