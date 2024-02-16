/**
 * @typedef itemData - Описание объекта to-do
 * @param {boolean} checked - Выполнен ли to-do
 * @param {number} itemId - Уникальный ID to-do
 * @param {number} id - Уникальный ID списка, в котором находится to-do
 * @param {string} title - Заголовок to-do
 * @param {string} description - Описание to-do
 */

/**
 * Создаёт и возвращает HTML элемент to-do на основе предоставленных данных
 * 
 * @param {itemData} props - Данные, необходимые для создания to-do 
 * @returns - Возвращает созданный html элемент to-do для последующей работы с ним
 */
function createItemContainer({ checked, itemId, id, title, description }) {

    // Контейнер to-do
    const newItemContainer = document.createElement('div');
    newItemContainer.classList.add('item');

    // Listener, при нажатии на to-do он будет менять состояние выполнености на противоположное
    newItemContainer.addEventListener('click', () => {

        // Переключить стили контейнера
        newItemContainer.classList.toggle('checked-item');

        // Изменить состояние в массиве списков
        lists = lists.map((list) => {
            if (list.id === id) {
                list.items = list.items.map((item) => {
                    if (item.id === itemId) {
                        item.checked = !item.checked;
                    }
                    return item;
                });
            }
            return list;
        });

        // Сохранить новое состояние в локальном хранилище
        localStorage.setItem('items', JSON.stringify(lists));
    });

    // Если to-do выполнен, добавить ему специальные стили
    if (checked) newItemContainer.classList.add('checked-item');

    // Контент (Контейнер для текста)
    const itemContent = document.createElement('div');
    itemContent.classList.add('item-content');

    // Заголовок to-do
    const titleParagraph = document.createElement('p');
    titleParagraph.textContent = title;

    // Описание to-do
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('sub');
    descriptionParagraph.textContent = description;

    // Вставить текст внутрь контейнера
    itemContent.append(titleParagraph, descriptionParagraph);

    // Создание кнопки удаления
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('icon', 'delete-item-btn'); // Тип кнопки : Иконка
    deleteButton.style.border = '2px solid var(--danger)' // Добавить красную обводку
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" height="24">
            <path style="fill: var(--danger);"
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    `; // SVG иконка кнопки удаления

    // Добавить listener для удаления кнопки
    deleteButton.addEventListener('click', () => {

        // Обновить массив списков
        lists = lists.map((list) => {
            if (list.id === id) {
                list.items = list.items.filter((item) => item.id !== itemId);
            }
            return list;
        });

        // Удалить to-do из DOM
        newItemContainer.remove();

        // Обвноить локальное хранилище с новым списком
        localStorage.setItem('items', JSON.stringify(lists));
    });

    // Вставить текст и кнопку удаления в контейнер to-do
    newItemContainer.appendChild(itemContent);
    newItemContainer.appendChild(deleteButton);

    // Вернуть созданный to-do элемент
    return newItemContainer;
}

/**
 * Создать и вставить to-do на страницу
 * 
 * @param {itemData} props - Данные, необходимые для создания to-do
 * @returns - Возвращает статус операции (Выполнен / Провален)
 */
function handleInsertItem({ checked, itemId, id, title, description }) {

    // Проверить размеры заголовка и описания
    if (title.length <= 0 || title.length > 64 || description.length <= 0 || description.length > 256) {
        console.log('Неподходящая длина заголовка или описания');
        return false;
    }

    // Создать элемент to-do
    const newItemContainer = createItemContainer({ checked, itemId, id, title, description });

    // Вставить элемент to-do внутрь списка с ID, которому этот to-do пренадлежит
    document.getElementById(`list-container-${id}`).append(newItemContainer);

    // Вернуть статус успешной операции
    return true;
}

/**
 * Создать абсолютно новый элемент to-do, который затем будет имплементирован на страницу и в массив списков
 * 
 * @param {number} id - Уникальный ID списка, в котором будет находится элемент to-do
 * @param {*} title - Заголовок to-do
 * @param {*} description - Описание to-do
 */
function handleCreateItem(
    id,
    title = document.getElementById('item-title').value,
    description = document.getElementById('item-description').value
) {

    // Создать уникальный ID элемента
    const itemId = Math.round(Math.random() * 1000000);

    // Создать новый to-do и имплементировать его, после чего сообщить о статусе операции
    const isSuccess = handleInsertItem({
        checked: false,
        itemId: itemId,
        id,
        title,
        description
    });

    // Если операция провалена, то не обновлять массив списков
    if (!isSuccess) return;

    // Если всё успешно, обновить массив списков
    lists = lists.map((list) => {
        if (list.id === id) {
            list.items.push({
                id: itemId,
                title,
                description,
                checked: false,
            });
        }
        return list;
    });

    // Сохранить новый массив списков в локальное хранилище
    localStorage.setItem('items', JSON.stringify(lists));
}
