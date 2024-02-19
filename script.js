document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.querySelector('#playArea');

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('mousedown', function(event) {
            // Prevents the default drag behavior
            event.preventDefault();

            let shiftX = event.clientX - item.getBoundingClientRect().left;
            let shiftY = event.clientY - item.getBoundingClientRect().top;

            // Function to move the stone at the mouse location minus the initial shift
            function moveAt(pageX, pageY) {
                item.style.left = pageX - shiftX - playArea.offsetLeft + 'px';
                item.style.top = pageY - shiftY - playArea.offsetTop + 'px';
            }

            // Move the stone under the pointer
            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // Move the stone on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // Drop the stone, remove unnecessary handlers
            item.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                item.onmouseup = null;
                verifyArrangement();
            };
        });

        item.ondragstart = function() {
            return false;
        };
    });
});

function verifyArrangement() {
    const guideRect = document.querySelector('#smileyGuide').getBoundingClientRect();
    const items = document.querySelectorAll('.item');
    let eyesCandidates = [];
    let smileCandidates = [];

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Check if the stone's center is within the upper half of the guide for eyes
        if (centerY < guideRect.top + guideRect.height * 0.5) {
            eyesCandidates.push({ x: centerX, y: centerY });
        }
        // Check if the stone's center is within the lower half of the guide for the smile
        else if (centerY >= guideRect.top + guideRect.height * 0.5) {
            smileCandidates.push({ x: centerX, y: centerY });
        }
    });

    // Verify that there are at least two eyes candidates in the upper half
    const eyesVerified = eyesCandidates.length >= 2;

    // Verify that there are multiple stones in the lower half to form a smile
    const smileVerified = smileCandidates.length > 2;

    // If both conditions are met, consider it a successful smiley face detection
    if (eyesVerified && smileVerified) {
        alert('Great! Now click on the link to continue your adventure.');
        window.location.href = 'http://tinyurl.com/yuxss95p';
    }
}
