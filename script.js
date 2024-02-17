document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let offsetX, offsetY;

    container.addEventListener('mousedown', function(event) {
        let target = event.target;
        if (target.classList.contains('stone')) {
            selectedStone = target;
            offsetX = event.clientX - target.getBoundingClientRect().left;
            offsetY = event.clientY - target.getBoundingClientRect().top;
            selectedStone.style.zIndex = '1000'; // Bring the selected stone to the front
        }
    });

    container.addEventListener('mousemove', function(event) {
        if (selectedStone) {
            selectedStone.style.left = `${event.clientX - container.offsetLeft - offsetX}px`;
            selectedStone.style.top = `${event.clientY - container.offsetTop - offsetY}px`;
        }
    });

    container.addEventListener('mouseup', function() {
        if (selectedStone) {
            selectedStone.style.zIndex = ''; // Reset the z-index
            selectedStone = null; // Release the stone
            checkSmileyFormation(); // Check for a smiley formation after a stone is released
        }
    });

    container.addEventListener('dragstart', (event) => event.preventDefault()); // Prevent the default drag behavior

    // Function to show the popup with a detailed message and link
    function showPopup() {
        const popup = document.getElementById('popup');
        popup.innerHTML = `
            <p>Congratulations! You've made a smiley! 🎉</p>
            <p>To continue your adventure, click <a href="http://tinyurl.com/yuxss95p" target="_blank">here</a>.</p>
        `;
        popup.classList.remove('hidden'); // Make the popup visible
    }

    // Function to check if the stones form a smiley face
    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        const eyeZoneTop = container.offsetHeight * 0.1; // Define the top boundary for the eye zone
        const eyeZoneBottom = container.offsetHeight * 0.3; // Define the bottom boundary for the eye zone
        const mouthZoneTop = container.offsetHeight * 0.6; // Define the top boundary for the mouth zone
        const mouthZoneBottom = container.offsetHeight * 0.9; // Define the bottom boundary for the mouth zone

        let eyesCount = 0;
        let mouthCount = 0;

        stones.forEach(stone => {
            const stoneRect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneTop = stoneRect.top - containerRect.top;

            // Count stones in the eye zone
            if (stoneTop >= eyeZoneTop && stoneTop <= eyeZoneBottom) {
                eyesCount++;
            }
            // Count stones in the mouth zone
            if (stoneTop >= mouthZoneTop && stoneTop <= mouthZoneBottom) {
                mouthCount++;
            }
        });

        // Check if the stones form a smiley face
        if (eyesCount === 2 && mouthCount >= 4) {
            showPopup(); // Show the popup with the message and link
        }
    }
});
