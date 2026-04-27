/**
 * Yeni admin şifresi ayarlar (bcrypt, Admin modeli ile aynı).
 * Canlı/localhost: .env içinde MONGODB_URI olmalı.
 *
 * Kullanım:
 *   node server/scripts/resetAdminPassword.js --username GuardFlex --password "GüvenliSifre123"
 *   veya (shell geçmişine yazmamak için):
 *   $env:ADMIN_NEW_PASSWORD="GüvenliSifre123"; node server/scripts/resetAdminPassword.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Admin from '../models/Admin.js';

dotenv.config();

function parseArgs(argv) {
  const out = { username: 'GuardFlex', password: null };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === '--username' && argv[i + 1]) {
      out.username = argv[i + 1];
      i += 1;
    } else if (argv[i] === '--password' && argv[i + 1]) {
      out.password = argv[i + 1];
      i += 1;
    }
  }
  if (!out.password) {
    out.password = process.env.ADMIN_NEW_PASSWORD?.trim() || null;
  }
  return out;
}

async function main() {
  const { username, password } = parseArgs(process.argv);

  if (!password) {
    console.error(`
Eksik şifre. Örnek:
  node server/scripts/resetAdminPassword.js --username ${username} --password "YeniSifre"

PowerShell (şifre geçmişe yazılmaz):
  $env:ADMIN_NEW_PASSWORD="YeniSifre"; node server/scripts/resetAdminPassword.js
`);
    process.exit(1);
  }

  await connectDB();

  const admin = await Admin.findOne({ username: username.trim() });
  if (!admin) {
    const others = await Admin.find({}, { username: 1 }).lean();
    console.error(
      `Kullanıcı bulunamadı: "${username}"`,
      others.length
        ? `\nMevcut kullanıcı adları: ${others.map((a) => a.username).join(', ')}`
        : '\nVeritabanında admin yok; önce: npm run seed (veya Admin kaydı ekleyin).'
    );
    await mongoose.connection.close();
    process.exit(1);
  }

  admin.password = password;
  await admin.save();

  console.log(`✅ "${admin.username}" için şifre güncellendi.`);
  await mongoose.connection.close();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
