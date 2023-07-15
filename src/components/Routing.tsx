import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { FC, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { MarkerFinish, MarkerStart } from '../assets';
import { RouteDirections } from '../types/route';

interface RoutingProps {
  geolocation: Coordinates[];
  setRouteDirection: React.Dispatch<React.SetStateAction<RouteDirections | null>>;
  handleClickMap: (e: L.LeafletMouseEvent) => void;
}

const Routing: FC<RoutingProps> = ({ geolocation, handleClickMap, setRouteDirection }) => {
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

    const plan = L.Routing.plan(wayPoints, {
      createMarker: (wayPointsIndex: number, wayPoints: L.Routing.Waypoint, numberOfWayPoints: number) => {
        let marker_icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconAnchor: [20, 30],
          iconSize: [20, 30],
        });
        if (wayPointsIndex == 0) {
          marker_icon = L.icon({
            iconUrl: MarkerStart,
            iconSize: [40, 40],
          });
        } else if (wayPointsIndex == numberOfWayPoints - 1) {
          marker_icon = L.icon({
            iconUrl: MarkerFinish,
            iconSize: [40, 40],
          });
        }
        var marker = L.marker(wayPoints.latLng, {
          draggable: true,
          icon: marker_icon,
        });

        // marker.on('dragend', (e) => {
        //   console.log('end', e);
        // });
        return marker;
      },
    });

    const routingControl = L.Routing.control({
      routeWhileDragging: true,
      addWaypoints: false,
      lineOptions: {
        extendToWaypoints: false,
        missingRouteTolerance: 0,
        styles: [{ color: '#2563eb', weight: 6, opacity: 0.8 }],
      },
      waypoints: wayPoints,
      show: true,
      plan: plan,
    }).addTo(map);

    routingControl.on('routeselected', (event) => {
      setRouteDirection(event?.route);
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, geolocation]);

  return null;
};

export default Routing;
