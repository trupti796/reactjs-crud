<?php
header("Content-Type: application/json");
include '../config.php';
include '../cors.php';

$data = json_decode(file_get_contents("php://input"));
$name = $data->name;    
$email = $data->email;
$plain_password = $data->password;
$password = password_hash($data->password, PASSWORD_DEFAULT);
$dob = $data->dob;

$sql = "INSERT INTO tbl_users (name, email, password,plain_password, dob) VALUES ('$name', '$email', '$password','$plain_password', '$dob')";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "success" => true,
        "message" => "User created successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn)
    ]);
}
?>