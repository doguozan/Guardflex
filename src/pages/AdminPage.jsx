import { useState } from 'react';
import { 
  Home, 
  Package, 
  Briefcase, 
  Award, 
  Image as ImageIcon, 
  Clock, 
  Mail, 
  Settings, 
  Menu,
  X,
  LogOut,
  Lock,
  User
} from 'lucide-react';
import { AdminHome } from '../components/admin/AdminHome';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminServices } from '../components/admin/AdminServices';
import { AdminBenefits } from '../components/admin/AdminBenefits';
import { AdminGallery } from '../components/admin/AdminGallery';
import { AdminHistory } from '../components/admin/AdminHistory';
import { AdminContact } from '../components/admin/AdminContact';
import { AdminSettings } from '../components/admin/AdminSettings';

const CORRECT_USERNAME = 'GuardFlex';
const CORRECT_PASSWORD = 'GuardFlex2025';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Startseite', icon: Home },
    { id: 'products', label: 'Produkte', icon: Package },
    { id: 'services', label: 'Dienstleistungen', icon: Briefcase },
    { id: 'benefits', label: 'Vorteile', icon: Award },
    { id: 'gallery', label: 'Galerie', icon: ImageIcon },
    { id: 'history', label: 'Geschichte', icon: Clock },
    { id: 'contact', label: 'Kontakt', icon: Mail },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else if (username === CORRECT_USERNAME && password !== CORRECT_PASSWORD) {
      // Sadece şifre yanlış olduğunda hata göster
      setError('Passwort ist falsch');
      setPassword('');
    } else {
      // Kullanıcı adı yanlışsa sessizce reddet (güvenlik için)
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <AdminHome />;
      case 'products':
        return <AdminProducts />;
      case 'services':
        return <AdminServices />;
      case 'benefits':
        return <AdminBenefits />;
      case 'gallery':
        return <AdminGallery />;
      case 'history':
        return <AdminHistory />;
      case 'contact':
        return <AdminContact />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminHome />;
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div 
          className="bg-gray-900 rounded-2xl border border-gray-800 p-8 shadow-2xl"
          style={{ width: '400px', maxWidth: '90%' }}
        >
          <div className="flex flex-col items-center">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-full mb-4">
                <Lock className="text-emerald-500 mx-auto" size={40} />
              </div>
              <h2 className="text-white text-2xl mb-2">Admin Panel</h2>
              <p className="text-gray-400 text-sm">Bitte melden Sie sich an</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-full space-y-6 flex flex-col items-center">
              {/* Username Input */}
              <div className="w-[280px] flex flex-col items-center">
                <label className="block text-gray-300 mb-2 text-sm font-medium w-full">
                  Benutzername
                </label>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Benutzername eingeben"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="w-[280px] flex flex-col items-center">
                <label className="block text-gray-300 mb-2 text-sm font-medium w-full">
                  Passwort
                </label>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Passwort eingeben"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="w-[280px] bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <div className="pt-2 w-[280px] flex justify-center">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium text-lg shadow-lg hover:shadow-emerald-500/20"
                  style={{ width: '80px', height: '29px' }}
                >
                  Anmelden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-white">Admin Panel</h2>
            <p className="text-gray-400 text-sm mt-1">FliegengitterPro</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-emerald-500 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={20} />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-white hover:bg-gray-800 rounded-lg"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-white">
              {menuItems.find((item) => item.id === activeSection)?.label}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Admin User</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}
    </div>
  );
}

