/*
	HTML5 3D Engine for manage various 3D objects.
				-------
	Versioin 1.0	Date:2014.2.19
*/

var Obj3D			= function()
{
	var main		= this;

	/* main variables for set up env */

	main.container 	= null;
	main.scene 		= null;
	main.camera 	= null;
	main.renderer	= null;
	main.controls 	= null;

	main.canvID 	= "";
	main.pareObj 	= null;

	main.sWidth 	= 0;
	main.sHeight 	= 0;

	main.fWidth 	= 1000;
	main.fHeight 	= 1000;

	main.obj_top 	= null;
	main.obj_reg 	= null;

	main.unit_inch	= 10;

	main.tbl_width 	= 36;
	main.tbl_length = 76;
	main.tbl_height = 30;

	main.tbl_left 	= 3;
	main.tbl_right 	= 3;

	main.top_mtl 	= "";
	main.reg_mtl 	= "";

	main.init 		= function(id, pareObj)
	{
		main.canvID 	= id;
		main.pareObj 	= pareObj;
		// main.unit 	= unit;

		main.sWidth 	= 700;
		main.sHeight 	= 400;

		main.init3DEnv();
	}

	main.init3DEnv	= function()
	{
		main.scene 	= new THREE.Scene();

		main.initCamera();
		main.initLights();
		main.initRenderer();
		main.initControls();
		main.loadManager();
		main.animate();
	}

	main.animate 	= function()
	{
		if(main.stopAnim) return;

		main.animID = requestAnimationFrame( main.animate );
		main.renderer.render( main.scene, main.camera );

		main.scene.traverse (function (object)
		{
			if(object.type == "obj")
			{
				if(object.material)	object.material.dispose();
		    	if(object.geometry) object.geometry.dispose();
		    	if(object.texture) object.texture.dispose();
		    }
		});

		main.controls.update();
	}

	main.initCamera	= function()
	{
		var angle 	= 50;
		var near 	= 1;
		var far 	= 2000;
		var aspect 	= main.sWidth / main.sHeight;

		main.camera	= new THREE.PerspectiveCamera( angle, aspect, near, far);
		main.scene.add(main.camera);

		main.camera.position.set(100,250,1000);
		main.camera.lookAt(main.scene.position);
		// main.camera.position.z = 1000;
	}

	main.clearAll 		= function()
	{
		var obj;

		for ( var i = main.scene.children.length - 1; i >= 0 ; i -- )
		{
			obj = main.scene.children[ i ];

			obj = null;
			delete obj;
		}

		delete main.scene;
		delete main.container;
		delete main.scene;
		delete main.camera;
		delete main.renderer;
		delete main.controls;

		window.cancelAnimationFrame(main.animID);
		main.stopAnim = 1;
       	main.animID = undefined;
	}

	main.initRenderer 	= function()
	{
		if ( Detector.webgl )
			main.renderer = new THREE.WebGLRenderer( {antialias:true, preserveDrawingBuffer: true} );
		else
			main.renderer = new THREE.CanvasRenderer(); 

		main.renderer.setSize(main.sWidth, main.sHeight);

		main.renderer.gammaInput = true;
		main.renderer.gammaOutput = true;
		main.renderer.shadowMapEnabled = true;
		main.renderer.shadowMapCascade = true;
		main.renderer.shadowMapType = THREE.PCFSoftShadowMap;

		main.container = document.getElementById(main.canvID);
		main.container.appendChild(main.renderer.domElement);
	}

	main.initControls 	= function()
	{
		main.controls 	= new THREE.OrbitControls( main.camera, main.renderer.domElement );
		main.controls.update();
	}

	main.initLights 	= function()
	{
  		var light1 		= new THREE.DirectionalLight( 0xFFFFFF );
  		var light2		= new THREE.DirectionalLight( 0xFFFFFF );

		var hemiLight 	= new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.3 );
		var ambiLight 	= new THREE.AmbientLight( 0x444444 );

        // hemiLight.color.setHSL( 0.58, 0.16, 0.88 );
        hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
        hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
        hemiLight.position.set( 0, main.sWidth / 2, 0 );

		light1.position.set( -320, 450, 50 );
		light1.target.position.copy( main.scene.position );
		light1.castShadow = true;
		light1.shadowDarkness = .8;

		light2.position.set( 320, 450, 150 );
		light2.target.position.copy( main.scene.position );
		light2.castShadow = true;
		light2.shadowDarkness = .8;

		main.scene.add( hemiLight );
		main.scene.add( light1 );
		main.scene.add( light2 );
		// main.scene.add( ambiLight );

		// main.scene.add( new THREE.DirectionalLightHelper(light1, 2.5) );
	}

	main.loadManager	= function()
	{
		main.loader  = new THREE.OBJMTLLoader();
	}

	main.loadObj	= function(info)
	{
		var obj_type 	= info.mode;
		var obj_width	= info.width  * main.unit_inch;
		var obj_length 	= info.length * main.unit_inch;
		var obj_height 	= info.height * main.unit_inch;

		var leg_width 	= 18 * main.unit_inch;
		var leg_length 	= 20 * main.unit_inch;

		main.loader.load( info.obj, info.mtl, function ( object )
		{
			if(obj_type == "top")
			{
				if(main.obj_top)
				{
					main.scene.remove(main.obj_top);
				}

				main.obj_top = object;
				main.top_mtl = info.mtl;
			}
			else
			{
				if(main.obj_reg)
				{
					main.scene.remove(main.obj_reg);
				}

				main.obj_reg = object;
				main.reg_mtl = info.mtl;
			}

			main.scene.add(object);
			main.updateTable();
		});
	}

	main.updateTable 	= function()
	{
		var box  		= null;
		var size 		= null;

		var scale_x 	= 1;
		var scale_y 	= 1;
		var scale_z 	= 1;
		var pos_y 		= -200;

		if(main.obj_top)
		{
			box  		= new THREE.Box3().setFromObject( main.obj_top );
			size 		= box.size();

			scale_x 	= main.obj_top.scale.x;
			scale_y 	= main.obj_top.scale.y;
			scale_z 	= main.obj_top.scale.z;

			main.obj_top.scale.set( 	main.tbl_length * main.unit_inch / size.x * scale_x, 
										2 * main.unit_inch / size.y * scale_y, 
										main.tbl_width  * main.unit_inch / size.z * scale_z );

			main.obj_top.position.set( 	main.tbl_length * main.unit_inch / -2 + 20, 
										main.tbl_height * main.unit_inch + pos_y - 350, 
										main.tbl_width  * main.unit_inch / 2);
		}

		if(main.obj_reg)
		{
			box  		= new THREE.Box3().setFromObject( main.obj_reg );
			size 		= box.size();
			
			scale_x 	= main.obj_reg.scale.x;
			scale_y 	= main.obj_reg.scale.y;
			scale_z 	= main.obj_reg.scale.z;

			main.obj_reg.scale.set(		10, 
										main.tbl_height * main.unit_inch / size.y * scale_y, 
										main.tbl_width  * main.unit_inch / size.z * scale_z );

			main.obj_reg.position.set( 	main.tbl_length * main.unit_inch / -2, 
										pos_y, 
										main.tbl_width  * main.unit_inch / 2);

			main.obj_reg.children[0].position.x = main.tbl_left;
			main.obj_reg.children[1].position.x = (main.tbl_length - 32) * main.unit_inch / 10 - 48 - main.tbl_right;
		}

		main.pareObj.calcPrice();
	}
}
