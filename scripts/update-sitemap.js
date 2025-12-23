// Sitemap.xml dosyasını otomatik olarak günceller
// Kullanım: node scripts/update-sitemap.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Bugünün tarihini ISO formatında al (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];

// Sitemap dosyasını oku
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Tüm lastmod tarihlerini güncelle
sitemap = sitemap.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

// Dosyayı kaydet
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log(`✅ Sitemap güncellendi: ${today}`);
console.log(`📄 Dosya: ${sitemapPath}`);

