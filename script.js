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
            document.body.appendChild(selectedStone);
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
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneCenterX = rect.left + rect.width / 2 - containerRect.left;
            const stoneCenterY = rect.top + rect.height / 2 - containerRect.top;

            const eyeZoneXMin = containerRect.width * 0.3;
            const eyeZoneXMax = containerRect.width * 0.7;
            const eyeZoneYMin = containerRect.height * 0.1;
            const eyeZoneYMax = containerRect.height * 0.3;
            const mouthZoneYMin = containerRect.height * 0.6;
            const mouthZoneYMax = containerRect.height * 0.8;

            if (stoneCenterX >= eyeZoneXMin && stoneCenterX <= eyeZoneXMax && stoneCenterY >= eyeZoneYMin && stoneCenterY <= eyeZoneYMax) {
                eyes.push(stone);
            } else if (stoneCenterY >= mouthZoneYMin && stoneCenterY <= mouthZoneYMax) {
                mouth.push(stone);
            }
        });

        // Check for at least 2 stones for eyes and exactly 6 for the mouth
        if (eyes.length === 2 && mouth.length === 6) {
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
