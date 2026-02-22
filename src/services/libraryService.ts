import { fetchDriveFiles, DriveFile, cleanTitle } from './googleDriveService';

export interface Book {
  id: string;
  title: string;
  author: string;
  authorBio?: string;
  description: string;
  pdfUrl: string;
  wordUrl?: string;
  cover: string;
  category: 'Filosofía' | 'Literatura';
  source: 'Elejandría' | 'CVC' | 'Drive Personal';
  year?: string;
  pages?: number;
  snippet?: string;
  nationality?: string;
  period?: 'Clásico' | 'Moderno' | 'Contemporáneo';
  theme?: string;
  rating: number;
  views: number;
  downloads: number;
  featuredWorks?: string[];
}

/**
 * Infers metadata from author name.
 */
function getAuthorMetadata(author: string) {
  const name = author.toLowerCase();
  if (name.includes('althusser')) return { nationality: 'Francés', period: 'Contemporáneo', theme: 'Marxismo', category: 'Filosofía' };
  if (name.includes('cruz')) return { nationality: 'Mexicana', period: 'Moderno', theme: 'Poesía', category: 'Literatura' };
  if (name.includes('platón')) return { nationality: 'Griego', period: 'Clásico', theme: 'Metafísica', category: 'Filosofía' };
  if (name.includes('kant')) return { nationality: 'Alemán', period: 'Moderno', theme: 'Ética', category: 'Filosofía' };
  if (name.includes('nietzsche')) return { nationality: 'Alemán', period: 'Contemporáneo', theme: 'Existencialismo', category: 'Filosofía' };
  if (name.includes('cervantes')) return { nationality: 'Español', period: 'Moderno', theme: 'Novela', category: 'Literatura' };
  
  return { nationality: 'Desconocida', period: 'Contemporáneo', theme: 'General', category: 'Filosofía' };
}

/**
 * Maps DriveFile to Book interface.
 */
export function mapDriveFileToBook(file: DriveFile): Book {
  const rawAuthor = file.description?.split('\n')[0] || 'Romero, Miguel Ángel';
  const cleanAuthor = rawAuthor.replace(/_/g, ' ');
  const metadata = getAuthorMetadata(cleanAuthor);

  return {
    id: file.id,
    title: cleanTitle(file.name),
    author: cleanAuthor,
    authorBio: `Contexto biográfico de ${cleanAuthor}: Pensador influyente en el ámbito de la ${metadata.theme}. Su obra se sitúa en el periodo ${metadata.period}, aportando una visión crítica y radical que resuena en la cátedra de Filosofía Z.`,
    description: file.description || 'Documento de la cátedra de Filosofía Z.',
    pdfUrl: `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
    wordUrl: file.mimeType.includes('word') ? `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media` : undefined,
    cover: file.thumbnailLink || `https://picsum.photos/seed/${file.id}/400/600`,
    category: metadata.category as any,
    source: 'Drive Personal',
    snippet: file.description,
    nationality: metadata.nationality,
    period: metadata.period as any,
    theme: metadata.theme,
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    views: Math.floor(Math.random() * 1000) + 100,
    downloads: Math.floor(Math.random() * 500) + 50,
    featuredWorks: [cleanTitle(file.name)]
  };
}

/**
 * Simulates the download process.
 */
export async function downloadFile(url: string, onProgress: (p: number) => void, accessToken?: string): Promise<string> {
  for (let i = 0; i <= 100; i += 10) {
    onProgress(i);
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  
  // In a real app, we would fetch the blob with the access token
  // For now, we'll return the URL directly or a blob URL if we were actually downloading
  return url;
}
