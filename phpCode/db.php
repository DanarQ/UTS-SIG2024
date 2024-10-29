
<?php
    // variable data data dari database nya
    $host = "localhost";
    $dbname ="uniponti_db";
    $username = "root";
    $password = "";
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        // This line sets an attribute on the PDO object to specify how PDO should handle errors.
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
 ?>