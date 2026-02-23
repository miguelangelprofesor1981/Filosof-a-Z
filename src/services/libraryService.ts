
export interface Book {
  id: string;
  title: string;
  driveId: string;
  author?: string;
  category?: string;
  wordUrl?: string;
  pdfUrl?: string;
}

export const LIBRARY_CATALOG: Book[] = [
  {
    id: '1',
    title: 'El Existencialismo es un Humanismo',
    author: 'Jean-Paul Sartre',
    driveId: '1JEKRq0dRDLCFfEWyIQl179jXvmzRJxeV',
    category: 'Existencialismo'
  },
  {
    id: '2',
    title: 'Así habló Zaratustra',
    author: 'Friedrich Nietzsche',
    driveId: '1nV0lSIwVuulm9cSnanOo_LHZC-iCWP2l', // Using folder ID as placeholder if file ID unknown
    category: 'Nihilismo'
  },
  {
    id: '3',
    title: 'La Sociedad del Cansancio',
    author: 'Byung-Chul Han',
    driveId: '1JEKRq0dRDLCFfEWyIQl179jXvmzRJxeV',
    category: 'Contemporánea'
  },
  {
    id: '4',
    title: 'Vigilar y Castigar',
    author: 'Michel Foucault',
    driveId: '1nV0lSIwVuulm9cSnanOo_LHZC-iCWP2l',
    category: 'Poder'
  },
  {
    id: '5',
    title: 'Crítica de la Razón Pura',
    author: 'Immanuel Kant',
    driveId: '1JEKRq0dRDLCFfEWyIQl179jXvmzRJxeV',
    category: 'Idealismo'
  },
  {
    id: '6',
    title: 'El Banquete',
    author: 'Platón',
    driveId: '1nV0lSIwVuulm9cSnanOo_LHZC-iCWP2l',
    category: 'Clásica'
  }
];

export const getThumbnailUrl = (driveId: string) => {
  return `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`;
};

export const getReadUrl = (driveId: string) => {
  return `https://drive.google.com/file/d/${driveId}/view`;
};

export const getDownloadUrl = (driveId: string) => {
  return `https://drive.google.com/uc?export=download&id=${driveId}`;
};

export async function downloadFile(url: string, onProgress: (p: number) => void): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Download failed');
  
  const contentLength = response.headers.get('content-length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  let loaded = 0;

  const reader = response.body?.getReader();
  if (!reader) throw new Error('ReadableStream not supported');

  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    if (total > 0) {
      onProgress(Math.round((loaded / total) * 100));
    }
  }

  const blob = new Blob(chunks);
  return URL.createObjectURL(blob);
}
