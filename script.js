document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let offsetX, offsetY;

    container.addEventListener('mousedown', function(event) {
        if (event.target.classList.contains('stone')) {
            selectedStone = event.target;
            const rect = selectedStone.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;

            selectedStone.style.zIndex = '1000'; // Ensure the stone is on top while moving
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp, { once: true });
        }
    });

    function handleMouseMove(event) {
        if (selectedStone) {
            selectedStone.style.left = `${event.clientX - container.offsetLeft - offsetX}px`;
            selectedStone.style.top = `${event.clientY - container.offsetTop - offsetY}px`;
        }
    }

    function handleMouseUp() {
        if (selectedStone) {
            document.removeEventListener('mousemove', handleMouseMove);
            selectedStone.style.zIndex = '';
            checkSmileyFormation();
            selectedStone = null;
        }
    }

   function checkSmileyFormation() {
    const stones = document.querySelectorAll('.stone');
    let eyes = [], mouth = [];

    stones.forEach(stone => {
        const { left, top, width, height } = stone.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const containerRect = container.getBoundingClientRect();

        // Adjust these zones based on your container's dimensions
        const eyeZone = {
            minX: containerRect.left + containerRect.width * 0.3,
            maxX: containerRect.left + containerRect.width * 0.7,
            minY: containerRect.top + containerRect.height * 0.2,
            maxY: containerRect.top + containerRect.height * 0.4
        };

        const mouthZone = {
            minX: containerRect.left + containerRect.width * 0.2,
            maxX: containerRect.left + containerRect.width * 0.8,
            minY: containerRect.top + containerRect.height * 0.6,
            maxY: containerRect.top + containerRect.height * 0.8
        };

        // Check for eye stones
        if (centerX >= eyeZone.minX && centerX <= eyeZone.maxX && centerY >= eyeZone.minY && centerY <= eyeZone.maxY) {
            eyes.push(stone);
        }
        // Check for mouth stones
        else if (centerY >= mouthZone.minY && centerY <= mouthZone.maxY) {
            mouth.push(stone);
        }
    });

    // Ensure there are exactly 2 eyes and 6 mouth stones
    if (eyes.length === 2 && mouth.length === 6) {
        // Additional check to ensure the mouth forms a slight curve
        const mouthStoneXPositions = mouth.map(stone => stone.getBoundingClientRect().left + stone.getBoundingClientRect().width / 2);
        mouthStoneXPositions.sort((a, b) => a - b); // Sort X positions to check for a curve

        // Check for a gradual increase then decrease to form a curve
        let isCurved = true;
        for (let i = 1; i < mouthStoneXPositions.length - 1; i++) {
            if (mouthStoneXPositions[i] <= mouthStoneXPositions[i - 1] || mouthStoneXPositions[i] <= mouthStoneXPositions[i + 1]) {
                isCurved = false;
                break;
            }
        }

        if (isCurved) {
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
