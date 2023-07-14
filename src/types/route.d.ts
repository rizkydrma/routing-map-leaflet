export interface RouteDirections {
  name: string;
  coordinates: Coordinate[];
  instructions: Instruction[];
  summary: Summary;
  waypointIndices: number[];
  inputWaypoints: Waypoint[];
  waypoints: Waypoint[];
  properties: Properties;
  routesIndex: number;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Waypoint {
  options: Options;
  latLng: Coordinate;
  _initHooksCalled: boolean;
}

export interface Options {
  allowUTurn: boolean;
}

export interface Instruction {
  type: GuideType;
  distance: number;
  time: number;
  road: string;
  direction: string;
  index: number;
  mode: string;
  modifier: string;
  text: string;
}

export interface Properties {
  isSimplified: boolean;
}

export interface Summary {
  totalDistance: number;
  totalTime: number;
}

export type GuideType =
  | 'Head'
  | 'Right'
  | 'EndofRoad'
  | 'Offmap'
  | 'Left'
  | 'Continue'
  | 'DestinationReached'
  | 'Fork'
  | 'Straight';
