document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('mousedown', function(event) {
            let activeItem = item;
            let shiftX = event.clientX - item.getBoundingClientRect().left;
            let shiftY = event.clientY - item.getBoundingClientRect().top;

            activeItem.style.position = 'absolute';
            activeItem.style.zIndex = 1000;
            document.body.appendChild(activeItem);

            function moveAt(pageX, pageY) {
                activeItem.style.left = pageX - shiftX + 'px';
                activeItem.style.top = pageY - shiftY + 'px';
            }

            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            activeItem.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', onMouseMove);
                activeItem.style.zIndex = '';
                verifyArrangement();
            });
        });

        item.ondragstart = () => false;
    });
});

function verifyArrangement() {
    const guideRect = document.querySelector('#smileyGuide').getBoundingClientRect();
    const items = document.querySelectorAll('.item');
    let eyes = [];
    let smile = [];

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        // Check if the stone's center is within the guide
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (centerX > guideRect.left && centerX < guideRect.right && centerY > guideRect.top && centerY < guideRect.bottom) {
            // Determine if the stone is in the upper part (eye) or lower part (smile)
            if (centerY < guideRect.top + guideRect.height / 3) {
                eyes.push({ left: centerX, top: centerY });
            } else if (centerY > guideRect.top + guideRect.height / 2) { // Lower half for smile
                smile.push({ left: centerX, bottom: centerY });
            }
        }
    });

    // Logic to check if eyes are aligned and smile is curved
    if (eyes.length === 2 && Math.abs(eyes[0].top - eyes[1].top) < 10 && smile.length >= 3) {
        // Sort smile stones by their left position
        smile.sort((a, b) => a.left - b.left);

        // Check if the stones form an upward curve
        let isCurved = true;
        for (let i = 1; i < smile.length - 1; i++) {
            if (!(smile[i].bottom < smile[i - 1].bottom && smile[i].bottom < smile[i + 1].bottom)) {
                isCurved = false;
                break;
            }
        }

        if (isCurved) {
            alert('Great! Now click on the link to continue your adventure.');
            window.location.href = 'http://tinyurl.com/yuxss95p';
        }
    }
}
