<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include 'db.php'; // Assuming you have a db_connect.php for database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'];
    $nama = $data['nama'];
    $address = $data['address'];
    $lat = $data['lat'];
    $lng = $data['lng'];

    // SQL statement with placeholders for the data to update
    $query = "UPDATE universitas_tb SET nama = :nama, address = :address, coordinate = POINT(:lat, :lng) WHERE id = :id";
    $stmt = $conn->prepare($query);

    // Bind each parameter to the corresponding placeholder
    $stmt->bindParam(':nama', $nama);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':lat', $lat);
    $stmt->bindParam(':lng', $lng);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Record updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update record"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
