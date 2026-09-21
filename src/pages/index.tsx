import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import {
  Zap, Route, Brain, Leaf, Truck, Clock,
  TrendingDown, MapPin, Battery, Package,
  ArrowRight, CheckCircle2, AlertTriangle,
  BarChart3, Cpu, GitBranch, Target,
  Lightbulb, ListChecks, Shield, Building,
  Calendar
} from 'lucide-react';
import DepotsMap from '../components/DepotsMap';


// Mapeo de nombres de string a componentes reales de Lucide
const iconMap: Record<string, any> = {
  AlertTriangle, Battery, TrendingDown, Clock, Route, Zap, MapPin, Package,
  Brain, Cpu, GitBranch, CheckCircle2, Leaf, Building, Truck, Target, ArrowRight, Lightbulb, ListChecks, Shield, BarChart3
};

const Home = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.deliveryOptimizer?.[language] || texts?.deliveryOptimizer?.es || {};

  // Funciones auxiliares para clases dinámicas de Tailwind
  const getColorClasses = (color: string) => {
  const map: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    white: { bg: 'bg-white/20', text: 'text-white' }
  };
  return map[color] || map.blue;
};

  const getVehicleColorClasses = (color: string) => {
    const map: Record<string, string> = {
      blue: 'from-blue-50 to-white border-blue-200 hover:border-blue-400',
      cyan: 'from-cyan-50 to-white border-cyan-200 hover:border-cyan-400',
      orange: 'from-orange-50 to-white border-orange-200 hover:border-orange-400'
    };
    return map[color] || map.blue;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />

            {/* 1. EL GANCHO: EL PROBLEMA REAL */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {(() => {
            const highlightWord = language === 'es' ? '"llega hoy"' : '"arrives today"';
            const parts = data.hookTitle ? data.hookTitle.split(highlightWord) : [data.hookTitle || "", ""];

            return (
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {parts[0]}
                <span className="text-blue-600">{highlightWord}</span>
                {parts[1]}
              </h2>
            );
          })()}
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {data.hookSubtitle}
          </p>

          {/* Preguntas y Micro-Respuestas */}
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-12">
            {(data.hookQuestions || []).map((item: any, idx: number) => {
              const Icon = iconMap['AlertTriangle'] || AlertTriangle;
              return (
                <div key={idx} className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">{item.question}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer.split(/(Machine Learning|E-VRP|OR-Tools|Q-Learning)/i).map((part: string, i: number) => 
                        /Machine Learning|E-VRP|OR-Tools|Q-Learning/i.test(part) ? (
                          <span key={i} className="font-semibold text-blue-700">{part}</span>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-lg text-blue-900 font-medium">
              {data.hookConclusion}
            </p>
          </div>
        </div>
      </section>

            {/* 2. LOS 7 PROBLEMAS REALES QUE RESOLVEMOS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.sevenProblemsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.sevenProblemsSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(data.sevenProblems || []).map((item: any, idx: number) => {
             
              const isLast = idx === (data.sevenProblems.length - 1);

              // Diseño especial para el último elemento (ocupa todo el ancho)
              if (isLast) {
                return (
                  <div key={idx} className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
                    {/* Imagen del 7mo problema con overlay */}
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-blue-900/40"></div>
                    </div>
                    
                    {/* Contenido del 7mo problema */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-white">
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-blue-100 text-lg mb-6 leading-relaxed">{item.desc}</p>
                      <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl w-fit">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                        <span className="font-semibold">{data.sevenProblemsBenefitTitle}: {item.benefit}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Diseño estándar para los primeros 6 problemas
              return (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
                  {/* Contenedor de la imagen con efecto zoom */}
                  <div className="h-48 w-full overflow-hidden relative">
                    <div className={`absolute inset-0 bg-${item.color}-500/10 z-10`}></div> {/* Tinte de color sutil */}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Contenido de la tarjeta */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{item.desc}</p>
                    
                    <div className={`pt-4 border-t border-gray-100 flex items-start gap-3`}>
                      <CheckCircle2 className={`w-5 h-5 text-${item.color}-600 flex-shrink-0 mt-0.5`} />
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">{data.sevenProblemsBenefitTitle}:</span>
                        <p className={`text-sm font-bold text-${item.color}-700 leading-snug`}>{item.benefit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CÓMO FUNCIONA LA MAGIA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{data.howItWorksTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.howItWorksSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200"></div>
            {(data.howItWorks || []).map((step: any, idx: number) => {
              const Icon = iconMap[step.icon] || Brain;
              return (
                <div key={idx} className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center z-10">
                  <div className={`w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm`}>
                    <Icon className={`w-8 h-8 text-${step.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. RESULTADOS REALES DE LA SIMULACIÓN */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-semibold mb-4">
              <CheckCircle2 className="w-4 h-4" /> Datos Reales de Ejecución
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{data.resultsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.resultsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {(data.resultsKpis || []).map((metric: any, idx: number) => {
              const Icon = iconMap[metric.icon] || CheckCircle2;
              return (
                <div key={idx} className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 group shadow-sm hover:shadow-lg">
                  <Icon className={`w-10 h-10 text-${metric.color}-600 mb-4 group-hover:scale-110 transition-transform`} />
                  <div className={`text-4xl font-bold text-${metric.color}-600 mb-2`}>{metric.value}</div>
                  <div className="text-gray-900 font-semibold mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-500">{metric.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(data.secondaryStats || []).map((stat: any, idx: number) => (
              <div key={idx} className={`bg-${['blue', 'cyan', 'green'][idx]}-50 rounded-2xl p-6 border border-${['blue', 'cyan', 'green'][idx]}-100 text-center`}>
                <div className={`text-3xl font-bold text-${['blue', 'cyan', 'green'][idx]}-700 mb-1`}>{stat.value}</div>
                <div className={`text-sm text-${['blue', 'cyan', 'green'][idx]}-900 font-medium`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DepotsMap />

      {/* 6. IMPACTO EN EL MUNDO REAL */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{data.impactTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.impactSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(data.impactSections || []).map((item: any, idx: number) => {
              const Icon = iconMap[item.icon] || Building;
              const colors = getColorClasses(item.color);
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {item.items.map((text: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* ============ CASOS DE USO EN EL MUNDO REAL ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4" />{data.useCaseScenario}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{data.useCasesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.useCasesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {(data.useCases || []).map((useCase: any, idx: number) => {
              const Icon = iconMap[useCase.icon] || Calendar;
              return (
                <div key={idx} className="group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Decoración de fondo */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${useCase.color}-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 group-hover:opacity-60 transition-opacity`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 bg-${useCase.color}-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-7 h-7 text-${useCase.color}-600`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{useCase.title}</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 w-20 flex-shrink-0">{data.useCaseProblem}:</span>
                        <p className="text-gray-700 text-sm leading-relaxed">{useCase.scenario}</p>
                      </div>
                      
                      <div className="flex gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 w-20 flex-shrink-0">{data.useCaseSolution}:</span>
                        <p className="text-gray-700 text-sm leading-relaxed">{useCase.solution}</p>
                      </div>

                      <div className={`mt-4 p-4 bg-${useCase.color}-50 rounded-xl border border-${useCase.color}-100`}>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`w-5 h-5 text-${useCase.color}-600 flex-shrink-0`} />
                          <span className={`text-sm font-bold text-${useCase.color}-800`}>{data.useCaseResult}: {useCase.result}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 7. MOTOR DE IA HÍBRIDA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
              <Cpu className="w-4 h-4" /> 
              {data.aiBadge}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight">
              {data.aiTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.aiSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {(data.aiBranches || []).map((branch: any, idx: number) => {
              const Icon = iconMap[branch.icon] || Cpu;
              const colors = getColorClasses(branch.color);
              
              return (
                <div key={idx} className="group relative">
                  {/* Badge numérico */}
                  <div className="absolute -top-3 -left-3 z-20 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-white group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>

                  {/* Tarjeta */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                    {/* Icono grande con estilo circular */}
                    <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>

                    {/* Título */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight text-center">
                      {branch.name}
                    </h3>

                    {/* Descripción */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow text-center">
                      {branch.desc}
                    </p>

                    {/* Línea decorativa inferior */}
                    <div className={`mt-6 h-1 w-12 rounded-full mx-auto bg-gradient-to-r ${branch.color === 'blue' ? 'from-blue-500 to-blue-600' : branch.color === 'cyan' ? 'from-cyan-500 to-cyan-600' : 'from-blue-500 to-cyan-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* 8. FLOTA ELÉCTRICA HETEROGÉNEA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{data.fleetTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.fleetSubtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(data.vehicles || []).map((vehicle: any, idx: number) => {
              // URLs de respaldo de Unsplash
              const fallbackImages = [
                "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop"
              ];
              const imageUrl = vehicle.image || fallbackImages[idx];

              // Traducción inline para no saturar el JSON con palabras sueltas
              const isEs = language === 'es';
              const labels = {
                range: isEs ? 'Autonomía' : 'Range',
                capacity: isEs ? 'Capacidad' : 'Capacity',
                carbon: isEs ? 'Huella de Carbono' : 'Carbon Footprint',
                zero: isEs ? 'Cero Emisiones' : 'Zero Emissions',
                low: isEs ? 'Bajas Emisiones' : 'Low Emissions',
                std: isEs ? 'Estándar' : 'Standard'
              };

              // Lógica para las barras de progreso y la etiqueta de emisiones
              const rangeWidth = vehicle.name.includes('Rivian') ? '85%' : vehicle.name.includes('Transit') ? '95%' : '100%';
              const capacityWidth = vehicle.name.includes('Rivian') ? '100%' : vehicle.name.includes('Transit') ? '60%' : '20%';
              
              let emissionLabel = labels.std;
              let emissionClass = 'bg-red-100 text-red-700';
              
              if (vehicle.name.includes('Rivian')) {
                emissionLabel = labels.zero;
                emissionClass = 'bg-green-100 text-green-700';
              } else if (vehicle.name.includes('Transit')) {
                emissionLabel = labels.low;
                emissionClass = 'bg-yellow-100 text-yellow-700';
              }

              return (
                <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Contenedor de Imagen */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img 
                      src={imageUrl} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    {/* Badge de Tipo */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-gray-200">
                      {vehicle.type}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Contenido de la Tarjeta */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{vehicle.name}</h3>
                    
                    <div className="space-y-5">
                      {/* Barra de Autonomía / Range */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500 font-medium flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> {labels.range}
                          </span>
                          <span className="font-bold text-gray-900">{vehicle.range}</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getColorClasses(vehicle.color).bg.replace('/20', '')}`} 
                            style={{ width: rangeWidth }}
                          ></div>
                        </div>
                      </div>

                      {/* Barra de Capacidad / Capacity */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500 font-medium flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${getColorClasses(vehicle.color).bg.replace('/20', '')}`}></span> {labels.capacity}
                          </span>
                          <span className="font-bold text-gray-900">{vehicle.capacity}</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${getColorClasses(vehicle.color).bg.replace('/20', '')}`} 
                            style={{ width: capacityWidth }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Footer de la tarjeta con dato extra */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{labels.carbon}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${emissionClass}`}>
                        {emissionLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. NUESTRA VISIÓN */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <Target className="w-3 h-3" /> {data.visionBadge}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.visionTitle}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {data.visionDesc}
                </p>
                <Link to="/docs" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Leer documentación técnica completa <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {(data.visionGoals || []).map((goal: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA FINAL */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{data.ctaTitle}</h2>
          <p className="text-xl text-blue-100 mb-8">{data.ctaDescription}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://github.com/victorcamacaro253/delivery-route-optimizer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:scale-105 transition-all shadow-xl">
              {data.ctaGithub}
            </a>
            <Link to="/simulation" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-800/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-blue-800/30 transition-all">
              {data.ctaSimulator} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;