export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  website: string;
  googleMapsUrl: string;
  description: string;
}

export const locations: Location[] = [
  {
    id: '1',
    name: "Celiaco's Cafe",
    address: "Av. Mariscal López 2034, Asunción",
    lat: -25.2867,
    lng: -57.6333,
    website: "https://celiacoscafe.com",
    googleMapsUrl: "https://goo.gl/maps/example1",
    description: "Café acogedor con una amplia variedad de opciones sin gluten, desde pasteles hasta sándwiches."
  },
  {
    id: '2',
    name: "Sin Gluten Restaurant",
    address: "Calle Palma 489, Asunción",
    lat: -25.2882,
    lng: -57.6323,
    website: "https://singluten.com.py",
    googleMapsUrl: "https://goo.gl/maps/example2",
    description: "Restaurante dedicado 100% libre de gluten con un menú variado de comida internacional."
  },
  {
    id: '3',
    name: "Gluten Free Bakery",
    address: "Av. San Martín 1234, Ciudad del Este",
    lat: -25.5097,
    lng: -54.6785,
    website: "https://gfbakery.com.py",
    googleMapsUrl: "https://goo.gl/maps/example3",
    description: "Panadería especializada en productos sin gluten, desde panes artesanales hasta pasteles de boda."
  },
  {
    id: '4',
    name: "Sobremesa PY",
    address: "Av. Aviadores del Chaco 3241, Asunción",
    lat: -25.29640614937711,
    lng: -57.608665471164805,
    website: "https://sobremesapy.com",
    googleMapsUrl: "https://goo.gl/maps/example4",
    description: "Restaurante con opciones sin gluten que ofrece una experiencia gastronómica única con ingredientes locales."
  },
  {
    id: '5',
    name: "La Casita Gourmet",
    address: "Av. Santa Teresa 2855, Asunción",
    lat: -25.28618969105217,
    lng: -57.577266360997875,
    website: "https://lacasitagourmet.com.py",
    googleMapsUrl: "https://goo.gl/maps/example5",
    description: "Tienda gourmet con una sección dedicada a productos sin gluten, perfecta para encontrar ingredientes especiales."
  }
];

