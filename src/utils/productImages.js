// Ürün resimlerini dinamik olarak yüklemek için utility
// Vite production build'de assets klasöründeki dosyaları otomatik olarak işler

// Tüm ürün resimlerini statik olarak import et (Vite build'de hash'lenir)
const productImageModules = import.meta.glob('/src/assets/GuardFlex-urunler/**/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default'
});

// Path mapping oluştur
const imagePathMap = {};
for (const [path, module] of Object.entries(productImageModules)) {
  // Path'i normalize et ve mapping'e ekle
  const normalizedPath = path
    .replace(/\\/g, '/')
    .replace('/src/assets/GuardFlex-urunler/', '/GuardFlex-urunler/');
  imagePathMap[normalizedPath] = module;
  
  // Dosya adına göre de mapping ekle (fallback için)
  const fileName = path.split('/').pop();
  if (fileName) {
    imagePathMap[fileName] = module;
  }
}

/**
 * Ürün resmini getiren fonksiyon
 * Vite'ın asset handling mekanizmasını kullanır
 * 
 * @param {string} imageAsset - Resim path'i (/GuardFlex-urunler/... veya figma:asset/...)
 * @returns {string} - Resim URL'i
 */
export const getProductImage = (imageAsset) => {
  if (!imageAsset || typeof imageAsset !== 'string') {
    return '';
  }

  // Eğer zaten bir tam URL ise direkt döndür
  if (imageAsset.startsWith('http://') || imageAsset.startsWith('https://') || imageAsset.startsWith('data:')) {
    return imageAsset;
  }

  // /GuardFlex-urunler/ ile başlıyorsa
  if (imageAsset.startsWith('/GuardFlex-urunler/')) {
    // Önce mapping'de ara
    if (imagePathMap[imageAsset]) {
      return imagePathMap[imageAsset];
    }
    
    // Mapping'de yoksa, Vite'ın asset handling'i için src/assets path'ine dönüştür
    const assetPath = imageAsset.replace('/GuardFlex-urunler/', '/src/assets/GuardFlex-urunler/');
    
    try {
      // Vite'ın import.meta.url ile asset'i yükle
      // Production build'de Vite bu path'i otomatik olarak çözümler ve hash'ler
      const url = new URL(assetPath, import.meta.url);
      return url.href;
    } catch (e) {
      // Fallback: direkt path (development'ta çalışabilir)
      if (import.meta.env.DEV) {
        return assetPath;
      }
      // Production'da base URL ile birleştir
      const baseUrl = import.meta.env.BASE_URL || '/';
      return baseUrl + 'assets' + imageAsset;
    }
  }

  // figma:asset/ formatı için
  if (imageAsset.startsWith('figma:asset/')) {
    // GuardFlex-urunler içeriyorsa
    if (imageAsset.includes('GuardFlex-urunler')) {
      const cleanPath = imageAsset.replace('figma:asset/', '/GuardFlex-urunler/');
      return getProductImage(cleanPath);
    }
    
    // Diğer figma asset'leri için
    const cleanPath = imageAsset.replace('figma:asset/', '/src/assets/');
    try {
      return new URL(cleanPath, import.meta.url).href;
    } catch (e) {
      return imageAsset;
    }
  }

  // /src/assets/ ile başlıyorsa
  if (imageAsset.startsWith('/src/assets/')) {
    try {
      return new URL(imageAsset, import.meta.url).href;
    } catch (e) {
      // Fallback: base URL ile birleştir
      const baseUrl = import.meta.env.BASE_URL || '/';
      return baseUrl + imageAsset.replace('/src/', '');
    }
  }

  // Fallback: direkt path'i döndür
  return imageAsset;
};

