
import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Download, Info } from 'lucide-react';
import { Book, getThumbnailUrl, getReadUrl, getDownloadUrl } from '../services/libraryService';

interface BookCardProps {
  book: Book;
  t: any;
}

export function BookCard({ book, t }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group bg-surface-dark border border-white/10 hover:border-academic-blue transition-all duration-300 overflow-hidden shadow-xl flex flex-col h-full"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[3/4] bg-punk-black overflow-hidden">
        <img 
          src={getThumbnailUrl(book.driveId)} 
          alt={book.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
          onError={(e) => {
            // Fallback if thumbnail fails
            e.currentTarget.src = `https://picsum.photos/seed/${book.id}/400/600?grayscale`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        
        {/* Category Tag */}
        {book.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-academic-blue text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rotate-1">
              {book.category}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <div className="flex gap-4">
            <a 
              href={getReadUrl(book.driveId)}
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-academic-blue hover:text-white transition-all shadow-lg"
              title="Leer Online"
            >
              <BookOpen size={20} />
            </a>
            <a 
              href={getDownloadUrl(book.driveId)}
              target="_blank"
              rel="noopener noreferrer"
              className="size-12 rounded-full bg-academic-blue text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg"
              title="Descargar PDF"
            >
              <Download size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h4 className="text-lg font-bold text-white leading-tight group-hover:text-academic-blue transition-colors font-serif italic line-clamp-2">
            {book.title}
          </h4>
          {book.author && (
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 font-mono">
              {book.author}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <a 
            href={getReadUrl(book.driveId)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black py-2 text-[10px] font-black uppercase tracking-widest transition-all text-center"
          >
            Leer
          </a>
          <a 
            href={getDownloadUrl(book.driveId)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-academic-blue/20 border border-academic-blue/30 text-academic-blue hover:bg-academic-blue hover:text-white py-2 text-[10px] font-black uppercase tracking-widest transition-all text-center"
          >
            Bajar
          </a>
        </div>
      </div>
    </motion.div>
  );
}
