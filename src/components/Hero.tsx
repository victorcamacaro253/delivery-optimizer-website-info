import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Zap,
  Brain,
  TrendingDown,
  Battery,
  ArrowRight,
  CheckCircle2,
  Shield
} from 'lucide-react';

const Hero = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.deliveryOptimizer?.[language] || texts?.deliveryOptimizer?.es || {};

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* ============ IMAGEN DE FONDO ============ */}
      <img
        src="/images/ia/last-mile-delivery.webp"
        alt="Logística de última milla"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* ============ DEGRADADO SUPERPUESTO (OVERLAY) ============ */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/82 to-white/60"></div>

      {/* Un poco de blur sutil para que la imagen no compita con el texto */}
      <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-8">
              <Zap className="w-4 h-4" />
              <span>{data.heroBadge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900">
              {data.heroTitle}
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                {data.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl font-medium">
              {data.heroDescription}
            </p>

            {/* Value propositions */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{data.heroStat1Value} {data.heroStat1Label}</div>
                  <div className="text-sm text-gray-600 font-medium">{data.heroStat1Sub}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Battery className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{data.heroStat2Value} {data.heroStat2Label}</div>
                  <div className="text-sm text-gray-600 font-medium">{data.heroStat2Sub}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{data.heroStat3Value} {data.heroStat3Label}</div>
                  <div className="text-sm text-gray-600 font-medium">{data.heroStat3Sub}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/como-funciona"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/30 text-white"
              >
                {data.heroCta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-engine"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-xl font-semibold transition-all text-gray-900"
              >
                {data.heroCta2}
              </Link>
            </div>
          </div>

          {/* Right: Order Journey Timeline */}
          <div className="relative hidden lg:block">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">

              {/* Traducciones inline */}
              {(() => {
                const isEs = language === 'es';
                const t = {
                  title: isEs ? 'Viaje del Pedido #8847' : 'Order Journey #8847',
                  delivered: isEs ? 'Entregado ✓' : 'Delivered ✓',
                  step1: isEs ? 'Pedido Creado' : 'Order Created',
                  step1Desc: isEs ? 'Cliente ordena medicamento urgente' : 'Customer orders urgent medication',
                  step2: isEs ? 'IA Asigna Depósito' : 'AI Assigns Depot',
                  step2Desc: isEs ? 'H3 hexágono → Depósito DLX9 (West LA)' : 'H3 hexagon → Depot DLX9 (West LA)',
                  step2Speed: isEs ? '⚡ Asignación en 3 milisegundos' : '⚡ Assigned in 3 milliseconds',
                  step3: isEs ? 'Ruta Optimizada' : 'Route Optimized',
                  step3Desc: isEs ? 'OR-Tools calcula mejor ruta evitando tráfico' : 'OR-Tools calculates best route avoiding traffic',
                  step3Details: isEs ? '🗺️ 8.4 km · 14 min estimados' : '🗺️ 8.4 km · 14 min estimated',
                  step4: isEs ? 'Entrega Exitosa' : 'Successful Delivery',
                  step4Desc: isEs ? 'Rivian EDV-042 entrega en puerta' : 'Rivian EDV-042 delivers at door',
                  step4Early: isEs ? '6 min antes de lo prometido' : '6 min ahead of schedule',
                  totalTime: isEs ? 'Tiempo total' : 'Total Time',
                  co2Saved: isEs ? 'CO₂ evitado' : 'CO₂ Saved',
                  satisfaction: isEs ? 'Satisfacción' : 'Satisfaction'
                };

                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {t.delivered}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="relative space-y-6">
                      {/* Línea vertical */}
                      <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                      {/* Paso 1 */}
                      <div className="relative flex gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg flex-shrink-0">
                          1
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900">{t.step1}</span>
                            <span className="text-xs text-gray-500">08:00 AM</span>
                          </div>
                          <p className="text-sm text-gray-600">{t.step1Desc}</p>
                          <div className="mt-2 flex gap-2">
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-bold">Prime Now</span>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">2.3 kg</span>
                          </div>
                        </div>
                      </div>

                      {/* Paso 2 */}
                      <div className="relative flex gap-4">
                        <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg flex-shrink-0">
                          2
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900">{t.step2}</span>
                            <span className="text-xs text-gray-500">08:00 AM</span>
                          </div>
                          <p className="text-sm text-gray-600">{t.step2Desc}</p>
                          <div className="mt-2 text-xs text-cyan-700 font-semibold">
                            {t.step2Speed}
                          </div>
                        </div>
                      </div>

                      {/* Paso 3 */}
                      <div className="relative flex gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg flex-shrink-0">
                          3
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900">{t.step3}</span>
                            <span className="text-xs text-gray-500">08:01 AM</span>
                          </div>
                          <p className="text-sm text-gray-600">{t.step3Desc}</p>
                          <div className="mt-2 text-xs text-purple-700 font-semibold">
                            {t.step3Details}
                          </div>
                        </div>
                      </div>

                      {/* Paso 4 */}
                      <div className="relative flex gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg flex-shrink-0">
                          4
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-gray-900">{t.step4}</span>
                            <span className="text-xs text-gray-500">08:14 AM</span>
                          </div>
                          <p className="text-sm text-gray-600">{t.step4Desc}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-700 font-bold">{t.step4Early}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resumen */}
                    <div className="mt-6 pt-6 border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600">{t.totalTime}</div>
                          <div className="text-xl font-bold text-green-700">14 min</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">{t.co2Saved}</div>
                          <div className="text-xl font-bold text-green-700">2.1 kg</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">{t.satisfaction}</div>
                          <div className="text-xl font-bold text-green-700">100%</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 bg-white border-2 border-green-200 text-green-700 px-5 py-3 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-bold text-sm">{data.heroBadgePrime}</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-3 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span className="font-bold text-sm">{data.heroBadgeAI}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;