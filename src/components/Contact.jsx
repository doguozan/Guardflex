import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { api } from '../utils/api';
import { useSiteContent } from '../context/SiteContentContext';

function digitsOnly(s) {
  return String(s || '').replace(/\D/g, '');
}

export function Contact() {
  const { site } = useSiteContent();
  const ci = site.contactInfo || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const wa = digitsOnly(ci.whatsapp || '41765230726');

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${wa}?text=${encodeURIComponent('Hallo, ich interessiere mich für Ihre Fliegengitter-Lösungen.')}`,
      '_blank'
    );
  };

  const phoneDisplay = ci.phone || '+41 765230726';
  const phoneTel = `+${digitsOnly(ci.phone || '41765230726')}`;
  const emailAddr = ci.email || 'guard.flex@hotmail.com';

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">{ci.formTitle || 'Kontaktieren Sie uns'}</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            {ci.formDescription ||
              'Haben Sie Fragen oder möchten Sie ein kostenloses Angebot erhalten? Wir sind für Sie da!'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-gray-900 mb-6 text-lg sm:text-xl">Nehmen Sie Kontakt auf</h3>
            <p className="text-gray-600 mb-8 text-sm">
              Unser Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung oder ein individuelles Angebot.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Telefon</p>
                  <a href={`tel:${phoneTel}`} className="text-gray-600 hover:text-emerald-500">
                    {phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-900 mb-1">E-Mail</p>
                  <a href={`mailto:${emailAddr}`} className="text-gray-600 hover:text-emerald-500">
                    {emailAddr}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-900 mb-1">Standort</p>
                  <p className="text-gray-600">
                    {ci.address || 'Solothurn, Switzerland'}
                    <br />
                    Wir bedienen die ganze Region
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] text-white px-8 py-4 rounded-xl hover:bg-[#20BD5A] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              <MessageCircle size={24} />
              <span>Direkt über WhatsApp kontaktieren</span>
            </button>

            {/* Opening Hours */}
            <div className="mt-8 bg-white border border-gray-200 p-6 rounded-xl">
              <h4 className="text-gray-900 mb-4">Öffnungszeiten</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span>08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span>09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag</span>
                  <span>Geschlossen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-lg">
            <h3 className="text-gray-900 mb-6 text-lg sm:text-xl">Anfrage senden</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <p className="text-emerald-400">
                  Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.
                </p>
              </div>
            )}

            {submitStatus === 'error' && error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                  placeholder="Ihr vollständiger Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                  placeholder="ihre.email@beispiel.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                  placeholder="+41 765230726"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-400"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Nachricht senden</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Full-width Google Maps - Standort Solothurn */}
      <div className="w-full mt-12" style={{ height: 450 }}>
        <iframe
          title="GuardFlex Standort - Solothurn, Switzerland"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43269.4!2d7.5328!3d47.2075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479030a1b8c0e9e1%3A0x12a0e0c0e0c0e0c0!2sSolothurn%2C%20Switzerland!5e0!3m2!1sde!2sch!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

