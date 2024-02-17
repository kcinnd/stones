document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let shiftX, shiftY;

    container.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('stone')) {
            selectedStone = event.target;

            // Calculate the shift from the cursor to the stone's center
            shiftX = event.clientX - selectedStone.getBoundingClientRect().left - selectedStone.offsetWidth / 2;
            shiftY = event.clientY - selectedStone.getBoundingClientRect().top - selectedStone.offsetHeight / 2;

            selectedStone.style.position = 'absolute';
            selectedStone.style.zIndex = '1000';
            document.body.appendChild(selectedStone); // Move to the body to ensure it's on top
            moveAt(event.pageX, event.pageY);

            // Listen for mousemove events on the entire document
            document.addEventListener('mousemove', onMouseMove);
        }
    });

    function moveAt(pageX, pageY) {
        if (selectedStone) {
            // Adjust the stone's position considering the shift and container's offset
            selectedStone.style.left = pageX - shiftX - container.offsetLeft + 'px';
            selectedStone.style.top = pageY - shiftY - container.offsetTop + 'px';
        }
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mouseup', () => {
        if (selectedStone) {
            document.removeEventListener('mousemove', onMouseMove); // Stop moving the stone when mouse is released
            selectedStone.style.zIndex = '';
            checkSmileyFormation(); // Check if a smiley face is formed
            selectedStone = null;
        }
    });

    function checkSmileyFormation() {
        // Simplified logic to detect a smiley face formation
        // You will need to adjust this based on your specific requirements
        let eyesDetected = 0;
        let mouthDetected = 0;

        document.querySelectorAll('.stone').forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Example conditions for detecting eyes and mouth based on positions
            if (rect.top < containerRect.top + containerRect.height * 0.3) { // Top third for eyes
                eyesDetected++;
            } else if (rect.top > containerRect.top + containerRect.height * 0.6) { // Bottom third for mouth
                mouthDetected++;
            }
        });

        if (eyesDetected == 2 && mouthDetected == 6) {
            alert('Smiley face formed!'); // Replace this with a more suitable action, like showing a popup
        }
    }

    container.addEventListener('dragstart', (event) => {
        event.preventDefault(); // Prevent default drag behavior for stones
    });
});
