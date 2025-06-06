document.addEventListener('DOMContentLoaded', () => {
    // МЕНЮ
    const menuButtons = document.querySelectorAll('.menu-button');
    const menuTables = document.querySelectorAll('.menu-table');
    const arrowLeft = document.querySelector('.menu-arrow-left');
    const arrowRight = document.querySelector('.menu-arrow-right');
    let currentTableIndex = 0;

    function deactivateAllButtons() {
        menuButtons.forEach(button => button.classList.remove('active'));
    }

    function hideAllTables() {
        menuTables.forEach(table => table.classList.remove('active'));
    }

    function showTable(index) {
        hideAllTables();
        deactivateAllButtons();
        menuTables[index].classList.add('active');
        menuButtons[index].classList.add('active');
    }

    //1 ТАБЛИЦА
    showTable(currentTableIndex);
    menuButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            currentTableIndex = index;
            showTable(currentTableIndex);
        });
    });


    arrowLeft.addEventListener('click', () => {
        currentTableIndex--;
        if (currentTableIndex < 0) {
            currentTableIndex = menuTables.length - 1;
        }
        showTable(currentTableIndex);
    });


    arrowRight.addEventListener('click', () => {
        currentTableIndex++;
        if (currentTableIndex >= menuTables.length) {
            currentTableIndex = 0;
        }
        showTable(currentTableIndex);
    });


    //ИЗОБРАЖЕНИЯ РАНДОМНО
    const imageWrappers = document.querySelectorAll('#seasonal-menu .image-wrapper');

    imageWrappers.forEach(wrapper => {
        const randomX = Math.random() * 80;
        const randomY = Math.random() * 80;

        wrapper.style.left = `${randomX}%`;
        wrapper.style.top = `${randomY}%`;

        let isDragging = false;
        let startX = 0;
        let startY = 0;

        wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - wrapper.offsetLeft;
            startY = e.clientY - wrapper.offsetTop;
            wrapper.style.cursor = 'grabbing';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            wrapper.style.cursor = 'grab';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const x = e.clientX - startX;
            const y = e.clientY - startY;

            wrapper.style.left = `${x}px`;
            wrapper.style.top = `${y}px`;
        });

        //ДЛЯ МОБИЛЬНЫХ
        wrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX - wrapper.offsetLeft;
            startY = e.clientY - wrapper.offsetTop;
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const x = e.touches[0].clientX;
            const y = e.clientY - startY;

            wrapper.style.left = `${x}px`;
            wrapper.style.top = `${y}px`;
        });
    });
});