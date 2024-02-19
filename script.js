document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.querySelector('#playArea');

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('mousedown', function(event) {
            // Prevents the default drag behavior
            event.preventDefault();

            let shiftX = event.clientX - item.getBoundingClientRect().left;
            let shiftY = event.clientY - item.getBoundingClientRect().top;

            // Function to move the stone at the mouse location minus the initial shift
            function moveAt(pageX, pageY) {
                item.style.left = pageX - shiftX - playArea.offsetLeft + 'px';
                item.style.top = pageY - shiftY - playArea.offsetTop + 'px';
            }

            // Move the stone under the pointer
            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // Move the stone on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // Drop the stone, remove unnecessary handlers
            item.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                item.onmouseup = null;
                verifyArrangement();
            };
        });

        item.ondragstart = function() {
            return false;
        };
    });
});

function verifyArrangement() {
    // Verification logic as previously defined
}
