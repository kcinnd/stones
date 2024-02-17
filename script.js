document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    let selectedStone = null;

    stones.forEach(stone => {
        stone.onmousedown = (event) => {
            selectedStone = stone;
            selectedStone.style.zIndex = 100; // Bring stone to front

            // Move stone to mouse position, accounting for offset
            function moveAt(pageX, pageY) {
                selectedStone.style.left = pageX - selectedStone.offsetWidth / 2 + 'px';
                selectedStone.style.top = pageY - selectedStone.offsetHeight / 2 + 'px';
            }

            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // Move the stone on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // Drop the stone, remove unneeded handlers
            selectedStone.onmouseup = () => {
                document.removeEventListener('mousemove', onMouseMove);
                selectedStone.onmouseup = null;
                selectedStone = null;
            };
        };

        // Prevent drag and drop default action
        stone.ondragstart = () => false;
    });
});
