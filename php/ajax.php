<?php

	switch ($_REQUEST['mode'])
	{
		case "save_project" :
			$data = $_REQUEST['data'];
			$name = $_REQUEST['name'];

			$fp = fopen("../tmp/".$name, "w");
			fwrite($fp, $data);
			fclose($fp);

			echo "success";
			break;
		
		case "load_project" : 
			$name = "../tmp/".$_REQUEST['name'];

			$fp 	= fopen($name, "r");
			$data 	= fread($fp, filesize($name));
			
			fclose($fp);
			unlink($name);

			echo $data;
			break;

		case "save_webcam" :
			$data = $_REQUEST['data'];
			$name = "webcam_".time().".png";

			$fp = fopen("../tmp/".$name, "w");
			fwrite($fp, base64_decode(str_replace("data:image/png;base64,", "", $data)));
			fclose($fp);

			echo $name;
			break;
	}
?>