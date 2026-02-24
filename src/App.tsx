import React from 'react';
import { Home, BookOpen, MessageSquare, Film, Plus, History, Brain, Bolt, Star, Info, Bookmark, ExternalLink, Download, Search, Send, Trash2, Eye, Cloud, Loader2, Globe, Clock, Music, Zap, MessageCircle, MapPin, Sparkles, Coffee, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PhilosophyAI, Message } from './services/geminiService';
import { Book, downloadFile } from './services/libraryService';
import { CRONOS_TIMELINE, CronosNode } from './services/cronosService';
import { CINEMA_CATALOG, PHILOSOPHICAL_PROBLEMS, Video } from './services/cinemaService';
import ReaderView from './components/ReaderView';

type View = 'landing' | 'dashboard' | 'chat' | 'cinema' | 'library' | 'cronos';

export default function App() {
  const [currentView, setCurrentView] = React.useState<View>('landing');
  const [chatMessages, setChatMessages] = React.useState<Message[]>([
    { role: 'model', text: 'Bienvenido, buscador de la verdad. ¿Qué premisa de tu realidad deseas que cuestionemos hoy?' }
  ]);
  const [userInput, setUserInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [myReadings, setMyReadings] = React.useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeReaderBook, setActiveReaderBook] = React.useState<Book | null>(null);
  const [downloadProgress, setDownloadProgress] = React.useState<Record<string, number>>({});
  const [language, setLanguage] = React.useState<'es' | 'en'>('es');
  
  const aiRef = React.useRef<PhilosophyAI | null>(null);

  const t = {
    es: {
      nav_home: 'Inicio',
      nav_library: 'Biblioteca',
      nav_chat: 'Chat IA',
      nav_cinema: 'Cine',
      nav_cronos: 'Cronos',
      nav_new_query: 'Nueva Consulta',
      soul_status: 'Estado del Alma',
      socratic_connection: 'Conexión Socrática',
      philosophy_z: 'Filosofía Z',
      radical_thought: 'Pensamiento radical desde el Sur',
      chat_placeholder: 'Escribe tu pregunta...',
      chat_title: 'El Profe Punk',
      chat_subtitle: 'Pensamiento Radical',
      chat_history: 'Ver historial de reflexiones',
      chat_welcome: 'Bienvenido, buscador de la verdad. ¿Qué premisa de tu realidad deseas que cuestionemos hoy?',
      chat_error: 'La dialéctica se ha visto interrumpida por un error técnico. Inténtalo de nuevo.',
      library_title: 'Biblioteca',
      library_subtitle: 'Repositorio de pensamiento radical y archivos críticos.',
      library_search: 'Buscar autores o textos...',
      library_recommended: 'Lectura Recomendada',
      library_explorer: 'Explorador de Archivos',
      library_browse_elejandria: 'Navegar en Elejandría',
      library_open_drive: 'Abrir Drive',
      cinema_title: 'CINE PUNK DIGITAL',
      cinema_subtitle: 'Agregador de contenido descentralizado. Películas que cuestionan la estructura de la realidad.',
      cinema_featured: 'Película Destacada',
      cinema_telegram: 'Canal Telegram',
      cinema_close: 'Cerrar',
      cinema_synopsis: 'Sinopsis Filosófica',
      cinema_view_featured: 'Ver Destacada',
      cinema_view_telegram: 'Ver en Telegram',
      user: 'Usuario',
      profe: 'El Profe Punk',
      reference: 'Referencia',
      bibliography: 'Bibliografía',
      concepts: 'Conceptos Clave',
      next_workshop: 'Próximo Taller',
      workshop_title: 'Existencialismo & Punk en Buenos Aires',
      landing_manifesto: 'Manifiesto 01',
      landing_title_1: 'Pensar es',
      landing_title_2: 'Resistir',
      landing_quote: '"La filosofía no sirve al Estado ni a la Iglesia. Sirve para entristecer. Una filosofía que no entristece o no contraría a nadie no es una filosofía."',
      landing_author: '— Gilles Deleuze (Nietzsche y la filosofía)',
      landing_start: 'Comenzar Kaos',
      landing_info: 'Manifiesto',
      dashboard_status: '> SYSTEM_READY',
      dashboard_title_1: 'Módulos',
      dashboard_title_2: 'Punk',
      dashboard_library_sub: 'Radical',
      dashboard_library_tag: 'READ',
      dashboard_library_footer: 'Textos Prohibidos',
      dashboard_profe_sub: 'AI Mentor',
      dashboard_profe_tag: 'LIVE',
      dashboard_profe_footer: '"Pregunta, duda, destruye."',
      dashboard_cinema_sub: 'Cinesofía',
      dashboard_cinema_tag: 'PREMIUM',
      dashboard_cinema_footer: 'Análisis Profundo',
      dashboard_cronos_sub: 'Zeitgeist',
      dashboard_cronos_tag: 'TIME',
      dashboard_cronos_footer: 'Línea del Tiempo',
      dashboard_readings_title: 'Mi Biblioteca',
      dashboard_readings_empty: 'No has guardado textos en tu bitácora de resistencia aún.',
      dashboard_instagram_title: 'Sigue la Revolución en Instagram',
      dashboard_instagram_sub: '@elprofedefilosofia - Pensamiento radical en dosis visuales.',
      dashboard_my_library_sub: 'Archivos',
      dashboard_my_library_tag: 'ACTIVE',
      dashboard_my_library_footer_empty: 'Sin lecturas activas',
      dashboard_my_library_footer_last: 'Último: ',
      donations_contact: 'Contacto / Consultas',
      donations_arg: 'Donaciones (Pesos ARG)',
      donations_usd: 'Donaciones (USD / Exterior)',
      donations_support: 'Sostener el proyecto',
      donations_owner: 'Datos del Propietario',
      donations_bank: 'Transferencia Bancaria',
      donations_thanks: 'Gracias por apoyar la educación libre y el pensamiento crítico.',
      donations_alias_mp: 'MP Alias: elprofedefilosofia'
    },
    en: {
      nav_home: 'Home',
      nav_library: 'Library',
      nav_chat: 'AI Chat',
      nav_cinema: 'Cinema',
      nav_cronos: 'Cronos',
      nav_new_query: 'New Query',
      soul_status: 'Soul Status',
      socratic_connection: 'Socratic Connection',
      philosophy_z: 'Philosophy Z',
      radical_thought: 'Radical thought from the South',
      chat_placeholder: 'Write your question...',
      chat_title: 'The Punk Prof',
      chat_subtitle: 'Radical Thought',
      chat_history: 'View reflection history',
      chat_welcome: 'Welcome, truth seeker. What premise of your reality do you wish to question today?',
      chat_error: 'The dialectic has been interrupted by a technical error. Try again.',
      library_title: 'Library',
      library_subtitle: 'Repository of radical thought and critical archives.',
      library_search: 'Search authors or texts...',
      library_recommended: 'Recommended Reading',
      library_explorer: 'File Explorer',
      library_browse_elejandria: 'Browse Elejandría',
      library_open_drive: 'Open Drive',
      cinema_title: 'DIGITAL PUNK CINEMA',
      cinema_subtitle: 'Decentralized content aggregator. Films that question the structure of reality.',
      cinema_featured: 'Featured Film',
      cinema_telegram: 'Telegram Channel',
      cinema_close: 'Close',
      cinema_synopsis: 'Philosophical Synopsis',
      cinema_view_featured: 'View Featured',
      cinema_view_telegram: 'View on Telegram',
      user: 'User',
      profe: 'The Punk Prof',
      reference: 'Reference',
      bibliography: 'Bibliography',
      concepts: 'Key Concepts',
      next_workshop: 'Next Workshop',
      workshop_title: 'Existentialism & Punk in Buenos Aires',
      landing_manifesto: 'Manifesto 01',
      landing_title_1: 'Thinking is',
      landing_title_2: 'Resisting',
      landing_quote: '"Philosophy does not serve the State or the Church. It serves to sadden. A philosophy that does not sadden or contradict anyone is not a philosophy."',
      landing_author: '— Gilles Deleuze (Nietzsche y la filosofía)',
      landing_start: 'Start Kaos',
      landing_info: 'Manifesto',
      dashboard_status: '> SYSTEM_READY',
      dashboard_title_1: 'Modules',
      dashboard_title_2: 'Punk',
      dashboard_library_sub: 'Radical',
      dashboard_library_tag: 'READ',
      dashboard_library_footer: 'Forbidden Texts',
      dashboard_profe_sub: 'AI Mentor',
      dashboard_profe_tag: 'LIVE',
      dashboard_profe_footer: '"Ask, doubt, destroy."',
      dashboard_cinema_sub: 'Cinesophy',
      dashboard_cinema_tag: 'PREMIUM',
      dashboard_cinema_footer: 'Deep Analysis',
      dashboard_cronos_sub: 'Zeitgeist',
      dashboard_cronos_tag: 'TIME',
      dashboard_cronos_footer: 'Timeline',
      dashboard_readings_title: 'My Library',
      dashboard_readings_empty: 'You haven\'t saved any texts in your resistance log yet.',
      dashboard_instagram_title: 'Follow the Revolution on Instagram',
      dashboard_instagram_sub: '@elprofedefilosofia - Radical thought in visual doses.',
      dashboard_my_library_sub: 'Files',
      dashboard_my_library_tag: 'ACTIVE',
      dashboard_my_library_footer_empty: 'No active readings',
      dashboard_my_library_footer_last: 'Last: ',
      donations_contact: 'Contact / Inquiries',
      donations_arg: 'Donaciones (Pesos ARG)',
      donations_usd: 'Donaciones (USD / Exterior)',
      donations_support: 'Support the project',
      donations_owner: 'Owner Data',
      donations_bank: 'Bank Transfer',
      donations_thanks: 'Thank you for supporting free education and critical thinking.',
      donations_alias_mp: 'MP Alias: elprofedefilosofia'
    }
  }[language];

  React.useEffect(() => {
    if (process.env.GEMINI_API_KEY) {
      aiRef.current = new PhilosophyAI(process.env.GEMINI_API_KEY);
    }
  }, []);

  const handleSendToAI = (text: string) => {
    const command = `Explícame este fragmento de este autor: "${text}"`;
    setUserInput(command);
    setCurrentView('chat');
    // We don't automatically send it to give the user a chance to see the command
    // but we could call handleSendMessage() if we wanted immediate response.
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !aiRef.current) return;

    const userMessage: Message = { role: 'user', text: userInput };
    const initialModelMessage: Message = { role: 'model', text: '' };
    
    setChatMessages(prev => [...prev, userMessage, initialModelMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      const stream = aiRef.current.sendMessageStream(userInput);
      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        setChatMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
          return newMessages;
        });
        setIsTyping(false); // Once we start receiving text, we stop the "typing" indicator
      }
    } catch (error) {
      setChatMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { role: 'model', text: "La dialéctica se ha visto interrumpida por un error técnico. Inténtalo de nuevo." };
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const addToReadings = async (book: Book, format: 'pdf' | 'word' = 'pdf') => {
    if (downloadProgress[book.id]) return;
    
    const url = format === 'word' && book.wordUrl ? book.wordUrl : book.pdfUrl;
    
    try {
      const localUrl = await downloadFile(url, (progress) => {
        setDownloadProgress(prev => ({ ...prev, [book.id]: progress }));
      });
      
      if (!myReadings.find(b => b.id === book.id)) {
        setMyReadings(prev => [...prev, { ...book, pdfUrl: localUrl }]);
      }
      
      setDownloadProgress(prev => {
        const next = { ...prev };
        delete next[book.id];
        return next;
      });
    } catch (error) {
      console.error("Error downloading book:", error);
    }
  };

  const removeFromReadings = (id: string) => {
    setMyReadings(myReadings.filter(b => b.id !== id));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex bg-punk-black">
      <AnimatePresence>
        {activeReaderBook && (
          <ReaderView 
            fileUrl={activeReaderBook.pdfUrl} 
            title={activeReaderBook.title} 
            onClose={() => setActiveReaderBook(null)} 
            onSendToAI={handleSendToAI}
          />
        )}
      </AnimatePresence>
      <div className="texture-overlay" />
      <div className="scanline" />

      {/* Sidebar - Only visible in non-landing views or as a persistent nav */}
      <aside className="hidden md:flex flex-col w-72 border-r border-white/10 bg-punk-black/90 backdrop-blur-sm p-6 justify-between shrink-0 relative z-20">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 px-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="size-12 bg-primary text-black rounded-sm flex items-center justify-center font-black text-3xl font-serif -rotate-3 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">Z</div>
            <div className="flex flex-col">
              <h1 className="text-white text-2xl font-bold leading-none tracking-tight font-serif">Filosofía Z</h1>
              <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-wider">By Miguel Ángel Romero</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white text-black text-[9px] uppercase font-black px-1 py-0.5 tracking-widest">Academic Punk</span>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <NavItem active={currentView === 'dashboard'} icon={<Home size={20} />} label={t.nav_home} onClick={() => setCurrentView('dashboard')} />
            <NavItem active={currentView === 'library'} icon={<BookOpen size={20} />} label={t.nav_library} onClick={() => setCurrentView('library')} />
            <NavItem active={currentView === 'chat'} icon={<MessageSquare size={20} />} label={t.nav_chat} onClick={() => setCurrentView('chat')} />
            <NavItem active={currentView === 'cinema'} icon={<Film size={20} />} label={t.nav_cinema} onClick={() => setCurrentView('cinema')} />
            <NavItem active={currentView === 'cronos'} icon={<Clock size={20} />} label={t.nav_cronos} onClick={() => setCurrentView('cronos')} />
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-4 bg-white/5 rounded border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 relative z-10 tracking-widest">{t.soul_status}</p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="size-2.5 rounded-full bg-primary shadow-[0_0_10px_#fdf001] animate-pulse"></div>
              <span className="text-xs font-bold text-gray-200">{t.socratic_connection}</span>
            </div>
          </div>
          <button 
            onClick={() => {
              setChatMessages([{ role: 'model', text: t.chat_welcome }]);
              setCurrentView('chat');
            }}
            className="flex w-full items-center justify-center gap-2 rounded bg-primary py-3.5 text-sm font-black uppercase text-black transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:bg-white hover:shadow-[4px_4px_0px_0px_#fdf001] hover:-translate-y-1 hover:translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-none border-2 border-transparent"
          >
            <Plus size={18} />
            {t.nav_new_query}
          </button>

          <div className="mt-8 pt-8 border-t border-white/5 flex items-start gap-3">
            <div className="size-8 bg-primary rounded-full flex items-center justify-center shrink-0">
              <span className="text-black font-black text-xs">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white font-bold uppercase tracking-tighter">{t.philosophy_z}</span>
              <span className="text-[9px] text-gray-500 italic leading-tight">{t.radical_thought}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'landing' && <LandingView onStart={() => setCurrentView('dashboard')} t={t} />}
          {currentView === 'dashboard' && (
            <DashboardView 
              onNavigate={setCurrentView} 
              readings={myReadings} 
              onRemoveReading={removeFromReadings} 
              onRead={setActiveReaderBook}
              t={t}
            />
          )}
          {currentView === 'chat' && (
            <ChatView 
              messages={chatMessages} 
              userInput={userInput} 
              setUserInput={setUserInput} 
              onSend={handleSendMessage} 
              isTyping={isTyping} 
              t={t}
              language={language}
              setLanguage={setLanguage}
              onNavigate={setCurrentView}
            />
          )}
          {currentView === 'cinema' && <CinemaView t={t} onNavigate={setCurrentView} />}
          {currentView === 'library' && (
            <LibraryView t={t} onNavigate={setCurrentView} />
          )}
          {currentView === 'cronos' && (
            <CronosView t={t} onNavigate={setCurrentView} />
          )}
        </AnimatePresence>

        <footer className="mt-auto p-4 border-t border-white/5 bg-black/20 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
            Argentina, Zárate, Provincia de Buenos Aires - Derechos reservados
          </p>
        </footer>
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

function LandingView({ onStart, t }: { onStart: () => void, t: any }) {
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
          {t.landing_manifesto}
        </div>
        <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.85] text-white font-serif tracking-tighter">
          {t.landing_title_1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200" style={{ WebkitTextStroke: '1px #fdf001' }}>{t.landing_title_2}</span>
        </h1>
        
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-l-4 border-primary pl-6">
          <p className="text-xl md:text-2xl font-light italic text-slate-200 max-w-lg font-serif">
            {t.landing_quote}
          </p>
        </div>
        <div className="mt-4 text-sm uppercase tracking-[0.2em] font-bold text-primary/80 font-sans pl-7">
          {t.landing_author}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-5">
          <button onClick={onStart} className="bg-primary text-black px-10 py-4 font-black text-lg flex items-center justify-center uppercase tracking-wider group transition-all hover:scale-105 hover:-rotate-1">
            <Bolt className="mr-2 group-hover:rotate-12 transition-transform" />
            {t.landing_start}
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 font-bold text-lg flex items-center justify-center uppercase tracking-wider transition-all">
            <Info className="mr-2" />
            {t.landing_info}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardView({ onNavigate, readings, onRemoveReading, onRead, t }: { onNavigate: (v: View) => void, readings: Book[], onRemoveReading: (id: string) => void, onRead: (b: Book) => void, t: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 overflow-y-auto p-12 custom-scrollbar"
    >
      <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
        <div>
          <span className="text-primary font-mono text-xs mb-2 block">{t.dashboard_status}</span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white font-serif">
            {t.dashboard_title_1} <span className="italic text-primary">{t.dashboard_title_2}</span>
          </h2>
        </div>
        <div className="animate-pulse">
          <Star className="text-primary" size={40} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <ModuleCard 
          title={t.nav_library} 
          subtitle={t.dashboard_library_sub} 
          tag={t.dashboard_library_tag} 
          footer={t.dashboard_library_footer}
          image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"
          onClick={() => onNavigate('library')}
        />
        <ModuleCard 
          title={t.nav_chat} 
          subtitle={t.dashboard_profe_sub} 
          tag={t.dashboard_profe_tag} 
          footer={t.dashboard_profe_footer}
          isAI
          onClick={() => onNavigate('chat')}
        />
        <ModuleCard 
          title="Videoteca" 
          subtitle={t.dashboard_cinema_sub} 
          tag={t.dashboard_cinema_tag} 
          footer={t.dashboard_cinema_footer}
          image="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop"
          onClick={() => onNavigate('cinema')}
        />
        <ModuleCard 
          title={t.nav_cronos} 
          subtitle={t.dashboard_cronos_sub} 
          tag={t.dashboard_cronos_tag} 
          footer={t.dashboard_cronos_footer}
          image="https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1000&auto=format&fit=crop"
          onClick={() => onNavigate('cronos')}
        />
      </div>

      <div className="mb-16">
        <a 
          href="https://www.instagram.com/elprofedefilosofia/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-white/10 rounded-sm group hover:border-primary transition-all"
        >
          <div className="size-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm">{t.dashboard_instagram_title}</h4>
            <p className="text-xs text-gray-400 font-serif italic">{t.dashboard_instagram_sub}</p>
          </div>
          <ExternalLink className="ml-auto text-gray-600 group-hover:text-primary" size={20} />
        </a>
      </div>

      {/* Filosofía Z Manifesto Section */}
      <section className="mb-16 bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter font-serif italic">
              ¿Qué es <span className="text-primary">Filosofía Z</span>?
            </h3>
            <p className="text-primary font-mono text-sm uppercase tracking-widest">El pensamiento crítico en la era del scroll infinito</p>
          </div>
          
          <div className="space-y-6 text-gray-300 font-serif text-lg leading-relaxed italic">
            <p>
              "Filosofía Z no es un archivo de ideas muertas, es un ecosistema vivo. En un siglo XXI saturado de estímulos, nace este espacio diseñado por <span className="text-white font-bold not-italic">Miguel Ángel Romero</span> para las nuevas generaciones que buscan respuestas sin renunciar a la interactividad."
            </p>
            <p>
              Aquí, la filosofía abandona el pedestal de los libros empolvados para integrarse en una <span className="text-white font-bold not-italic">Biblioteca</span> digital, una <span className="text-white font-bold not-italic">Videoteca</span> de cine educativo, un <span className="text-white font-bold not-italic">Chat AI</span> de debate dialéctico, y una <span className="text-white font-bold not-italic">Línea del Tiempo Inmersiva</span>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-primary font-black uppercase text-xs mb-2">¿Para quién?</h4>
                <p className="text-sm">Para estudiantes, docentes y mentes curiosas que entienden que el conocimiento hoy es multimedia o no es.</p>
              </div>
              <div>
                <h4 className="text-primary font-black uppercase text-xs mb-2">¿Por qué?</h4>
                <p className="text-sm">Porque pensar es el acto más rebelde y entretenido que existe.</p>
              </div>
              <div>
                <h4 className="text-primary font-black uppercase text-xs mb-2">¿Para qué?</h4>
                <p className="text-sm">Para dotar a la juventud de herramientas lógicas frente a la desinformación y transformar el asombro en acción.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <footer className="pt-12 border-t border-white/5 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4 max-w-2xl">
            <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-relaxed opacity-70">
              Este proyecto se mantiene gracias al pensamiento compartido y al apoyo voluntario de su comunidad. Si encuentras valor en este espacio y deseas colaborar con su mantenimiento:
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-600 uppercase font-black">{t.donations_contact}</span>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <a href="mailto:miguelangelprofesor81@gmail.com" className="text-white font-mono hover:text-primary transition-colors">miguelangelprofesor81@gmail.com</a>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-600 uppercase font-black">{t.donations_arg}</span>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-white font-mono">{t.donations_alias_mp}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-600 uppercase font-black">{t.donations_usd}</span>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Alias: <span className="text-white font-mono">REZO.BIGOTE.BAR</span></span>
                  <span className="text-[10px] opacity-50">(Miguel Ángel Romero)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button 
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-sm hover:bg-primary hover:text-black transition-all group"
              onClick={() => {
                const el = document.getElementById('donation-info');
                el?.classList.toggle('hidden');
              }}
            >
              <Coffee size={18} className="group-hover:animate-bounce" />
              <span className="text-xs font-black uppercase tracking-widest">{t.donations_support}</span>
            </button>
            <div id="donation-info" className="hidden absolute bottom-full right-0 mb-4 w-72 bg-surface-dark border border-primary p-4 shadow-2xl z-50">
              <div className="space-y-1 mb-3 border-b border-white/10 pb-2">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">{t.donations_owner}</p>
                <p className="text-[10px] text-gray-400">Miguel Ángel Romero</p>
                <p className="text-[10px] text-gray-400">CUIL: 20-28637042-2</p>
                <p className="text-[10px] text-primary font-bold mt-1">miguelangelprofesor81@gmail.com</p>
              </div>
              <div className="space-y-1 mb-3">
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">{t.donations_bank}</p>
                <p className="text-[10px] text-gray-400">CBU: 0140025004713650648808</p>
                <p className="text-[10px] text-gray-400">SWIFT: PRBAARBAXXX</p>
              </div>
              <p className="text-[10px] text-gray-400 italic">{t.donations_thanks}</p>
            </div>
          </div>
        </div>
      </footer>
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

function ChatView({ messages, userInput, setUserInput, onSend, isTyping, t, language, setLanguage, onNavigate }: any) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
            <button 
              onClick={() => onNavigate('dashboard')}
              className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
              title="Volver al Inicio"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="relative">
              <div className="size-14 rounded bg-primary overflow-hidden border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] rotate-2">
                <img 
                  src="https://picsum.photos/seed/socrates-punk/200/200?grayscale" 
                  alt="Punk Philosopher" 
                  className="w-full h-full object-cover contrast-150 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-punk-black animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight font-serif italic leading-none">{t.chat_title}</h2>
              <div className="flex gap-2 items-center mt-1">
                <span className="text-[10px] bg-primary text-black px-1.5 py-0.5 font-bold uppercase tracking-wider">v2.4</span>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t.chat_subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              className="text-gray-400 hover:text-primary transition-colors hover:rotate-12 transform duration-300 focus:outline-none focus:ring-1 focus:ring-primary p-1"
              aria-label={t.chat_history}
            >
              <History size={20} />
            </button>
            <div className="flex items-center border border-white/20 rounded overflow-hidden" role="group" aria-label="Language selection">
              <button 
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-[10px] font-black tracking-widest transition-colors ${language === 'es' ? 'bg-primary text-black' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                ES
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-[10px] font-black tracking-widest transition-colors ${language === 'en' ? 'bg-primary text-black' : 'bg-transparent text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
          {messages.map((msg: Message, i: number) => (
            <ChatMessage 
              key={i}
              role={msg.role === 'model' ? 'profe' : 'user'} 
              content={msg.text} 
              isTyping={isTyping && i === messages.length - 1 && msg.role === 'model'}
              t={t}
            />
          ))}
          {isTyping && messages[messages.length-1].role === 'user' && (
            <ChatMessage role="profe" content="..." isTyping t={t} />
          )}
        </div>

        <div className="p-6 bg-gradient-to-t from-black via-punk-black to-transparent backdrop-blur-sm">
          <form 
            onSubmit={(e) => { e.preventDefault(); onSend(); }}
            className="max-w-4xl mx-auto relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-transparent rounded blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center gap-0 bg-punk-black border-2 border-white/20 p-2 shadow-2xl">
              <div className="flex items-center justify-center px-4 text-primary border-r border-white/10">
                <Brain size={24} />
              </div>
              <input 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-600 px-4 py-3 font-sans text-lg font-light" 
                placeholder={t.chat_placeholder} 
                type="text"
              />
              <button 
                type="submit"
                className="bg-primary text-black size-12 flex items-center justify-center transition-all hover:bg-white hover:scale-105"
              >
                <Send size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-80 border-l border-white/10 bg-punk-black/95 p-6 gap-8 overflow-y-auto custom-scrollbar relative">
        <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none select-none text-[120px] font-black leading-none text-white rotate-[-90deg] origin-bottom-right z-0">PUNK</div>
        
        <section className="relative z-10">
          <div className="flex items-center gap-2 mb-6 border-b border-primary/30 pb-2">
            <BookOpen className="text-primary" size={16} />
            <h3 className="text-xs text-primary uppercase font-black tracking-[0.2em]">{t.bibliography}</h3>
          </div>
          <div className="space-y-4">
            <BibliographyItem title="Apología de Sócrates" author="Platón" />
            <BibliographyItem title="Más allá del bien y del mal" author="Friedrich Nietzsche" />
          </div>
        </section>

        <section className="relative z-10">
          <div className="flex items-center gap-2 mb-6 border-b border-primary/30 pb-2">
            <Bookmark className="text-primary" size={16} />
            <h3 className="text-xs text-primary uppercase font-black tracking-[0.2em]">{t.concepts}</h3>
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
                <p className="text-[10px] font-black text-primary uppercase tracking-wider">{t.next_workshop}</p>
                <ExternalLink className="text-primary" size={14} />
              </div>
              <h4 className="text-white text-base font-bold font-serif leading-tight group-hover:text-primary transition-colors">{t.workshop_title}</h4>
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

function ChatMessage({ role, content, reference, isTyping, t }: any) {
  if (role === 'profe') {
    return (
      <div className="flex flex-col gap-2 max-w-3xl group">
        <div className="flex items-center gap-3 mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="size-8 rounded bg-primary overflow-hidden border border-white/20">
            <img 
              src="https://picsum.photos/seed/socrates-punk/100/100?grayscale" 
              alt="" 
              className="w-full h-full object-cover contrast-200"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs uppercase font-black tracking-widest text-primary">{t.profe}</span>
        </div>
        <div className="relative p-8 bg-punk-black border-2 border-primary/50 text-white shadow-[8px_8px_0px_0px_rgba(253,240,1,0.2)] transform -rotate-1">
          <div className="absolute -top-3 -right-3 size-10 bg-primary border-2 border-black flex items-center justify-center shadow-sm z-10 rotate-12">
            <span className="text-black font-serif text-2xl">"</span>
          </div>
          <p className="text-xl leading-relaxed font-serif font-medium text-primary-light">{content}</p>
          {reference && (
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/10">
              <span className="px-2 py-0.5 bg-primary text-black text-[10px] font-black uppercase tracking-widest -rotate-2">{t.reference}</span>
              <span className="text-xs font-bold text-gray-300 italic font-serif">{reference}</span>
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
        <span className="text-xs uppercase font-black tracking-widest text-gray-400">{t.user}</span>
        <div className="size-6 rounded bg-gray-700 flex items-center justify-center text-primary">
          <Plus size={14} />
        </div>
      </div>
      <div className="relative p-6 bg-punk-black border border-white/20 text-white shadow-[8px_8px_0px_0px_#fdf001] rotate-1">
        <p className="text-lg leading-relaxed font-sans font-light">{content}</p>
        <div className="absolute -left-1 top-4 w-1 h-8 bg-primary"></div>
      </div>
    </div>
  );
}

function CinemaView({ t, onNavigate }: { t: any, onNavigate: (v: View) => void }) {
  const [activeProblem, setActiveProblem] = React.useState(PHILOSOPHICAL_PROBLEMS[0]);
  const [selectedVideo, setSelectedVideo] = React.useState<Video | null>(null);

  const filteredVideos = CINEMA_CATALOG.filter(v => v.category === activeProblem);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-y-auto custom-scrollbar bg-background-dark relative"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] film-grain"></div>
      
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-primary transition-colors flex items-center gap-2 uppercase font-black tracking-widest text-xs"
            >
              {t.cinema_close} <Plus className="rotate-45" size={20} />
            </button>
            
            <div className="w-full max-w-4xl bg-surface-dark border-2 border-primary/20 p-8 md:p-12 shadow-[0_0_50px_rgba(253,240,1,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none text-[80px] font-black leading-none text-white rotate-12 translate-x-1/4 -translate-y-1/4">CINEMA</div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <img 
                  src={selectedVideo.cover} 
                  alt={selectedVideo.title} 
                  className="w-48 h-72 object-cover border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
                />
                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-primary font-black uppercase text-xs tracking-[0.3em] mb-2">{t.cinema_synopsis}</p>
                    <h3 className="text-4xl md:text-5xl font-black text-white font-serif italic uppercase tracking-tighter leading-none">
                      {selectedVideo.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 font-serif italic text-lg leading-relaxed border-l-2 border-primary/50 pl-6">
                    {selectedVideo.synopsis}
                  </p>
                  <div className="pt-4">
                    <a 
                      href={selectedVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-primary text-black px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[8px_8px_0px_0px_#fdf001] hover:-translate-y-1 hover:translate-x-1"
                    >
                      {t.cinema_view_telegram} <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-8 left-8 z-50">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="p-3 bg-white/5 border border-white/10 rounded-sm text-gray-400 hover:text-white hover:border-primary transition-all shadow-xl backdrop-blur-md"
          title="Volver al Inicio"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

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
            <span className="px-2 py-0.5 bg-primary text-black text-[10px] font-black uppercase tracking-wider transform -rotate-2">{t.cinema_featured}</span>
            <div className="h-px w-12 bg-primary"></div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="size-24 md:size-32 shrink-0 border-2 border-primary rounded-full overflow-hidden shadow-[0_0_30px_rgba(253,240,1,0.2)] bg-punk-black">
              <img 
                src="CineSofia.png" 
                alt="CineSofia Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/cinesofia/200/200?grayscale"; }}
              />
            </div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] text-white italic tracking-tighter">
              {t.cinema_title.split(' ')[0]} <br />
              <span className="text-primary font-serif not-italic">{t.cinema_title.split(' ')[1]}</span> {t.cinema_title.split(' ').slice(2).join(' ')}
            </h2>
          </div>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light italic leading-relaxed border-l-2 border-primary pl-4">
            {t.cinema_subtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-6">
            <button 
              onClick={() => setSelectedVideo(CINEMA_CATALOG[0])}
              className="bg-primary hover:bg-white text-black px-8 py-4 rounded-sm font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
            >
              {t.cinema_view_featured}
            </button>
            <a 
              href="https://t.me/tuspeliculas15555" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              {t.cinema_telegram}
            </a>
          </div>
        </div>
      </section>

      <div className="p-12 space-y-16">
        {/* Permanent Featured Video Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-primary"></div>
            <h3 className="text-2xl font-black text-white uppercase font-serif italic tracking-tight">{t.cinema_featured}: Filosofía Z</h3>
          </div>
          <div className="aspect-video w-full bg-punk-black border border-white/10 rounded-sm overflow-hidden shadow-2xl relative group">
            <iframe 
              src="https://www.youtube.com/embed/cF2fDtUKyJU" 
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Filosofía Z Featured Film"
            />
          </div>
        </section>

        {/* Odysee Channel Banner */}
        <section className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-white/10 p-8 rounded-sm flex flex-col md:flex-row items-center gap-8 group hover:border-primary transition-all">
          <a 
            href="https://odysee.com/@ElProfeDeFilosofia1981:e" 
            target="_blank" 
            rel="noopener noreferrer"
            className="shrink-0 w-full md:w-64 aspect-video overflow-hidden border-2 border-white/20 group-hover:border-primary transition-all shadow-2xl relative"
          >
            <img 
              src="https://www.dropbox.com/scl/fi/9z3ycq47iub21lvlea5uq/Odysee-2.png?rlkey=n7ed2f5nyu7ptdhdi0smkpn92&st=jrvo2xgn&raw=1" 
              alt="Canal Odysee" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/odysee/400/225?grayscale"; }}
            />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ExternalLink size={40} className="text-white drop-shadow-lg" />
            </div>
          </a>
          <div className="space-y-4 flex-1">
            <h3 className="text-3xl font-black text-white uppercase font-serif italic tracking-tight">
              ¿Quieres profundizar más?
            </h3>
            <p className="text-gray-300 font-serif italic text-lg leading-relaxed max-w-2xl">
              Te invitamos a visitar el canal de <span className="text-primary font-bold not-italic">"El Profe de Filosofía"</span> en Odysee para reflexionar sobre más contenidos del séptimo arte y el pensamiento crítico.
            </p>
            <a 
              href="https://odysee.com/@ElProfeDeFilosofia1981:e"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-black px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-white transition-all"
            >
              Visitar Canal en Odysee <ExternalLink size={16} />
            </a>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-6">
          {PHILOSOPHICAL_PROBLEMS.map(problem => (
            <button
              key={problem}
              onClick={() => setActiveProblem(problem)}
              className={`px-4 py-2 text-xs uppercase font-black tracking-widest transition-all ${
                activeProblem === problem ? 'bg-primary text-black' : 'text-gray-400 hover:text-primary'
              }`}
            >
              {problem}
            </button>
          ))}
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rotate-12"></div>
            <h3 className="text-2xl font-bold tracking-tight text-white uppercase font-serif italic">
              {activeProblem}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} onSelect={() => setSelectedVideo(video)} t={t} />
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function VideoCard({ video, onSelect }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group cursor-pointer" 
      onClick={onSelect}
    >
      <div className="relative aspect-[16/9] bg-black border border-white/10 group-hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-lg group-hover:shadow-[0_0_30px_rgba(253,240,1,0.1)]">
        <img 
          src={video.cover} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
          <div className="size-16 rounded-full bg-primary/10 backdrop-blur-md border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(253,240,1,0.3)]">
            <Film size={32} />
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-widest">PLAY</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 transform group-hover:translate-y-[-4px] transition-transform duration-500">
          <p className="text-[9px] text-primary font-black uppercase mb-1 tracking-[0.2em] opacity-80 group-hover:opacity-100">@ElProfe1981</p>
          <h4 className="text-xl font-black text-white leading-tight group-hover:text-primary transition-colors font-serif italic tracking-tight">{video.title}</h4>
        </div>
      </div>
      <div className="mt-4 space-y-2 px-1">
        <p className="text-xs text-gray-400 font-serif italic line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{video.synopsis}</p>
        <button 
          className="inline-flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest hover:text-white transition-colors group/btn"
        >
          Ver Sinopsis <Info size={12} className="group-hover/btn:rotate-12 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

function LibraryView({ t, onNavigate }: { t: any, onNavigate: (v: View) => void }) {
  const driveFolderId = '1nV0lSIwVuulm9cSnanOo_LHZC-iCWP2l';
  const featuredFileId = '1JEKRq0dRDLCFfEWyIQl179jXvmzRJxeV';
  const driveUrl = `https://drive.google.com/embeddedfolderview?id=${driveFolderId}#list`;
  const featuredFileUrl = `https://drive.google.com/file/d/${featuredFileId}/preview`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col bg-[#121212] relative overflow-y-auto custom-scrollbar"
    >
      {/* Parchment Pattern Overlay */}
      <div className="absolute inset-0 parchment-bg opacity-[0.05] pointer-events-none" />

      <div className="flex-1 flex flex-col p-8 md:p-12 space-y-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="p-3 bg-white/5 border border-white/10 rounded-sm text-gray-400 hover:text-white hover:border-primary transition-all"
              title="Volver al Inicio"
            >
              <ArrowLeft size={24} />
            </button>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white font-serif">
                {t.library_title.split(' ')[0]} <span className="italic text-academic-blue">{t.library_title.split(' ')[1]}</span>
              </h2>
              <p className="text-gray-400 font-serif italic text-lg">{t.library_subtitle}</p>
            </motion.div>
          </div>
          
          <div className="flex gap-4">
            <a 
              href={`https://drive.google.com/drive/folders/${driveFolderId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-academic-blue text-white px-6 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-lg"
            >
              <ExternalLink size={14} />
              {t.library_open_drive}
            </a>
          </div>
        </div>

        {/* Featured Document Section (Libro Recomendado) */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-primary shadow-[0_0_15px_rgba(253,240,1,0.3)]"></div>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase font-serif italic tracking-tighter">{t.library_recommended}</h3>
          </div>
          <div className="aspect-video w-full bg-punk-black border border-white/10 rounded-sm overflow-hidden shadow-2xl relative group">
            <iframe 
              src={featuredFileUrl} 
              className="w-full h-full border-none"
              allow="autoplay"
              title="Lectura Recomendada"
            />
          </div>
        </section>

        {/* Libros ATP Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-primary shadow-[0_0_15px_rgba(253,240,1,0.3)]"></div>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase font-serif italic tracking-tighter">Libros ATP</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                title: "¿Para qué sirve la filosofía?", 
                url: "https://www.dropbox.com/scl/fo/gps0yu5br2gcgaoail7cv/ABxU_N27y14X-wS7AH97vD4/%C2%BFPara%20que%20sitrve%20la%20filosof%C3%ADa%3F.jpeg?rlkey=sra0zf885wydnxh8dqar4zujq&raw=1",
                link: "https://drive.google.com/file/d/1I3XdAWyCSxI-nxHKWJJv44nzigE5s-Vx/view?usp=sharing"
              },
              { 
                title: "Filosofía Doméstica", 
                url: "https://www.dropbox.com/scl/fi/lrclp680c7fkp442hjzwa/Filosof-a-Dom-stica-M.A.jpg?rlkey=d15kcc29nzg1ywp9jmzlpfywb&raw=1",
                link: "https://drive.google.com/file/d/1e2vAahqA-wh0CPDaJjnMkqAyQDq_s7z8/view?usp=sharing"
              },
              { 
                title: "La sociedad del cansancio", 
                url: "https://www.dropbox.com/scl/fo/gps0yu5br2gcgaoail7cv/AHAAQZ-2IsvBNyexdfTwXzM/La%20sociedad%20del%20cansancio.jpeg?rlkey=sra0zf885wydnxh8dqar4zujq&raw=1",
                link: "https://drive.google.com/file/d/1denucMO_rT6417lW5qWUuMQJ7Cg4Fcq4/view?usp=sharing"
              },
              { 
                title: "Los Simpsons y la filosofía", 
                url: "https://www.dropbox.com/scl/fo/gps0yu5br2gcgaoail7cv/APn0HRFKLLhls-YpdEVeo2k/Los%20Simpsons%20y%20la%20filosof%C3%ADa.jpeg?rlkey=sra0zf885wydnxh8dqar4zujq&raw=1",
                link: "https://drive.google.com/file/d/1IO2kPrwf4CoQ-w0H82jS38CEPiR9tZl4/view?usp=sharing"
              }
            ].map((book, i) => (
              <a 
                key={i} 
                href={book.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="relative aspect-[3/4] bg-punk-black border border-white/10 rounded-sm overflow-hidden shadow-xl group cursor-pointer"
                >
                  <img 
                    src={book.url} 
                    alt={book.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary/90">
                    <p className="text-black font-black text-[10px] uppercase leading-tight">{book.title}</p>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </section>

        {/* Drive Folder Iframe Container */}
        <section className="space-y-8 flex-1 flex flex-col min-h-[800px]">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-academic-blue shadow-[0_0_15px_rgba(0,102,204,0.5)]"></div>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase font-serif italic tracking-tighter">
              {t.library_explorer}
            </h3>
          </div>
          <div className="flex-1 bg-punk-black border-2 border-academic-blue/20 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,102,204,0.15)] relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-academic-blue/5 to-transparent opacity-50 pointer-events-none z-10" />
            <iframe 
              src={driveUrl} 
              className="w-full h-full border-none transition-all duration-700"
              style={{ 
                filter: 'invert(0.9) hue-rotate(185deg) brightness(1.1) contrast(1.15)',
                backgroundColor: '#fff'
              }}
              title="Biblioteca Filosofía Z"
              allow="autoplay"
            />
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-academic-blue/40 z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-academic-blue/40 z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-academic-blue/40 z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-academic-blue/40 z-20 pointer-events-none" />
          </div>
          
          <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-sm">
            <p className="text-[11px] text-gray-400 font-serif italic leading-relaxed">
              <span className="text-primary font-bold uppercase mr-2">Sugerencia de lectura:</span>
              Para una mejor visualización de los archivos en smartphones Android, recomendamos descargar la aplicación 
              <a 
                href="https://play.google.com/store/apps/details?id=com.flyersoft.moonreader&pcampaignid=web_share" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-academic-blue hover:underline mx-1 font-bold"
              >
                Moon+ Reader
              </a>. 
              También puedes optar por leer el archivo directamente desde Google Drive.
            </p>
          </div>
        </section>

        <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-[0.2em] text-gray-600 border-t border-white/5 pt-6">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="size-1.5 bg-academic-blue rounded-full" /> Sincronización Directa</span>
            <span className="flex items-center gap-2"><div className="size-1.5 bg-primary rounded-full" /> Acceso Libre</span>
          </div>
          <p className="italic font-serif">{t.philosophy_z} - {t.radical_thought}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CronosView({ t, onNavigate }: { t: any, onNavigate: (v: View) => void }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = React.useState<CronosNode>(CRONOS_TIMELINE[0]);
  const [isFrozen, setIsFrozen] = React.useState(false);
  const [showChat, setShowChat] = React.useState<string | null>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked"));
      } else {
        audioRef.current.pause();
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isMuted]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    if (CRONOS_TIMELINE[index] && CRONOS_TIMELINE[index].id !== activeNode.id) {
      setActiveNode(CRONOS_TIMELINE[index]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex-1 flex flex-col relative overflow-hidden transition-all duration-1000 ${isFrozen ? 'filter grayscale brightness-50' : ''}`}
      style={{ 
        backgroundColor: activeNode.aesthetic.color + '10',
        filter: `brightness(${activeNode.aesthetic.brightness}) ${isFrozen ? 'grayscale(1) brightness(0.5)' : ''}`
      }}
    >
      {/* Background Parallax */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeNode.id}
            src={activeNode.aesthetic.bg} 
            className="w-full h-full object-cover opacity-30 grayscale contrast-150"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-punk-black via-transparent to-punk-black" />
      </div>

      {/* Header */}
      <div className="relative z-20 p-8 flex justify-between items-start">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-3 bg-white/5 border border-white/10 rounded-sm text-gray-400 hover:text-white hover:border-primary transition-all"
            title="Volver al Inicio"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-4xl font-black text-white uppercase font-serif italic tracking-tighter">
              Cronos <span className="text-primary text-xl not-italic ml-2">v1.0</span>
            </h2>
            <p className="text-xs text-primary font-mono mt-1 tracking-widest uppercase">Línea del Tiempo Educativa // {activeNode.year}</p>
          </div>
        </div>
      </div>

      {/* Horizontal Timeline Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory custom-scrollbar-hide relative z-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {CRONOS_TIMELINE.map((node, idx) => (
          <div key={node.id} className="min-w-full h-full flex items-center justify-center snap-center p-12 relative">
            {/* Parallax Elements */}
            <motion.div 
              className="absolute top-1/4 left-1/4 opacity-10 pointer-events-none"
              animate={{ x: activeNode.id === node.id ? 0 : 100 }}
            >
              <Clock size={300} className="text-white" />
            </motion.div>

            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 bg-primary text-black px-4 py-1 font-black text-sm uppercase tracking-tighter -rotate-2">
                  <Clock size={16} /> {node.year}
                </div>
                <h3 className="text-6xl md:text-8xl font-black text-white font-serif italic leading-none tracking-tighter">
                  {node.title}
                </h3>
                <p className="text-2xl text-primary font-bold uppercase tracking-tight">{node.philosopher}</p>
                <p className="text-xl text-gray-300 font-serif italic leading-relaxed border-l-4 border-primary pl-6">
                  {node.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-8">
                  <button 
                    onClick={() => setShowChat(node.id)}
                    className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center gap-2"
                  >
                    <MessageCircle size={18} /> Chat de Pasillo
                  </button>
                </div>
              </motion.div>

              <div className="relative flex justify-center">
                <motion.div 
                  className="relative size-80 md:size-96"
                  animate={{ rotate: activeNode.id === node.id ? 0 : 5 }}
                >
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin-slow" />
                  <div className="absolute inset-4 border-2 border-white/10 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={`https://picsum.photos/seed/${node.id}/600/600?grayscale`} 
                      className="size-64 md:size-80 object-cover rounded-full border-4 border-white shadow-2xl grayscale contrast-125"
                      alt={node.philosopher}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat de Pasillo Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="bg-surface-dark border-2 border-primary p-8 max-w-lg w-full space-y-6 relative">
              <button 
                onClick={() => setShowChat(null)}
                className="absolute -top-4 -right-4 size-10 bg-primary text-black flex items-center justify-center font-black rounded-sm"
              >
                X
              </button>
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="text-primary" />
                <h4 className="text-xl font-black text-white uppercase font-serif italic">Chat de Pasillo</h4>
              </div>
              <div className="space-y-4">
                {(() => {
                  const node = CRONOS_TIMELINE.find(n => n.id === showChat);
                  const participants = node?.interactive?.content.participants || [];
                  return node?.interactive?.content.messages.map((msg: any, i: number) => {
                    const isFirst = msg.from === participants[0];
                    return (
                      <div key={i} className={`flex flex-col ${isFirst ? 'items-start' : 'items-end'}`}>
                        <span className="text-[10px] font-black text-primary uppercase mb-1">{msg.from}</span>
                        <div className={`p-3 rounded-sm text-sm ${isFirst ? 'bg-white/10 text-white border-l-2 border-primary' : 'bg-primary text-black font-bold'}`}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {CRONOS_TIMELINE.map((node) => (
          <button 
            key={node.id}
            onClick={() => {
              const idx = CRONOS_TIMELINE.findIndex(n => n.id === node.id);
              scrollRef.current?.scrollTo({ left: idx * scrollRef.current.offsetWidth, behavior: 'smooth' });
            }}
            className={`size-3 rounded-full transition-all ${activeNode.id === node.id ? 'bg-primary w-12' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>

      {/* Audio Control */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
        <audio 
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
          loop
        />
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="size-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all"
          title={isMuted ? "Activar Sonido" : "Silenciar"}
        >
          {isMuted ? <Music size={18} className="opacity-50" /> : <Music size={18} className="animate-pulse" />}
        </button>
      </div>
    </motion.div>
  );
}


