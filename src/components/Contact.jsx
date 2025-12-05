import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/41765230726?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Fliegengitter-Lösungen.', '_blank');
  };

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white mb-4">Kontaktieren Sie uns</h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Haben Sie Fragen oder möchten Sie ein kostenloses Angebot erhalten? Wir sind für Sie da!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-white mb-6 text-lg sm:text-xl">Nehmen Sie Kontakt auf</h3>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">
              Unser Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung oder ein individuelles Angebot.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-white mb-1">Telefon</p>
                  <a href="tel:+41765230726" className="text-gray-400 hover:text-emerald-500">
                    +41 765230726
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-white mb-1">E-Mail</p>
                  <a href="mailto:guard.flex@hotmail.com" className="text-gray-400 hover:text-emerald-500">
                    guard.flex@hotmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-white mb-1">Standort</p>
                  <p className="text-gray-400">
                    Solothurn, Switzerland<br />
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
            <div className="mt-8 bg-[#1a1a1a] border border-white/10 p-6 rounded-xl">
              <h4 className="text-white mb-4">Öffnungszeiten</h4>
              <div className="space-y-2 text-gray-400">
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
          <div className="bg-[#1a1a1a] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-lg">
            <h3 className="text-white mb-6 text-lg sm:text-xl">Anfrage senden</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <p className="text-emerald-400">
                  Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#252525] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                  placeholder="Ihr vollständiger Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#252525] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                  placeholder="ihre.email@beispiel.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#252525] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                  placeholder="+41 765230726"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#252525] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-500"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
    </section>
  );
}

