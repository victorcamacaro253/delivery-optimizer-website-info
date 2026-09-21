import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index'; // .tsx extension is optional in imports
import Navbar from './components/navbar';
import Footer from './components/Footer';
import LanguageProvider from './context/languageContext';
import ScrollToTop from './components/ScrollToTop';
import ComoFunciona from './pages/ComoFunciona';
import Architecture from './pages/Architecture';
import FutureOfDelivery from './pages/FutureOfDelivery';
import Simulation from './pages/Simulation';

function App() {
  return (
    <Router>
       <ScrollToTop /> 
      <LanguageProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/future-of-delivery" element={<FutureOfDelivery />} />
            <Route path="/simulation" element={<Simulation />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;