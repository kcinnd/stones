// script.js

document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    const container = document.getElementById('container');
    let selectedStone = null;

    // Position stones in a cluster when the page loads
    positionStonesInCluster();

    stones.forEach(stone => {
        stone.addEventListener('mousedown', (e) => {
            selectedStone = stone;
            stone.style.cursor = 'grabbing';
            stone.style.zIndex = 1000; // Bring the stone to the top
        });

        document.addEventListener('mousemove', (e) => {
            if (selectedStone) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left - selectedStone.offsetWidth / 2;
                const y = e.clientY - rect.top - selectedStone.offsetHeight / 2;
                selectedStone.style.left = `${x}px`;
                selectedStone.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (selectedStone) {
                selectedStone.style.cursor = 'grab';
                selectedStone.style.zIndex = 'auto'; // Reset the z-index
                selectedStone = null;
                checkSmileyFormation();
            }
        });
    });

    function positionStonesInCluster() {
        // Cluster positioning logic remains the same
        // ...
    }

    function checkSmileyFormation() {
        const eyeZoneYTop = container.offsetHeight * 0.25;
        const eyeZoneYBottom = container.offsetHeight * 0.35;
        const mouthZoneYTop = container.offsetHeight * 0.65;
        const mouthZoneYBottom = container.offsetHeight * 0.75;
        let eyesCount = 0;
        let mouthCount = 0;

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneY = rect.top - containerRect.top + (rect.height / 2);

            if (stoneY >= eyeZoneYTop && stoneY <= eyeZoneYBottom) {
                eyesCount++; // Stone is within the eye zone
            } else if (stoneY >= mouthZoneYTop && stoneY <= mouthZoneYBottom) {
                mouthCount++; // Stone is within the mouth zone
            }
        });

        // Ensure exactly 2 stones are in the eyes zone and 6 stones are in the mouth zone
        if (eyesCount === 2 && mouthCount === 6) {
            showPopup();
        }
    }

    function showPopup() {
        const popup = document.getElementById('popup');
        if (popup.classList.contains('hidden')) {
            popup.classList.remove('hidden');
        }
    }
});
