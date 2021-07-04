<?php


class Weather
{
	private $weatherData = []; 
	
	function __construct() {
		$this->updateData();
	}

	public function updateData() {

		$handle = file_get_contents('../output.txt');
		$handle = explode("\n", $handle);

        $this->weatherData = [];

		foreach ($handle as $key => $value) {
			array_push($this->weatherData, explode(";", $value));
		}

	}

    public function getData() {
        return $this->weatherData;
    }

    public function getLast() {
        return $this->weatherData[count($this->weatherData)-2];
    }

	public function getGrafData() {
		$date = [];
		$temp = [];

		foreach ($this->weatherData as $key => $value) {
			array_push($date, $value[1]);
			array_push($temp, $value[4]);
		}

		return [$date, $temp];
	}
}



?>