document.addEventListener('DOMContentLoaded', () => {
    // ПОПАП
    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    const eventPopups = document.querySelectorAll('.event-popup');
    eventPopups.forEach(popup => {
        popup.style.display = 'none';
    });
    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const target = card.dataset.eventTarget;
            openPopup(target);
        });
    });
    const popupCloseButtons = document.querySelectorAll('.popup-close');
    popupCloseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const popupId = button.closest('.event-popup').id;
            closePopup(popupId);
        });
    });

    // КАРУСЕЛЬ
    const eventsCarousel = document.querySelector('.events-carousel');

    let isCarouselLocked = false;

    eventsCarousel.addEventListener('wheel', (event) => {
        event.preventDefault(); // БЕЗ ВЕРТИКАЛЬНОЙ ПРОКРУТКИ

        if (!isCarouselLocked) {
            document.body.style.overflow = 'hidden'; //ОСТАЛЬНОЕ БЛОК
            isCarouselLocked = true;
        }

        eventsCarousel.scrollLeft += event.deltaY;

        // РАЗБЛОК ОСТАЛЬНОЕ
        if (eventsCarousel.scrollWidth - eventsCarousel.clientWidth <= eventsCarousel.scrollLeft + 1 ||
            eventsCarousel.scrollLeft <= 1) {
            document.body.style.overflow = '';
            isCarouselLocked = false;
            event.preventDefault();
        }
    });

    eventsCarousel.addEventListener('mouseup', () => {
        document.body.style.overflow = '';
        isCarouselLocked = false;
    });

    eventsCarousel.addEventListener('mouseleave', () => {
        document.body.style.overflow = '';
        isCarouselLocked = false;
    });

    //БИЛЬЯРД
    const circles = document.querySelectorAll('.circle');
    const billiardPriceContainer = document.querySelector('.billiard-price-container');

    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            circles.forEach((otherCircle, index) => {
                const x = Math.random() * 1200 - 650;
                const y = Math.random() * 500 - 450;
                //СМЕЩЕНИЕ
                otherCircle.style.setProperty('--x', `${x}px`);
                otherCircle.style.setProperty('--y', `${y}px`);
                otherCircle.classList.add('rolling');
            });

            // ДЛЯ ЦЕНЫ
            billiardPriceContainer.classList.add('rolling');

            setTimeout(() => {
                circles.forEach(otherCircle => {
                    otherCircle.classList.remove('rolling');
                    //ВОЗВРАТ
                    otherCircle.style.setProperty('--x', `0px`);
                    otherCircle.style.setProperty('--y', `0px`);
                });
                billiardPriceContainer.classList.remove('rolling'); 
            }, 1000);
        });
    });
            
    // СЧЕТЧИК
    document.querySelectorAll('.popup-content').forEach(popupContent => {
        popupContent.addEventListener('click', function(event) {
            if (event.target.classList.contains('quantity-plus')) {
                updateQuantity(this, 1);
            } else if (event.target.classList.contains('quantity-minus')) {
                updateQuantity(this, -1);
            }
        });

        function updateQuantity(element, change) {
            const quantitySpan = element.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent, 10);

            quantity += change;

            if (quantity < 1) {
                quantity = 1;
            }
            quantitySpan.textContent = quantity;
        }
    });
});