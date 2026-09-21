import { useState, useRef, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import {
  Play, Pause, RotateCcw, Truck, Package,
  CheckCircle2, Clock, Zap, Leaf, AlertTriangle,
  MapPin, Battery, Filter, Map,
  BarChart3
} from 'lucide-react';

const Simulation = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.deliveryOptimizer?.[language] || texts?.deliveryOptimizer?.es || {};
  const sim = data.simulation || {};
  const isEs = language === 'es';

  // Datos de ejemplo con traducción dinámica de logs
  const simulationData = {
    depots: [
      { code: 'DPS6', zone: 'Simi Valley', orders: 10, vehicles: 1, distance: 88.66, onTime: '10/10' },
      { code: 'DUR1', zone: 'San Fernando Valley', orders: 10, vehicles: 1, distance: 61.43, onTime: '10/10' },
      { code: 'DLX9', zone: 'West LA', orders: 8, vehicles: 1, distance: 39.57, onTime: '8/8' },
      { code: 'DCX7', zone: 'Long Beach', orders: 10, vehicles: 1, distance: 52.10, onTime: '10/10' },
      { code: 'VAX3', zone: 'Gardena', orders: 8, vehicles: 1, distance: 45.65, onTime: '8/8' },
      { code: 'DLX5', zone: 'Central LA', orders: 12, vehicles: 1, distance: 93.42, onTime: '12/12' },
      { code: 'DFX3', zone: 'LAX', orders: 14, vehicles: 1, distance: 50.07, onTime: '14/14' },
      { code: 'DLX7', zone: 'Cypress', orders: 10, vehicles: 1, distance: 70.36, onTime: '10/10' },
      { code: 'DPS1', zone: 'Rosemead', orders: 9, vehicles: 2, distance: 56.87, onTime: '9/9' },
      { code: 'DLA3', zone: 'Commerce', orders: 11, vehicles: 1, distance: 62.63, onTime: '11/11' }
    ],
    logs: [
      { time: 0, depot: 'DPS6', message: isEs ? '🚛 Camión 1 INICIA IMPORT' : '🚛 Truck 1 STARTS IMPORT', type: 'info' },
      { time: 0, depot: 'DPS6', message: isEs ? '🚢 Camión 1 llega al QUAY para DESCARGA [PRIORIDAD: ALTA]' : '🚢 Truck 1 arrives at QUAY for UNLOADING [HIGH PRIORITY]', type: 'warning' },
      { time: 5, depot: 'DUR1', message: isEs ? 'Generando 10 órdenes en zona de Amazon Delivery Station DUR1' : 'Generating 10 orders in Amazon Delivery Station DUR1 zone', type: 'info' },
      { time: 10, depot: 'DLX9', message: isEs ? '🧠 OR-Tools optimizando con flota heterogénea y restricciones EV' : '🧠 OR-Tools optimizing with heterogeneous fleet and EV constraints', type: 'success' },
      { time: 15, depot: 'DCX7', message: isEs ? '✅ Ruta calculada. Distancia: 52.10 km' : '✅ Route calculated. Distance: 52.10 km', type: 'success' },
      { time: 20, depot: 'VAX3', message: isEs ? '⚡ Vehículo eléctrico asignado (Rivian EDV 700)' : '⚡ Electric vehicle assigned (Rivian EDV 700)', type: 'success' },
      { time: 25, depot: 'DLX5', message: isEs ? '📊 Batch Picking: 7 batches creados de 12 órdenes' : '📊 Batch Picking: 7 batches created from 12 orders', type: 'info' },
      { time: 30, depot: 'DFX3', message: isEs ? '✅ On-Time Delivery: 14/14 (100%)' : '✅ On-Time Delivery: 14/14 (100%)', type: 'success' },
      { time: 35, depot: 'DLX7', message: isEs ? '🔋 Utilización de batería: 24.0%' : '🔋 Battery utilization: 24.0%', type: 'info' },
      { time: 40, depot: 'DPS1', message: isEs ? '🚚 Vehículos utilizados: 2' : '🚚 Vehicles used: 2', type: 'info' },
      { time: 45, depot: 'DLA3', message: isEs ? '🌱 CO₂ evitado: 18.5 kg' : '🌱 CO₂ avoided: 18.5 kg', type: 'success' }
    ]
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedDepot, setSelectedDepot] = useState('all');
  const [activeTab, setActiveTab] = useState('map');
  const [metrics, setMetrics] = useState({
    totalOrders: 102,
    completedOrders: 0,
    activeVehicles: 0,
    onTimeDelivery: 0,
    electricRoutes: 0,
    co2Avoided: 0
  });
  const [logs, setLogs] = useState<any[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newLogs = simulationData.logs.filter(log => log.time === newTime);
          if (newLogs.length > 0) {
            setLogs(prevLogs => [...prevLogs, ...newLogs]);
          }
          if (newTime % 10 === 0) {
            setMetrics({
              totalOrders: 102,
              completedOrders: Math.min(Math.floor(newTime / 1.5), 102),
              activeVehicles: Math.min(Math.floor(newTime / 5) + 1, 11),
              onTimeDelivery: Math.min(Math.floor(newTime / 1.5), 102),
              electricRoutes: Math.min(Math.floor(newTime / 1.6), 10),
              co2Avoided: Math.min(Math.floor(newTime * 0.5), 103)
            });
          }
          if (newTime >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return newTime;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setLogs([]);
    setMetrics({ totalOrders: 102, completedOrders: 0, activeVehicles: 0, onTimeDelivery: 0, electricRoutes: 0, co2Avoided: 0 });
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default: return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const tabs = [
    { id: 'map', label: sim.tabMap, icon: Map },
    { id: 'overview', label: sim.tabOverview, icon: BarChart3 },
    { id: 'logs', label: sim.tabLogs, icon: Clock },
    { id: 'depots', label: sim.tabDepots, icon: MapPin },
    { id: 'fleet', label: sim.tabFleet, icon: Truck }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con Controles */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-semibold mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {isPlaying ? sim.statusActive : sim.statusReady}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{sim.title}</h1>
              <p className="text-gray-600 text-sm mt-1">{sim.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button onClick={handlePlay} disabled={isPlaying || currentTime >= 100} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{sim.btnStart}</span>
                </button>
                <button onClick={handlePause} disabled={!isPlaying} className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <Pause className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{sim.btnPause}</span>
                </button>
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{sim.btnReset}</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <Zap className="w-4 h-4 text-gray-600" />
                <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none">
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={5}>5x</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{sim.progressLabel}</span>
              <span>{currentTime}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300" style={{ width: `${currentTime}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[140px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido de tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB: MAPA ANIMADO */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Map className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 font-medium mb-1">{sim.mapInfoTitle}</p>
                <p className="text-xs text-blue-700">{sim.mapInfoDesc}</p>
              </div>
            </div>
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden" style={{ height: '70vh' }}>
              <iframe ref={iframeRef} src="/simulation-map.html" className="w-full h-full border-0" title={sim.mapTitle} />
            </div>
          </div>
        )}

        {/* TAB: VISTA GENERAL */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Package className="w-6 h-6 text-blue-600" /></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.completedOrders}/{metrics.totalOrders}</div>
                    <div className="text-sm text-gray-600">{sim.metricOrdersCompleted}</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(metrics.completedOrders / metrics.totalOrders) * 100}%` }} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-green-600" /></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.totalOrders > 0 ? Math.round((metrics.onTimeDelivery / metrics.totalOrders) * 100) : 0}%</div>
                    <div className="text-sm text-gray-600">{sim.metricOnTime}</div>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-medium">{sim.metricOnTimeDesc}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center"><Zap className="w-6 h-6 text-cyan-600" /></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.electricRoutes}/10</div>
                    <div className="text-sm text-gray-600">{sim.metricElectricRoutes}</div>
                  </div>
                </div>
                <div className="text-sm text-cyan-600 font-medium">{sim.metricElectricDesc}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center"><Leaf className="w-6 h-6 text-emerald-600" /></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.co2Avoided} kg</div>
                    <div className="text-sm text-gray-600">{sim.metricCo2}</div>
                  </div>
                </div>
                <div className="text-sm text-emerald-600 font-medium">{sim.metricCo2Desc}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><Truck className="w-6 h-6 text-purple-600" /></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metrics.activeVehicles}</div>
                    <div className="text-sm text-gray-600">{sim.metricActiveVehicles}</div>
                  </div>
                </div>
                <div className="text-sm text-purple-600 font-medium">{sim.metricActiveVehiclesDesc}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"><Battery className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">24%</div>
                    <div className="text-sm text-gray-600">{sim.metricBattery}</div>
                  </div>
                </div>
                <div className="text-sm text-orange-600 font-medium">{sim.metricBatteryDesc}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">{sim.depotSummaryTitle}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{sim.thDepot}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{sim.thZone}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{sim.thOrders}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{sim.thVehicles}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{sim.thDistance}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{sim.thOnTime}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {simulationData.depots.map((depot) => (
                      <tr key={depot.code} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{depot.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{depot.zone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{depot.orders}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{depot.vehicles}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{depot.distance} km</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{depot.onTime}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: LOGS EN VIVO */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{sim.logsTitle}</h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select value={selectedDepot} onChange={(e) => setSelectedDepot(e.target.value)} className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">{sim.logsFilterAll}</option>
                  {simulationData.depots.map(d => (<option key={d.code} value={d.code}>{d.code}</option>))}
                </select>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-6 space-y-2 bg-gray-900">
              {logs.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>{sim.logsEmpty}</p>
                </div>
              ) : (
                logs.filter(log => selectedDepot === 'all' || log.depot === selectedDepot).map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex-shrink-0">{getLogIcon(log.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-blue-400">T+{log.time}min</span>
                        <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{log.depot}</span>
                      </div>
                      <p className="text-sm text-gray-300 font-mono">{log.message}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}

        {/* TAB: DEPÓSITOS */}
        {activeTab === 'depots' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulationData.depots.map((depot) => (
              <div key={depot.code} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><MapPin className="w-5 h-5 text-blue-600" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900">{depot.code}</h4>
                      <p className="text-xs text-gray-600">{depot.zone}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">{depot.onTime}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">{sim.labelOrders}</span><span className="font-semibold text-gray-900">{depot.orders}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{sim.labelVehicles}</span><span className="font-semibold text-gray-900">{depot.vehicles}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{sim.labelDistance}</span><span className="font-semibold text-gray-900">{depot.distance} km</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: FLOTA */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-3xl font-bold text-green-700">10</div>
                    <div className="text-sm text-green-600">{sim.fleetElectric}</div>
                  </div>
                </div>
                <p className="text-sm text-green-700">{sim.fleetElectricDesc}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-3xl font-bold text-blue-700">1</div>
                    <div className="text-sm text-blue-600">{sim.fleetCombustion}</div>
                  </div>
                </div>
                <p className="text-sm text-blue-700">{sim.fleetCombustionDesc}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Battery className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-3xl font-bold text-purple-700">92%</div>
                    <div className="text-sm text-purple-600">{sim.fleetEvUsage}</div>
                  </div>
                </div>
                <p className="text-sm text-purple-700">{sim.fleetEvUsageDesc}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{sim.fleetStatsTitle}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">11</div>
                  <div className="text-sm text-gray-600">{sim.statTotalVehicles}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">575 km</div>
                  <div className="text-sm text-gray-600">{sim.statTotalDistance}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">24%</div>
                  <div className="text-sm text-gray-600">{sim.statBatteryUsage}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">103 kg</div>
                  <div className="text-sm text-gray-600">{sim.statCo2Avoided}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulation;