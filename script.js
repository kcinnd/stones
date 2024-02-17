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
            moveAt(event.pageX, event.pageY);
            document.addEventListener('mousemove', onMouseMove);
        }
    });

    function moveAt(pageX, pageY) {
        selectedStone.style.left = pageX - offsetX + 'px';
        selectedStone.style.top = pageY - offsetY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mouseup', function() {
        if (selectedStone) {
            document.removeEventListener('mousemove', onMouseMove);
            selectedStone.style.zIndex = '';
            checkSmileyFormation();
            selectedStone = null;
        }
    });

    container.addEventListener('dragstart', (event) => event.preventDefault());

    function showPopup() {
        const popup = document.getElementById('popup');
        // Set the popup content with the message and link
        popup.innerHTML = `
            <p>Congratulations! You've made a smiley! 🎉</p>
            <p>Ton continue your adventure, click <a href="http://tinyurl.com/yuxss95p" target="_blank">this link</a>.</p>
        `;
        popup.classList.remove('hidden'); // Make sure this matches your CSS for showing the popup
    }

    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyesCount = 0, mouthCount = 0;

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneY = rect.top - containerRect.top + rect.height / 2; // Y position of stone's center

            const eyeZoneTop = containerRect.height * 0.2;
            const eyeZoneBottom = containerRect.height * 0.4;
            const mouthZoneTop = containerRect.height * 0.6;
            const mouthZoneBottom = containerRect.height * 0.8;

            if (stoneY >= eyeZoneTop && stoneY <= eyeZoneBottom) {
                eyesCount++;
            } else if (stoneY >= mouthZoneTop && stoneY <= mouthZoneBottom) {
                mouthCount++;
            }
        });

        if (eyesCount === 2 && mouthCount >= 4) {
            showPopup();
        }
    }
});
