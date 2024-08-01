//***************************************************************************************//
//
//	Main Javascript file for connecting every javascript functions
//
//***************************************************************************************//

jQuery(document).ready(function()
{
								
	var initObj		= new initEnv();
	
	initObj.init();
});

var initEnv				= function()
{
	var main			= this;

	main.obj3D 			= null;

	main.init 			= function()
	{
		main.init3D();
		main.initSlider();
		main.initEvent();
	}

	main.init3D 		= function()
	{
		var info_top	= {};
		var info_reg 	= {};

		info_top 		= 
		{
			obj 	: "obj/Walnut Table Top/Walnut Table Top.obj", 
			mtl 	: "obj/Walnut Table Top/Walnut Table Top.mtl",
			mode 	: "top"
		};

		info_reg 		= 
		{
			obj 	: "obj/Raw Steel Legs/Raw Steel Legs.obj", 
			mtl 	: "obj/Raw Steel Legs/Raw Steel Legs.mtl",
			mode 	: "reg"
		}

		main.obj3D 		= new Obj3D();
		main.obj3D.init("render-area", main);

		main.obj3D.loadObj(info_top);
		main.obj3D.loadObj(info_reg);

	}

	main.initSlider 	= function()
	{
		$("#txt_length").val(main.obj3D.tbl_length);
		$("#length-slider").slider(
		{
			min 	: 32,
			max 	: 108,
			range 	: "min",
			value 	: main.obj3D.tbl_length,
			change 	: function(event, ui)
			{
				main.obj3D.tbl_length = ui.value;
				main.obj3D.updateTable();

				$("#txt_length").val(ui.value);
			}
		});

		$("#txt_width").val(main.obj3D.tbl_width);
		$("#width-slider") .slider(
		{
			min 	: 24,
			max 	: 54,
			range 	: "min",
			value 	: main.obj3D.tbl_width,
			change 	: function(event, ui)
			{
				main.obj3D.tbl_width = ui.value;
				main.obj3D.updateTable();
				
				$("#txt_width").val(ui.value);
			}
		});

		$("#txt_height").val(main.obj3D.tbl_height);
		$("#height-slider") .slider(
		{
			min 	: 24,
			max 	: 36,
			range 	: "min",
			value 	: main.obj3D.tbl_height,
			change 	: function(event, ui)
			{
				main.obj3D.tbl_height = ui.value;
				main.obj3D.updateTable();
				
				$("#txt_height").val(ui.value);
			}
		});

		$("#txt_loverhang").val(main.obj3D.tbl_left);
		$("#loverhang-slider") .slider(
		{
			min 	: 0,
			max 	: 10,
			range 	: "min",
			value 	: main.obj3D.tbl_left,
			change 	: function(event, ui)
			{
				main.obj3D.tbl_left = ui.value;
				main.obj3D.updateTable();
				
				$("#txt_loverhang").val(ui.value);
			}
		});

		$("#txt_roverhang").val(main.obj3D.tbl_right);
		$("#roverhang-slider") .slider(
		{
			min 	: 0,
			max 	: 10,
			range 	: "min",
			value 	: main.obj3D.tbl_right,
			change 	: function(event, ui)
			{
				main.obj3D.tbl_right = ui.value;
				main.obj3D.updateTable();
				
				$("#txt_roverhang").val(ui.value);
			}
		});
	}

	main.initEvent 	= function()
	{
		$(".list-tab li").click(function()
		{
			var index = $(this).index() * 1;

			$(this).parent().find(".active").removeClass("active");

			$(this).addClass("active");
			$(this).parents("section").children(".info-body").find(".active").removeClass("active");
			$(this).parents("section").children(".info-body").find(".tab-body:eq(" + index + ")").addClass("active");
		});

		$("#info-menu h3").click(function()
		{
			$(this).parents("#info-menu").children(".sel").removeClass("sel");
			$(this).parent().addClass("sel");
		});

		$("#mtl-top-list li").click(function()
		{
			var path_dir = $(this).children("img").attr("src").split("/");
			var path_obj = $(this).children("img").attr("obj");
			var path_mtl = $(this).children("img").attr("mtl");

			var info_top	=  
			{
				obj 	: path_dir[0] + "/" + path_dir[1] + "/" + path_obj, 
				mtl 	: path_dir[0] + "/" + path_dir[1] + "/" + path_mtl,
				mode 	: "top"
			};

			main.obj3D.loadObj(info_top);
		});

		$("#mtl-reg-list li").click(function()
		{
			var path_dir = $(this).attr("dir");
			var path_obj = $(this).attr("obj");
			var path_mtl = $(this).attr("mtl");

			var info_reg	=  
			{
				obj 	: "obj/" + path_dir + "/" + path_obj, 
				mtl 	: "obj/" + path_dir + "/" + path_mtl, 
				mode 	: "reg"
			};

			main.obj3D.loadObj(info_reg);
		});

		$("#btn_expand").click(function()
		{
			if($("#render-area canvas").hasClass("zoomin"))
			{
				$("#btn_zoom").css("bottom", "70px");
				$("#render-area canvas").attr("width", 	"700");
				$("#render-area canvas").attr("height", "400");
				$("#render-area canvas").removeClass("zoomin");

				main.obj3D.renderer.setSize(700, 400);
			}
			else
			{
				$("#btn_zoom").css("bottom", "-120px");
				$("#render-area canvas").attr("width", "1024");
				$("#render-area canvas").attr("height", "585");
				$("#render-area canvas").addClass("zoomin");

				main.obj3D.renderer.setSize(1024, 585);
			}
		});

		$("#btn_zoomin").click(function()
		{
			main.obj3D.controls.zoomIn(0.9);
		});

		$("#btn_zoomout").click(function()
		{
			main.obj3D.controls.zoomIn(1.1);
		});

		$("#btn_cart").click(function()
		{
			alert("Price:  " + $("#price_area h5").html());
		});

		$("#control-area input").on("keypress", function(evt)
		{
			if(evt.keyCode == "13")
			{
				var left 	= $(this).val() * 1;
				var sval 	= $(this).parents("block").children("ul").children(":nth-child(1)").html().replace("inch","") * 1;
				var eval  	= $(this).parents("block").children("ul").children(":nth-child(2)").html().replace("inch","") * 1;
				var percent	= (left - sval) / (eval - sval) * 100;

				$(this).parents("block").children(".slider").slider("value", left);
			}
		});
	}

	main.calcPrice 		= function()
	{
		var basic_data 	= JSON.parse($("#info_data").val());

		var top_sqf 	= main.obj3D.tbl_length * main.obj3D.tbl_width / 144;
		var leg_foot 	= main.obj3D.tbl_height * main.obj3D.tbl_width / 12;

		var top_mtl 	= main.obj3D.top_mtl.split("/");
		var reg_mtl 	= main.obj3D.reg_mtl.split("/");

		var top_price 	= 0;
		var reg_price 	= 0;
		var total 		= 0;

		switch(top_mtl[top_mtl.length - 1])
		{
			case "Walnut Table Top.mtl" :
				top_price = basic_data.top_walnut;
			break;

			case "Cherry Table Top.mtl" :
				top_price = basic_data.top_cherry;
			break;

			case "MahagonyTableTop.mtl" :
				top_price = basic_data.top_mahagony;
			break;

			case "Maple Table Top.mtl" :
				top_price = basic_data.top_maple;
			break;

			case "White Oak Table Top.mtl" :
				top_price = basic_data.top_white;
			break;
		}

		switch(reg_mtl[reg_mtl.length - 1])
		{
			case "black steel legs.mtl" :
				reg_price = basic_data.reg_black;
			break;

			case "Raw Steel Legs.mtl" :
				reg_price = basic_data.reg_raw;
			break;

			case "stainless steel legs.mtl" :
				reg_price = basic_data.reg_stainless;
			break;
		}

		top_price = top_price * top_sqf;
		reg_price = reg_price * leg_foot;

		total  = top_price * 1 + reg_price * 1;
		total += basic_data.txt_tbltop * 1 + basic_data.txb_tblreg * 1;
		total += basic_data.txt_hardware * 1 + basic_data.txt_overhead * 1;
		total += basic_data.txt_shipping * 1;

		total = Math.round(total * 100) / 100;

		$("#price_area h5").html("$" + total);
		console.log(total);
	}
}