<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stones</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="dropArea" class="drop-area">
        <div class="face">
            <div id="left-eye" class="placeholder eye"></div>
            <div id="right-eye" class="placeholder eye"></div>
            <div class="mouth">
                <div id="left-mouth" class="placeholder mouth"></div>
                <div id="middle-mouth" class="placeholder mouth"></div>
                <div id="right-mouth" class="placeholder mouth"></div>
            </div>
        </div>
    </div>
    <div class="stones">
        <!-- Draggable stones -->
        <div class="stone" draggable="true" id="stone1"></div>
        <div class="stone" draggable="true" id="stone2"></div>
        <div class="stone" draggable="true" id="stone3"></div>
        <div class="stone" draggable="true" id="stone4"></div>
        <div class="stone" draggable="true" id="stone5"></div>
        <div class="stone" draggable="true" id="stone6"></div>
        <div class="stone" draggable="true" id="stone7"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
