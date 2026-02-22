import React from 'react';
import { Viewer, Worker, ThemeContext } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { motion } from 'motion/react';
import { X, Maximize2, Minimize2, Sun, Moon, Coffee } from 'lucide-react';

interface ReaderViewProps {
  fileUrl: string;
  title: string;
  onClose: () => void;
}

export default function ReaderView({ fileUrl, title, onClose }: ReaderViewProps) {
  const [isMinimal, setIsMinimal] = React.useState(false);
  const [readingMode, setReadingMode] = React.useState<'light' | 'dark' | 'sepia'>('dark');
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const getThemeStyles = () => {
    switch (readingMode) {
      case 'dark': return 'bg-punk-black text-white';
      case 'sepia': return 'bg-[#f4ecd8] text-[#5b4636]';
      case 'light': return 'bg-white text-black';
      default: return 'bg-punk-black text-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed inset-0 z-[200] flex flex-col ${getThemeStyles()}`}
    >
      {/* Minimalist Header */}
      {!isMinimal && (
        <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cerrar lector"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold font-serif italic">{title}</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setReadingMode('light')}
                className={`p-2 rounded-full transition-all ${readingMode === 'light' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Sun size={18} />
              </button>
              <button 
                onClick={() => setReadingMode('sepia')}
                className={`p-2 rounded-full transition-all ${readingMode === 'sepia' ? 'bg-[#e3dacb] text-[#5b4636]' : 'text-gray-400 hover:text-white'}`}
              >
                <Coffee size={18} />
              </button>
              <button 
                onClick={() => setReadingMode('dark')}
                className={`p-2 rounded-full transition-all ${readingMode === 'dark' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Moon size={18} />
              </button>
            </div>
            
            <button 
              onClick={() => setIsMinimal(true)}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors"
            >
              <Maximize2 size={18} />
              Modo Enfoque
            </button>
          </div>
        </header>
      )}

      {/* Focus Mode Toggle (Visible when minimal) */}
      {isMinimal && (
        <button 
          onClick={() => setIsMinimal(false)}
          className="fixed top-8 right-8 z-[210] p-3 bg-primary text-black rounded-full shadow-2xl hover:scale-110 transition-transform"
          aria-label="Salir de modo enfoque"
        >
          <Minimize2 size={24} />
        </button>
      )}

      {/* PDF Viewer Container */}
      <div className={`flex-1 overflow-hidden relative ${isMinimal ? 'p-0' : 'p-4 md:p-8'}`}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="h-full w-full rounded-lg overflow-hidden border border-white/5 shadow-2xl">
            <Viewer 
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance]}
              theme={readingMode === 'dark' ? 'dark' : 'light'}
            />
          </div>
        </Worker>
      </div>

      {/* Progress Bar (Simulated) */}
      {!isMinimal && (
        <footer className="px-8 py-3 border-t border-white/10 bg-black/30 text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 flex justify-between items-center">
          <span>Progreso de lectura: 42%</span>
          <div className="flex gap-4">
            <span className="text-primary">Marcador guardado</span>
            <span>Filosofía Z Reader v1.0</span>
          </div>
        </footer>
      )}
    </motion.div>
  );
}
