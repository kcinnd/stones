document.addEventListener('DOMContentLoaded', () => {
    const stones = document.querySelectorAll('.stone');
    const container = document.getElementById('container');
    let selectedStone = null;

    // Function to position stones in a clustered arrangement at the start
    function positionStonesInCluster() {
        const clusterCenterX = container.offsetWidth * 0.5;
        const clusterCenterY = container.offsetHeight * 0.5;
        const clusterRadius = Math.min(container.offsetWidth, container.offsetHeight) * 0.15; // Adjusted for tighter clustering

        stones.forEach((stone, index) => {
            const angle = Math.random() * Math.PI * 2; // Random angle for each stone
            // Slight offset for each stone to prevent complete overlap
            const radius = Math.random() * clusterRadius + (index * 10); 
            const x = clusterCenterX + radius * Math.cos(angle) - stone.offsetWidth / 2;
            const y = clusterCenterY + radius * Math.sin(angle) - stone.offsetHeight / 2;

            stone.style.left = `${x}px`;
            stone.style.top = `${y}px`;
        });
    }

    // Initial positioning of stones in a cluster
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
                selectedStone.style.zIndex = 'auto'; // Reset the z-index after dropping
                selectedStone = null;
                checkSmileyFormation(); // Check if stones form a smiley after each drop
            }
        });
    });

    function checkSmileyFormation() {
        const eyeZoneYTop = container.offsetHeight * 0.25;
        const eyeZoneYBottom = container.offsetHeight * 0.35;
        const mouthZoneYTop = container.offsetHeight * 0.65;
        const mouthZoneYBottom = container.offsetHeight * 0.75;
        let eyesCount = 0;
        let mouthCount = 0;

        stones.forEach(stone => {
            const rect = stone.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const stoneY = rect.top - containerRect.top + (rect.height / 2);

            if (stoneY >= eyeZoneYTop && stoneY <= eyeZoneYBottom) {
                eyesCount++; // Stone is within the eye zone
            } else if (stoneY >= mouthZoneYTop && stoneY <= mouthZoneYBottom) {
                mouthCount++; // Stone is within the mouth zone
            }
        });

        // Check for exactly 2 stones in the eyes zone and 6 stones in the mouth zone
        if (eyesCount === 2 && mouthCount === 6) {
            showPopup(); // Show congratulations popup
        }
    }

    function showPopup() {
        const popup = document.getElementById('popup');
        if (popup.classList.contains('hidden')) {
            popup.classList.remove('hidden');
        }
    }
});
