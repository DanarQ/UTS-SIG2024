<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Include the PDO connection from db.php
include('db.php');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve data from the POST request
    $nama = $_POST['inputNama'];
    $address = $_POST['inputAddress'];
    $latitude = $_POST['inputLatitude'];
    $longitude = $_POST['inputLongitude'];

    // Prepare the SQL query to insert data using PDO
    try {
        $stmt = $conn->prepare("INSERT INTO universitas_tb (nama, address, coordinate) VALUES (:nama, :address, ST_GeomFromText(:point, 4326))");
        $point = "POINT($latitude $longitude)";

        // Bind parameters to the query
        $stmt->bindParam(':nama', $nama);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':point', $point);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'SPBU created successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create SPBU']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
