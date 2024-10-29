<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');
    // untuk menginclude database connection nya
    include 'db.php';

    // untuk mengidentifikasi kalau respon dari sini berbentuk format json
    header('Content-Type: application/json');

    try {
        // Prepare and execute a query
        $stmt = $conn->prepare("SELECT id, nama, address, ST_X(coordinate) AS lat, ST_Y(coordinate) AS lng FROM universitas_tb");
        $stmt->execute();
    
        // Fetch all the rows as an associative array
        $universitas_tb = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Return the data as a JSON response
        echo json_encode($universitas_tb);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
?>