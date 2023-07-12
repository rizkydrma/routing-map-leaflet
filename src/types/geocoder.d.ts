export interface Geocoder {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: GeocoderAddress;
  boundingbox: string[];
}

export interface GeocoderAddress {
  road: string;
  village: string;
  subdistrict: string;
  city: string;
  state: string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}
