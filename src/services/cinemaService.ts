export interface Video {
  id: string;
  title: string;
  synopsis: string;
  url: string;
  cover: string;
  category: string;
}

export const CINEMA_CATALOG: Video[] = [
  {
    id: 'v1',
    title: 'Matrix',
    synopsis: '¿Qué es lo real? ¿Cómo defines lo real? Un viaje a las profundidades de la gnoseología y la caverna de Platón en la era de las máquinas.',
    url: 'https://t.me/tuspeliculas15555/1',
    cover: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop',
    category: 'Gnoseología'
  },
  {
    id: 'v6',
    title: 'The Truman Show',
    synopsis: 'La construcción social de la realidad. ¿Podemos conocer la verdad si vivimos en una simulación diseñada para nuestro confort?',
    url: 'https://t.me/tuspeliculas15555/6',
    cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    category: 'Gnoseología'
  },
  {
    id: 'v2',
    title: 'Spiderman',
    synopsis: 'Un gran poder conlleva una gran responsabilidad. Un análisis sobre la ética de la virtud y el imperativo categórico en la vida del héroe.',
    url: 'https://t.me/tuspeliculas15555/2',
    cover: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
    category: 'Ética'
  },
  {
    id: 'v7',
    title: 'Batman: The Dark Knight',
    synopsis: 'El dilema del caballero oscuro. ¿Es moral actuar fuera de la ley para preservarla? Un choque entre utilitarismo y deontología.',
    url: 'https://t.me/tuspeliculas15555/7',
    cover: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
    category: 'Ética'
  },
  {
    id: 'v3',
    title: 'Los Simpsons',
    synopsis: 'Sátira social y crítica política. ¿Es la familia Simpson un reflejo de la decadencia de los valores occidentales o una resistencia cínica?',
    url: 'https://t.me/tuspeliculas15555/3',
    cover: 'https://images.unsplash.com/photo-1580465446255-820fb2bb6f3f?q=80&w=600&auto=format&fit=crop',
    category: 'Política y Sociedad'
  },
  {
    id: 'v4',
    title: 'La Aldea',
    synopsis: 'El miedo como herramienta de control político. Una reflexión sobre el contrato social y la construcción de la verdad en comunidades aisladas.',
    url: 'https://t.me/tuspeliculas15555/4',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    category: 'Política y Sociedad'
  },
  {
    id: 'v5',
    title: 'Fight Club',
    synopsis: 'Nihilismo, consumismo y la destrucción del ego. ¿Es la violencia el único camino para sentir algo real en un mundo de plástico?',
    url: 'https://t.me/tuspeliculas15555/5',
    cover: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600&auto=format&fit=crop',
    category: 'Nihilismo'
  }
];

export const PHILOSOPHICAL_PROBLEMS = [
  'Gnoseología',
  'Ética',
  'Nihilismo',
  'Política y Sociedad'
];
