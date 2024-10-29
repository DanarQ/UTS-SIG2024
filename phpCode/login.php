<?php
session_start();
include('db.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve email and password from $_POST
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and execute query using PDO
    $stmt = $conn->prepare("SELECT * FROM user_accounts_tb WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    // Fetch user data
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Verify password
        if ($password === $user['password']) {
            // Password is correct, set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];

            // Return success response
            echo json_encode([
                "success" => true,
                "   " => "Login successful"
            ]);
            exit();
        } else {
            // Invalid password
            echo json_encode([
                "success" => false,
                "message" => "Invalid password"
            ]);
        }
    } else {
        // Email not found
        echo json_encode([
            "success" => false,
            "message" => "Invalid email"
        ]);
    }
} else {
    // Handle non-POST requests
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method"
    ]);
}
?>
