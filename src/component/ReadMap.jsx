import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";
import Map from "./Map";
import "./CSS/ReadMap.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ReadMap() {
  const [showLocation, setShowLocation] = useState([]);
  const navigate = useNavigate();

  const fetchMarkers = () => {
    fetch("http://localhost/uniponti/get_uni.php")
      .then((response) => response.json())
      .then((data) => setShowLocation(data))
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    // Initial fetch
    fetchMarkers();

    // Set up polling every 1 seconds
    const interval = setInterval(fetchMarkers, 2000); // Adjust interval as needed (2000ms = 2 seconds)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      fetch(`http://localhost/uniponti/delete_uni.php?id=${id}`, {
        method: "GET", // Use GET as per your PHP script
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Remove the deleted item from the local state
            setShowLocation((prevShowLocation) =>
              prevShowLocation.filter(
                (showLocations) => showLocations.id !== id
              )
            );
            alert("Record deleted successfully");
          } else {
            alert("Failed to delete record: " + data.message);
          }
        })
        .catch((error) => console.error("Error deleting SPBU:", error));
    }
  };
  const handleUpdateRedirect = (id) => {
    navigate(`/editmap/${id}`);
  };
  return (
    <>
      <AdminPage></AdminPage>
      <h1>UniPonti</h1>
      <Map></Map>
      <div className="container mt-5">
        <h3 className="text-center">University Locations</h3>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {showLocation.length > 0 ? (
                showLocation.map((showLocations) => (
                  <tr key={showLocations.id}>
                    <td>{showLocations.nama}</td>
                    <td>{showLocations.address}</td>
                    <td>{showLocations.lat}</td>
                    <td>{showLocations.lng}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm ms-2"
                        onClick={() => handleUpdateRedirect(showLocations.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDelete(showLocations.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading Location data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReadMap;
