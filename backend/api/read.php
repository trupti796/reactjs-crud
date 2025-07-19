<?php
header("Content-Type: application/json");
include '../config.php';
include '../cors.php';

$result = mysqli_query($conn, "SELECT id, name, email, dob FROM tbl_users ORDER BY created_at DESC");
$users = [];

while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
}

echo json_encode($users);
?>