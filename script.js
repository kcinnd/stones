document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    let selectedStone = null;
    let offsetX, offsetY;

    container.addEventListener('mousedown', function(event) {
        if (event.target.classList.contains('stone')) {
            selectedStone = event.target;
            offsetX = event.clientX - selectedStone.getBoundingClientRect().left;
            offsetY = event.clientY - selectedStone.getBoundingClientRect().top;
            selectedStone.style.zIndex = '1000';
        }
    });

    document.addEventListener('mousemove', function(event) {
        if (selectedStone) {
            selectedStone.style.left = `${event.clientX - offsetX}px`;
            selectedStone.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (selectedStone) {
            selectedStone.style.zIndex = '';
            checkSmileyFormation();
            selectedStone = null;
        }
    });

    function checkSmileyFormation() {
        const stones = document.querySelectorAll('.stone');
        let eyeCount = 0, mouthCount = 0;

        stones.forEach(stone => {
            const { top } = stone.getBoundingClientRect();
            const centerY = top - container.offsetTop + stone.offsetHeight / 2;

            // Simplify the criteria for eyes and mouth based on vertical position
            if (centerY < container.offsetHeight / 3) eyeCount++;
            else if (centerY > container.offsetHeight * 2 / 3) mouthCount++;

            console.log(`Stone ID: ${stone.id}, centerY: ${centerY}, Eye Count: ${eyeCount}, Mouth Count: ${mouthCount}`); // Debugging
        });

        if (eyeCount === 2 && mouthCount === 6) {
            showPopup();
        } else {
            console.log('Smiley not formed'); // Debugging
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
