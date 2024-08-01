<?php
	$fname 		= "config.txt";
	$message	= "";

	$fp 	= fopen($fname, "r");
	$data 	= fread($fp, filesize($fname));
	fclose($fp);
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Table Configurator</title>

    <link rel="stylesheet" type="text/css" href="style/style.css" />
    <link rel="stylesheet" type="text/css" href="style/jquery-ui.css" />
</head>

<script type="text/javascript" src="js/library/jquery.min.js"></script>
<script type="text/javascript" src="js/library/jquery-ui.min.js"></script>

<script type="text/javascript" src="js/library/Three.js"></script>
<script type="text/javascript" src="js/library/Detector.js"></script>
<script type="text/javascript" src="js/library/Stats.js"></script>
<script type="text/javascript" src="js/library/MTLLoader.js"></script>
<script type="text/javascript" src="js/library/OBJMTLLoader.js"></script>
<script type="text/javascript" src="js/library/OrbitControls.js"></script>

<script type="text/javascript" src="js/mine/main.js"></script>
<script type="text/javascript" src="js/mine/3ds.js"></script>

<body>
	<div id="header-area">
		<ul class="content-area">
			<li><img src="img/top_btn_lang.png"></img></li>
			<li><img src="img/top_title.png"></img></li>
			<li class="f_r"><img src="img/top_btn_social.png"></img></li>
		</ul>
	</div>
	<div id="login-area">
		<ul class="content-area">
			<li><img src="img/top_btn_shopping_cart.png"></li>
			<li class="f_r">
				<img src="img/top_label_login.png"></img>
				<input type="text" id="txt_login_pass" placeholder="pass"></input>
				<input type="text" id="txt_login_user" placeholder="user"></input>
			</li>
		</ul>
	</div>
	<div id="main-area" class="content-area">
		<div id="menu-area">
			<img src="img/img_logo.png" id="btn_logo"></img>
			<img src="img/img_menu.png" class="f_r"></img>
		</div>
	</div>
	<div id="canvas-area" class="content-area">
		<div id="render-area"></div>
		<div id="control-area">
			<div id="info-menu">
				<section class="sel">
					<h3>Dimensions</h3>
					<ul id="dimention-tab" class="list-tab">
						<li class="active">TABLE TOP</li>
						<li>LEGS</li>
					</ul>
					<div class="info-body">
						<div class="tab-body active">
							<block>
								<dl>
									<dd>Length</dd>
									<dd><img src="img/icon_info.png"></img></dd>
									<dd class="f_r">
										<input type="text" id="txt_length"></input>
									</dd>
									<div class="clear_both"></div>
								</dl>
								
								<div id="length-slider" class="slider"></div>
								<ul>
									<li>32 inch</li>
									<li>108 inch</li>
								</ul>
								<div class="clear_both"></div>
							</block>	

							<block>
								<dl>
									<dd>Width</dd>
									<dd><img src="img/icon_info.png"></img></dd>
									<dd class="f_r">
										<input type="text" id="txt_width"></input>
									</dd>
									<div class="clear_both"></div>
								</dl>

								<div id="width-slider" class="slider"></div>
								<ul>
									<li>24 inch</li>
									<li>54 inch</li>
								</ul>
								<div class="clear_both"></div>
							</block>
						</div>
						<div class="tab-body">
							<block>
								<dl>
									<dd>Height</dd>
									<dd><img src="img/icon_info.png"></img></dd>
									<dd class="f_r">
										<input type="text" id="txt_height"></input>
									</dd>
									<div class="clear_both"></div>
								</dl>
								
								<div id="height-slider" class="slider"></div>
								<ul>
									<li>24 inch</li>
									<li>36 inch</li>
								</ul>
								<div class="clear_both"></div>
							</block>
							<block>
								<dl>
									<dd>Left Overhang</dd>
									<dd><img src="img/icon_info.png"></img></dd>
									<dd class="f_r">
										<input type="text" id="txt_loverhang"></input>
									</dd>
									<div class="clear_both"></div>
								</dl>
								
								<div id="loverhang-slider" class="slider"></div>
								<ul>
									<li>0 inch</li>
									<li>10 inch</li>
								</ul>
								<div class="clear_both"></div>
							</block>
							<block>
								<dl>
									<dd>Right Overhang</dd>
									<dd><img src="img/icon_info.png"></img></dd>
									<dd class="f_r">
										<input type="text" id="txt_roverhang"></input>
									</dd>
									<div class="clear_both"></div>
								</dl>
								
								<div id="roverhang-slider" class="slider"></div>
								<ul>
									<li>0 inch</li>
									<li>10 inch</li>
								</ul>
								<div class="clear_both"></div>
							</block>
						</div>
					</div>
					<div class="clear_both"></div>
				</section>
				<section id="material-section">
					<h3>Materials</h3>
					<ul class="list-tab">
						<li class="active">TABLE TOP</li>
						<li>LEGS</li>
					</ul>
					<div class="info-body">
						<div class="tab-body active">
							<ul id="mtl-top-list">
								<li>
									<img src="obj/Cherry Table Top/Cherry_square.jpg" obj="Cherry Table Top.obj" mtl="Cherry Table Top.mtl"></img>
									<center>Cherry</center>
								</li>
								<li>
									<img src="obj/MahagonyTableTop/mahagony_1.jpg" obj="MahagonyTableTop.obj" mtl="MahagonyTableTop.mtl"></img>
									<center>Mahagony</center>
								</li>
								<li>
									<img src="obj/Maple Table Top/maple_square.jpg" obj="Maple Table Top.obj" mtl="Maple Table Top.mtl"></img>
									<center>Maple</center>
								</li>
								<li>
									<img src="obj/Walnut Table Top/walnut_square.jpg" obj="Walnut Table Top.obj" mtl="Walnut Table Top.mtl"></img>
									<center>Walnut</center>
								</li>
								<li>
									<img src="obj/White Oak Table Top/white_oak_square.jpg" obj="White Oak Table Top.obj" mtl="White Oak Table Top.mtl"></img>
									<center>White Oak</center>
								</li>
							</ul>
						</div>
						<div class="tab-body">
							<ul id="mtl-reg-list">
								<li dir="Black Steel Legs" obj="black steel legs.obj" mtl="black steel legs.mtl">
									<img src="img/Black-Steel.jpg"></img>
									<center>Black Steel</center>
								</li>
								<li dir="Raw Steel Legs" obj="Raw Steel Legs.obj" mtl="Raw Steel Legs.mtl">
									<img src="img/Raw-Steel.jpg"></img>
									<center>Raw Steel</center>
								</li>
								<li dir="Stainless Steel Legs" obj="stainless steel legs.obj" mtl="stainless steel legs.mtl">
									<img src="img/Stainless-Steel.jpg"></img>
									<center>Stainless Steel</center>
								</li>
							</ul>
						</div>
					</div>
					<div class="clear_both"></div>
				</section>
			</div>
			<div id="btn-menu">
				<ul>
					<li><img src="img/icon_mail.png"></li>
					<li><img src="img/icon_print.png"></li>
					<li><img src="img/icon_open.png"></li>
					<li><img src="img/icon_folder.png"></li>
					<li><img src="img/icon_ar.png"></li>
					<li><img src="img/icon_share.png"></li>
				</ul>
			</div>
		</div>
		<div id="price_area">
			<h3>The Dumbo</h3>
			<h5>$1090</h5>
			<h6>DELIVERS IN: 4 to 6 Weeks</h6>
		</div>

		<img src="img/btn_expand.png" 	id="btn_expand" class="canvas_btns">
		<section id="btn_zoom" 	class="canvas_btns">
			<span id="btn_zoomin">&nbsp;</span>
			<span id="btn_zoomout">&nbsp;</span>
			<img src="img/btn_zoom.png">
		</section>
		<img src="img/btn_add_cart.png" id="btn_cart" 	class="canvas_btns">
	</div>
	<div class="content-area">
		<img src="img/body_img.png"></img>
		<img src="img/bottom_img.png"></img>
	</div>

	<input type="hidden" id="info_data" value='<?php echo $data; ?>'>
</body>