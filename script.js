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
    let eyes = [], mouth = [];

    stones.forEach(stone => {
        const { top, left, width } = stone.getBoundingClientRect();
        const centerX = left + width / 2;
        const containerRect = container.getBoundingClientRect();

        // Simple criteria for eye and mouth positions
        const isEye = top < containerRect.height * 0.4; // Eye stones are in the upper 40% of the container
        const isMouth = top > containerRect.height * 0.6; // Mouth stones are in the lower 40% of the container

        if (isEye) eyes.push(centerX); // Store centerX for sorting
        else if (isMouth) mouth.push(stone);
    });

    // Check for 2 eyes and 6 mouth stones
    if (eyes.length === 2 && mouth.length === 6) {
        // Sort eyes and mouth stones by their horizontal positions
        eyes.sort((a, b) => a - b);
        const mouthStonesSortedByX = mouth.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

        // Check for basic horizontal distribution in mouth stones to suggest a curve
        const leftMostMouthStone = mouthStonesSortedByX[0].getBoundingClientRect().left;
        const rightMostMouthStone = mouthStonesSortedByX[mouthStonesSortedByX.length - 1].getBoundingClientRect().left;

        // Ensure the mouth stones span a reasonable width and the eyes are spaced apart
        if (rightMostMouthStone - leftMostMouthStone > containerRect.width * 0.3 && eyes[1] - eyes[0] > containerRect.width * 0.1) {
            showPopup(); // Show the popup if a smiley face is detected
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
