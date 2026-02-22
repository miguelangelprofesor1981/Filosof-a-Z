export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pdfUrl: string;
  epubUrl: string;
  cover: string;
  category: string;
  source: 'Elejandría' | 'CVC' | 'Drive Personal';
  year?: string;
  pages?: number;
}

export const ELEJANDRIA_CATALOG: Book[] = [
  {
    id: 'e1',
    title: 'La República',
    author: 'Platón',
    description: 'Una de las obras más influyentes de la filosofía occidental, donde Sócrates discute la justicia y la estructura de la ciudad-estado ideal.',
    pdfUrl: 'https://www.elejandria.com/libro/la-republica/platon/123',
    epubUrl: 'https://www.elejandria.com/libro/la-republica/platon/123',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    category: 'Filosofía Antigua',
    source: 'Elejandría',
    year: '375 a.C.',
    pages: 450
  },
  {
    id: 'e2',
    title: 'Crítica de la razón pura',
    author: 'Immanuel Kant',
    description: 'La obra maestra de Kant que busca determinar los límites y el alcance del conocimiento humano.',
    pdfUrl: 'https://www.elejandria.com/libro/critica-de-la-razon-pura/kant/456',
    epubUrl: 'https://www.elejandria.com/libro/critica-de-la-razon-pura/kant/456',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=400&auto=format&fit=crop',
    category: 'Filosofía Moderna',
    source: 'Elejandría',
    year: '1781',
    pages: 800
  },
  {
    id: 'e3',
    title: 'Así habló Zaratustra',
    author: 'Friedrich Nietzsche',
    description: 'Un libro para todos y para nadie, donde Nietzsche presenta sus conceptos del Superhombre y el Eterno Retorno.',
    pdfUrl: 'https://www.elejandria.com/libro/asi-hablo-zaratustra/nietzsche/789',
    epubUrl: 'https://www.elejandria.com/libro/asi-hablo-zaratustra/nietzsche/789',
    cover: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=400&auto=format&fit=crop',
    category: 'Filosofía Contemporánea',
    source: 'Elejandría',
    year: '1883',
    pages: 350
  },
  {
    id: 'e4',
    title: 'Meditaciones Metafísicas',
    author: 'René Descartes',
    description: 'El punto de partida de la filosofía moderna, donde Descartes busca verdades indudables a través de la duda metódica.',
    pdfUrl: 'https://www.elejandria.com/libro/meditaciones-metafisicas/descartes/101',
    epubUrl: 'https://www.elejandria.com/libro/meditaciones-metafisicas/descartes/101',
    cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop',
    category: 'Racionalismo',
    source: 'Elejandría',
    year: '1641',
    pages: 120
  },
  {
    id: 'e5',
    title: 'Ética nicomáquea',
    author: 'Aristóteles',
    description: 'El primer tratado sistemático sobre la ética en la historia de la filosofía occidental.',
    pdfUrl: 'https://www.elejandria.com/libro/etica-nicomaquea/aristoteles/202',
    epubUrl: 'https://www.elejandria.com/libro/etica-nicomaquea/aristoteles/202',
    cover: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=400&auto=format&fit=crop',
    category: 'Filosofía Antigua',
    source: 'Elejandría',
    year: '340 a.C.',
    pages: 320
  },
  {
    id: 'e6',
    title: 'El contrato social',
    author: 'Jean-Jacques Rousseau',
    description: 'Una obra fundamental sobre la libertad y la igualdad de los hombres bajo un Estado instituido por un contrato social.',
    pdfUrl: 'https://www.elejandria.com/libro/el-contrato-social/rousseau/303',
    epubUrl: 'https://www.elejandria.com/libro/el-contrato-social/rousseau/303',
    cover: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=400&auto=format&fit=crop',
    category: 'Filosofía Política',
    source: 'Elejandría',
    year: '1762',
    pages: 180
  },
  {
    id: 'e7',
    title: 'Leviatán',
    author: 'Thomas Hobbes',
    description: 'Un tratado sobre la estructura de la sociedad y el gobierno legítimo, y uno de los ejemplos más tempranos e influyentes de la teoría del contrato social.',
    pdfUrl: 'https://www.elejandria.com/libro/leviatan/hobbes/404',
    epubUrl: 'https://www.elejandria.com/libro/leviatan/hobbes/404',
    cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop',
    category: 'Filosofía Política',
    source: 'Elejandría',
    year: '1651',
    pages: 600
  }
];

export const CVC_CATALOG: Book[] = [
  {
    id: 'c1',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    description: 'La obra cumbre de la literatura española. Una parodia de los libros de caballerías que se convierte en una reflexión profunda sobre la condición humana.',
    pdfUrl: 'https://cvc.cervantes.es/literatura/clasicos/quijote/pdf/quijote_1.pdf',
    epubUrl: 'https://cvc.cervantes.es/literatura/clasicos/quijote/',
    cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400&auto=format&fit=crop',
    category: 'Clásicos Españoles',
    source: 'CVC',
    year: '1605',
    pages: 1000
  },
  {
    id: 'c2',
    title: 'La vida es sueño',
    author: 'Calderón de la Barca',
    description: 'Obra teatral barroca que explora la dualidad entre la realidad y el sueño, el libre albedrío y el destino.',
    pdfUrl: 'https://cvc.cervantes.es/literatura/clasicos/calderon/pdf/vida_sueno.pdf',
    epubUrl: 'https://cvc.cervantes.es/literatura/clasicos/calderon/',
    cover: 'https://images.unsplash.com/photo-1533327325824-76bc3ee65057?q=80&w=400&auto=format&fit=crop',
    category: 'Teatro Barroco',
    source: 'CVC',
    year: '1635',
    pages: 150
  },
  {
    id: 'c3',
    title: 'Rimas y Leyendas',
    author: 'Gustavo Adolfo Bécquer',
    description: 'El máximo exponente del romanticismo tardío español. Poesía y prosa que exploran el amor, la muerte y lo sobrenatural.',
    pdfUrl: 'https://cvc.cervantes.es/literatura/clasicos/becquer/pdf/rimas_leyendas.pdf',
    epubUrl: 'https://cvc.cervantes.es/literatura/clasicos/becquer/',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
    category: 'Romanticismo',
    source: 'CVC',
    year: '1871',
    pages: 300
  }
];

export const DRIVE_CATALOG: Book[] = [
  {
    id: 'd1',
    title: 'Apuntes de Filosofía Política',
    author: 'Miguel Ángel Romero',
    description: 'Recopilación de notas y reflexiones sobre el poder, el estado y la libertad desde una perspectiva crítica.',
    pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    epubUrl: '',
    cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=400&auto=format&fit=crop',
    category: 'Apuntes Personales',
    source: 'Drive Personal',
    year: '2024',
    pages: 45
  },
  {
    id: 'd2',
    title: 'Manifiesto del Sur',
    author: 'Miguel Ángel Romero',
    description: 'Ensayo sobre el pensamiento radical y la identidad filosófica en el contexto latinoamericano.',
    pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    epubUrl: '',
    cover: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=400&auto=format&fit=crop',
    category: 'Ensayos',
    source: 'Drive Personal',
    year: '2023',
    pages: 32
  }
];

export const FULL_CATALOG = [...ELEJANDRIA_CATALOG, ...CVC_CATALOG, ...DRIVE_CATALOG];

/**
 * Simulates fetching book metadata from Elejandria.
 * In a real app, this would use a backend proxy to bypass CORS.
 */
export async function fetchElejandriaMetadata(url: string): Promise<Partial<Book>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Logic to extract ID from URL and find in our "scraped" index
  const book = FULL_CATALOG.find(b => url.includes(b.id) || url.includes(b.title.toLowerCase().replace(/ /g, '-')));
  
  if (book) return book;
  
  throw new Error("Libro no encontrado en el índice de la biblioteca.");
}

/**
 * Simulates the download process.
 * In a real app, this would fetch the blob and save it locally.
 */
export async function downloadFile(url: string, onProgress: (p: number) => void): Promise<string> {
  for (let i = 0; i <= 100; i += 10) {
    onProgress(i);
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  
  // Return a dummy local path or blob URL
  // For the demo, we'll return a sample PDF URL
  return "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
}
