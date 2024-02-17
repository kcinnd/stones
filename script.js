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
        const eyeCandidates = [];
        const mouthCandidates = [];

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const centerY = rect.top - container.offsetTop + rect.height / 2;

            // Simplified criteria: Eyes are in the top third, mouth in the bottom third
            if (centerY < container.offsetHeight / 3) eyeCandidates.push(stone);
            else if (centerY > container.offsetHeight * 2 / 3) mouthCandidates.push(stone);
        });

        // Basic smiley detection: 2 stones for eyes, 6 for the mouth
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
