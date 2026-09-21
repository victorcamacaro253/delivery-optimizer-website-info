import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  Activity,
  Menu,
  X,
  Zap,
  Radio,
  Settings
} from 'lucide-react';
import { LanguageContext } from '../context/languageContext';

const Navbar = () => {
  const { language, texts } = useContext(LanguageContext);
  
  // ✅ CORRECCIÓN AQUÍ: texts?.deliveryOptimizer?.[language]
  const data = texts?.deliveryOptimizer?.[language] || texts?.deliveryOptimizer?.es || {};
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Efecto de scroll para agregar sombra sutil
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: data.navHome || 'Inicio', icon: LayoutDashboard },
    { path: '/future-of-delivery', label: data.navFuture || 'Futuro de las Entregas', icon: Zap },
    { path: '/Como-funciona', label: data.navHowItWorks || 'Como funciona', icon: Brain },
    { path: '/simulation', label: data.navSimulation || 'Simulación', icon: Activity },
    { path: '/architecture', label: data.navArchitecture || 'Arquitectura', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200'
            : 'bg-white border-b border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* ============ LOGO ============ */}
            {/* ============ LOGO ============ */}
<Link to="/" className="flex items-center space-x-3 group">
  <div className="relative flex-shrink-0">
    {/* Efecto de brillo sutil detrás del logo (opcional, puedes quitarlo si tu logo ya tiene efectos) */}
    <div className="absolute inset-0 bg-blue-600 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
    
    {/* Tu logo personalizado */}
    <img 
      src="/images/logo_s.png" 
      alt="Delivery AI Logo" 
      className="relative w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  
  <div className="flex flex-col">
    <span className="text-xl font-bold text-gray-900 tracking-tight leading-none">
      {data.projectName || 'Delivery AI'}
    </span>
    <span className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-semibold mt-0.5">
      {data.projectTagline || 'Last-Mile Optimizer'}
    </span>
  </div>
</Link>

            {/* ============ DESKTOP MENU ============ */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 group ${
                      active
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative flex items-center space-x-2">
                      <Icon className={`w-4 h-4 transition-colors ${
                        active ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                      }`} />
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ============ CTA + STATUS ============ */}
            <div className="hidden md:flex items-center space-x-4">
            
              

              {/* Botón Dashboard */}
              <Link
                to="/simulation"
                className="relative group overflow-hidden px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* ============ MOBILE MENU BUTTON ============ */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ============ MOBILE MENU ============ */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-200 px-4 py-6 space-y-2 shadow-lg">
            {/* Status móvil */}
            <div className="flex items-center justify-between px-3 py-2 mb-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                <span className="text-xs font-semibold text-green-700">Live Routing</span>
              </div>
              <Radio className="w-4 h-4 text-green-600" />
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{link.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  )}
                </Link>
              );
            })}

            {/* CTA móvil */}
            <Link
              to="/simulation"
              className="flex items-center justify-center space-x-2 mt-4 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Ver Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer para compensar el navbar fijo */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;