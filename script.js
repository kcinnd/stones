document.addEventListener('DOMContentLoaded', () => {
    let activeItem = null;

    document.querySelectorAll('.item').forEach(item => {
        item.onmousedown = function(event) {
            activeItem = this;
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

            item.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                activeItem.style.zIndex = '';
                activeItem = null;
                verifyArrangement();
            };

            item.ondragstart = () => false;
        };
    });
});

function verifyArrangement() {
    const guide = document.querySelector('#smileyGuide').getBoundingClientRect();
    const items = document.querySelectorAll('.item');
    let eyes = [];
    let smile = [];

    items.forEach(item => {
        const { top, left, bottom, right } = item.getBoundingClientRect();

        // Check if the stone is within the smiley guide
        if (top >= guide.top && bottom <= guide.bottom && left >= guide.left && right <= guide.right) {
            // Classify stones as eyes if they're in the top third of the guide
            if (top < guide.top + guide.height / 3) {
                eyes.push({ top, left });
            } else {
                smile.push({ left, bottom });
            }
        }
    });

    // Check for two eyes that are horizontally aligned
    if (eyes.length === 2 && Math.abs(eyes[0].top - eyes[1].top) < 10) {
        // Sort smile stones by their left position
        smile.sort((a, b) => a.left - b.left);

        // Check for a curved smile
        let isCurved = true;
        for (let i = 1; i < smile.length - 1; i++) {
            if (!(smile[i].bottom > smile[i - 1].bottom && smile[i].bottom > smile[i + 1].bottom)) {
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
