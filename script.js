document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    const container = document.getElementById('container');
    let selectedStone = null;
    let shiftX, shiftY;

    stones.forEach(stone => {
        stone.addEventListener('mousedown', (event) => {
            selectedStone = stone;

            // Calculate the shift between the mouse and the stone's top-left corner
            const rect = selectedStone.getBoundingClientRect();
            shiftX = event.clientX - rect.left;
            shiftY = event.clientY - rect.top;

            selectedStone.style.position = 'absolute';
            selectedStone.style.zIndex = 1000;
            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                selectedStone.style.left = pageX - shiftX - container.getBoundingClientRect().left + 'px';
                selectedStone.style.top = pageY - shiftY - container.getBoundingClientRect().top + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            selectedStone.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                selectedStone = null;
            });
        });

        // Prevent dragging ghost image
        stone.ondragstart = () => false;
    });
});
