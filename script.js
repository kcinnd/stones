// script.js

document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    const container = document.getElementById('container');
    let selectedStone = null;

    stones.forEach(stone => {
        stone.addEventListener('mousedown', (e) => {
            selectedStone = stone;
            stone.style.cursor = 'grabbing';
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
                selectedStone = null;
                checkSmileyFormation();
            }
        });
    });

    function checkSmileyFormation() {
        const eyeZoneY = container.offsetHeight * 0.3; // Y coordinate for eyes' zone
        const mouthZoneY = container.offsetHeight * 0.6; // Y coordinate for mouth's zone
        let eyesCount = 0;
        let mouthCount = 0;

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneCenterY = rect.top + rect.height / 2 - containerRect.top;

            if (stoneCenterY < eyeZoneY) {
                eyesCount += 1; // Stone is in the eye zone
            } else if (stoneCenterY > mouthZoneY) {
                mouthCount += 1; // Stone is in the mouth zone
            }
        });

        // Check if there are 2 stones in the eyes zone and 6 in the mouth zone
        if (eyesCount === 2 && mouthCount === 6) {
            document.getElementById('popup').classList.remove('hidden');
        }
    }
});
