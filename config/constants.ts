export const SITE = {
  name: 'Tauwerk',
  description: 'Fetisch-Verein aus Mecklenburg-Vorpommern',
  tagline: 'Vielfalt leben • Gemeinschaft stärken • Fetisch leben',
  location: 'Rostock, Deutschland',
  email: 'info@tauwerk.de',
  social: {
    instagram: {
      username: 'tauwerk_mv',
      url: 'https://instagram.com/tauwerk_mv'
    },
    telegram: {
      username: 'tauwerk',
      url: 'https://t.me/tauwerk'
    }
  }
} as const;

export const NAVIGATION = {
  items: [
    { name: 'Home', href: '/' },
    { name: 'Über uns', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Galerie', href: '/gallery' },
    { name: 'Kontakt', href: '/contact' }
  ]
} as const;

export const LEGAL = {
  company: {
    name: '[Ihr Firmenname]',
    address: {
      street: '[Straße und Hausnummer]',
      city: '[PLZ und Ort]'
    }
  },
  contact: {
    phone: '[Ihre Telefonnummer]',
    email: '[Ihre E-Mail-Adresse]'
  },
  responsible: {
    name: '[Name des Verantwortlichen]',
    address: {
      street: '[Straße und Hausnummer]',
      city: '[PLZ und Ort]'
    }
  },
  disputeResolution: {
    platform: 'https://ec.europa.eu/consumers/odr/'
  }
} as const; 