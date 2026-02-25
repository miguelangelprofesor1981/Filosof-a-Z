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
    cover: 'https://www.dropbox.com/scl/fi/vb541frvznxkjexn4yyzr/Matrix-the-matrix.jpg?rlkey=1vn140m7vz9c3s8v659kfwbv5&st=7ju9qob4&raw=1',
    category: 'Gnoseología'
  },
  {
    id: 'v6',
    title: 'The Truman Show',
    synopsis: 'La construcción social de la realidad. ¿Podemos conocer la verdad si vivimos en una simulación diseñada para nuestro confort?',
    url: 'https://t.me/tuspeliculas15555/6',
    cover: 'https://www.dropbox.com/scl/fi/jvfnfervpdfengxx4ef4i/truman-show.jpg?rlkey=xa65ew7fnenmrigcpsjhv0zu1&st=orojx50m&raw=1',
    category: 'Gnoseología'
  },
  {
    id: 'v2',
    title: 'Spiderman',
    synopsis: 'Un gran poder conlleva una gran responsabilidad. Un análisis sobre la ética de la virtud y el imperativo categórico en la vida del héroe.',
    url: 'https://t.me/tuspeliculas15555/2',
    cover: 'https://www.dropbox.com/scl/fi/ort1aitt0xte6qte7ss66/Spiderman-2002.jpg?rlkey=j3ksyfsh9hyd2ovqdcplvau19&st=znk70h3v&raw=1',
    category: 'Ética'
  },
  {
    id: 'v7',
    title: 'Batman: The Dark Knight',
    synopsis: 'El dilema del caballero oscuro. ¿Es moral actuar fuera de la ley para preservarla? Un choque entre utilitarismo y deontología.',
    url: 'https://t.me/tuspeliculas15555/7',
    cover: 'https://www.dropbox.com/scl/fi/888kpsnh1tx7fvy6j31qk/Batman.jpg?rlkey=lt5y9htc3uvubvdca0mrdwkmd&st=gjaix168&raw=1',
    category: 'Ética'
  },
  {
    id: 'v3',
    title: 'Los Simpsons',
    synopsis: 'Sátira social y crítica política. ¿Es la familia Simpson un reflejo de la decadencia de los valores occidentales o una resistencia cínica?',
    url: 'https://t.me/tuspeliculas15555/3',
    cover: 'https://www.dropbox.com/scl/fi/8og9dudmbdm1ysl84x5j5/Simpsons.jpg?rlkey=drx2jtzfm0zvaxax93iyas0l0&st=jqv6g9fm&raw=1',
    category: 'Política y Sociedad'
  },
  {
    id: 'v4',
    title: 'La Aldea',
    synopsis: 'El miedo como herramienta de control político. Una reflexión sobre el contrato social y la construcción de la verdad en comunidades aisladas.',
    url: 'https://t.me/tuspeliculas15555/4',
    cover: 'https://www.dropbox.com/scl/fi/oilmhceb7v4gl4egzf0kd/La-Aldea.jpg?rlkey=tndt4hdfhcbt2du7panpf8chv&st=8qbc0dou&raw=1',
    category: 'Política y Sociedad'
  },
  {
    id: 'v5',
    title: 'Fight Club',
    synopsis: 'Nihilismo, consumismo y la destrucción del ego. ¿Es la violencia el único camino para sentir algo real en un mundo de plástico?',
    url: 'https://t.me/tuspeliculas15555/5',
    cover: 'https://www.dropbox.com/scl/fi/68buagxows1tzt9woyedm/el-club-de-la-pelea-pelicula-david-fincher.jpeg?rlkey=b24f7jhwabr2039vtwvc5w1x3&st=a3pv5xfs&raw=1',
    category: 'Estética'
  }
];

export const PHILOSOPHICAL_PROBLEMS = [
  'Gnoseología',
  'Ética',
  'Estética',
  'Política y Sociedad'
];
