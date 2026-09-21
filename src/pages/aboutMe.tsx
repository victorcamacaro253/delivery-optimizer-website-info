import React, { useEffect, useState, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageContext } from '../context/languageContext';
import imagen from '../assets/images/victor.jpg';
import imagen2 from '../assets/images/business-cloud-computing-1080x675.jpg';
import imagen3 from '../assets/images/ingvictor.jpg';
import imagen4 from '../assets/images/victor1.jpg';
import imagen5 from '../assets/images/logo.png';
import imagen6 from '../assets/images/system.jpg';
import imagen7 from '../assets/images/nasa.jpg';

interface AboutMeTexts {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  title2: string;
}

const AboutMe: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentImageIndex1, setCurrentImageIndex1] = useState<number>(0);
    const [currentImageIndex2, setCurrentImageIndex2] = useState<number>(0);
    const { language, texts } = useContext(LanguageContext);
    const { title, paragraph1, paragraph2, paragraph3, title2 } = 
      texts.aboutme[0][language as keyof typeof texts.aboutme[0]] as AboutMeTexts || 
      texts.aboutme[0]['es'] as AboutMeTexts;

    const images: string[] = [imagen2, imagen3, imagen4, imagen5, imagen6];
    const images1: string[] = [imagen3, imagen2, imagen7, imagen5, imagen];
    const images2: string[] = [imagen7, imagen2, imagen4, imagen3, imagen5];

    useEffect(() => {
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: true
        });

        const intervals = [
            setInterval(() => setCurrentIndex(prev => (prev + 1) % images.length), 3000),
            setInterval(() => setCurrentImageIndex1(prev => (prev + 1) % images1.length), 3200),
            setInterval(() => setCurrentImageIndex2(prev => (prev + 1) % images2.length), 3400)
        ];

        return () => intervals.forEach(interval => clearInterval(interval));
    }, []);

    return (
        <div className="bg-background-1 dark:bg-dark-background-1 text-text-light dark:text-text-dark">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-righteous text-center mb-12 relative">
                        {title}
                        <span className="absolute bottom-0 top-16 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full"></span>
                    </h2>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-12" data-aos="fade-up">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <div className="relative group">
                                <img 
                                    src={imagen} 
                                    className="max-h-[450px] rounded-xl border-4 border-accent object-cover shadow-xl transition-transform duration-500 group-hover:scale-105"
                                    alt="Victor Camacaro" 
                                    data-aos="zoom-in"
                                />
                                <div className="absolute inset-0 bg-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 relative pl-8 border-l-4 border-accent">
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed" data-aos="fade-left">
                                    {paragraph1}
                                </p>
                                <p className="text-lg leading-relaxed" data-aos="fade-left" data-aos-delay="100">
                                    {paragraph2}
                                </p>
                                <p className="text-lg leading-relaxed" data-aos="fade-left" data-aos-delay="200">
                                    {paragraph3}
                                </p>
                            </div>
                            <div className="absolute -left-7 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-12 h-1 bg-accent">
                                <div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-accent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Showcase */}
            <section className="py-20 px-4 bg-background-2 dark:bg-dark-background-2">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-righteous text-center mb-16 relative">
                        {title2}
                        <span className="absolute bottom-1/2 top-16 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full"></span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[currentIndex, currentImageIndex1, currentImageIndex2].map((index, i) => (
                            <div 
                                key={i}
                                className="relative group rounded-xl overflow-hidden h-80 shadow-lg"
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                            >
                                <img 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={[images, images1, images2][i][index]} 
                                    alt={`Project ${i + 1}`} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h3 className="text-white text-xl font-bold">Project {i + 1}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutMe;