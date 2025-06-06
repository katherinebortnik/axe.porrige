document.addEventListener('DOMContentLoaded', () => {
    // === ПОПАПЫ ===
    const bookButton = document.getElementById('book-button');
    const popupContainer = document.getElementById('popupContainer');
    const popup = document.querySelector('.popup');
    const closeBookingPopup = document.getElementById('closeBookingPopup');

    popupContainer.style.display = 'none';

    bookButton.addEventListener('click', () => {
        popupContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBookingPopup.addEventListener('click', () => {
        popupContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    popupContainer.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // === КНОПКИ С ИНФОРМАЦИЕЙ ===
    const infoButtons = document.querySelectorAll('.info-button');

    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // === ХОЛСТ МАСКА ===
    const maskContainer = document.getElementById('maskContainer');
    const maskCanvas = document.getElementById('maskCanvas');
    const ctx = maskCanvas.getContext('2d');

    maskCanvas.width = window.innerWidth;
    maskCanvas.height = window.innerHeight;

    const primaryColor = '#DB5F40';

    // ЗВЕЗДА, КОТОРАЯ БЫЛА СЕРДЦЕМ
    const heartHeight = maskCanvas.height * 0.6; // ВЫСОТА
    const heartWidth = heartHeight * 0.8; // ПРОПОРЦИИ
    const heartX = maskCanvas.width / 2 - heartWidth / 2;
    const heartY = maskCanvas.height / 2 - heartHeight / 2;

    const brushSize = 100; // РАЗМЕР КИСТИ

    // СТЕРТОЕ
    let clearedPixels = 0;
    const totalPixels = maskCanvas.width * maskCanvas.height;
    const clearThreshold = 0.8;

    // ЗВЕЗДА, КОТОРАЯ БЫЛА СЕРДЦЕМ
    function drawHeart(x, y, width, height, cornerRadius) {
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
        ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
        ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
        ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
        ctx.closePath();
    }

    function drawStar(x, y, radius1, radius2, numPoints) {
        ctx.beginPath();
        for (let i = 0; i < numPoints * 2; i++) {
            const radius = i % 2 === 0 ? radius1 : radius2;
            const angle = Math.PI * i / numPoints - Math.PI / 2;
            ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
        }
        ctx.closePath();
    }

    function initializeCanvas() {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

        // СОЗДАНИЕ ФОРМЫ
        ctx.globalCompositeOperation = 'destination-out';

        const starRadius1 = heartWidth / 2;
        const starRadius2 = heartWidth / 4;
        drawStar(maskCanvas.width / 2, maskCanvas.height / 2, starRadius1, starRadius2, 5);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        clearedPixels = 0;
    }
    initializeCanvas();

    function draw(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // ДЛЯ УДАЛЕНИЯ И РАБОТЫ С САЙТОМ
        clearedPixels += brushSize * brushSize * Math.PI;
    }

    let isDrawing = false;

    maskCanvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        draw(e.offsetX, e.offsetY);
    });

    maskCanvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        draw(e.offsetX, e.offsetY);

        // СТЕРТО ЛИ ДОСТАТОЧНО
        if (clearedPixels / totalPixels > clearThreshold) {
            maskContainer.style.display = 'none';
            maskContainer.style.pointerEvents = 'none';
        }
    });

    maskCanvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    maskCanvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    // ДЛЯ ТЕЛЕФОНОВ ТАЧСКРИНОВ
    maskCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const touch = e.touches[0];
        const x = touch.clientX - maskCanvas.offsetLeft;
        const y = touch.clientY - maskCanvas.offsetTop;
        draw(x, y);
    });

    maskCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const x = touch.clientX - maskCanvas.offsetLeft;
        const y = touch.clientY - maskCanvas.offsetTop;
        draw(x, y);

        if (clearedPixels / totalPixels > clearThreshold) {
            maskContainer.style.display = 'none';
            maskContainer.style.pointerEvents = 'none';
        }
    });

    maskCanvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    maskCanvas.addEventListener('touchcancel', () => {
        isDrawing = false;
    });

    window.addEventListener('resize', () => {
        maskCanvas.width = window.innerWidth;
        maskCanvas.height = window.innerHeight;
        initializeCanvas();
    });

    maskCanvas.style.cursor = 'grab';
    });