<?php

include "../theWeather.php";
include "../utils.php";
include "../getArchive.php";

error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");

$weather = new Weather;

$data = $_GET["get_data"];

if($data) {


    switch ($data) {
        case 'all':
            $allData = $weather->getData();
            return toJson($allData);
            break;

        case 'last':
            $last = $weather->getLast();
            return toJson($last);
            break;
        
        case "graf":
            $graf = $weather->getGrafData();
            return toJson($graf);
            break;

        case "archive":
            return getArchiveFiles();
            break;
        
        default:
        return toJson("error");
            break;
    }
}

?>