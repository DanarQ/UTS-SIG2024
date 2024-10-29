<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
include('db.php');

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    try {
        // Prepare the DELETE statement using PDO
        $stmt = $conn->prepare("DELETE FROM universitas_tb WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        // Execute the statement and return JSON response
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Record deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete record']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    // If 'id' is not provided, return an error
    echo json_encode(['success' => false, 'message' => 'No ID provided']);
}
?>