# PowerShell script to translate Turkish commit messages to English
# This uses git filter-branch to rewrite commit history

Write-Host "Starting commit message translation..."
Write-Host "This will rewrite commit history!"
Write-Host ""

# Git filter-branch ile commit mesajlarını değiştir
# Her commit için mesajı kontrol et ve Türkçe ise İngilizce'ye çevir

$translations = @{
    "README.md eklendi - Proje dokümantasyonu" = "Add README.md - Project documentation"
    "AdminGallery düzeltmesi ve teknik dokümantasyon eklendi" = "Fix AdminGallery and add technical documentation"
    "AdminGallery düzeltmesi - Gerçek galeri görselleri ve videoları gösteriliyor" = "Fix AdminGallery - Display actual gallery images and videos"
    "vite.config.js manualChunks düzeltmesi - build hatası çözüldü" = "Fix vite.config.js manualChunks - Resolve build error"
    "Eksik dependency eklendi: @vitejs/plugin-react-swc" = "Add missing dependency: @vitejs/plugin-react-swc"
    "Node.js engine versiyonu eklendi - Vercel build hatası düzeltmesi" = "Add Node.js engine version - Fix Vercel build error"
    "MongoDB veritabanı kurulumu tamamlandı - package.json düzeltmeleri ve description güncellendi" = "Complete MongoDB database setup - Fix package.json and update description"
    "Mobil görsel yükleme performansı optimizasyonlarını - Hero preload, responsive images, decoding async, sizes attribute eklendi" = "Mobile image loading performance optimizations - Add Hero preload, responsive images, decoding async, sizes attribute"
    "Fix: Mobil menüdeki tüm linkler button'a çevrildi - tüm linkler dokunulduğunda çalışır durumda" = "Fix: Convert all mobile menu links to buttons - All links work on touch"
    "Fix: Mobil menüde Alle Produkte linki düzeltildi - Link yerine button kullanılarak manuel navigate eklendi" = "Fix: Fix Alle Produkte link in mobile menu - Use button instead of link with manual navigate"
    "Fix: Mobil menü linkleri düzeltildi - tüm linkler dokunulduğunda çalışır durumda, touch event'leri eklendi" = "Fix: Fix mobile menu links - All links work on touch, add touch events"
    "Hero section görsel görünürlüğü artırıldı: opacity 30'dan 70'e çıkarıldı, overlay 60'tan 40'a düşürüldü" = "Increase Hero section image visibility: opacity increased from 30 to 70, overlay reduced from 60 to 40"
    "Hero section ilk haline geri döndürüldü: responsive düzeltmeleri kaldırıldı, basit yapı geri getirildi" = "Revert Hero section to original state: Remove responsive fixes, restore simple structure"
    "Hero section kritik hata düzeltmesi: backgroundAttachment fixed kaldırıldı, backgroundSize her zaman cover, gereksiz CSS kaldırıldı" = "Fix Hero section critical error: Remove backgroundAttachment fixed, backgroundSize always cover, remove unnecessary CSS"
    "Hero section görsel görünürlüğü kritik düzeltme: overlay kaldırıldı, CSS background-image eklendi, visibility visible yapıldı" = "Fix Hero section image visibility critical fix: Remove overlay, add CSS background-image, make visibility visible"
}

Write-Host "Note: Git filter-branch is complex on Windows."
Write-Host "Using interactive rebase instead..."
Write-Host ""
Write-Host "Run: git rebase -i HEAD~30"
Write-Host "Then change 'pick' to 'reword' for Turkish commits"

