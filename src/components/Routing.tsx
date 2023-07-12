import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { FC, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

interface RoutingProps {
  geolocation: Coordinates[];
  setGeolocation: React.Dispatch<React.SetStateAction<Coordinates[]>>;
  handleClickMap: (e: L.LeafletMouseEvent) => void;
}

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

const Routing: FC<RoutingProps> = ({ geolocation, handleClickMap }) => {
  const map = useMap();
  useMapEvents({
    async click(e) {
      handleClickMap(e);

      map.locate();
    },
  });

  useEffect(() => {
    if (!map) return;

    const wayPoints = geolocation
      .filter((location) => location?.latitude !== 0 && location?.longitude !== 0)
      .map((location) => L.latLng(location?.latitude, location?.longitude));

    const routingControl = L.Routing.control({
      // router: L.Routing.osrmv1({
      //   serviceUrl: `http://router.project-osrm.org/route/v1/`,
      // }),
      routeWhileDragging: true,
      // showAlternatives: true,
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4, opacity: 1 }],
      },
      waypoints: wayPoints,
      show: true,
      addWaypoints: true,
      fitSelectedRoutes: true,
      collapsible: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, geolocation]);

  return null;
};

export default Routing;
