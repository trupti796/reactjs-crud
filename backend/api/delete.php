<?php
header("Content-Type: application/json");
include '../cors.php';
include '../config.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$sql = "DELETE FROM tbl_users WHERE id=$id";

  if (mysqli_query($conn, $sql)) {
        echo json_encode(["success" => true, "message" => "User deleted"]);
    } else {
        echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
    }
?>