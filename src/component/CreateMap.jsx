import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AdminPage from "./AdminPage";
function CreateMap() {
  const [nama, setNama] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        setMarkerPosition(e.latlng);
      },
    });
    return null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send to the PHP backend
    const formData = new FormData();
    formData.append("inputNama", nama);
    formData.append("inputAddress", address);
    formData.append("inputLatitude", latitude);
    formData.append("inputLongitude", longitude);

    // Send data to PHP backend
    fetch("http://localhost/uniponti/create_uni.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("SPBU created successfully!");
          // Reset the form fields
          setNama("");
          setAddress("");
          setLatitude("");
          setLongitude("");
          setMarkerPosition(null);
        } else {
          alert("Failed to create SPBU: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <AdminPage></AdminPage>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Find University</h2>

        {/* Map Container */}
        <MapContainer
          center={[-0.02543844487523898, 109.33669538729531]}
          zoom={13}
          style={{ height: "420px", marginBottom: "20px" }}
          className="mb-4 rounded shadow-sm"
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            minZoom={5}
            maxZoom={300}
          />
          {/* Marker that shows on map when clicked */}
          {markerPosition && <Marker position={markerPosition}></Marker>}
          {/* Component to handle map clicks */}
          <MapClickHandler />
        </MapContainer>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="inputName" className="form-label">
              University Name
            </label>
            <input
              type="text"
              id="inputName"
              name="inputName"
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="inputAddress" className="form-label">
              University Address
            </label>
            <input
              type="text"
              id="inputAddress"
              name="inputAddress"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="inputLatitude" className="form-label">
                Latitude
              </label>
              <input
                type="text"
                id="inputLatitude"
                name="inputLatitude"
                className="form-control"
                value={latitude}
                readOnly
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="inputLongitude" className="form-label">
                Longitude
              </label>
              <input
                type="text"
                id="inputLongitude"
                name="inputLongitude"
                className="form-control"
                value={longitude}
                readOnly
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 shadow-sm">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateMap;
