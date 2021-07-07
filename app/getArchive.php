<?php

function getArchiveFiles() {
    $servername = "eu-cdbr-west-01.cleardb.com";
    $username = "bce2ad0d382bfa";
    $password = "611ecf5c";
    $dbname = "heroku_32331bfae3193ea";


    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }


    mysqli_set_charset($conn, "utf8");

    $sql = "SELECT * FROM archive;";
    $result = $conn->query($sql) or die (mysqli_error($conn));


    $res = [];

    while ($row = $result->fetch_assoc()) {
        array_push($res, $row);

    }

    return exit(json_encode($res));
}

?>