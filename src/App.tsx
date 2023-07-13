import { nanoid } from 'nanoid';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useDebounce } from 'usehooks-ts';
import ListRoute from './components/ListRoute';
import Routing from './components/Routing';
import Sidebar from './components/Sidebar';
import InputRoute from './components/ui/InputRoute';
import useComponentVisible from './hook/useComponentVisible';
import useMyLocation from './hook/useMyLocation';
import { LocationItem } from './types/location';
import api from './utils/api';
import { BaseLayers } from './utils/layers';

const { BaseLayer } = LayersControl;

export default function App() {
  const [collapse, setCollapse] = useState(false);
  const myLocation = useMyLocation();
  const [geolocation, setGeolocation] = useState<Coordinates[]>([
    { id: nanoid(), latitude: 0, longitude: 0, value: '' },
    { id: nanoid(), latitude: 0, longitude: 0, value: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [listLocations, setListLocations] = useState<LocationItem[]>([]);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [focusItem, setFocusItem] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const wrapperRef = useRef(null);
  useComponentVisible(wrapperRef, () => {
    onFocusRoute('');
    setListLocations([]);
  });

  const onFocusRoute = (id?: string) => {
    setFocusItem(id || '');
  };

  const onAddRoute = () => {
    setGeolocation([...geolocation, { id: nanoid(), latitude: 0, longitude: 0, value: '' }]);
  };

  const onRemoveRoute = (id?: string) => {
    if (!id) return;
    setGeolocation(geolocation?.filter((location) => location?.id !== id));
  };

  const onSearchRoute = async (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = event.target;
    setGeolocation(
      geolocation?.map((location) => {
        if (location?.id == id) {
          return {
            ...location,
            value: value,
          };
        }
        return location;
      }),
    );
    setValue(value);
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
            value: locationRoute?.display_name,
          };
        }

        return location;
      }),
    );
  };

  const onClickMap = async (e: L.LeafletMouseEvent) => {
    const findGeoNotHaveValue = geolocation?.find((location) => location?.latitude == 0 && location?.longitude == 0);
    if (!findGeoNotHaveValue) return;

    const geocoder = await api.getReverseGeocoding({ latitude: e.latlng.lat, longitude: e.latlng.lng });

    findGeoNotHaveValue.latitude = e.latlng.lat;
    findGeoNotHaveValue.longitude = e.latlng.lng;
    findGeoNotHaveValue.value = geocoder?.display_name;
    setGeolocation(
      geolocation?.map((location) => {
        if (location?.id == findGeoNotHaveValue.id) {
          return findGeoNotHaveValue;
        }
        return location;
      }),
    );
  };

  const fetchLocations = async (query: string) => {
    setLoading(true);
    try {
      const res = await api.getLocations(query);
      setListLocations(res);
    } catch (error) {
      setError('Something wrong.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (value) {
      fetchLocations(value);
    }
  }, [debouncedValue]);

  if (!myLocation) {
    return (
      <div>
        <h1>Location Permission is disable</h1>
      </div>
    );
  }

  return (
    <main>
      <Sidebar collapse={collapse} setCollapse={setCollapse}>
        <InputRoute
          geolocation={geolocation}
          addRoute={onAddRoute}
          removeRoute={onRemoveRoute}
          searchRoute={onSearchRoute}
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

      <div className="z-0 transition duration-600 relative">
        <MapContainer
          center={[myLocation.latitude, myLocation.longitude]}
          zoom={13}
          style={{ height: '100vh' }}
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          <LayersControl position="topright">
            {BaseLayers?.map((layer) => (
              <BaseLayer checked={layer?.defaultChecked} name={layer?.name} key={layer?.name}>
                <TileLayer url={layer?.url} attribution={layer?.attribute} />
              </BaseLayer>
            ))}
          </LayersControl>

          <Routing geolocation={geolocation} setGeolocation={setGeolocation} handleClickMap={onClickMap} />
        </MapContainer>
      </div>
    </main>
  );
}
