document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('mousedown', function(event) {
            let activeItem = item;
            let shiftX = event.clientX - item.getBoundingClientRect().left;
            let shiftY = event.clientY - item.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                activeItem.style.position = 'absolute';
                activeItem.style.zIndex = 1000;
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
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Looser check for eyes: anywhere in the upper half
        if (centerY < guideRect.top + (guideRect.height / 2)) {
            eyes.push({ left: centerX, top: centerY });
        }
        // Looser check for smile: below the midpoint of the guide
        else if (centerY >= guideRect.top + (guideRect.height / 2)) {
            smile.push({ left: centerX, bottom: centerY });
        }
    });

    // Ensure there are at least two stones for eyes and some for the smile
    if (eyes.length >= 2 && smile.length > 0) {
        // Horizontal margin of error for eyes alignment
        const horizontalErrorMargin = guideRect.width * 0.1; // 10% of the guide's width
        const eyesAligned = eyes.every(eye => Math.abs(eye.left - eyes[0].left) <= horizontalErrorMargin);

        if (eyesAligned) {
            alert('Great! Now click on the link to continue your adventure.');
            window.location.href = 'http://tinyurl.com/yuxss95p';
        }
    }
}
