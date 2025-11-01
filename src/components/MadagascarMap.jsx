import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MadagascarMap({ regions = [], selectedRegion, onRegionClick }) {
  return (
    <MapContainer
      center={[-18.8792, 47.5079]}
      zoom={5.5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {regions.map((region, index) => {
        if (region.latitude == null || region.longitude == null) return null;

        const handleClick = () => {
          if (onRegionClick) {
            onRegionClick(region);
          }
        };

        return (
          <Marker
            key={index}
            position={[region.latitude, region.longitude]}
            eventHandlers={{
              click: handleClick,
            }}
          >
            <Popup>
              <strong>{region.nomReg}</strong> <br />
              {region.nomRegRef ? `Réf: ${region.nomRegRef}` : ""}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MadagascarMap;
