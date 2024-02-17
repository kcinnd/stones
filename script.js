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
            container.appendChild(selectedStone);
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
        let eyeCandidates = [], mouthCandidates = [];

        stones.forEach(stone => {
            const { left, top, width, height } = stone.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Define zones for eyes and mouth based on container dimensions
            const eyeZone = {
                minX: container.offsetLeft + container.offsetWidth * 0.25,
                maxX: container.offsetLeft + container.offsetWidth * 0.75,
                minY: container.offsetTop + container.offsetHeight * 0.2,
                maxY: container.offsetTop + container.offsetHeight * 0.4
            };
            const mouthZone = {
                minX: container.offsetLeft + container.offsetWidth * 0.25,
                maxX: container.offsetLeft + container.offsetWidth * 0.75,
                minY: container.offsetTop + container.offsetHeight * 0.6,
                maxY: container.offsetTop + container.offsetHeight * 0.8
            };

            // Check if the stone's center is within the eye zone
            if (centerX >= eyeZone.minX && centerX <= eyeZone.maxX && centerY >= eyeZone.minY && centerY <= eyeZone.maxY) {
                eyeCandidates.push(stone);
            }
            // Check if the stone's center is within the mouth zone
            else if (centerX >= mouthZone.minX && centerX <= mouthZone.maxX && centerY >= mouthZone.minY && centerY <= mouthZone.maxY) {
                mouthCandidates.push(stone);
            }
        });

        // Conditions for forming a smiley: 2 stones for eyes, 6 for mouth
        if (eyeCandidates.length === 2 && mouthCandidates.length === 6) {
            showPopup();
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
