
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
      sound: 'Distorsión Primigenia',
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
      sound: 'Bajo Galopante',
      icon: 'Zap',
      brightness: 1.1
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Demócrito', 'Epicuro'],
        messages: [
          { from: 'Demócrito', text: 'Solo existen los átomos y el vacío, lo demás es opinión. ⚛️' },
          { from: 'Epicuro', text: 'Y si los átomos se desvían un poco (clinamen), ¡tenemos libertad! 🥂' }
        ]
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
      sound: 'Feedback de Caverna',
      icon: 'Sparkles',
      brightness: 0.9
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Platón', 'Glaucón'],
        messages: [
          { from: 'Platón', text: 'Imagina a unos prisioneros que solo ven sombras en la pared... 👤' },
          { from: 'Glaucón', text: 'Qué extraña escena describes, y qué extraños prisioneros. ⛓️' }
        ]
      }
    }
  },
  {
    id: 'aquino',
    year: '1265',
    title: 'Razón y Fe',
    philosopher: 'Tomás de Aquino',
    description: 'La síntesis entre la filosofía aristotélica y la teología cristiana. Las cinco vías para demostrar la existencia de Dios.',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000&auto=format&fit=crop',
      color: '#d4af37',
      sound: 'Eco Monástico',
      icon: 'Book',
      brightness: 0.8
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Tomás', 'Aristóteles'],
        messages: [
          { from: 'Tomás', text: 'Maestro, he bautizado tu Metafísica para la gloria de Dios. ⛪' },
          { from: 'Aristóteles', text: 'Mientras respetes la lógica del Motor Inmóvil, todo bien. 🏛️' }
        ]
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
      sound: 'Metrónomo Acelerado',
      icon: 'Zap',
      brightness: 1.0
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Descartes', 'Genio Maligno'],
        messages: [
          { from: 'Descartes', text: 'Dudo de todo, incluso de mis sentidos. ¿Eres tú quien me engaña? 🧠' },
          { from: 'Genio Maligno', text: 'Tal vez, pero para ser engañado, primero tienes que existir. 😉' }
        ]
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
      sound: 'Proclamación Radical',
      icon: 'Brain',
      brightness: 1.1
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Kant', 'Hume'],
        messages: [
          { from: 'Hume', text: 'Solo hay impresiones y hábito, Immanuel. La causalidad es un cuento. ☕' },
          { from: 'Kant', text: '¡Me has despertado de mi sueño dogmático! Pero la razón tiene sus categorías. ⏰' }
        ]
      }
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
      sound: 'Grito de Poder',
      icon: 'Bolt',
      brightness: 0.7
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Nietzsche', 'Zarathustra'],
        messages: [
          { from: 'Nietzsche', text: '¡Dios ha muerto! Y nosotros lo hemos matado. ¿Cómo nos consolareis? ⚡' },
          { from: 'Zarathustra', text: 'Mirad, yo os enseño el superhombre. El hombre es algo que debe ser superado. 🦅' }
        ]
      }
    }
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
      sound: 'Resistencia Urbana',
      icon: 'Info',
      brightness: 0.5
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Sartre', 'Beauvoir'],
        messages: [
          { from: 'Sartre', text: 'El hombre está condenado a ser libre. No hay excusas. 🚬' },
          { from: 'Beauvoir', text: 'Y esa libertad debe ser compartida, Jean-Paul. No se nace mujer, se llega a serlo. 📚' }
        ]
      }
    }
  },
  {
    id: 'han',
    year: '2010',
    title: 'La Sociedad del Cansancio',
    philosopher: 'Byung-Chul Han',
    description: 'El paso de la sociedad disciplinaria a la sociedad del rendimiento. El sujeto se explota a sí mismo creyendo que se está realizando.',
    aesthetic: {
      bg: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop',
      color: '#00ffcc',
      sound: 'Pulso Digital',
      icon: 'Smartphone',
      brightness: 0.9
    },
    interactive: {
      type: 'chat',
      content: {
        participants: ['Han', 'Foucault'],
        messages: [
          { from: 'Foucault', text: 'El panóptico nos vigila desde fuera, Byung-Chul. 👁️' },
          { from: 'Han', text: 'Ya no, Michel. Ahora el panóptico es digital y nosotros mismos subimos las fotos. 📱' }
        ]
      }
    }
  }
];
