<?php
	$str = file_get_contents("php://input");
	file_put_contents("../tmp/webcam.jpg", pack("H*", $str));

	
?>