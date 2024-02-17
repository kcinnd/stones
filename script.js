// script.js

document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    let selectedStone = null;

    stones.forEach(stone => {
        stone.addEventListener('mousedown', (e) => {
            selectedStone = stone;
            stone.style.cursor = 'grabbing';
        });

        stone.addEventListener('mouseup', () => {
            stone.style.cursor = 'grab';
            selectedStone = null;
            checkSmileyFormation();
        });

        stone.addEventListener('mousemove', (e) => {
            if (selectedStone) {
                selectedStone.style.left = `${e.clientX - selectedStone.offsetWidth / 2}px`;
                selectedStone.style.top = `${e.clientY - selectedStone.offsetHeight / 2}px`;
            }
        });
    });

    function checkSmileyFormation() {
        // Placeholder for smiley face detection logic
        // You need to define the conditions for a smiley formation based on the stones' positions
        const isSmiley = true; // Replace this with actual logic

        if (isSmiley) {
            document.getElementById('popup').classList.remove('hidden');
        }
    }
});
