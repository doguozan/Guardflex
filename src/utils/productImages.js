// Ürün resimlerini dinamik olarak yüklemek için utility
// Vite production build'de assets klasöründeki dosyaları otomatik olarak işler

// Tüm ürün resimlerini statik olarak import et (Vite build'de hash'lenir)
const productImageModules = import.meta.glob('/src/assets/GuardFlex-urunler/**/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default'
});

// Path mapping oluştur - daha esnek eşleştirme için
const imagePathMap = {};
const imageFileNameMap = {};

for (const [path, module] of Object.entries(productImageModules)) {
  // Path'i normalize et
  const normalizedPath = path
    .replace(/\\/g, '/')
    .replace('/src/assets/GuardFlex-urunler/', '/GuardFlex-urunler/');
  
  // Tam path mapping
  imagePathMap[normalizedPath] = module;
  
  // Dosya adına göre mapping (fallback için)
  const fileName = path.split('/').pop();
  if (fileName) {
    imageFileNameMap[fileName] = module;
  }
  
  // Path'in son kısmını da ekle (klasör + dosya adı)
  const pathParts = normalizedPath.split('/');
  if (pathParts.length >= 2) {
    const lastTwoParts = pathParts.slice(-2).join('/');
    imagePathMap[lastTwoParts] = module;
  }
}

/**
 * Path'i normalize et ve eşleştir
 */
const normalizePath = (path) => {
  return path
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/') // Çoklu slash'leri tek slash'a çevir
    .trim();
};

/**
 * Path'i dosya adına göre bul
 */
const findImageByFileName = (imagePath) => {
  const fileName = imagePath.split('/').pop();
  if (fileName && imageFileNameMap[fileName]) {
    return imageFileNameMap[fileName];
  }
  return null;
};

/**
 * Ürün resmini getiren fonksiyon
 * Vite'ın asset handling mekanizmasını kullanır
 * 
 * @param {string} imageAsset - Resim path'i (/GuardFlex-urunler/... veya figma:asset/...)
 * @returns {string} - Resim URL'i
 */
export const getProductImage = (imageAsset) => {
  if (!imageAsset || typeof imageAsset !== 'string') {
    console.warn('getProductImage: Empty or invalid imageAsset', imageAsset);
    return '';
  }

  // Eğer zaten bir tam URL ise direkt döndür
  if (imageAsset.startsWith('http://') || imageAsset.startsWith('https://') || imageAsset.startsWith('data:')) {
    return imageAsset;
  }

  // Path'i normalize et
  const normalizedAsset = normalizePath(imageAsset);
  
  // Debug için (hem development hem production'da - mobil debug için)
  console.log('getProductImage:', { 
    imageAsset, 
    normalizedAsset, 
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    baseUrl: import.meta.env.BASE_URL
  });

  // /GuardFlex-urunler/ ile başlıyorsa
  if (normalizedAsset.startsWith('/GuardFlex-urunler/') || normalizedAsset.startsWith('GuardFlex-urunler/')) {
    // Path'i normalize et (başındaki / olmadan da çalışsın)
    const cleanPath = normalizedAsset.startsWith('/') ? normalizedAsset : '/' + normalizedAsset;
    
    // Önce tam path ile ara (build time'da hash'lenmiş asset'ler için)
    if (imagePathMap[cleanPath]) {
      return imagePathMap[cleanPath];
    }
    
    // Path'in son kısmıyla ara (klasör + dosya)
    const pathParts = cleanPath.split('/').filter(p => p);
    if (pathParts.length >= 2) {
      const lastTwoParts = '/' + pathParts.slice(-2).join('/');
      if (imagePathMap[lastTwoParts]) {
        return imagePathMap[lastTwoParts];
      }
    }
    
    // Dosya adına göre ara
    const foundByFileName = findImageByFileName(cleanPath);
    if (foundByFileName) {
      return foundByFileName;
    }
    
    // Public klasöründeki dosyalar için direkt path kullan
    // Public klasörü build'de root'a kopyalanır, bu yüzden path aynı kalır
    // Mobil ve desktop'ta çalışması için mutlak path kullan
    
    // Production'da: Public folder'daki dosyalar root'a kopyalanır
    // Development'ta: Vite dev server public folder'ı serve eder
    // Her iki durumda da mutlak path (/GuardFlex-urunler/...) çalışır
    
    // Mobil cihazlarda da çalışması için mutlak path kullan
    // Base URL ekleme (zaten root'tan başlıyor)
    // Ancak production'da base URL'i kontrol et
    const baseUrl = import.meta.env.BASE_URL || '';
    const finalPath = baseUrl ? baseUrl.replace(/\/$/, '') + cleanPath : cleanPath;
    
    return finalPath;
  }

  // figma:asset/ formatı için
  if (normalizedAsset.startsWith('figma:asset/')) {
    // GuardFlex-urunler içeriyorsa
    if (normalizedAsset.includes('GuardFlex-urunler')) {
      const cleanPath = normalizedAsset.replace('figma:asset/', '/GuardFlex-urunler/');
      return getProductImage(cleanPath);
    }
    
    // Diğer figma asset'leri için
    const cleanPath = normalizedAsset.replace('figma:asset/', '/src/assets/');
    try {
      return new URL(cleanPath, import.meta.url).href;
    } catch (e) {
      return normalizedAsset;
    }
  }

  // /src/assets/ ile başlıyorsa
  if (normalizedAsset.startsWith('/src/assets/')) {
    try {
      if (import.meta.env.DEV) {
        return normalizedAsset;
      }
      return new URL(normalizedAsset, import.meta.url).href;
    } catch (e) {
      // Fallback: base URL ile birleştir
      const baseUrl = import.meta.env.BASE_URL || '/';
      return baseUrl + normalizedAsset.replace('/src/', '');
    }
  }

  // Fallback: direkt path'i döndür
  return normalizedAsset;
};

