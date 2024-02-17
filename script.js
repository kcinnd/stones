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
            selectedStone.style.zIndex = '1000';
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
            selectedStone.style.zIndex = '';
            selectedStone = null;
            checkSmileyFormation();
        }
    });

    container.addEventListener('dragstart', (event) => event.preventDefault());

    function showPopup() {
        const popup = document.getElementById('popup');
        popup.innerHTML = `
            <p>Congratulations! You've made a smiley! 🎉</p>
            <p>To continue your adventure, click <a href="http://tinyurl.com/yuxss95p" target="_blank">this link</a>.</p>
        `;
        popup.classList.remove('hidden');
        console.log('Popup should be visible now'); // Debugging log
    }

    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyesCount = 0, mouthCount = 0;

        stones.forEach(stone => {
            const bounds = stone.getBoundingClientRect();
            const posY = bounds.top - container.getBoundingClientRect().top + bounds.height / 2; // Y position of stone's center
            const posX = bounds.left - container.getBoundingClientRect().left + bounds.width / 2; // X position of stone's center

            // Adjust these conditions to match your specific smiley layout
            if (posY < container.offsetHeight * 0.3) eyesCount++; // Eye zone
            else if (posY > container.offsetHeight * 0.6) mouthCount++; // Mouth zone
        });

        console.log(`Eyes: ${eyesCount}, Mouth: ${mouthCount}`); // Debugging log

        if (eyesCount === 2 && mouthCount >= 4) showPopup();
    }
});
