import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CSS/ReadMap.css";
import { useParams, useNavigate } from "react-router-dom";

function EditMap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  // Fetch the data when the component loads
  useEffect(() => {
    fetch(`http://localhost/uniponti/get_uni.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const record = data.find((item) => item.id === parseInt(id));
          setNama(record.nama || "");
          setAddress(record.address || "");
          setLat(record.lat || 0);
          setLng(record.lng || 0);
        } else {
          console.error("No data found for the given ID");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  // Update coordinates when map is clicked
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });
    return lat && lng ? <Marker position={[lat, lng]} /> : null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { id, nama, address, lat, lng };

    fetch("http://localhost/uniponti/update_uni.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Record updated successfully");
          navigate("/readmap"); // Redirect back to the main page after update
        } else {
          alert("Failed to update record: " + data.message);
        }
      })
      .catch((error) => console.error("Error updating record:", error));
  };

  return (
    <div className="container mt-5">
      <h3>Edit Map Location</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="number"
            className="form-control"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="number"
            className="form-control"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div>

        {/* Map Component */}
        <div className="mb-3">
          <label className="form-label">Select Location on Map</label>
          <MapContainer
            center={[-0.027155105381071975, 109.34528341107193]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate("/readmap")}
          className="btn btn-secondary ms-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditMap;
