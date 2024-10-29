import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "./CSS/Map.css";
import "leaflet/dist/leaflet.css";

function Map() {
  const [markers, setMarkers] = useState([]);
  const fetchMarkers = () => {
    fetch("http://localhost/uniponti/get_uni.php")
      .then((response) => response.json())
      .then((data) => setMarkers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchMarkers();

    const interval = setInterval(fetchMarkers, 2000); // (2000ms = 2 seconds)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container">
        <MapContainer
          center={[-0.027155105381071975, 109.34528341107193]}
          zoom={13}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></TileLayer>
          <MarkerClusterGroup chunkedLoading>
            {markers.map((marker) => (
              //ini kita mengambil props variabel marker dan untuk posisi marker nya
              <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                <Popup>{marker.nama}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
