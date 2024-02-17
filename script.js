document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let offsetX, offsetY;

    container.addEventListener('mousedown', function(event) {
        if (event.target.classList.contains('stone')) {
            selectedStone = event.target;
            offsetX = event.clientX - selectedStone.getBoundingClientRect().left;
            offsetY = event.clientY - selectedStone.getBoundingClientRect().top;
            selectedStone.style.position = 'absolute';
            selectedStone.style.zIndex = '1000';
            document.body.appendChild(selectedStone); // Move stone to the body to ensure it's on top
        }
    });

    document.addEventListener('mousemove', function(event) {
        if (selectedStone) {
            selectedStone.style.left = `${event.clientX - offsetX}px`;
            selectedStone.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (selectedStone) {
            selectedStone.style.zIndex = '';
            checkSmileyFormation();
            selectedStone = null;
        }
    });

    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyes = [], mouth = [];

        stones.forEach(stone => {
            const { left, top, width, height } = stone.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const containerRect = container.getBoundingClientRect();

            // Define zones for eyes and mouth based on container dimensions
            const eyeZone = {
                minX: containerRect.left + containerRect.width * 0.25,
                maxX: containerRect.left + containerRect.width * 0.75,
                minY: containerRect.top,
                maxY: containerRect.top + containerRect.height * 0.3
            };

            const mouthZone = {
                minX: containerRect.left + containerRect.width * 0.25,
                maxX: containerRect.left + containerRect.width * 0.75,
                minY: containerRect.top + containerRect.height * 0.7,
                maxY: containerRect.bottom
            };

            // Check if the stone's center is within the eye zone
            if (centerX >= eyeZone.minX && centerX <= eyeZone.maxX && centerY >= eyeZone.minY && centerY <= eyeZone.maxY) {
                eyes.push(stone);
            }
            // Check if the stone's center is within the mouth zone
            else if (centerX >= mouthZone.minX && centerX <= mouthZone.maxX && centerY >= mouthZone.minY && centerY <= mouthZone.maxY) {
                mouth.push(stone);
            }
        });

        // Conditions for forming a smiley: 2 stones for eyes and at least 4 for the mouth, with a slight curve
        if (eyes.length === 2 && mouth.length >= 4) {
            // Additional logic to check for a slight curve in the mouth stones
            const mouthStonesX = mouth.map(stone => stone.getBoundingClientRect().left + stone.getBoundingClientRect().width / 2);
            const minX = Math.min(...mouthStonesX);
            const maxX = Math.max(...mouthStonesX);
            // Check if the mouth stones are spread out horizontally to form a curve
            if (maxX - minX > containerRect.width * 0.3) {
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
