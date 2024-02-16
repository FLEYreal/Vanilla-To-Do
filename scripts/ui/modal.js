// Получить контейнер модального окна (тёмный фон, также центрирует модальное окно)
const modalContainer = document.getElementById('modal-container');

// Само модальное окно
const modal = document.getElementById('modal-content');

/** Закрыть модальное окно */
function closeModal(event) {

    if ( // При нажатии на тёмный фон или кнопку создания закрывается окно
        event.target.getAttribute('id') === 'modal-container' ||
        event.target.classList.contains('modal-create-btn')
    ) {
        modalContainer.style.display = 'none'; // Скрыть модальное окно
        modal.innerHTML = ''; // Очистить контент модального окна
    }
}

// Назначить listener, который будет закрывать окно в случае нажатия за пределами окна или по кнопке
modalContainer.addEventListener('click', closeModal);


/* -------------------- Секция создания отдельных модальных окон --------------------  */


/**
 * Создать модальное окно создания нового to-do
 * 
 * @param {number} id - Уникальный ID для to-do
 */
function modalCreateItem(id) {
    modalContainer.style.display = 'flex'; // Отобразить окно (по умолчанию 'none')
    modal.innerHTML = `
        <h3>Создать новый To-Do</h3>
        <form id="new-item-form">
            <input type="text" id="item-title" placeholder="Заголовок" required>
            <input type="text" id="item-description" placeholder="Описание" required>
            <button type="button" id="item-modal-create-btn" class="primary modal-create-btn" onclick="handleCreateItem(${id})">Создать</button>
        </form>
    `;
}

/** Открыть модальное окно создания нового списка */
function modalCreateList() {
    modalContainer.style.display = 'flex'; // Отобразить окно (по умолчанию 'none')
    modal.innerHTML = `
        <h3 style="margin-top: 4px;">Создать Список</h3>
        <form id="new-list-form">
            <input type="text" id="list-title" placeholder="Заголовок Списка" required>
            <button type="button" id="list-modal-create-btn" class="primary modal-create-btn" onclick="handleCreateList()">Создать</button>
        </form>
    `;
}
