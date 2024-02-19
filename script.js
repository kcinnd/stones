let activeItem = null;

document.querySelectorAll('.item').forEach(item => {
    item.onmousedown = function(event) {
        activeItem = item;
        activeItem.style.zIndex = 1000;

        function moveAt(pageX, pageY) {
            activeItem.style.left = pageX - activeItem.offsetWidth / 2 + 'px';
            activeItem.style.top = pageY - activeItem.offsetHeight / 2 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        item.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            activeItem.style.zIndex = '';
            activeItem = null;
            verifyArrangement();
        };
    };

    item.ondragstart = function() {
        return false;
    };
});

function verifyArrangement() {
    // Simplified check logic
    if ( /* condition to verify arrangement without specifying it's a smiley */ ) {
        alert('Great! Now click on the link to continue your adventure.');
        window.location.href = 'http://tinyurl.com/yuxss95p';
    }
}
