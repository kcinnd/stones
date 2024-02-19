document.addEventListener('DOMContentLoaded', () => {
    let activeItem = null;

    document.querySelectorAll('.item').forEach(item => {
        item.onmousedown = function(event) {
            activeItem = this;
            let shiftX = event.clientX - item.getBoundingClientRect().left;
            let shiftY = event.clientY - item.getBoundingClientRect().top;

            activeItem.style.position = 'absolute';
            activeItem.style.zIndex = 1000;
            document.body.append(activeItem);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                activeItem.style.left = pageX - shiftX + 'px';
                activeItem.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            item.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                item.onmouseup = null;
                verifyArrangement();
            };
        };

        item.ondragstart = () => false;
    });
});

function verifyArrangement() {
    const items = document.querySelectorAll('.item');
    const positions = Array.from(items).map(item => {
        const rect = item.getBoundingClientRect();
        return { top: rect.top, left: rect.left, item };
    });

    // Sort items by their top position
    positions.sort((a, b) => a.top - b.top);

    // Assuming the first two items are eyes
    const eyes = positions.slice(0, 2);
    // The rest are part of the smile
    const smile = positions.slice(2);

    if (areEyes(eyes) && isSmile(smile)) {
        alert('Great! Now click on the link to continue your adventure.');
        window.location.href = 'http://tinyurl.com/yuxss95p';
    }
}

function areEyes(eyes) {
    if (eyes.length !== 2) return false;
    // Check if eyes are horizontally aligned with a tolerance
    const tolerance = 10; // pixels
    return Math.abs(eyes[0].top - eyes[1].top) < tolerance;
}

function isSmile(smile) {
    if (smile.length < 5) return false;
    // Check if elements of smile are in ascending order of their left position (simple check for a curve)
    for (let i = 0; i < smile.length - 1; i++) {
        if (smile[i].left > smile[i + 1].left) {
            return false;
        }
    }
    // Further checks can be added here for more precise curvature detection
    return true;
}
