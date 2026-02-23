import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { fetchDriveFiles, DriveFile, cleanTitle } from '../services/googleDriveService';

interface FileExplorerProps {
  onFileSelect: (file: DriveFile) => void;
}

export default function FileExplorer({ onFileSelect }: FileExplorerProps) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        const data = await fetchDriveFiles();
        setFiles(data);
        if (data.length === 0) {
          setError('No se pudieron cargar los archivos. Verifica la configuración de la API de Google Drive.');
        }
      } catch (err) {
        setError('Error al conectar con la biblioteca digital.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-academic-blue">
        <Loader2 className="animate-spin" size={48} />
        <p className="text-xs font-black uppercase tracking-[0.3em] animate-pulse">Accediendo a los archivos...</p>
      </div>
    );
  }

  if (error || files.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
        <AlertCircle size={64} className="text-red-500/50" />
        <div className="space-y-2">
          <p className="text-xl font-serif italic text-gray-400">{error || 'La biblioteca está temporalmente fuera de línea.'}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-600">Por favor, intenta más tarde o contacta al administrador.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onFileSelect(file)}
            className="group relative aspect-[3/4] bg-surface-dark border border-white/10 overflow-hidden cursor-pointer transition-all hover:border-academic-blue/50 hover:-translate-y-2"
          >
            {/* Book Cover / Thumbnail */}
            <div className="absolute inset-0 bg-punk-black">
              <img 
                src={file.thumbnailLink?.replace('=s220', '=s800') || `https://picsum.photos/seed/${file.id}/400/600?grayscale`} 
                alt=""
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            </div>

            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="w-10 h-1 bg-academic-blue mb-4 transform -translate-x-full group-hover:translate-x-0 transition duration-300" />
              
              <h4 className={`text-xl font-black uppercase tracking-tighter leading-tight mb-2 transition-colors ${
                index % 3 === 0 ? 'text-white group-hover:text-academic-blue' : 
                index % 3 === 1 ? 'text-yellow-400 group-hover:text-yellow-300' : 
                'text-sky-300 group-hover:text-white'
              }`}>
                {cleanTitle(file.name)}
              </h4>

              <div className="flex flex-wrap items-center gap-3 text-[9px] uppercase font-black tracking-widest text-gray-400 border-t border-white/10 pt-3 mt-1">
                <span className="flex items-center gap-1.5">
                  <div className={`size-1.5 rounded-full ${file.mimeType.includes('pdf') ? 'bg-red-500' : file.mimeType.includes('video') ? 'bg-blue-500' : 'bg-green-500'}`} />
                  {file.mimeType.includes('pdf') ? 'PDF' : file.mimeType.includes('video') ? 'VIDEO' : 'DOC'}
                </span>
                {file.category && (
                  <span className="flex items-center gap-1.5 opacity-60">
                    <div className="size-1.5 bg-white/20 rounded-full" />
                    {file.category}
                  </span>
                )}
              </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform z-20">
              <button 
                className="p-2 bg-black/80 text-white hover:text-academic-blue rounded-sm backdrop-blur-md border border-white/10 transition-all"
                title="Abrir en Google Drive"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(file.webViewLink, '_blank');
                }}
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
