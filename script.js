// script.js
document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    const placeholders = document.querySelectorAll('.placeholder');

    stones.forEach(stone => {
        stone.addEventListener('dragstart', dragStart);
        stone.addEventListener('dragend', dragEnd);
    });

    placeholders.forEach(placeholder => {
        placeholder.addEventListener('dragover', dragOver);
        placeholder.addEventListener('dragenter', dragEnter);
        placeholder.addEventListener('dragleave', dragLeave);
        placeholder.addEventListener('drop', dragDrop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => e.target.classList.add('hide'), 0);
    }

    function dragEnd(e) {
        e.target.classList.remove('hide');
    }

    function dragOver(e) {
        e.preventDefault();
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
        e.target.appendChild(stone);
        checkFormation();
    }

    function checkFormation() {
        const isCorrectFormation = Array.from(placeholders).every(placeholder => placeholder.children.length > 0);
        if (isCorrectFormation) {
            const message = 'To continue your adventure, click here: http://tinyurl.com/yuxss95p';
            alert(`Smiley face complete! 😊\n\n${message}`);
        }
    }
});
