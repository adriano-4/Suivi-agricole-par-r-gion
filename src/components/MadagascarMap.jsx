// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// // Coordonnées approximatives des chefs-lieux de région
// function MadagascarMap() {
//   const regions = [
//   ];

//   return (
//     <MapContainer
//       center={[-18.8792, 47.5079]}
//       zoom={5.5}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {regions.map((region, index) => (
//         <Marker key={index} position={[region.lat, region.lng]}>
//           <Popup>{region.name}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }

// export default MadagascarMap;

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MadagascarMap({ regions = [], selectedRegion }) {
  console.log("Regions reçues pour la map :", regions);

  return (
    <MapContainer
      center={[-18.8792, 47.5079]}
      r
      zoom={5.5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {regions.map((region, index) => {
        if (region.latitude == null || region.longitude == null) return null;

        const isSelected = selectedRegion && selectedRegion.id === region.id;

        return (
          <Marker key={index} position={[region.latitude, region.longitude]}>
            <Popup>
              {region.nomReg} <br />
              {region.nomRegRef ? `Réf: ${region.nomRegRef}` : ""}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MadagascarMap;
