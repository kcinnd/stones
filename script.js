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

            if (centerX >= eyeZone.minX && centerX <= eyeZone.maxX && centerY >= eyeZone.minY && centerY <= eyeZone.maxY) {
                eyes.push(stone);
            } else if (centerX >= mouthZone.minX && centerX <= mouthZone.maxX && centerY >= mouthZone.minY && centerY <= mouthZone.maxY) {
                mouth.push(stone);
            }
        });

        if (eyes.length === 2 && mouth.length === 6) {
            const mouthStonesXPositions = mouth.map(stone => stone.getBoundingClientRect().left + stone.getBoundingClientRect().width / 2);
            const minX = Math.min(...mouthStonesXPositions);
            const maxX = Math.max(...mouthStonesXPositions);

            if (maxX - minX > containerRect.width * 0.5) { // Check for a slight curve in the mouth
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
