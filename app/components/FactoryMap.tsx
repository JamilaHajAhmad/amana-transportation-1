'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icons
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function FactoryMap({ factories }: { factories: any[] }) {
  // Default center (if no factories)
  const center: [number, number] = factories.length && typeof factories[0].latitude === 'number' && typeof factories[0].longitude === 'number'
    ? [factories[0].latitude, factories[0].longitude]
    : [9.05785, 7.49508];

  return (
    <MapContainer center={center} zoom={6} scrollWheelZoom={false} className="w-full h-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {factories
        .filter(f => f.location && typeof f.location.latitude === 'number' && typeof f.location.longitude === 'number')
        .map((factory, idx) => (
          <Marker
            key={factory.id || idx}
            position={[factory.location.latitude, factory.location.longitude]}
            icon={factory.status === 'maintenance' ? redIcon : blueIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{factory.name}</h3>
                <p>Status: <span className="font-semibold">{factory.status}</span></p>
                <p>Location: {factory.location.city}, {factory.location.country}</p>
                <p>Established: {factory.established}</p>
                {/* Add more fields as needed */}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}