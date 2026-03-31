// Database Seeding Script
// Run with: node server/scripts/seedDatabase.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';
import { products } from '../../src/data/products.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');
    
    // Seed Products
    const productPromises = products.map(product => {
      return Product.findOneAndUpdate(
        { id: product.id },
        product,
        { upsert: true, new: true }
      );
    });
    
    await Promise.all(productPromises);
    console.log(`✅ Seeded ${products.length} products`);
    
    // Seed Admin User (if doesn't exist)
    const adminExists = await Admin.findOne({ username: 'GuardFlex' });
    if (!adminExists) {
      await Admin.create({
        username: 'GuardFlex',
        password: 'GuardFlex2025',
        email: 'guard.flex@hotmail.com',
        role: 'superadmin'
      });
      console.log('✅ Created admin user');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
    
    // Seed Settings (if doesn't exist)
    const settingsExists = await Settings.findOne();
    if (!settingsExists) {
      const { LEGAL_PLACEHOLDERS } = await import('../../src/data/siteContentDefaults.js');
      await Settings.create({
        siteName: 'GuardFlex',
        contactInfo: {
          email: 'guard.flex@hotmail.com',
          phone: '+41 765230726',
          address: 'Solothurn, Switzerland',
          whatsapp: '41765230726',
          formTitle: 'Kontaktieren Sie uns',
          formDescription:
            'Haben Sie Fragen oder möchten Sie ein kostenloses Angebot erhalten? Wir sind für Sie da!',
        },
        hero: {
          badge: 'Qualität aus der Schweiz',
          headline:
            'Massgefertigte Lösungen für Insektenschutz, Sonnenschutz und Sichtschutz',
          title: 'Massgeschneiderte Fliegengitter-, Sonnenschutz- und Plissee-Lösungen',
          description: 'Wir sind Ihr vertrauenswürdiger Partner in Ihrer Nähe für individuell gestaltete Fliegengitter, Sonnenschutz und Plissee-Lösungen!',
          features: [
            { title: '100% Qualität', subtitle: 'Garantiert' },
            { title: '2 Jahre Produkt-&', subtitle: 'Servicegarantie' },
            { title: 'Preisgarantie', subtitle: 'Beste Angebote' }
          ]
        },
        legal: {
          datenschutz: LEGAL_PLACEHOLDERS.datenschutz,
          impressum: LEGAL_PLACEHOLDERS.impressum,
          agb: LEGAL_PLACEHOLDERS.agb,
        },
      });
      console.log('✅ Created default settings');
    } else {
      console.log('ℹ️ Settings already exist');
    }
    
    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();

