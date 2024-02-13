import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

let MapComponent = () => {
  const markers = [
    { coords: [50.4501, 30.5234], title: "Киев" },
    { coords: [49.8397, 24.0297], title: "Львов" },
    { coords: [49.99366360883256, 36.29211955297298], title: "Французский бульвар", description: "test description"}
    // Добавьте другие метки здесь
  ];

  return (
    <MapContainer center={[49.8397, 24.0297]} zoom={6}>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri"
      />
      {markers.map(marker => (
        <Marker position={marker.coords}>
          <Popup>
            {marker.description ? (
              <>
                <b>{marker.title}</b>
                <br />
                {marker.description}
              </>
            ) : (
              <b>{marker.title}</b>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}


export default MapComponent;