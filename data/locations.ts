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
  category: string;
  isGlutenFree: boolean;
  services: Array<{
    type: 'delivery' | 'pick_up' | 'en_lugar';
    label: string;
  }>;
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  whatsapp: string;
  googleMapsUrl: string;
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
      
      const services = Object.entries(location.servicios)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
          const labels: Record<string, string> = {
            delivery: 'Delivery',
            pick_up: 'Pick up',
            en_lugar: 'Local'
          };
          return {
            type: key as 'delivery' | 'pick_up' | 'en_lugar',
            label: labels[key]
          };
        });

      return {
        id: location.id.toString(),
        name: location.nombre_local,
        address: location.ciudad,
        category: location.categoria,
        lat,
        lng,
        isGlutenFree: location.es_gluten_free,
        services,
        social: {
          instagram: location.redes_sociales.instagram,
          facebook: location.redes_sociales.facebook,
          twitter: location.redes_sociales.x
        },
        whatsapp: location.whatsapp?.replace(/\D/g, ''),
        googleMapsUrl: `https://maps.google.com/?q=${lat},${lng}`
      };
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

