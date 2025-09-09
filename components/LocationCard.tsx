'use client';

import { MapPin, ShoppingBag, Home, Truck } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon, TwitterXIcon, FacebookIcon } from './icons/social-icons';
import { FormattedLocation } from '@/data/locations';
import { useEffect, useRef, memo } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

function LocationCardImpl({ location }: { location: FormattedLocation }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary;
      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

      const mapInstance = new Map(mapRef.current as HTMLElement, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
        disableDefaultUI: true,
        gestureHandling: 'none',
      });

      new Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapInstance,
      });
    };

    if (mapRef.current) initMap();
  }, [location.lat, location.lng]);

  const ServiceIcon = ({ service }: { service: string }) => {
    switch (service) {
      case 'delivery': return <Truck size={14} />;
      case 'pick_up': return <ShoppingBag size={14} />;
      case 'en_lugar': return <Home size={14} />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-full max-w-[calc(100vw-2rem)] mx-auto">
      <div className="relative">
        {/* Title Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-transparent pt-2 pb-4">
          <div className="px-3 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-400 truncate">
                {location.name}
              </h3>
              <p className="text-[10px] text-gray-400 flex items-center">
                <MapPin size={10} className="mr-0.5 flex-shrink-0" />
                <span className="truncate">{location.address}</span>
              </p>
            </div>
            <div className="flex gap-1 ml-2">
              {location.services.map((service, index) => (
                <span
                  key={index}
                  className="flex items-center bg-gray-800/80 rounded-full w-5 h-5 justify-center"
                  title={service.label}
                >
                  <ServiceIcon service={service.type} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div ref={mapRef} className="w-full h-28" />
        
        {/* Action buttons floating at bottom */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex gap-1">
            {location.whatsapp && (
              <a
                href={`https://wa.me/${location.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-gray-900/90 backdrop-blur-sm text-green-400 hover:bg-green-900/50 transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            )}
            {location.social.instagram && (
              <a
                href={`https://instagram.com/${location.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-gray-900/90 backdrop-blur-sm text-pink-400 hover:bg-pink-900/50 transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
            {location.social.facebook && (
              <a
                href={location.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-gray-900/90 backdrop-blur-sm text-blue-400 hover:bg-blue-900/50 transition-colors"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}
          </div>
          
          <a
            href={location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-900/90 backdrop-blur-sm text-red-400 hover:bg-red-900/50 transition-colors text-xs"
          >
            <MapPin size={12} />
            Ver en Maps
          </a>
        </div>
      </div>
    </div>
  );
} 

export const LocationCard = memo(LocationCardImpl);