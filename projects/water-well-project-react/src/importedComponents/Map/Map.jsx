import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


delete L.Icon.Default.prototype._getIconUrl;

const defaultIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const MapPlaceholder = () => {
  return (
    <p>
      Карта с маркерами наших работ.{' '}
      <noscript>Для просмотра карты включите JavaScript.</noscript>
    </p>
  )
}

const startPosition = [49.0, 31.0]; // Начальное положение карты
const markersWorks = [
  { position: [50.45, 30.5233], title: 'Киев', description:'столица Украины' },
  { position: [48.45, 35.0167], title: 'Днепр' },
  { position: [46.48, 30.7326], title: 'Одесса' },
  // Добавьте больше маркеров при необходимости
];

const MapFrame = () => {
  return ( 
    // Убедитесь, что установлены высота и ширина контейнера карты, иначе карта не будет отображаться
      <MapContainer center={startPosition} zoom={5} style={{height: "50vh", width: "90vw"}} placeholder={<MapPlaceholder />}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Дополнительные слои карты или компоненты могут быть добавлены здесь */}

        {markersWorks.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={defaultIcon}>
            <Popup>
              <b>{marker.title}</b>
              <br />
              {marker.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
  );
}

export default MapFrame;