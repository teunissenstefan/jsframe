<!doctype html>
<html>
<head>
    <title>JSframe</title>
    <link rel="stylesheet" 
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" 
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/jsframe.css">
</head>
<body>
    <div class="container">
        <div class="row mt-2">
            <div class="custom-file col-6">
                <input type="file" class="custom-file-input" id="imgfile">
                <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
            <div class="col-6">
                <input type='button' id='btnLoad' class="btn btn-success" value='Download result' onclick='SaveImage();' />
            </div>
        </div>
        <div class="row text-center frames-list mt-2">
            <?php
            $elementList = "";
            foreach(scandir("frames") as $frame){
                if(substr($frame, -strlen(".png"))===".png"){
                    $frameElement = "<div class='frame col-2'>";
                    $frameElement .= "<img class='img-fluid frameImage' src='/frames/".$frame."'/>";
                    $frameElement .= "</div>";
                    $elementList .= $frameElement;
                }
            }
            echo $elementList;
            ?>
        </div>
        <canvas id="canvas" class="mt-2"></canvas>
        <a id="link"></a>
    </div>

    <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" 
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" 
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/jsframe.js"></script>
</body>
</html>