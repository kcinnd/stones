// script.js

document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    const container = document.getElementById('container');
    let selectedStone = null;

    // Function to position stones in a clustered arrangement
    function positionStonesInCluster() {
        const clusterCenterX = container.offsetWidth * 0.5;
        const clusterCenterY = container.offsetHeight * 0.5;
        const clusterRadius = Math.min(container.offsetWidth, container.offsetHeight) * 0.2; // Cluster radius

        stones.forEach(stone => {
            const angle = Math.random() * Math.PI * 2; // Random angle
            const radius = Math.random() * clusterRadius; // Random radius within the cluster area
            const x = clusterCenterX + radius * Math.cos(angle) - stone.offsetWidth / 2;
            const y = clusterCenterY + radius * Math.sin(angle) - stone.offsetHeight / 2;

            stone.style.left = `${x}px`;
            stone.style.top = `${y}px`;
        });
    }

    // Position stones when the page loads
    positionStonesInCluster();

    stones.forEach(stone => {
        stone.addEventListener('mousedown', (e) => {
            selectedStone = stone;
            stone.style.cursor = 'grabbing';
            stone.style.zIndex = 1000; // Bring the stone to the top
        });

        document.addEventListener('mousemove', (e) => {
            if (selectedStone) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left - selectedStone.offsetWidth / 2;
                const y = e.clientY - rect.top - selectedStone.offsetHeight / 2;
                selectedStone.style.left = `${x}px`;
                selectedStone.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (selectedStone) {
                selectedStone.style.cursor = 'grab';
                selectedStone.style.zIndex = 'auto'; // Reset the z-index
                selectedStone = null;
                checkSmileyFormation();
            }
        });
    });

    function checkSmileyFormation() {
        // Smiley detection logic remains the same
        // ...
    }
});
