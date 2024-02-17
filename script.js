document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let offsetX, offsetY;

    // Function to initiate stone dragging
    const handleMouseDown = (event) => {
        let target = event.target;
        if (target.classList.contains('stone')) {
            selectedStone = target;
            offsetX = event.clientX - selectedStone.getBoundingClientRect().left;
            offsetY = event.clientY - selectedStone.getBoundingClientRect().top;

            selectedStone.style.zIndex = '1000'; // Ensure the stone is on top while moving
            document.addEventListener('mousemove', handleMouseMove);
        }
    };

    // Function to handle stone movement
    const handleMouseMove = (event) => {
        if (selectedStone) {
            selectedStone.style.left = `${event.clientX - offsetX}px`;
            selectedStone.style.top = `${event.clientY - offsetY}px`;
        }
    };

    // Function to drop the stone and check for smiley formation
    const handleMouseUp = () => {
        if (selectedStone) {
            document.removeEventListener('mousemove', handleMouseMove);
            selectedStone.style.zIndex = '';
            checkSmileyFormation();
            selectedStone = null;
        }
    };

    // Attach event listeners
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('dragstart', (event) => event.preventDefault()); // Prevent default drag behavior

    // Function to check if the stones form a smiley face
    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyes = [], mouth = [];

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const containerRect = container.getBoundingClientRect();

            // Define zones for eyes and mouth based on container dimensions
            const eyeZone = {
                minX: containerRect.left + containerRect.width * 0.25,
                maxX: containerRect.left + containerRect.width * 0.75,
                minY: containerRect.top + containerRect.height * 0.1,
                maxY: containerRect.top + containerRect.height * 0.3
            };

            const mouthZone = {
                minX: containerRect.left + containerRect.width * 0.25,
                maxX: containerRect.left + containerRect.width * 0.75,
                minY: containerRect.top + containerRect.height * 0.6,
                maxY: containerRect.bottom - containerRect.height * 0.1
            };

            // Check if the stone's center is within the eye or mouth zone
            if (centerX >= eyeZone.minX && centerX <= eyeZone.maxX && centerY >= eyeZone.minY && centerY <= eyeZone.maxY) {
                eyes.push(stone);
            } else if (centerX >= mouthZone.minX && centerX <= mouthZone.maxX && centerY >= mouthZone.minY && centerY <= mouthZone.maxY) {
                mouth.push(stone);
            }
        });

        // Conditions for forming a smiley: 2 stones for eyes and 6 for the mouth
        if (eyes.length === 2 && mouth.length === 6) {
            // Further check for horizontal distribution of mouth stones to form a curve
            const mouthStonesXPositions = mouth.map(stone => stone.getBoundingClientRect().left + stone.getBoundingClientRect().width / 2);
            const minX = Math.min(...mouthStonesXPositions);
            const maxX = Math.max(...mouthStonesXPositions);
            
            // Ensuring the mouth stones span a significant width of the container to form a curve
            if (maxX - minX > containerRect.width * 0.5) {
                showPopup();
            }
        }
    }


    function showPopup() {
        const popup = document.getElementById('popup');
        // Update the popup content with the specific message and link
        popup.innerHTML = `
            <p>Congratulations! You've made a smiley! 🎉</p>
            <p>To continue your adventure, click <a href="http://tinyurl.com/yuxss95p" target="_blank">this link</a>.</p>
        `;
        popup.classList.remove('hidden');
    }

    container.addEventListener('dragstart', (event) => event.preventDefault()); // Prevent the default drag behavior
});
