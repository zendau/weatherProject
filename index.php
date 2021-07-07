<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$raw = file_get_contents('php://input');
$json = json_decode($raw);
var_dump($raw, $json, $_POST);




?>