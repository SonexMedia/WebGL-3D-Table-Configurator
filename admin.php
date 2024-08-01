<?php
	ini_set("display_errors", 0);

	$fname 		= "config.txt";
	$message	= "";

	if(isset($_POST["top_cherry"]))
	{
		$fp = fopen($fname, "w");

		fwrite($fp, json_encode($_POST));
		fclose($fp);

		$message = "<center id='msg_success'>Successfully Saved!</center>";
	}

	$fp 	= fopen($fname, "r");
	$data 	= fread($fp, filesize($fname));
	fclose($fp);
	
	$arr = json_decode($data);
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Table Configurator Admin</title>

    <link rel="stylesheet" type="text/css" href="style/admin.css" />
</head>

<script type="text/javascript" src="js/library/jquery.min.js"></script>
<script type="text/javascript" src="js/library/jquery-ui.min.js"></script>

<body>
	<div id="header-area">
		<img src="img/img_logo.png" id="btn_logo"></img>
		<h3>Admin</h3>
	</div>
	
	<div id="admin-body">
		<form method="POST">
			<center>Please Update Price information</center>
			<table id="tbl_main">
				<tr>
					<td>
						<h3>Table Top:</h3>
						<table class="tbl_info">
							<tr>
								<td>Cherry Table Top</td>
								<td><input type="text" name="top_cherry" value="<?php echo $arr->top_cherry; ?>"></td>
							</tr>
							<tr>
								<td>Mahagony Table Top</td>
								<td><input type="text" name="top_mahagony" value="<?php echo $arr->top_mahagony; ?>"></td>
							</tr>
							<tr>
								<td>Maple Table Top</td>
								<td><input type="text" name="top_maple" value="<?php echo $arr->top_maple; ?>"></td>
							</tr>
							<tr>
								<td>Walnut Table Top</td>
								<td><input type="text" name="top_walnut" value="<?php echo $arr->top_walnut; ?>"></td>
							</tr>
							<tr>
								<td>White Oak Table Top</td>
								<td><input type="text" name="top_white" value="<?php echo $arr->top_white; ?>"></td>
							</tr>
						</table>
					</td>
					<td>
						<h3>Table Regs:</h3>
						<table class="tbl_info">
							<tr>
								<td>Black Steel Legs</td>
								<td><input type="text" name="reg_black" value="<?php echo $arr->reg_black; ?>"></td>
							</tr>
							<tr>
								<td>Raw Steel Legs</td>
								<td><input type="text" name="reg_raw" value="<?php echo $arr->reg_raw; ?>"></td>
							</tr>
							<tr>
								<td>Stainless Steel Legs</td>
								<td><input type="text" name="reg_stainless" value="<?php echo $arr->reg_stainless; ?>"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<h3>Manufacturing Price:</h3>
						<table class="tbl_info">
							<tr>
								<td>Table Top</td>
								<td><input type="text" name="txt_tbltop" value="<?php echo $arr->txt_tbltop; ?>"></td>
							</tr>
							<tr>
								<td>Table Regs</td>
								<td><input type="text" name="txb_tblreg" value="<?php echo $arr->txb_tblreg; ?>"></td>
							</tr>
						</table>
					</td>
					<td>
						<h3>Other Expenses:</h3>
						<table class="tbl_info">
							<tr>
								<td>Overhead</td>
								<td><input type="text" name="txt_overhead" value="<?php echo $arr->txt_overhead; ?>"></td>
							</tr>
							<tr>
								<td>Hardware</td>
								<td><input type="text" name="txt_hardware" value="<?php echo $arr->txt_hardware; ?>"></td>
							</tr>
							<tr>
								<td>Profit Margin</td>
								<td><input type="text" name="txt_profit" value="<?php echo $arr->txt_profit; ?>"></td>
							</tr>
							<tr>
								<td>Shipping/Handling</td>
								<td><input type="text" name="txt_shipping" value="<?php echo $arr->txt_shipping; ?>"></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>

			<?php echo $message; ?>

			<center>
				<input type="submit" id="btn_save" value="Save">
			</center>
		</form>
	</div>
</body>