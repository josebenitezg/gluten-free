import { supabase } from '@/utils/supabase/client'

export interface Location {
  id: number;
  created_at: string;
  ciudad: string;
  nombre_local: string;
  categoria: string;
  telefono: string | null;
  celular: string | null;
  redes_sociales: {
    instagram: string;
    x: string;
    facebook: string;
  };
  es_gluten_free: boolean;
  servicios: {
    delivery: boolean;
    pick_up: boolean;
    en_lugar: boolean;
  };
  coordenadas: string;
  whatsapp: string;
}

export interface FormattedLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  website: string;
  googleMapsUrl: string;
  description: string;
}

export async function getLocations(): Promise<FormattedLocation[]> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('nombre_local', { ascending: true });

    if (error) {
      console.error('Error fetching locations:', error);
      return [];
    }

    return data.map((location: Location) => {
      const [lat, lng] = location.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
      
      return {
        id: location.id.toString(),
        name: location.nombre_local,
        address: `${location.nombre_local}, ${location.ciudad}`,
        lat,
        lng,
        website: `https://instagram.com/${location.redes_sociales.instagram}`,
        googleMapsUrl: `https://maps.google.com/?q=${lat},${lng}`,
        description: `${location.categoria}${location.es_gluten_free ? ' (100% libre de gluten)' : ' (Opciones sin gluten disponibles)'} ${
          Object.entries(location.servicios)
            .filter(([_, value]) => value)
            .map(([key, _]) => {
              switch(key) {
                case 'delivery': return 'Delivery disponible';
                case 'pick_up': return 'Pick up disponible';
                case 'en_lugar': return 'Para comer en el lugar';
                default: return '';
              }
            })
            .filter(Boolean)
            .join('. ')
        }`
      };
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

