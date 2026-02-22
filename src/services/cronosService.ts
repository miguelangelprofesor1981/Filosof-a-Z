
export interface CronosNode {
  id: string;
  year: string;
  title: string;
  philosopher: string;
  description: string;
  aesthetic: {
    bg: string;
    color: string;
    sound: string;
    icon: string;
    brightness: number;
  };
  interactive?: {
    type: 'chat' | 'action' | 'butterfly';
    content: any;
  };
  relic?: string;
}

export const CRONOS_TIMELINE: CronosNode[] = [
  {
    id: 'grecia',
    year: '500 a.C.',
    title: 'El Amanecer del Logos',
    philosopher: 'Heráclito & Parménides',
    description: 'El conflicto entre el cambio perpetuo y el ser inmutable. El nacimiento de la metafísica en las costas del Egeo.',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1515704089429-fd06e66ce3e8?q=80&w=2000&auto=format&fit=crop',
      color: '#fdf001',
      sound: 'Hardcore Punk: Distorsión Primigenia',
      icon: 'Waves',
      brightness: 0.9
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Heráclito', 'Parménides'],
        messages: [
          { from: 'Heráclito', text: 'Todo fluye, bro. No puedes bañarte dos veces en el mismo río. 🔥' },
          { from: 'Parménides', text: 'Nah, el Ser es y el no-ser no es. El cambio es una ilusión óptica. 🛑' }
        ]
      }
    }
  },
  {
    id: 'democrito',
    year: '400 a.C.',
    title: 'El Átomo',
    philosopher: 'Demócrito',
    description: 'La intuición radical de que la realidad está compuesta por partículas indivisibles en el vacío. El primer materialismo.',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop',
      color: '#00ff88',
      sound: 'Punk Nacional: Bajo Galopante',
      icon: 'Zap',
      brightness: 1.1
    },
    interactive: {
      type: 'butterfly',
      content: {
        futureLink: 'Física Cuántica',
        text: 'La búsqueda del constituyente último de la materia que inició Demócrito culmina en la complejidad de la mecánica cuántica actual.'
      }
    }
  },
  {
    id: 'platon',
    year: '380 a.C.',
    title: 'La Caverna',
    philosopher: 'Platón',
    description: 'La distinción entre el mundo sensible y el mundo de las ideas. ¿Es real lo que vemos?',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1503152394-c571994fd383?q=80&w=2000&auto=format&fit=crop',
      color: '#00d4ff',
      sound: 'Hardcore: Feedback de Caverna',
      icon: 'Sparkles',
      brightness: 0.9
    },
    interactive: {
      type: 'butterfly',
      content: {
        futureLink: 'Física Cuántica',
        text: 'La idea de que la realidad fundamental no es material influyó en cómo entendemos hoy los campos cuánticos.'
      }
    }
  },
  {
    id: 'descartes',
    year: '1637',
    title: 'El Giro Subjetivo',
    philosopher: 'René Descartes',
    description: 'La duda metódica como herramienta para encontrar una verdad indudable: "Cogito ergo sum".',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2000&auto=format&fit=crop',
      color: '#ffffff',
      sound: 'Punk: Metrónomo Acelerado',
      icon: 'Zap',
      brightness: 1.0
    },
    interactive: {
      type: 'action',
      content: {
        label: 'Dudar de Todo',
        effect: 'freeze'
      }
    }
  },
  {
    id: 'kant',
    year: '1781',
    title: 'La Revolución Copernicana',
    philosopher: 'Immanuel Kant',
    description: 'No conocemos las cosas como son, sino como nuestro entendimiento las organiza. El espacio y el tiempo son formas de nuestra intuición.',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop',
      color: '#fdf001',
      sound: 'Hardcore: Proclamación Radical',
      icon: 'Brain',
      brightness: 1.1
    }
  },
  {
    id: 'nietzsche',
    year: '1882',
    title: 'La Muerte de Dios',
    philosopher: 'Friedrich Nietzsche',
    description: 'El colapso de los valores absolutos y el nacimiento del superhombre. La voluntad de poder.',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2000&auto=format&fit=crop',
      color: '#ff4444',
      sound: 'Punk Nacional: Grito de Poder',
      icon: 'Bolt',
      brightness: 0.7
    },
    relic: 'La partitura oculta: Nietzsche creía que sin música la vida sería un error.'
  },
  {
    id: 'sartre',
    year: '1945',
    title: 'La Condena de la Libertad',
    philosopher: 'Jean-Paul Sartre',
    description: 'Tras la guerra, el existencialismo proclama que la existencia precede a la esencia. Somos lo que hacemos con lo que hicieron de nosotros.',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2000&auto=format&fit=crop',
      color: '#888888',
      sound: 'Hardcore: Resistencia Urbana',
      icon: 'Info',
      brightness: 0.5
    }
  }
];
