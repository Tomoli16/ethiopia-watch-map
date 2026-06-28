// SSR stub for leaflet / react-leaflet — the map only renders on the client
// (DeforestationMap is loaded via a useEffect-based dynamic import). This
// stub keeps leaflet's window-touching IIFE out of the worker bundle.
const handler: ProxyHandler<object> = {
  get: () => () => null,
  apply: () => null,
  construct: () => ({}),
};
const stub = new Proxy(function () {} as object, handler);
export default stub;
export const MapContainer = stub;
export const TileLayer = stub;
export const GeoJSON = stub;
export const useMap = stub;
export const Pane = stub;
export const Popup = stub;
export const CircleMarker = stub;
export const Tooltip = stub;
export const Marker = stub;
export const ZoomControl = stub;
export const ScaleControl = stub;
