<?php
header("Content-Type: application/json");
include '../config.php';
include '../cors.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$name = $data->name;
$email = $data->email;
$dob = $data->dob;

// Only hash password if provided
$passwordUpdate = "";
if (!empty($data->password)) {
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $passwordUpdate = ", password='$password',plain_password='$data->password'";
}

// Construct the SQL update query
$sql = "UPDATE tbl_users SET name='$name', email='$email', dob='$dob' $passwordUpdate WHERE id=$id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "User updated"]);
} else {
    echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
}
?>
