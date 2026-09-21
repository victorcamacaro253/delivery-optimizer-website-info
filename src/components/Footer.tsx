import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  FileText,
  Leaf,
  Mail,
  Globe,
} from 'lucide-react';

const Footer = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.deliveryOptimizer?.[language] || texts?.deliveryOptimizer?.es || {};
  const footer = data.footer || {};

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: footer.navHome || 'Inicio', path: '/' },
    { name: footer.navFuture || 'Futuro', path: '/future-of-delivery' },
    { name: footer.navHowItWorks || 'Cómo funciona', path: '/Como-funciona' },
    { name: footer.navSimulation || 'Simulación', path: '/simulation' },
    { name: footer.navArchitecture || 'Arquitectura', path: '/architecture' },
  ];

  const resourceLinks = [
    { name: footer.resourceDocs || 'Documentación Técnica', path: '/docs', icon: FileText },
    { name: footer.resourceAIBreakdown || 'Desglose de IA', path: '/docs/ai', icon: FileText },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Columna 1: Marca y Misión */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-blue-600 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img
                  src="/images/logo_s.png"
                  alt="Delivery AI Logo"
                  className="relative w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{footer.brandName || 'Delivery AI'}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">{footer.brandTagline || 'Last-Mile Optimizer'}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {footer.mission || 'Transformando la logística de última milla con inteligencia artificial híbrida y flotas 100% eléctricas.'}
            </p>

            {/* Badge de Sostenibilidad */}
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-900/30 border border-green-800 rounded-lg">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-green-400">{footer.sustainabilityBadge || '~100kg CO₂ evitados'}</span>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-white font-semibold mb-6">{footer.navTitle || 'Explorar'}</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h4 className="text-white font-semibold mb-6">{footer.resourcesTitle || 'Recursos'}</h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto y Redes */}
          <div>
            <h4 className="text-white font-semibold mb-6">{footer.connectTitle || 'Conecta'}</h4>
            <div className="space-y-4">
              
              {/* Correo Electrónico */}
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="mailto:victorcamacaro253@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                  victorcamacaro253@gmail.com
                </a>
              </div>

              {/* Sitio Web Personal */}
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a 
                  href="https://victorcamacaro.pages.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-400 transition-colors"
                >
                  victorcamacaro.pages.dev
                </a>
              </div>

              {/* Redes Sociales */}
              <div className="flex gap-3 pt-4">
                {/* GitHub */}
                <a
                  href="https://github.com/victorcamacaro253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/victorcamacaro1999/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            {(footer.copyright || '© {year} Victor Camacaro. Todos los derechos reservados.').replace('{year}', currentYear.toString())}
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            {footer.devNotePrefix || 'Desarrollado con'} <span className="text-red-500">♥</span> {footer.devNoteSuffix || 'React, Tailwind CSS y 5 ramas de IA.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;