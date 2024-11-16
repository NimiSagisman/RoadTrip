import type { Experience } from '../types';

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: 'Eiffel Tower Skip-the-Line Tour',
    description: 'Skip the long lines and enjoy priority access to the Eiffel Tower. Learn about the history and architecture of this iconic landmark from your expert guide.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8584, lng: 2.2945 }
    },
    images: ['https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.8,
    categories: ['Landmarks', 'Tours'],
    price: { value: 65, currency: 'EUR' },
    duration: '2-3 hours'
  },
  {
    id: '2',
    title: 'Louvre Museum Guided Tour',
    description: 'Explore the world\'s largest art museum with an expert guide. See the Mona Lisa, Venus de Milo, and other masterpieces.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8606, lng: 2.3376 }
    },
    images: ['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.9,
    categories: ['Museums', 'Art', 'Tours'],
    price: { value: 75, currency: 'EUR' },
    duration: '3 hours'
  },
  {
    id: '3',
    title: 'Seine River Dinner Cruise',
    description: 'Enjoy a romantic dinner cruise along the Seine River with views of illuminated Paris landmarks.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8584, lng: 2.2945 }
    },
    images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.7,
    categories: ['Restaurants', 'Experiences'],
    price: { value: 89, currency: 'EUR' },
    duration: '2.5 hours'
  }
];

export const MOCK_RESTAURANTS: Experience[] = [
  {
    id: '4',
    title: 'Le Jules Verne',
    description: 'Michelin-starred dining with panoramic views from the Eiffel Tower.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8584, lng: 2.2945 }
    },
    images: ['https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.9,
    categories: ['Restaurants', 'Fine Dining'],
    price: { value: 250, currency: 'EUR' },
    duration: '2-3 hours'
  },
  {
    id: '5',
    title: 'L\'Arpège',
    description: 'Three Michelin-starred restaurant offering innovative French haute cuisine.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8651, lng: 2.2937 }
    },
    images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.9,
    categories: ['Restaurants', 'Fine Dining'],
    price: { value: 350, currency: 'EUR' },
    duration: '3 hours'
  },
  {
    id: '6',
    title: 'Le Chateaubriand',
    description: 'Contemporary French cuisine in a stylish bistro setting, ranked among World\'s 50 Best Restaurants.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8674, lng: 2.3699 }
    },
    images: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.7,
    categories: ['Restaurants', 'Fine Dining'],
    price: { value: 180, currency: 'EUR' },
    duration: '2.5 hours'
  }
];

export const MOCK_MUSEUMS: Experience[] = [
  {
    id: '7',
    title: 'Musée d\'Orsay',
    description: 'Housed in a former railway station, this museum features French art from 1848 to 1914.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8600, lng: 2.3266 }
    },
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Mus%C3%A9e_d%27Orsay%2C_North-West_view%2C_Paris_7e_140402.jpg/1920px-Mus%C3%A9e_d%27Orsay%2C_North-West_view%2C_Paris_7e_140402.jpg'],
    rating: 4.8,
    categories: ['Museums', 'Art'],
    price: { value: 16, currency: 'EUR' },
    duration: '3-4 hours'
  },
  {
    id: '8',
    title: 'Centre Pompidou',
    description: 'Modern and contemporary art museum featuring works by Picasso, Kandinsky, and other 20th-century artists.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8607, lng: 2.3522 }
    },
    images: ['https://parisjetaime.com/data/layout_image/5326_Centre-Pompidou-630x405-C-Amelie-Dupont-Architecte-Renzo-Piano-et-Richard-Rogers.jpg'],
    rating: 4.6,
    categories: ['Museums', 'Modern Art'],
    price: { value: 14, currency: 'EUR' },
    duration: '2-3 hours'
  },
  {
    id: '9',
    title: 'Musée de l\'Orangerie',
    description: 'Home to Monet\'s famous Water Lilies and other Impressionist masterpieces in an intimate setting.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8636, lng: 2.3222 }
    },
    images: ['https://www.ulysses.travel/wp-content/uploads/2021/10/Muse%CC%81e-de-lOrangerie.jpg'],
    rating: 4.8,
    categories: ['Museums', 'Art'],
    price: { value: 12.5, currency: 'EUR' },
    duration: '1.5-2 hours'
  }
];

export const MOCK_LANDMARKS: Experience[] = [
  {
    id: '10',
    title: 'Notre-Dame Cathedral',
    description: 'Historic Catholic cathedral known for its French Gothic architecture and gargoyles.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8530, lng: 2.3499 }
    },
    images: ['https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.8,
    categories: ['Landmarks', 'Architecture'],
    price: { value: 0, currency: 'EUR' },
    duration: '1-2 hours'
  },
  {
    id: '11',
    title: 'Arc de Triomphe',
    description: 'Iconic monument honoring those who fought for France, offering panoramic city views.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8738, lng: 2.2950 }
    },
    images: ['https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.7,
    categories: ['Landmarks', 'Architecture'],
    price: { value: 13, currency: 'EUR' },
    duration: '1-2 hours'
  },
  {
    id: '12',
    title: 'Sainte-Chapelle',
    description: 'Stunning 13th-century Gothic chapel famous for its spectacular stained glass windows.',
    location: {
      city: 'Paris',
      country: 'France',
      coordinates: { lat: 48.8554, lng: 2.3451 }
    },
    images: ['https://www.sainte-chapelle.fr/var/cmn_inter/storage/images/_aliases/homepage_banner_webp/2/3/5/4/120444532-3-fre-FR/1790805e9cd3-page-accueil-sainte-chapelle.webp.webp'],
    rating: 4.9,
    categories: ['Landmarks', 'Architecture'],
    price: { value: 11.5, currency: 'EUR' },
    duration: '1-1.5 hours'
  }
];

export const MOCK_HIGHLIGHTS: Experience[] = [
  {
    id: '13',
    title: 'Palace of Versailles',
    description: 'Explore the opulent palace and its stunning gardens on a guided tour.',
    location: {
      city: 'Versailles',
      country: 'France',
      coordinates: { lat: 48.8049, lng: 2.1204 }
    },
    images: ['https://images.unsplash.com/photo-1597584056824-f0a85152f49c?auto=format&fit=crop&q=80&w=1000'],
    rating: 4.9,
    categories: ['Landmarks', 'Tours'],
    price: { value: 90, currency: 'EUR' },
    duration: '4-5 hours'
  }
];