<?php
include 'db_connect.php';

$sql = "SELECT * FROM organizations";
$result = $conn->query($sql);

$organizations = [];
while ($row = $result->fetch_assoc()) {
    $organizations[] = $row;
}

echo json_encode($organizations);

$conn->close();
?>
