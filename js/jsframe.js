var canvas = document.getElementById( 'canvas' ),
	context = canvas.getContext( '2d' );
var selectedImage = new Image();
var frameImage = new Image();

( function ()
{
	$( ".frameImage" ).click( function ()
	{
		frameImage.src = $( this ).attr( 'src' );
		draw();
	} );
	$( '#imgfile' ).change( function ()
	{
		loadImage();
	} );

	canvas.width = 500;
	canvas.height = 500;

} )();

function draw()
{
	context.clearRect( 0, 0, canvas.width, canvas.height );
	drawImageProp( context, selectedImage );
	drawImageProp( context, frameImage );
}

function SaveImage()
{
	var link = document.getElementById( 'link' );
	link.setAttribute( 'download', 'image.png' );
	link.setAttribute( 'href', canvas.toDataURL( "image/png" ).replace( "image/png", "image/octet-stream" ) );
	link.click();
}

function loadImage()
{
	var input, file, fr, img;

	input = document.getElementById( 'imgfile' );
	if ( input )
	{
		file = input.files[ 0 ];
		fr = new FileReader();
		fr.onload = createImage;
		fr.readAsDataURL( file );
	}

	function createImage()
	{
		img = new Image();
		img.onload = imageLoaded;
		img.src = fr.result;
	}

	function imageLoaded()
	{
		selectedImage.src = img.src;
		draw();
	}
}

function drawImageProp( ctx, img, x, y, w, h, offsetX, offsetY )
{

	if ( arguments.length === 2 )
	{
		x = y = 0;
		w = ctx.canvas.width;
		h = ctx.canvas.height;
	}

	offsetX = typeof offsetX === "number" ? offsetX : 0.5;
	offsetY = typeof offsetY === "number" ? offsetY : 0.5;

	if ( offsetX < 0 ) offsetX = 0;
	if ( offsetY < 0 ) offsetY = 0;
	if ( offsetX > 1 ) offsetX = 1;
	if ( offsetY > 1 ) offsetY = 1;

	var iw = img.width,
		ih = img.height,
		r = Math.min( w / iw, h / ih ),
		nw = iw * r, 
		nh = ih * r, 
		cx, cy, cw, ch, ar = 1;
  
	if ( nw < w ) ar = w / nw;
	if ( Math.abs( ar - 1 ) < 1e-14 && nh < h ) ar = h / nh;
	nw *= ar;
	nh *= ar;

	cw = iw / ( nw / w );
	ch = ih / ( nh / h );

	cx = ( iw - cw ) * offsetX;
	cy = ( ih - ch ) * offsetY;

	if ( cx < 0 ) cx = 0;
	if ( cy < 0 ) cy = 0;
	if ( cw > iw ) cw = iw;
	if ( ch > ih ) ch = ih;

	ctx.drawImage( img, cx, cy, cw, ch, x, y, w, h );
}