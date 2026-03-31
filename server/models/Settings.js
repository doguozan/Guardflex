// Site Settings Model
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'GuardFlex'
  },
  contactInfo: {
    email: {
      type: String,
      default: 'guard.flex@hotmail.com'
    },
    phone: {
      type: String,
      default: '+41 765230726'
    },
    address: {
      type: String,
      default: 'Solothurn, Switzerland'
    },
    whatsapp: {
      type: String,
      default: '41765230726'
    },
    formTitle: {
      type: String,
      default: 'Kontaktieren Sie uns'
    },
    formDescription: {
      type: String,
      default:
        'Wir melden uns innerhalb von 24 Stunden bei Ihnen.'
    }
  },
  hero: {
    badge: String,
    title: String,
    description: String,
    image: String,
    features: [{
      title: String,
      subtitle: String
    }]
  },
  socialMedia: {
    instagram: String,
    facebook: String
  },
  /** Öffentliche Seiteninhalte (JSON), Admin-Editoren */
  cms: {
    type: mongoose.Schema.Types.Mixed,
    default: () => ({})
  },
  /** Datenschutz, Impressum, AGB (HTML) */
  legal: {
    datenschutz: { type: String, default: '' },
    impressum: { type: String, default: '' },
    agb: { type: String, default: '' }
  }
}, {
  timestamps: true
});

// Only one settings document should exist
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;

