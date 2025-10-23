<?php
include 'db_connect.php';

if (isset($_GET['org_id'])) {
    $org_id = intval($_GET['org_id']);
    $sql = "SELECT * FROM workers WHERE org_id = $org_id";
} else {
    $sql = "SELECT * FROM workers";
}

$result = $conn->query($sql);

$workers = [];
while ($row = $result->fetch_assoc()) {
    $workers[] = $row;
}

echo json_encode($workers);

$conn->close();
?>
