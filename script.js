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

    function showPopup() {
        const popup = document.getElementById('popup');
        // Set the popup content with the message and link
        popup.innerHTML = `
            <p>Congratulations! You've made a smiley! 🎉</p>
            <p>To continue your adventure, click <a href="http://tinyurl.com/yuxss95p" target="_blank">this link</a>.</p>
        `;
        popup.classList.remove('hidden'); // Show the popup
    }

    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyesCount = 0;
        let mouthCount = 0;

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneCenterY = rect.top + rect.height / 2 - containerRect.top;

            if (stoneCenterY < container.offsetHeight * 0.3) {
                eyesCount += 1; // Stone is in the eye zone
            } else if (stoneCenterY > container.offsetHeight * 0.6) {
                mouthCount += 1; // Stone is in the mouth zone
            }
        });

        // Check for smiley formation and show popup if conditions are met
        if (eyesCount === 2 && mouthCount >= 4) {
            showPopup();
        }
    }

    container.addEventListener('dragstart', (event) => {
        event.preventDefault(); // Prevent the default drag behavior
    });
});
