document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let offsetX, offsetY;

    container.addEventListener('mousedown', function(event) {
        if (event.target.classList.contains('stone')) {
            selectedStone = event.target;
            offsetX = event.clientX - selectedStone.getBoundingClientRect().left;
            offsetY = event.clientY - selectedStone.getBoundingClientRect().top;

            // Ensure the stone moves with the mouse by adjusting its position
            selectedStone.style.position = 'absolute';
            selectedStone.style.zIndex = '1000';
        }
    });

    document.addEventListener('mousemove', function(event) {
        if (selectedStone) {
            selectedStone.style.left = `${event.clientX - container.offsetLeft - offsetX}px`;
            selectedStone.style.top = `${event.clientY - container.offsetTop - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (selectedStone) {
            selectedStone.style.zIndex = '';
            checkSmileyFormation(); // Check if a smiley face has been formed
            selectedStone = null; // Release the stone
        }
    });

    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyesCount = 0, mouthCount = 0;

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneCenterY = rect.top + rect.height / 2 - containerRect.top;

            if (stoneCenterY < containerRect.height * 0.3) {
                eyesCount++;
            } else if (stoneCenterY > containerRect.height * 0.6) {
                mouthCount++;
            }
        });

        if (eyesCount === 2 && mouthCount >= 4) {
            showPopup(); // Display the detailed popup when a smiley face is formed
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
