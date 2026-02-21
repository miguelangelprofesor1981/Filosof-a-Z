import React from 'react';
import { Home, BookOpen, MessageSquare, Film, Plus, History, Brain, Bolt, Star, Info, Bookmark, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'landing' | 'dashboard' | 'chat' | 'cinema';

export default function App() {
  const [currentView, setCurrentView] = React.useState<View>('landing');

  return (
    <div className="relative h-screen w-full overflow-hidden flex bg-punk-black">
      <div className="texture-overlay" />
      <div className="scanline" />

      {/* Sidebar - Only visible in non-landing views or as a persistent nav */}
      <aside className="hidden md:flex flex-col w-72 border-r border-white/10 bg-punk-black/90 backdrop-blur-sm p-6 justify-between shrink-0 relative z-20">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 px-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="size-12 bg-primary text-black rounded-sm flex items-center justify-center font-black text-3xl font-serif -rotate-3 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">Z</div>
            <div className="flex flex-col">
              <h1 className="text-white text-2xl font-bold leading-none tracking-tight font-serif">Filosofía Z</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-white text-black text-[9px] uppercase font-black px-1 py-0.5 tracking-widest">Academic Punk</span>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <NavItem active={currentView === 'dashboard'} icon={<Home size={20} />} label="Inicio" onClick={() => setCurrentView('dashboard')} />
            <NavItem active={false} icon={<BookOpen size={20} />} label="Biblioteca" onClick={() => {}} />
            <NavItem active={currentView === 'chat'} icon={<MessageSquare size={20} />} label="Chat IA" onClick={() => setCurrentView('chat')} />
            <NavItem active={currentView === 'cinema'} icon={<Film size={20} />} label="Cine" onClick={() => setCurrentView('cinema')} />
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-4 bg-white/5 rounded border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 relative z-10 tracking-widest">Estado del Alma</p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="size-2.5 rounded-full bg-primary shadow-[0_0_10px_#fdf001] animate-pulse"></div>
              <span className="text-xs font-bold text-gray-200">Conexión Socrática</span>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded bg-primary py-3.5 text-sm font-black uppercase text-black transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:bg-white hover:shadow-[4px_4px_0px_0px_#fdf001] hover:-translate-y-1 hover:translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-none border-2 border-transparent">
            <Plus size={18} />
            Nueva Consulta
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'landing' && <LandingView onStart={() => setCurrentView('dashboard')} />}
          {currentView === 'dashboard' && <DashboardView onNavigate={setCurrentView} />}
          {currentView === 'chat' && <ChatView />}
          {currentView === 'cinema' && <CinemaView />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      aria-label={label}
      className={`flex items-center gap-4 px-4 py-3 transition-all rounded group w-full text-left ${
        active 
          ? 'bg-primary text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]' 
          : 'text-gray-400 hover:text-primary hover:bg-white/5'
      }`}
    >
      <span className="transition-transform group-hover:scale-110" aria-hidden="true">{icon}</span>
      <span className={`text-sm uppercase tracking-wide ${active ? 'font-black' : 'font-bold'}`}>{label}</span>
    </button>
  );
}

// --- VIEWS ---

function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full flex items-center px-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop" 
          alt="Classical Bust"
          className="w-full h-full object-cover grayscale contrast-125 brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-punk-black via-transparent to-punk-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="inline-block bg-primary text-black font-bold uppercase text-xs px-2 py-1 mb-4 tracking-widest -rotate-2">
          Manifiesto 01
        </div>
        <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.85] text-white font-serif tracking-tighter">
          Pensar es <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200" style={{ WebkitTextStroke: '1px #fdf001' }}>Resistir</span>
        </h1>
        
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-l-4 border-primary pl-6">
          <p className="text-xl md:text-2xl font-light italic text-slate-200 max-w-lg font-serif">
            "La filosofía no sirve al Estado ni a la Iglesia. Sirve para entristecer. Una filosofía que no entristece o no contraría a nadie no es una filosofía."
          </p>
        </div>
        <div className="mt-4 text-sm uppercase tracking-[0.2em] font-bold text-primary/80 font-sans pl-7">
          — Gilles Deleuze (Remix)
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-5">
          <button onClick={onStart} className="bg-primary text-black px-10 py-4 font-black text-lg flex items-center justify-center uppercase tracking-wider group transition-all hover:scale-105 hover:-rotate-1">
            <Bolt className="mr-2 group-hover:rotate-12 transition-transform" />
            Comenzar Caos
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 font-bold text-lg flex items-center justify-center uppercase tracking-wider transition-all">
            <Info className="mr-2" />
            Manifiesto
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardView({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 overflow-y-auto p-12 custom-scrollbar"
    >
      <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
        <div>
          <span className="text-primary font-mono text-xs mb-2 block">&gt; SYSTEM_READY</span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white font-serif">
            Módulos <span className="italic text-primary">Punk</span>
          </h2>
        </div>
        <div className="animate-pulse">
          <Star className="text-primary" size={40} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ModuleCard 
          title="Biblioteca" 
          subtitle="Radical" 
          tag="READ" 
          footer="Textos Prohibidos"
          image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
        />
        <ModuleCard 
          title="El Profe" 
          subtitle="AI Mentor" 
          tag="LIVE" 
          footer='"Pregunta, duda, destruye."'
          isAI
          onClick={() => onNavigate('chat')}
        />
        <ModuleCard 
          title="Videoteca" 
          subtitle="Cinesofía" 
          tag="PREMIUM" 
          footer="Análisis Profundo"
          image="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop"
          onClick={() => onNavigate('cinema')}
        />
        <ModuleCard 
          title="Mis Lecturas" 
          subtitle="Progreso 75%" 
          tag="ACTIVE" 
          footer="Continúa: Así habló Zaratustra"
          image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop"
          progress={75}
        />
      </div>
    </motion.div>
  );
}

function ModuleCard({ title, subtitle, tag, footer, image, isAI, progress, onClick }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${subtitle}. ${footer}`}
      className="group relative aspect-[3/4] bg-surface-dark border border-white/10 overflow-hidden cursor-pointer transition-all hover:border-primary/50 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {image && (
        <img 
          src={image} 
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" 
          referrerPolicy="no-referrer"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="w-12 h-1 bg-primary mb-4 transform -translate-x-full group-hover:translate-x-0 transition duration-300" />
        <h3 className="text-3xl font-black uppercase text-white font-serif leading-none mb-2 group-hover:text-primary transition-colors">
          {title} <br />
          <span className="text-lg italic font-light opacity-70 text-white">{subtitle}</span>
        </h3>
        {progress !== undefined && (
          <div className="w-full bg-white/10 h-1.5 mt-2 mb-2" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-primary h-full" style={{ width: `${progress}%` }} />
          </div>
        )}
        <p className="text-[10px] text-gray-300 font-sans uppercase tracking-widest border-t border-white/20 pt-3 mt-1">
          {footer}
        </p>
      </div>

      {isAI && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="bg-black border-2 border-primary p-6 rotate-3 group-hover:rotate-0 transition-transform">
            <Brain className="text-primary" size={48} />
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-bold px-2 py-1 rotate-3 shadow-md">
        {tag}
      </div>
    </div>
  );
}

function ChatView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex overflow-hidden"
    >
      <div className="flex-1 flex flex-col bg-surface-dark/50 overflow-hidden">
        <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-punk-black/95 z-20 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="size-10 flex items-center justify-center rounded bg-white/10 text-primary border border-white/5">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight font-serif italic">El Profe de Filosofía</h2>
              <div className="flex gap-2 items-center">
                <span className="text-[10px] bg-primary text-black px-1.5 py-0.5 font-bold uppercase tracking-wider">v2.4</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Método Elenchos</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              className="text-gray-400 hover:text-primary transition-colors hover:rotate-12 transform duration-300 focus:outline-none focus:ring-1 focus:ring-primary p-1"
              aria-label="Ver historial de reflexiones"
            >
              <History size={20} />
            </button>
            <div className="flex items-center border border-white/20 rounded overflow-hidden" role="group" aria-label="Seleccionar idioma">
              <button className="px-3 py-1 bg-primary text-black text-[10px] font-black tracking-widest" aria-label="Español">ES</button>
              <button className="px-3 py-1 bg-transparent text-gray-400 text-[10px] font-black tracking-widest hover:text-white" aria-label="Inglés">EN</button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
          <ChatMessage 
            role="profe" 
            content="¿Considerás, che, que la justicia es simplemente el interés del más fuerte, o hay algo más profundo en la esencia del alma porteña que se nos escapa entre el ruido de la calle?" 
            reference="La República, Libro I"
          />
          <ChatMessage 
            role="user" 
            content="Me parece que la justicia es una construcción de poder, una chispa rebelde en medio del caos. No es una verdad eterna, sino el grito de los que no se conforman con el orden establecido." 
          />
          <ChatMessage 
            role="profe" 
            content="Interesante provocación. Pero decime, si la justicia es solo un 'grito rebelde', ¿cómo distinguimos el grito del justo del grito del tirano? ¿Acaso la rebeldía por sí sola valida la acción, o necesita una brújula moral que la guíe?" 
            isTyping
          />
        </div>

        <div className="p-6 bg-gradient-to-t from-black via-punk-black to-transparent backdrop-blur-sm">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-transparent rounded blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center gap-0 bg-punk-black border-2 border-white/20 p-2 shadow-2xl">
              <div className="flex items-center justify-center px-4 text-primary border-r border-white/10">
                <Brain size={24} />
              </div>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-600 px-4 py-3 font-sans text-lg font-light" 
                placeholder="Escribe tu pregunta..." 
                type="text"
              />
              <button className="bg-primary text-black size-12 flex items-center justify-center transition-all hover:bg-white hover:scale-105">
                <Bolt size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-80 border-l border-white/10 bg-punk-black/95 p-6 gap-8 overflow-y-auto custom-scrollbar relative">
        <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none select-none text-[120px] font-black leading-none text-white rotate-[-90deg] origin-bottom-right z-0">PUNK</div>
        
        <section className="relative z-10">
          <div className="flex items-center gap-2 mb-6 border-b border-primary/30 pb-2">
            <BookOpen className="text-primary" size={16} />
            <h3 className="text-xs text-primary uppercase font-black tracking-[0.2em]">Bibliografía</h3>
          </div>
          <div className="space-y-4">
            <BibliographyItem title="Apología de Sócrates" author="Platón" />
            <BibliographyItem title="Más allá del bien y del mal" author="Friedrich Nietzsche" />
          </div>
        </section>

        <section className="relative z-10">
          <div className="flex items-center gap-2 mb-6 border-b border-primary/30 pb-2">
            <Bookmark className="text-primary" size={16} />
            <h3 className="text-xs text-primary uppercase font-black tracking-[0.2em]">Conceptos Clave</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <ConceptTag label="Ironía" active />
            <ConceptTag label="Mayéutica" active />
            <ConceptTag label="Elenchos" />
            <ConceptTag label="Doxa" />
          </div>
        </section>

        <section className="mt-auto relative z-10">
          <div className="relative overflow-hidden border-2 border-white/10 group cursor-pointer hover:border-primary transition-colors">
            <div className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=400&auto=format&fit=crop')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-wider">Próximo Taller</p>
                <ExternalLink className="text-primary" size={14} />
              </div>
              <h4 className="text-white text-base font-bold font-serif leading-tight group-hover:text-primary transition-colors">Existencialismo & Punk en Buenos Aires</h4>
            </div>
          </div>
        </section>
      </aside>
    </motion.div>
  );
}

function BibliographyItem({ title, author }: { title: string, author: string }) {
  return (
    <button 
      className="w-full text-left p-4 bg-white/5 border-l-2 border-transparent hover:border-primary hover:bg-white/10 transition-all cursor-pointer group focus:outline-none focus:ring-1 focus:ring-primary"
      aria-label={`Leer ${title} de ${author}`}
    >
      <h4 className="text-gray-200 font-bold font-serif text-lg group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-xs text-gray-500 mt-1 italic font-mono">{author}</p>
    </button>
  );
}

function ConceptTag({ label, active }: { label: string, active?: boolean }) {
  return (
    <button 
      className={`px-2 py-1 text-[10px] uppercase font-black tracking-wide transform hover:rotate-2 transition-transform cursor-help focus:outline-none focus:ring-1 focus:ring-primary ${
        active ? 'bg-primary text-black' : 'bg-white/10 border border-white/20 text-gray-300 hover:border-primary hover:text-primary'
      }`}
      aria-pressed={active}
      aria-label={`Concepto: ${label}`}
    >
      {label}
    </button>
  );
}

function ChatMessage({ role, content, reference, isTyping }: any) {
  if (role === 'profe') {
    return (
      <div className="flex flex-col gap-2 max-w-3xl group">
        <div className="flex items-center gap-3 mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="size-6 rounded bg-primary flex items-center justify-center text-black">
            <Brain size={14} />
          </div>
          <span className="text-xs uppercase font-black tracking-widest text-primary">El Profe</span>
        </div>
        <div className="relative p-8 bg-aged-paper text-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-2 border-black transform -rotate-1">
          <div className="absolute -top-3 -right-3 size-10 bg-primary border-2 border-black flex items-center justify-center shadow-sm z-10 rotate-12">
            <span className="text-black font-serif text-2xl">"</span>
          </div>
          <p className="text-xl leading-relaxed font-serif font-medium">{content}</p>
          {reference && (
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-black/10">
              <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-widest -rotate-2">Referencia</span>
              <span className="text-xs font-bold text-slate-700 italic font-serif">{reference}</span>
            </div>
          )}
          {isTyping && (
            <div className="mt-4 flex gap-1">
              <span className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-w-3xl ml-auto items-end group">
      <div className="flex items-center gap-3 mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <span className="text-xs uppercase font-black tracking-widest text-gray-400">Usuario</span>
        <div className="size-6 rounded bg-gray-700 flex items-center justify-center text-primary">
          <Plus size={14} />
        </div>
      </div>
      <div className="relative p-6 bg-punk-black border border-white/20 text-slate-100 shadow-[8px_8px_0px_0px_#fdf001] rotate-1">
        <p className="text-lg leading-relaxed font-sans font-light">{content}</p>
        <div className="absolute -left-1 top-4 w-1 h-8 bg-primary"></div>
      </div>
    </div>
  );
}

function CinemaView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-y-auto custom-scrollbar bg-background-dark"
    >
      <section className="relative w-full h-[70vh] flex items-end pb-24 px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover object-center opacity-50 grayscale contrast-125" 
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop" 
            alt="Cinema Hero"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-3 text-primary mb-2">
            <span className="px-2 py-0.5 bg-primary text-black text-[10px] font-black uppercase tracking-wider transform -rotate-2">Featured Film</span>
            <div className="h-px w-12 bg-primary"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-black leading-[0.9] text-white italic tracking-tighter">
            EL MITO DE <br />
            <span className="text-primary font-serif not-italic">SÍSIFO</span> DIGITAL
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light italic leading-relaxed border-l-2 border-primary pl-4">
            Explorando la búsqueda de sentido en un mundo hiperconectado. Una visión existencialista radical.
          </p>
          <div className="flex flex-wrap gap-4 pt-6">
            <button className="bg-primary hover:bg-white text-black px-8 py-4 rounded-sm font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
              Play Now
            </button>
            <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-white/5 transition-colors">
              More Info
            </button>
          </div>
        </div>
      </section>

      <div className="p-12 space-y-16">
        <CinemaSection title="Existencialismo" count="01" />
        <CinemaSection title="Cinesofía" count="02" isSpecial />
        <CinemaSection title="Ética y Moralidad" count="03" />
      </div>
    </motion.div>
  );
}

function CinemaSection({ title, count, isSpecial }: any) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-primary rotate-12"></div>
          <h3 className="text-2xl font-bold tracking-tight text-white uppercase font-serif italic">
            <span className="text-primary text-3xl mr-2 font-sans not-italic font-black">#{count}</span>{title}
          </h3>
        </div>
        <button className="text-primary text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">View All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VideoCard title="El Vacío Digital" author="@ElProfe1981" image="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop" />
        <VideoCard title="Camus: El Rebelde" author="@ElProfe1981" image="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600&auto=format&fit=crop" />
        <VideoCard title="Existencia y Esencia" author="@ElProfe1981" image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600&auto=format&fit=crop" />
      </div>
    </section>
  );
}

function VideoCard({ title, author, image }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video bg-black border border-white/10 group-hover:border-primary transition-all duration-300 overflow-hidden">
        <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] text-primary font-black uppercase mb-1 tracking-wider">{author}</p>
          <h4 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors font-serif italic">{title}</h4>
        </div>
      </div>
    </div>
  );
}
