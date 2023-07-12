const api = (() => {
  const BASE_URL_NOMINATIM = 'https://nominatim.openstreetmap.org';

  async function getLocations(query: string) {
    const response = await fetch(`${BASE_URL_NOMINATIM}/search?format=json&limit=5&q=${query}`);
    const responseJson = await response.json();

    return responseJson;
  }

  async function getReverseGeocoding({ latitude, longitude }: Omit<Coordinates, 'id'>) {
    const response = await fetch(`${BASE_URL_NOMINATIM}/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const responseJson = await response.json();

    return responseJson;
  }

  return { getLocations, getReverseGeocoding };
})();

export default api;
