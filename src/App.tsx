import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Routing from './components/Routing';
import Sidebar from './components/Sidebar';
import InputRoute from './components/ui/InputRoute';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import axios from 'axios';
import { LocationItem } from './types/location';
import { useDebounce } from 'usehooks-ts';

export default function App() {
  const [collapse, setCollapse] = useState(false);
  const [myLocation, setMyLocation] = useState<Coordinates | null>(null);
  const [geolocation, setGeolocation] = useState<Coordinates[]>([
    { id: nanoid(), latitude: 0, longitude: 0 },
    { id: nanoid(), latitude: 0, longitude: 0 },
  ]);
  const [Loading, setLoading] = useState(false);
  const [listLocations, setListLocations] = useState<LocationItem[]>([]);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 1000);
  const inputRef = useRef(null);

  const onAddRoute = () => {
    setGeolocation([...geolocation, { id: nanoid(), latitude: 0, longitude: 0 }]);
  };

  const onRemoveRoute = (id?: string) => {
    if (!id) return;
    setGeolocation(geolocation?.filter((location) => location?.id !== id));
  };

  const onSearchRoute = async (event: ChangeEvent<HTMLInputElement>, id?: string) => {
    if (!id) return;

    setValue(event.target.value);
  };

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + value);

      setLoading(false);
      setListLocations(res?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        setError('Terjadi Kesalahan, Tidak dapat menemukan lokasi.');
      } else {
        console.error(error);
        setError('Something wrong.');
      }
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    } else {
      console.log('Your browser not supported geolocation API');
    }
  }, []);

  useEffect(() => {
    if (value) {
      fetchLocations();
    }
  }, [debouncedValue]);

  if (!myLocation) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main className="flex">
      <Sidebar collapse={collapse} setCollapse={setCollapse}>
        <InputRoute
          geolocation={geolocation}
          addRoute={onAddRoute}
          removeRoute={(id) => onRemoveRoute(id)}
          searchRoute={(event, id) => onSearchRoute(event, id)}
        />

        <div className="p-4">
          <ol>
            {listLocations?.map((location) => (
              <li key={location?.osm_id}>{location?.display_name}</li>
            ))}
          </ol>
        </div>
      </Sidebar>

      <div
        className={clsx(
          'z-0 transition duration-600',
          collapse ? `translate-x-96 w-[calc(100vw-24rem)]` : 'translate-x-0 w-full',
        )}
      >
        <MapContainer center={[myLocation.latitude, myLocation.longitude]} zoom={13} style={{ height: '100vh' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Routing geolocation={geolocation} />
        </MapContainer>
      </div>
    </main>
  );
}
