import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Settings, Database, Cpu, Map, LayoutDashboard,
  Calculator, Brain, GitBranch, Hexagon, Network,
  Zap, TrendingUp, Package, AlertTriangle, Truck,
  Layers, CheckCircle2, ArrowRight, FileText,
  ChevronRight
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Settings, Database, Cpu, Map, LayoutDashboard,
  Calculator, Brain, GitBranch, Hexagon, Network,
  Zap, TrendingUp, Package, AlertTriangle, Truck,
  Layers, CheckCircle2, ArrowRight, FileText,
  ChevronRight
};

const Architecture = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.deliveryOptimizer?.[language] || texts?.deliveryOptimizer?.es || {};

  const getIcon = (name: string) => iconMap[name] || Cpu;

  const getColorBg = (color: string) => {
    const map: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      cyan: 'bg-cyan-100 text-cyan-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      emerald: 'bg-emerald-100 text-emerald-600'
    };
    return map[color] || map.blue;
  };

  const getBorderHover = (color: string) => {
    const map: Record<string, string> = {
      blue: 'hover:border-blue-400',
      cyan: 'hover:border-cyan-400',
      purple: 'hover:border-purple-400',
      green: 'hover:border-green-400',
      orange: 'hover:border-orange-400',
      red: 'hover:border-red-400',
      emerald: 'hover:border-emerald-400'
    };
    return map[color] || map.blue;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
            {/* ============ HERO ============ */}
      <section className="relative py-32 overflow-hidden bg-gray-50">
        
        {/* ============ IMAGEN DE FONDO ============ */}
        <img 
          src="/images/system1.jpg" 
          alt="Arquitectura del Sistema" 
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* ============ DEGRADADO SUPERPUESTO (OVERLAY) ============ */}
        {/* Gradiente más opaco para garantizar la legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/70 to-blue-50/80"></div>
        
        {/* Blur sutil para suavizar la imagen y que no compita con el texto */}
        <div className="absolute inset-0 "></div>
        
        {/* Capa adicional de blanco para áreas críticas */}
        <div className="absolute inset-0 bg-white/20"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
            <Settings className="w-4 h-4" />
            {data.archBadge}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            {data.archTitle}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            {data.archSubtitle}
          </p>
        </div>
      </section>

      {/* ============ 5 CAPAS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.archLayersTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.archLayersSubtitle}</p>
          </div>

          <div className="space-y-4">
            {(data.archLayers || []).map((layer: any, idx: number) => {
              const Icon = getIcon(layer.icon);
              return (
                <div key={idx} className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Número e Icono */}
                    <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                      <div className="text-3xl font-mono font-bold text-gray-300 group-hover:text-blue-600 transition-colors">
                        {layer.number}
                      </div>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorBg(layer.color)} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-gray-900">{layer.name}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono text-gray-600 border border-gray-200">
                          {layer.folder}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{layer.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STACK DE IA ============ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
              <Brain className="w-4 h-4" />
              {data.archStackTitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.archStackSubtitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data.archStack || []).map((item: any, idx: number) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={idx} className={`group relative bg-white rounded-2xl p-6 border border-gray-200 ${getBorderHover(item.color)} transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-lg`}>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${getColorBg(item.color)} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                  <div className="text-xs font-mono text-gray-500 mb-3 px-2 py-1 bg-gray-50 rounded inline-block">
                    {item.tech}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FLUJO DE DATOS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.archFlowTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.archFlowSubtitle}</p>
          </div>

          <div className="relative">
            {/* Línea conectora desktop */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-emerald-200 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {(data.archFlow || []).map((step: any, idx: number) => {
                const Icon = getIcon(step.icon);
                return (
                  <div key={idx} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getColorBg(step.color)} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-gray-300 group-hover:text-blue-600 transition-colors">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DECISIONES TÉCNICAS ============ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.archDecisionsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.archDecisionsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data.archDecisions || []).map((decision: any, idx: number) => {
              const Icon = getIcon(decision.icon);
              return (
                <div key={idx} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{decision.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{decision.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ RETOS SUPERADOS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.archChallengesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.archChallengesSubtitle}</p>
          </div>

          <div className="space-y-6">
            {(data.archChallenges || []).map((challenge: any, idx: number) => (
              
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-red-300 transition-all">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider"> {data.challengeProblem || 'Problema'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{challenge.problem}</h3>
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider"> {data.challengeSolution || 'Solución'}</span>
                        <p className="text-gray-700 text-sm mt-1">{challenge.solution}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3 border-t border-gray-200">
                      <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{data.challengeLesson || 'Lección'}</span>
                        <p className="text-gray-700 text-sm mt-1">{challenge.lesson}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{data.archCtaTitle}</h2>
          <p className="text-xl text-blue-100 mb-8">{data.archCtaDescription}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/victorcamacaro253/delivery-route-optimizer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:scale-105 transition-all shadow-xl"
            >
              
            </a>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-800/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-blue-800/30 transition-all"
            >
              <FileText className="w-5 h-5" />
              {data.archCtaDocs}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Architecture;