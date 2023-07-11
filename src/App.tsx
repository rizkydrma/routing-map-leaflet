import axios from 'axios';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useDebounce } from 'usehooks-ts';
import ListRoute from './components/ListRoute';
import Routing from './components/Routing';
import Sidebar from './components/Sidebar';
import InputRoute from './components/ui/InputRoute';
import useComponentVisible from './hook/useComponentVisible';
import { LocationItem } from './types/location';

export default function App() {
  const [collapse, setCollapse] = useState(false);
  const [myLocation, setMyLocation] = useState<Coordinates | null>(null);
  const [geolocation, setGeolocation] = useState<Coordinates[]>([
    { id: nanoid(), latitude: 0, longitude: 0 },
    { id: nanoid(), latitude: 0, longitude: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [listLocations, setListLocations] = useState<LocationItem[]>([]);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 500);
  const [focusItem, setFocusItem] = useState<string>('');
  const wrapperRef = useRef(null);
  useComponentVisible(wrapperRef, () => {
    onFocusRoute('');
    setListLocations([]);
  });

  const onFocusRoute = (id?: string) => {
    setFocusItem(id || '');
  };

  const onAddRoute = () => {
    setGeolocation([...geolocation, { id: nanoid(), latitude: 0, longitude: 0 }]);
  };

  const onRemoveRoute = (id?: string) => {
    if (!id) return;
    setGeolocation(geolocation?.filter((location) => location?.id !== id));
  };

  const onSearchRoute = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClickOptionsRoute = (locationRoute: LocationItem) => {
    setListLocations([]);
    setGeolocation(
      geolocation?.map((location) => {
        if (location?.id == focusItem) {
          return {
            ...location,
            latitude: +locationRoute?.lat,
            longitude: +locationRoute?.lon,
          };
        }

        return location;
      }),
    );
  };

  const fetchLocations = async (query: string) => {
    try {
      setLoading(true);
      console.log('ok');
      if (!query) {
        setLoading(false);
        setListLocations([]);
      }
      const res = await axios.get('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + query);
      setLoading(false);
      setListLocations(res?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
        setMyLocation({ id: nanoid(), latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    } else {
      console.log('Your browser not supported geolocation API');
    }
  }, []);

  useEffect(() => {
    if (value) {
      fetchLocations(value);
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
          searchRoute={(event) => onSearchRoute(event)}
          onFocusRoute={onFocusRoute}
          wrapperRef={wrapperRef}
        />

        <ListRoute
          ref={wrapperRef}
          show={value.length !== 0 && focusItem.length !== 0}
          locations={listLocations}
          onClickOptionsRoute={onClickOptionsRoute}
          loading={loading}
          error={error}
        />
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
