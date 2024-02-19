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

        // Determine if the stone is within the eye zone
        if (centerY < guideRect.top + guideRect.height * 0.5 && centerY > guideRect.top + guideRect.height * 0.2) {
            eyesCandidates.push({ x: centerX, y: centerY });
        }
        // Determine if the stone is within the smile zone
        else if (centerY >= guideRect.top + guideRect.height * 0.5) {
            smileCandidates.push({ x: centerX, y: centerY });
        }
    });

    // Verify eye positions
    const eyesAligned = eyesCandidates.length === 2 && 
                        Math.abs(eyesCandidates[0].y - eyesCandidates[1].y) < 10; // Ensure eyes are horizontally aligned
    
    const guideCenterX = guideRect.left + guideRect.width / 2;
    const eyesSymmetric = eyesCandidates.length === 2 && 
                          Math.abs((eyesCandidates[0].x - guideCenterX) + (eyesCandidates[1].x - guideCenterX)) < 20; // Check symmetry around the center

    // Verify that there are exactly 5 smile candidates
    const smileValid = smileCandidates.length === 5;

    if (eyesAligned && eyesSymmetric && smileValid) {
        alert('Great! Now click on the link to continue your adventure.');
        window.location.href = 'http://tinyurl.com/yuxss95p';
    }
}
