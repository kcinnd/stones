document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    const placeholders = document.querySelectorAll('.placeholder');

    // Initialize drag and drop events for stones
    stones.forEach(stone => {
        stone.addEventListener('dragstart', dragStart);
        stone.addEventListener('dragend', dragEnd);
    });

    // Initialize drag events for placeholders
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('dragover', dragOver);
        placeholder.addEventListener('dragenter', dragEnter);
        placeholder.addEventListener('dragleave', dragLeave);
        placeholder.addEventListener('drop', dragDrop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => e.target.classList.add('dragging'), 0);
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault(); // Necessary to allow the drop
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('hovered');
    }

    function dragLeave(e) {
        e.target.classList.remove('hovered');
    }

    function dragDrop(e) {
        e.target.classList.remove('hovered');
        const stoneId = e.dataTransfer.getData('text/plain');
        const stone = document.getElementById(stoneId);
        const targetIsPlaceholder = e.target.classList.contains('placeholder');
        const placeholderIsEmpty = e.target.children.length === 0;

        // Allow drop only if target is a placeholder and it's empty
        if (targetIsPlaceholder && placeholderIsEmpty) {
            e.target.appendChild(stone);
            checkFormation();
        }
    }

    function checkFormation() {
        // Check if all placeholders have a stone
        const isCorrectFormation = Array.from(placeholders).every(placeholder => placeholder.children.length > 0);

        if (isCorrectFormation) {
            // Display popup message when the smiley face is complete
            alert('Smiley face complete! 😊\n\nTo continue your adventure, click here: http://tinyurl.com/yuxss95p');
        }
    }
});
