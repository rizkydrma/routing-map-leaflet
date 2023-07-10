import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RoutingProps {
  geolocation: Coordinates[];
}

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

const Routing: FC<RoutingProps> = ({ geolocation }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const wayPoints = geolocation
      .filter((location) => location?.latitude !== 0 && location?.longitude !== 0)
      .map((location) => L.latLng(location?.latitude, location?.longitude));

    const routingControl = L.Routing.control({
      waypoints: wayPoints,
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4, opacity: 1 }],
      },
      show: true,
      showAlternatives: true,
      addWaypoints: true,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map]);

  return null;
};

export default Routing;
