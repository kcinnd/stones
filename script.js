document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let shiftX, shiftY;

    container.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('stone')) {
            selectedStone = event.target;

            // Calculate the offset from the mouse to the stone's top-left corner
            const rect = selectedStone.getBoundingClientRect();
            shiftX = event.clientX - rect.left;
            shiftY = event.clientY - rect.top;

            selectedStone.style.position = 'absolute';
            selectedStone.style.zIndex = 1000;
            container.appendChild(selectedStone); // Move to container to ensure it's on top
            moveAt(event.pageX, event.pageY);
        }
    });

    function moveAt(pageX, pageY) {
        if (selectedStone) {
            selectedStone.style.left = pageX - shiftX - container.getBoundingClientRect().left + 'px';
            selectedStone.style.top = pageY - shiftY - container.getBoundingClientRect().top + 'px';
        }
    }

    document.addEventListener('mousemove', (event) => {
        moveAt(event.pageX, event.pageY);
    });

    container.addEventListener('mouseup', () => {
        selectedStone = null; // Release the stone
    });

    function onMouseUp(event) {
        if (selectedStone) {
            selectedStone.style.zIndex = ''; // Reset z-index
            selectedStone = null; // Drop the stone
            document.removeEventListener('mousemove', onMouseUp);
        }
    }

    document.addEventListener('mouseup', onMouseUp);

    // Prevent default drag-and-drop behavior to avoid interference
    container.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
});
