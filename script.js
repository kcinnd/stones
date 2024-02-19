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

    // The top two items are considered as eyes and should be horizontally aligned
    const eyes = positions.slice(0, 2);
    if (!areEyesAligned(eyes)) {
        return; // Eyes not aligned properly, exit the function
    }

    // The remaining items are considered part of the smile
    const smile = positions.slice(2);
    if (!isSmileCurved(smile)) {
        return; // Smile not curved properly, exit the function
    }

    // If both eyes are aligned and the smile is curved, show the popup
    alert('Great! Now click on the link to continue your adventure.');
    window.location.href = 'http://tinyurl.com/yuxss95p';
}

function areEyesAligned(eyes) {
    if (eyes.length !== 2) return false;
    // Allow some tolerance in alignment, e.g., 10 pixels
    const tolerance = 10;
    return Math.abs(eyes[0].left - eyes[1].left) < tolerance;
}

function isSmileCurved(smile) {
    if (smile.length < 5) return false;

    // Check if stones are ascending then descending in their left positions
    let peakFound = false;
    for (let i = 1; i < smile.length - 1; i++) {
        if (smile[i].left > smile[i - 1].left && smile[i].left > smile[i + 1].left) {
            if (peakFound) return false; // More than one peak found
            peakFound = true;
        }
    }
    return peakFound; // A smile should have exactly one peak (highest point)
}
