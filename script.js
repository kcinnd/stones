document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let offsetX, offsetY;

    container.addEventListener('mousedown', function(event) {
        if (event.target.classList.contains('stone')) {
            selectedStone = event.target;
            offsetX = event.clientX - selectedStone.getBoundingClientRect().left;
            offsetY = event.clientY - selectedStone.getBoundingClientRect().top;
            selectedStone.style.zIndex = '1000'; // Ensure the stone moves with the mouse
        }
    });

    document.addEventListener('mousemove', function(event) {
        if (selectedStone) {
            // Adjust the stone's position considering the offset
            selectedStone.style.left = `${event.clientX - offsetX}px`;
            selectedStone.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (selectedStone) {
            selectedStone.style.zIndex = '';
            checkSmileyFormation(); // Check if the stones form a smiley face
            selectedStone = null;
        }
    });

    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyesCount = 0, mouthCount = 0;

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneCenterY = rect.top + rect.height / 2 - containerRect.top;

            // Adjust these thresholds based on your container's size and the desired smiley layout
            if (stoneCenterY < containerRect.height * 0.3) eyesCount++;
            else if (stoneCenterY > containerRect.height * 0.6) mouthCount++;
        });

        // Trigger the popup when there are 2 stones for eyes and 6 for the mouth
        if (eyesCount === 2 && mouthCount === 6) {
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
