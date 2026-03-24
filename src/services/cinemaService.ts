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
    url: 'https://drive.google.com/file/d/18lLF0FqRVY-wB_gNvK9fiDEJBH69lGFl/preview',
    cover: 'https://www.dropbox.com/scl/fi/vb541frvznxkjexn4yyzr/Matrix-the-matrix.jpg?rlkey=1vn140m7vz9c3s8v659kfwbv5&st=7ju9qob4&raw=1',
    category: 'Gnoseología'
  },
  {
    id: 'v6',
    title: 'The Truman Show',
    synopsis: 'La construcción social de la realidad. ¿Podemos conocer la verdad si vivimos en una simulación diseñada para nuestro confort?',
    url: 'https://drive.google.com/file/d/1zLOlIuI-F_M74hvJCUqrC0_O8onNz-Ct/preview',
    cover: 'https://www.dropbox.com/scl/fi/jvfnfervpdfengxx4ef4i/truman-show.jpg?rlkey=xa65ew7fnenmrigcpsjhv0zu1&st=orojx50m&raw=1',
    category: 'Gnoseología'
  },
  {
    id: 'v2',
    title: 'Spiderman',
    synopsis: 'Un gran poder conlleva una gran responsabilidad. Un análisis sobre la ética de la virtud y el imperativo categórico en la vida del héroe.',
    url: 'https://drive.google.com/file/d/1Y0Fy0uxF6BGVECO3TqTKNpMVTMpA1sHw/preview',
    cover: 'https://www.dropbox.com/scl/fi/ort1aitt0xte6qte7ss66/Spiderman-2002.jpg?rlkey=j3ksyfsh9hyd2ovqdcplvau19&st=znk70h3v&raw=1',
    category: 'Ética'
  },
  {
    id: 'v7',
    title: 'Batman: The Dark Knight',
    synopsis: 'El dilema del caballero oscuro. ¿Es moral actuar fuera de la ley para preservarla? Un choque entre utilitarismo y deontología.',
    url: 'https://drive.google.com/file/d/1gllh56mBzto9P1OD-XOMykS2q2fmupX2/preview',
    cover: 'https://www.dropbox.com/scl/fi/888kpsnh1tx7fvy6j31qk/Batman.jpg?rlkey=lt5y9htc3uvubvdca0mrdwkmd&st=gjaix168&raw=1',
    category: 'Ética'
  },
  {
    id: 'v3',
    title: 'Los Simpsons',
    synopsis: 'Sátira social y crítica política. ¿Es la familia Simpson un reflejo de la decadencia de los valores occidentales o una resistencia cínica?',
    url: 'https://t.me/tuspeliculas15555/32',
    cover: 'https://www.dropbox.com/scl/fi/8og9dudmbdm1ysl84x5j5/Simpsons.jpg?rlkey=drx2jtzfm0zvaxax93iyas0l0&st=jqv6g9fm&raw=1',
    category: 'Política y Sociedad'
  },
  {
    id: 'v4',
    title: 'La Aldea',
    synopsis: 'El miedo como herramienta de control político. Una reflexión sobre el contrato social y la construcción de la verdad en comunidades aisladas.',
    url: 'https://drive.google.com/file/d/16HHpKYJh9CfLigL3CG3JRpIZz2IH-hDm/preview',
    cover: 'https://www.dropbox.com/scl/fi/oilmhceb7v4gl4egzf0kd/La-Aldea.jpg?rlkey=tndt4hdfhcbt2du7panpf8chv&st=8qbc0dou&raw=1',
    category: 'Política y Sociedad'
  },
  {
    id: 'v5',
    title: 'Fight Club',
    synopsis: 'Nihilismo, consumismo y la destrucción del ego. ¿Es la violencia el único camino para sentir algo real en un mundo de plástico?',
    url: 'https://drive.google.com/file/d/1fvrYeMJ4iVYD0pEHutua8tA8SbAEO_JW/preview',
    cover: 'https://www.dropbox.com/scl/fi/68buagxows1tzt9woyedm/el-club-de-la-pelea-pelicula-david-fincher.jpeg?rlkey=b24f7jhwabr2039vtwvc5w1x3&st=a3pv5xfs&raw=1',
    category: 'Estética'
  },
  {
    id: 'v8',
    title: 'Candyman',
    synopsis: 'La estética del horror y el mito urbano. Un análisis sobre cómo la imagen y la leyenda construyen una realidad sensible que trasciende el tiempo y el dolor social.',
    url: 'https://drive.google.com/file/d/1Co11ERGww3XyMAbtf0eemDIUGeH-oSeM/preview',
    cover: 'https://www.dropbox.com/scl/fi/8zvn1juls8vx5aget1gme/Candyman-2021.jpeg?rlkey=wd727o6qfv17xzhs3hfsg2mwo&st=2bvx0q3i&raw=1',
    category: 'Estética'
  },
  {
    id: 'v10',
    title: 'La leyenda del jinete sin cabeza',
    synopsis: 'Un análisis sobre la superstición, la razón y la construcción de mitos en la transición a la modernidad. ¿Es el jinete una realidad física o una proyección del miedo colectivo?',
    url: 'https://drive.google.com/file/d/1BphRoyI90oyKE4kGs5tJWCsuUR1BXCUv/preview',
    cover: 'https://www.dropbox.com/scl/fi/ubjr5a3fky9930n69p6nv/El-jinete-sin-cabeza.jpg?rlkey=6u3gn22nlr4wrl3f399jh7njy&st=p3pjnw5v&raw=1',
    category: 'Gnoseología'
  },
  {
    id: 'v11',
    title: 'Get Out',
    synopsis: 'Una exploración sobre la identidad, el racismo sistémico y la otredad. ¿Cómo se construye la percepción del "otro" en una sociedad que oculta sus prejuicios bajo una máscara de progreso?',
    url: 'https://drive.google.com/file/d/1fQL15vYrsaqxpqMY4wEgJ9aGr3DwH9SD/preview',
    cover: 'https://www.dropbox.com/scl/fi/1mb6lw7b7sq6ibe90u9gc/get_out-290175782-large.jpg?rlkey=44m70075evcnrraztg6qve5t2&st=udjfgeue&raw=1',
    category: 'Antropología'
  },
  {
    id: 'v12',
    title: 'La isla',
    synopsis: '¿Qué nos define como humanos? Una reflexión sobre la clonación, la ética científica y el derecho a la identidad en un mundo donde la vida puede ser fabricada y comercializada.',
    url: 'https://drive.google.com/file/d/1es3qi2uedG26_4-zp0_t0MYQPn-Hnjic/preview',
    cover: 'https://www.dropbox.com/scl/fi/4gzltawzmmyqk1msxhnr8/la-isla.jpg?rlkey=xhk3lg3yhc3wyapi2pm9av6tf&st=7afw1yjf&raw=1',
    category: 'Antropología'
  }
];

export const PHILOSOPHICAL_PROBLEMS = [
  'Gnoseología',
  'Ética',
  'Estética',
  'Política y Sociedad',
  'Antropología'
];
