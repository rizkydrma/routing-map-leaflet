import { useEffect, useState } from 'react';

const useMyLocation = () => {
  const [myLocation, setMyLocation] = useState<Pick<Coordinates, 'latitude' | 'longitude'> | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    } else {
      console.log('Your browser not supported geolocation API');
    }
  }, []);

  return myLocation;
};

export default useMyLocation;
