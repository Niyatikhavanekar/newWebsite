<?php
header("Content-Type: application/json"); 
error_reporting(E_ALL);
ini_set('display_errors', 1);
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "newwebsite"; 

$conn = new mysqli($servername, $username, $password, $database);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $admins = [];
    foreach($_POST as $key=>$value) {
        if($key != "action"){
            $admins[$key] = $value;
        }
    }
    $placeholders = "(" . str_repeat("?, ", count($admins) - 1) . "?)"; 
    $values = [];
    $types = "";
    $index = 0;
    foreach ($admins as $key=>$value) {
        if (is_int($value)) {
            $types .= "i"; 
        } elseif (is_float($value)) {
            $types .= "d"; 
        } else {
            $types .= "s"; 
        }
        $values[$index] = $value;
        $index++;
    }
    $fields = implode(", ", array_keys($admins));
    $stmt = $conn->prepare("INSERT INTO tbl_admin ($fields) VALUES $placeholders");
    $stmt->bind_param($types, ...$values);
    $stmt->execute();
    echo json_encode("Inserted");
    $stmt->close();
    $conn->close();
}
?>

