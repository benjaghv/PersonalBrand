"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Recargar página al hacer click en el logo
  const handleLogoClick = () => {
    window.location.reload();
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
        message: '¡Mensaje enviado con éxito! Te responderé pronto.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
      setSubmitStatus({
        type: 'error',
        message: 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.'
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
        <div className="hidden md:flex gap-8 text-base font-mono">
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
            Inicio
          </a>
          <a href="#about" className="nav-link hover:text-[#64ffda] transition-colors">Sobre mí</a>
          <a href="#projects" className="nav-link hover:text-[#64ffda] transition-colors">Proyectos</a>
          <a href="#contact" className="nav-link hover:text-[#64ffda] transition-colors">Contacto</a>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden">
          <button
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
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
              Inicio
            </a>
            <a href="#about" className="nav-link text-lg font-mono text-[#64ffda] hover:underline" onClick={() => setMenuOpen(false)}>Sobre mí</a>
            <a href="#projects" className="nav-link text-lg font-mono text-[#64ffda] hover:underline" onClick={() => setMenuOpen(false)}>Proyectos</a>
            <a href="#contact" className="nav-link text-lg font-mono text-[#64ffda] hover:underline" onClick={() => setMenuOpen(false)}>Contacto</a>
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
          <p className="text-lg md:text-xl text-[#64ffda] font-mono mb-2">Hola, mi nombre es</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
            <span className="block md:inline">Benjamín</span>{" "}
            <span className="block md:inline">García-Huidobro</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-slate-300">Transformo ideas en soluciones digitales con propósito</h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10">
          Ingeniero civil informático apasionado por el desarrollo de software, aplicaciones web, ciberseguridad e inteligencia artificial.
          </p>
          <div className="flex justify-center mt-4">
            <a
              href="/images/Currículum_Benjamín_GarcíaHuidobro.docx.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded-md transition-all font-medium hover:bg-[#112240] hover:scale-105 hover:-translate-y-1 hover:-rotate-3 hover:shadow-[0_8px_24px_#64ffda99]"
            >
              Ver CV
            </a>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="scroll-mt-20 md:scroll-mt-38 w-full flex flex-col md:flex-row items-center justify-center gap-12 px-4 pb-32 -mt-40">
          <div className="md:w-1/2 text-left">
            <h3 className="text-xl font-mono text-[#64ffda] mb-4">Sobre mí</h3>
            <p className="text-lg text-slate-300 mb-4">
            Profesional con formación ingenieril y capacidades técnicas, de 24 años, apasionado por resolver problemas reales a través del desarrollo de software, aplicaciones web y herramientas digitales que generen impacto. Me enfoco en crear soluciones que mezclen diseño funcional, inteligencia artificial y una buena experiencia de usuario, siempre con la intención de construir algo útil, innovador y con la capacidad de convertirse en una solución integral, lista para implementarse en el mundo real.
            </p>
            <p className="text-lg text-slate-400">
            Me destaco por mi mirada creativa, mi capacidad para integrarme a equipos colaborativos y por mantener siempre una actitud de mejora continua. Mi objetivo es seguir creciendo, asumir nuevos desafíos y, en el futuro, emprender con soluciones que aporten valor real y hagan la tecnología más cercana y útil para las personas.
            </p>
            <div className="mt-6">
              <h4 className="text-[#64ffda] text-base font-mono mb-3 text-center">Habilidades</h4>
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
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative group">
              {/* Rectángulo de fondo estilo muro */}
              <div className="absolute -inset-x-4 -inset-y-4 bottom-2 right-2 -bottom-0 -right-0 border-2 border-[#64ffda] bg-[#112240] transform translate-x-8 translate-y-8 rounded-lg transition-all duration-300 group-hover:-inset-x-3 group-hover:-inset-y-3 group-hover:translate-x-4 group-hover:translate-y-4"></div>
              {/* Marco con la foto */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border-2 border-[#64ffda] bg-[#0a192f] shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:scale-105 group-hover:shadow-[0_8px_24px_#64ffda99]">
                <Image
                  src="/images/foto_perfil.png"
                  alt="Benjamín García-Huidobro"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-20 md:scroll-mt-22 w-full flex flex-col items-center justify-center px-4 pb-25">
          <h3 className="text-xl font-mono text-[#64ffda] mb-12 text-center">Proyectos</h3>
          {/* GitHub Profile Link */}
          <div className="flex flex-col items-center mb-12">
            <a href="https://github.com/benjaghv" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 h-14 md:h-12 w-full md:w-auto overflow-hidden rounded-full border-2 border-[#64ffda] transition-colors duration-500 hover:text-[#0a192f]">
              <span className="relative z-10 flex items-center justify-center gap-3 text-[#64ffda] group-hover:text-[#0a192f] transition-colors duration-500">
                <FaGithub size={28} />
                <span className="font-mono text-lg text-center">Visita mi perfil en GitHub</span>
              </span>
              <div className="absolute -right-40 -bottom-40 h-40 w-40 rounded-full bg-[#64ffda] opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[6]"></div>
            </a>
          </div>
          <div className="flex flex-col items-center w-full max-w-4xl min-w-0 md:ml-4 p-4">
            {/* Proyecto 1 */}
            <div className="flex flex-col md:flex-row-reverse items-center bg-white/80 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_#64ffda99] hover:scale-[1.025]">
              <div className="w-full md:w-1/2 h-56 md:h-64 relative min-w-0">
                <Image
                  src="/images/musicrollsimu.jpg"
                  alt="Proyecto 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center min-w-0">
                <h4 className="text-2xl font-bold text-[#0a192f] mb-2">FocusMeet</h4>
                <p className="text-base text-gray-700 mb-4">Aplicación web potenciada por IA que transforma grabaciones de reuniones en reportes organizados, con resúmenes automáticos, asignación de tareas y decisiones destacadas. Incluye exportación en PDF y opciones para compartir fácilmente. Construida con Next.js, React, TypeScript y Tailwind CSS.</p>
                <div className="flex gap-4">
                  <a
                    href="https://proyecto-real.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    Ver Proyecto
                  </a>
                  <a
                    href="https://github.com/benjaghv/focusmeet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            {/* Línea de conexión entre proyectos */}
            <div className="w-1 h-12 md:h-20 bg-[#64ffda] my-2"></div>
            {/* Proyecto 2 */}
            <div className="flex flex-col md:flex-row items-center bg-white/80 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_#64ffda99] hover:scale-[1.025]">
              <div className="w-full md:w-1/2 h-48 md:h-56 relative min-w-0">
                <Image
                  src="/images/HomePageMeditrack.png"
                  alt="Proyecto 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center min-w-0">
                <h4 className="text-2xl font-bold text-[#0a192f] mb-2">Meditrack</h4>
                <p className="text-base text-gray-700 mb-4">Plataforma inteligente que utiliza IA para analizar síntomas y entregar diagnósticos rápidos, recomendaciones personalizadas y seguimiento de historial médico. Desarrollada con Next.js, React, TypeScript y CSS.</p>
                <div className="flex gap-4">
                  <a
                    href="https://meditrack-sepia.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    Ver Proyecto
                  </a>
                  <a
                    href="https://github.com/benjaghv/Meditrack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            {/* Línea de conexión entre proyectos */}
            <div className="w-1 h-12 md:h-20 bg-[#64ffda] my-2"></div>
            {/* Proyecto 3 */}
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
                <h4 className="text-2xl font-bold text-[#0a192f] mb-2">Portafolio Personal</h4>
                <p className="text-base text-gray-700 mb-4">Portafolio personal desarrollado con Next.js, Tailwind CSS y TypeScript. Utiliza la API de GitHub para mostrar los proyectos y la información del usuario.</p>
                <div className="flex gap-4">
                  <a
                    href="https://proyecto3.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    Ver Proyecto
                  </a>
                  <a
                    href="https://github.com/usuario/proyecto3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#0a192f] text-[#0a192f] rounded-md hover:bg-[#112240] hover:text-[#64ffda] transition-all font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            {/* Puedes duplicar el bloque anterior para más proyectos */}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 md:scroll-mt-22 w-full flex flex-col items-center justify-center px-4 pb-18 md:mb-5">
          <h3 className="text-xl font-mono text-[#64ffda] mb-6 md:mb-8 text-center">Contacto</h3>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#0a192f]/80 rounded-xl p-4 md:p-8 flex flex-col gap-3 md:gap-6 border border-[#64ffda] shadow-lg">
            <div className="form__group field">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form__field"
                placeholder="Nombre"
                required
              />
              <label className="form__label">Nombre</label>
            </div>
            <div className="form__group field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form__field"
                placeholder="Email"
                required
              />
              <label className="form__label">Email</label>
            </div>
            <div className="form__group field">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form__field"
                placeholder="Mensaje"
                rows={3}
                required
              />
              <label className="form__label">Mensaje</label>
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
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="w-full py-6 bg-[#0a192f] text-center text-sm text-[#64ffda] font-mono border-t border-[#112240]">
          Por Benjamín García-Huidobro © 2025
        </footer>
      </main>

      {/* Ancla para Inicio */}
      <div id="home"></div>
    </div>
  );
}
