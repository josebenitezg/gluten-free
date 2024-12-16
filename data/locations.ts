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
    name: "La Casolana",
    address: "La Casolana Gluten Free, Asunción",
    lat: -25.31735482627509,
    lng: -57.560653342328386,
    website: "https://instagram.com/lacasolanasinglutenpy",
    googleMapsUrl: "https://maps.google.com/?q=-25.31735482627509,-57.560653342328386",
    description: "Restaurante 100% libre de gluten con variedad de opciones dulces, salados, almuerzos y tortas. Delivery disponible."
  },
  {
    id: '2',
    name: "La Nutry",
    address: "Lá Nutry Healthy Food, Asunción",
    lat: -25.268888259777988,
    lng: -57.5649738576716,
    website: "https://instagram.com/lanutryparaguay",
    googleMapsUrl: "https://maps.google.com/?q=-25.268888259777988,-57.5649738576716",
    description: "Restaurante 100% libre de gluten especializado en comida saludable. Ofrece opciones dulces, salados, almuerzos y tortas."
  },
  {
    id: '3',
    name: "Sabores de la Abuela",
    address: "El Almacén del Celíaco de Sabores de la Abuela, Asunción",
    lat: -25.285973482646334,
    lng: -57.647163326985186,
    website: "https://instagram.com/saboresdelaabuela",
    googleMapsUrl: "https://maps.google.com/?q=-25.285973482646334,-57.647163326985186",
    description: "Restaurante y almacén 100% libre de gluten con opciones dulces, salados, almuerzos y tortas. Servicio de delivery disponible."
  },
  {
    id: '4',
    name: "La Casita Gourmet de Yudith",
    address: "La Casita Gourmet Carmelitas, Asunción",
    lat: -25.268425136504494,
    lng: -57.56278341534322,
    website: "https://instagram.com/lacasitagourmetdeyudith",
    googleMapsUrl: "https://maps.google.com/?q=-25.268425136504494,-57.56278341534322",
    description: "Restaurante 100% libre de gluten con múltiples sucursales. Ofrece opciones dulces, salados, almuerzos y tortas."
  },
  {
    id: '5',
    name: "Asuka",
    address: "Asuka sin gluten, Asunción",
    lat: -25.28278133704774,
    lng: -57.5920612711648,
    website: "https://instagram.com/asukasingluten",
    googleMapsUrl: "https://maps.google.com/?q=-25.28278133704774,-57.5920612711648",
    description: "Local 100% libre de gluten especializado en dulces y salados."
  },
  {
    id: '6',
    name: "Maurice de Talleyrand",
    address: "Maurice de Talleyrand, Asunción",
    lat: -25.284387681096803,
    lng: -57.5635886865074,
    website: "https://instagram.com/mauricedetalleyrand",
    googleMapsUrl: "https://maps.google.com/?q=-25.284387681096803,-57.5635886865074",
    description: "Restaurante con opciones sin gluten para almuerzo y cena."
  },
  {
    id: '7',
    name: "Josephine",
    address: "Josephine De Talleyrand, Asunción",
    lat: -25.29135299168258,
    lng: -57.585147971164204,
    website: "https://instagram.com/josephinedetalleyrand",
    googleMapsUrl: "https://maps.google.com/?q=-25.29135299168258,-57.585147971164204",
    description: "Restaurante con opciones sin gluten para almuerzo y cena."
  },
  {
    id: '8',
    name: "Almacén de Pizzas",
    address: "Almacen De Pizzas, Asunción",
    lat: -25.284489786158495,
    lng: -57.563580526985184,
    website: "https://instagram.com/almacendepizzas_py",
    googleMapsUrl: "https://maps.google.com/?q=-25.284489786158495,-57.563580526985184",
    description: "Pizzería con opciones sin gluten disponibles."
  },
  {
    id: '9',
    name: "Eco Tienda Café",
    address: "Eco Tienda Café, Asunción",
    lat: -25.291513191508887,
    lng: -57.61965769814938,
    website: "https://instagram.com/ecotiendacafe_py",
    googleMapsUrl: "https://maps.google.com/?q=-25.291513191508887,-57.61965769814938",
    description: "Cafetería con opciones sin gluten, dulces y salados."
  }
];

