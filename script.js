      // Функция для плавной прокрутки к элементу
        function smoothScrollTo(targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Отступ для фиксированного хедера
                    behavior: 'smooth'
                });
            }
        }

        // Функция для активации таба
        function activateTab(tabId) {
            const tabTrigger = document.querySelector(`[data-bs-target="${tabId}"]`);
            if (tabTrigger) {
                const tab = new bootstrap.Tab(tabTrigger);
                tab.show();
            }
        }

        // Функция для показа уведомления
        function showNotification(notificationId, autoHide = true) {
            const notification = document.getElementById(notificationId);
            if (notification) {
                notification.classList.add('show');
                
                // Автоматическое скрытие через 5 секунд
                if (autoHide) {
                    setTimeout(() => {
                        hideNotification(notificationId);
                    }, 5000);
                }
            }
        }

        // Функция для скрытия уведомления
        function hideNotification(notificationId) {
            const notification = document.getElementById(notificationId);
            if (notification) {
                notification.classList.remove('show');
            }
        }

        // Обработчик для ссылок в навигации
        document.addEventListener('DOMContentLoaded', function() {
            // Показ приветственного уведомления при загрузке страницы
            setTimeout(() => {
                showNotification('welcomeNotification');
            }, 1000);

            // Обработка ссылок в хедере
            const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Если ссылка ведет к якорю (начинается с #)
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        
                        // Если это ссылка на таб
                        if (['#phone-booth', '#focus-room', '#meeting-room', '#open-meeting-room'].includes(href)) {
                            // Активируем соответствующий таб
                            activateTab(href);
                            
                            // Прокручиваем к секции с табами
                            smoothScrollTo('#products-section');
                        } 
                        // Если это ссылка на секцию
                        else if (['#products-section', '#benefits-section', '#features-section'].includes(href)) {
                            // Просто прокручиваем к секции
                            smoothScrollTo(href);
                        }
                    }
                });
            });

            // Обработка ссылок в дропдауне ROOMS
            const dropdownItems = document.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        
                        // Закрываем дропдаун после выбора
                        const dropdown = bootstrap.Dropdown.getInstance(document.querySelector('#productsDropdown'));
                        if (dropdown) {
                            dropdown.hide();
                        }
                        
                        // Активируем соответствующий таб
                        activateTab(href);
                        
                        // Прокручиваем к секции с табами
                        smoothScrollTo('#products-section');
                    }
                });
            });

            // Обработка формы подписки
            const newsletterForm = document.getElementById('newsletterForm');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Здесь обычно отправка формы на сервер
                    // В данном случае просто показываем уведомление об успехе
                    showNotification('formSuccessNotification');
                    
                    // Очистка формы
                    newsletterForm.reset();
                });
            }

            // Обработка кнопок закрытия уведомлений
            const closeButtons = document.querySelectorAll('.notification .close-btn');
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const notification = this.closest('.notification');
                    if (notification) {
                        hideNotification(notification.id);
                    }
                });
            });
        });
   