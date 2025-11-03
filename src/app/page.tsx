"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from '@/components/LanguageSwitch';

export default function Home() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showPortfolioMessage, setShowPortfolioMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const photos = [
    "/images/foto_perfil.jpg",
    "/images/FotoSkate.jpg",
    "/images/FotoTocando.png",
    "/images/FotoTrekking.jpg",
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Recargar página al hacer click en el logo
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      await emailjs.send(
        'service_sjzqh3x',
        'template_0jg39yh',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Benjamín García-Huidobro',
          reply_to: formData.email
        },
        '-P4VKRaLFJAPN9eFr'
      );

      setSubmitStatus({
        type: 'success',
        message: t.contact.successMessage
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
      setSubmitStatus({
        type: 'error',
        message: t.contact.errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col">
      {/* Navbar Fixed */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a192f] shadow flex items-center justify-between px-6 md:px-12 py-4">
        <div
          className="flex items-center gap-2 font-bold text-[#64ffda] text-xl font-mono hover:text-white hover:scale-105 transition-transform cursor-pointer"
          onClick={handleLogoClick}
        >
          &lt;BGH/&gt;
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-base font-mono items-center">
          <a
            className="nav-link hover:text-[#64ffda] transition-colors cursor-pointer"
            onClick={e => { 
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              window.history.pushState({}, '', '/');
            }}
            role="button"
            tabIndex={0}
          >
            {t.nav.home}
          </a>
          <a href="#about" className="nav-link hover:text-[#64ffda] transition-colors">{t.nav.about}</a>
          <a href="#projects" className="nav-link hover:text-[#64ffda] transition-colors">{t.nav.projects}</a>
          <a href="#contact" className="nav-link hover:text-[#64ffda] transition-colors">{t.nav.contact}</a>
          <LanguageSwitch />
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitch />
          <button
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.nav.menuAriaLabel}
          >
            <span className={`block w-7 h-0.5 bg-[#64ffda] mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-7 h-0.5 bg-[#64ffda] mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-0.5 bg-[#64ffda] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full right-4 mt-2 bg-[#112240] border border-[#64ffda] rounded-lg shadow-lg flex flex-col items-end p-6 gap-4 z-50 animate-fade-in md:hidden">
            <a
              className="nav-link text-lg font-mono text-[#64ffda] hover:underline cursor-pointer"
              onClick={e => { 
                e.preventDefault(); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                window.history.pushState({}, '', '/');
                setMenuOpen(false); 
              }}
              role="button"
              tabIndex={0}
            >
              {t.nav.home}
            </a>
            <a href="#about" className="nav-link text-lg font-mono text-[#64ffda] hover:underline" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
            <a href="#projects" className="nav-link text-lg font-mono text-[#64ffda] hover:underline" onClick={() => setMenuOpen(false)}>{t.nav.projects}</a>
            <a href="#contact" className="nav-link text-lg font-mono text-[#64ffda] hover:underline" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
          </div>
        )}
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center relative pt-24">
        {/* Social Icons */}
        <div className="hidden md:flex flex-col gap-6 fixed left-8 top-1/2 -translate-y-1/2 z-20">
          <a href="https://github.com/benjaghv" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:scale-110 transition-transform"><FaGithub size={24} /></a>
          <a href="https://linkedin.com/in/benjamínghv" target="_blank" rel="noopener noreferrer" className="text-[#64ffda] hover:scale-110 transition-transform"><FaLinkedin size={24} /></a>
          <a href="mailto:benjaminghv@gmail.com" className="text-[#64ffda] hover:scale-110 transition-transform"><FaEnvelope size={24} /></a>
        </div>

        {/* Hero Section */}
        <section className="w-full min-h-screen flex flex-col items-center justify-start text-center px-4 mt-6 md:mt-34">
          <p className="text-lg md:text-xl text-[#64ffda] font-mono mb-2">{t.hero.greeting}</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
            <span className="block md:inline">Benjamín</span>{" "}
            <span className="block md:inline">García-Huidobro</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-slate-300">{t.hero.tagline}</h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10">
          {t.hero.description}
          </p>
          <div className="flex justify-center mt-4">
            <a
              href={t.hero.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded-md transition-all font-medium hover:bg-[#112240] hover:text-[#64ffda] hover:scale-105 hover:-translate-y-1 hover:-rotate-3 hover:shadow-[0_8px_24px_#64ffda99]"
            >
              {t.hero.viewCV}
            </a>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="scroll-mt-20 md:scroll-mt-23 w-full flex flex-col md:flex-row items-center justify-center gap-12 px-4 pb-32 -mt-40">
          <div className="md:w-1/2 text-left">
            <h3 className="text-xl font-mono text-[#64ffda] mb-4">{t.about.title}</h3>
            <p className="text-lg text-slate-300 mb-4">
            {t.about.paragraph1}
            </p>
            <p className="text-lg text-slate-400">
            {t.about.paragraph2}
            </p>
            <p className="text-lg text-slate-400 mt-4">
            {t.about.paragraph3}
            </p>
            <div className="mt-6">
              <h4 className="text-[#64ffda] text-base font-mono mb-3 text-center">{t.about.skills}</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {["JavaScript", "TypeScript", "React", "Next.js", "Python", "SQL", "Tailwind CSS", "Git", "React Native"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1 rounded-full border border-[#64ffda] text-[#64ffda] bg-[#0a192f]/80 font-mono text-sm shadow-[0_0_8px_#64ffda99] backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Languages Section */}
            <div className="mt-8">
              <h4 className="text-[#64ffda] text-base font-mono mb-3 text-center">{t.about.languages}</h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {/* Spanish */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#64ffda] text-[#64ffda] bg-[#0a192f]/80 font-mono text-sm shadow-[0_0_8px_#64ffda99] backdrop-blur-sm hover:scale-105 transition-transform">
                  <img src="https://flagcdn.com/es.svg" alt={t.about.languageNames.spanish} className="w-6 h-4 rounded-sm" />
                  <span>{t.about.languageNames.spanish}</span>
                  <span className="text-xs text-slate-400">({t.about.languageLevels.native})</span>
                </div>
                {/* English */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#64ffda] text-[#64ffda] bg-[#0a192f]/80 font-mono text-sm shadow-[0_0_8px_#64ffda99] backdrop-blur-sm hover:scale-105 transition-transform">
                  <img src="https://flagcdn.com/us.svg" alt={t.about.languageNames.english} className="w-6 h-4 rounded-sm" />
                  <span>{t.about.languageNames.english}</span>
                  <span className="text-xs text-slate-400">({t.about.languageLevels.advanced})</span>
                </div>
                {/* German */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#64ffda] text-[#64ffda] bg-[#0a192f]/80 font-mono text-sm shadow-[0_0_8px_#64ffda99] backdrop-blur-sm hover:scale-105 transition-transform">
                  <img src="https://flagcdn.com/de.svg" alt={t.about.languageNames.german} className="w-6 h-4 rounded-sm" />
                  <span>{t.about.languageNames.german}</span>
                  <span className="text-xs text-slate-400">({t.about.languageLevels.intermediate})</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative group">
              {/* Rectángulo de fondo estilo muro */}
              <div className="absolute -inset-x-4 -inset-y-4 bottom-2 right-2 -bottom-0 -right-0 border-2 border-[#64ffda] bg-[#112240] transform translate-x-8 translate-y-8 rounded-lg transition-all duration-300 group-hover:-inset-x-3 group-hover:-inset-y-3 group-hover:translate-x-4 group-hover:translate-y-4"></div>
              {/* Marco con la foto */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border-2 border-[#64ffda] bg-[#0a192f] shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:scale-105 group-hover:shadow-[0_8px_24px_#64ffda99]">
                <Image
                  src={photos[currentPhoto]}
                  alt={t.about.imageAlt}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, 160px"
                />
                {/* Botones de navegación */}
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <button
                    onClick={prevPhoto}
                    className="bg-[#64ffda] text-[#0a192f] p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="bg-[#64ffda] text-[#0a192f] p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </div>
                {/* Indicador de fotos */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {photos.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentPhoto === index ? 'bg-[#64ffda] scale-125' : 'bg-[#64ffda]/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-20 md:scroll-mt-22 w-full flex flex-col items-center justify-center px-4 pb-25">
          <h3 className="text-xl font-mono text-[#64ffda] mb-12 text-center">{t.projects.title}</h3>
          {/* GitHub Profile Link */}
          <div className="flex flex-col items-center mb-12">
            <a href="https://github.com/benjaghv" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 h-14 md:h-12 w-full md:w-auto overflow-hidden rounded-full border-2 border-[#64ffda] transition-colors duration-500 hover:text-[#0a192f]">
              <span className="relative z-10 flex items-center justify-center gap-3 text-[#64ffda] group-hover:text-[#0a192f] transition-colors duration-500">
                <FaGithub size={28} />
                <span className="font-mono text-lg text-center">{t.projects.githubLink}</span>
              </span>
              <div className="absolute -right-40 -bottom-40 h-40 w-40 rounded-full bg-[#64ffda] opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[6]"></div>
            </a>
          </div>
          <div className="flex flex-col items-center w-full max-w-4xl min-w-0 md:ml-4 p-4">
            {/* Proyecto 1 */}
            <div className="flex flex-col md:flex-row items-center bg-white/80 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_#64ffda99] hover:scale-[1.025]">
              <div className="w-full md:w-1/2 h-56 md:h-64 relative min-w-0">
                <Image
                  src="/images/deepmatchfoto.png"
                  alt="DeepMatch"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center min-w-0">
                <h4 className="text-2xl font-bold text-[#0a192f] mb-2">{t.projects.deepmatch.title}</h4>
                <p className="text-base text-gray-700 mb-4">{t.projects.deepmatch.description}</p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md bg-[#64ffda]/20 font-mono flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64ffda] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#64ffda]"></span>
                    </span>
                    {t.projects.inDevelopment}
                  </span>
                  <a
                    href="https://github.com/benjaghv/DeepMatch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    {t.projects.github}
                  </a>
                </div>
              </div>
            </div>
            {/* Línea de conexión entre proyectos */}
            <div className="w-1 h-12 md:h-20 bg-[#64ffda] my-2"></div>
            {/* Proyecto 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center bg-white/80 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_#64ffda99] hover:scale-[1.025]">
              <div className="w-full md:w-1/2 h-56 md:h-64 relative min-w-0">
                <Image
                  src="/images/focusmeethome.png"
                  alt="Proyecto 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center min-w-0">
                <h4 className="text-2xl font-bold text-[#0a192f] mb-2">{t.projects.focusmeet.title}</h4>
                <p className="text-base text-gray-700 mb-4">{t.projects.focusmeet.description}</p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md bg-[#64ffda]/20 font-mono flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64ffda] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#64ffda]"></span>
                    </span>
                    {t.projects.inDevelopment}
                  </span>
                  <a
                    href="https://github.com/benjaghv/focusmeet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    {t.projects.github}
                  </a>
                </div>
              </div>
            </div>
            {/* Línea de conexión entre proyectos */}
            <div className="w-1 h-12 md:h-20 bg-[#64ffda] my-2"></div>
            {/* Proyecto 3 */}
            <div className="flex flex-col md:flex-row items-center bg-white/80 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_#64ffda99] hover:scale-[1.025]">
              <div className="w-full md:w-1/2 h-48 md:h-56 relative min-w-0">
                <Image
                  src="/images/HomePageMediTrack.png"
                  alt="Proyecto 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center min-w-0">
                <h4 className="text-2xl font-bold text-[#0a192f] mb-2">{t.projects.meditrack.title}</h4>
                <p className="text-base text-gray-700 mb-4">{t.projects.meditrack.description}</p>
                <div className="flex gap-4">
                  <a
                    href="https://meditrack-sepia.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    {t.projects.viewProject}
                  </a>
                  <a
                    href="https://github.com/benjaghv/Meditrack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    {t.projects.github}
                  </a>
                </div>
              </div>
            </div>
            {/* Línea de conexión entre proyectos */}
            <div className="w-1 h-12 md:h-20 bg-[#64ffda] my-2"></div>
            {/* Proyecto 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center bg-white/80 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_#64ffda99] hover:scale-[1.025]">
              <div className="w-full md:w-1/2 h-56 md:h-64 relative min-w-0">
                <Image
                  src="/images/HomeLanding.png"
                  alt="Proyecto 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center min-w-0">
                <h4 className="text-2xl font-bold text-[#0a192f] mb-2">{t.projects.portfolio.title}</h4>
                <p className="text-base text-gray-700 mb-4">
  {t.projects.portfolio.description}
</p>

                <div className="flex gap-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPortfolioMessage(true);
                      setTimeout(() => setShowPortfolioMessage(false), 3000);
                    }}
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    {t.projects.viewProject}
                  </a>
                  {showPortfolioMessage && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#64ffda] text-[#0a192f] px-6 py-3 rounded-lg shadow-lg animate-bounce z-50 text-center max-w-[90%] mx-auto">
                      <p className="text-lg font-mono">{t.projects.portfolioMessage}</p>
                      
                    </div>
                  )}
                  <a
                    href="https://github.com/benjaghv/PersonalBrand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    {t.projects.github}
                  </a>
                </div>
              </div>
            </div>
            {/* Puedes duplicar el bloque anterior para más proyectos */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 md:scroll-mt-22 w-full flex flex-col items-center justify-center px-4 pb-18 md:mb-5">
          <h3 className="text-xl font-mono text-[#64ffda] mb-6 md:mb-8 text-center">{t.contact.title}</h3>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#0a192f]/80 rounded-xl p-4 md:p-8 flex flex-col gap-3 md:gap-6 border border-[#64ffda] shadow-lg">
            <div className="form__group field">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form__field"
                placeholder={t.contact.name}
                required
              />
              <label className="form__label">{t.contact.name}</label>
            </div>
            <div className="form__group field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form__field"
                placeholder={t.contact.email}
                required
              />
              <label className="form__label">{t.contact.email}</label>
            </div>
            <div className="form__group field">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form__field"
                placeholder={t.contact.message}
                rows={3}
                required
              />
              <label className="form__label">{t.contact.message}</label>
            </div>
            {submitStatus.message && (
              <div className={`text-sm ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {submitStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="self-end px-6 py-2 border border-[#64ffda] text-[#64ffda] rounded-md hover:bg-[#64ffda] hover:text-[#0a192f] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t.contact.sending : t.contact.send}
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="w-full py-6 bg-[#0a192f] text-center text-sm text-[#64ffda] font-mono border-t border-[#112240]">
          {t.footer.by} <img src="https://flagcdn.com/cl.svg" alt="Bandera de Chile" className="w-5 h-4 inline-block ml-2" />
        </footer>
      </main>

      {/* Ancla para Inicio */}
      <div id="home"></div>
    </div>
  );
}
