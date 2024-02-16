// Получить все кнопки, создающие новый список
const createListBtns = document.querySelectorAll('.new-list');

// Контейнер, где будут находится все списки
const listsContainer = document.getElementById('lists-container');

// Назначить event listeners на каждую кнопку, создающую список
for (let i = 0; createListBtns.length > i; i++) {
    createListBtns[i].addEventListener('click', modalCreateList);
}

// Инициализация списков из локального хранилища или предоставление примера по умолчанию
let lists = JSON.parse(localStorage.getItem('items')) ||
    [{ // Шаблок & Пример списка
        id: 1,
        title: 'Пример Списка',
        items: [{
            id: 1,
            title: 'Пример To-Do',
            description: 'Описание To-Do',
            checked: false
        }]
    }];

/**
 * Создать HTML контент списка (Не вставляет на страницу, а возвращает)
 * 
 * @param {number} id - Уникальный ID списка
 * @param {string} title - Заголовок списка
 * @returns Возвращает созданный хедер и внутринности списка, чтобы затем работать с ними (как правило имплементировать в страницу)
 */
function createListContainer(id, title) {

    // Контейнер для хедера
    const listHeader = document.createElement('div');
    listHeader.classList.add('list-header');

    // Контейнер для списка to-do
    const listContainer = document.createElement('div');
    listContainer.setAttribute('id', `list-container-${id}`);
    listContainer.classList.add('list-container');

    // Заголовок списка
    const listTitle = document.createElement('h3');
    listTitle.append(document.createTextNode(title));

    // Разделитель списка
    const listDivider = document.createElement('hr');

    // Контейнер для менюшки действиями (Удалить список, Добавить новый to-do)
    const actionContainer = document.createElement('section');
    actionContainer.classList.add('list-action-container');

    // Кнопка для создания нового to-do
    const createItemButton = document.createElement('button');
    createItemButton.classList.add('icon'); // Тип кнопки : Иконка
    createItemButton.addEventListener('click', () => modalCreateItem(id)); // При нажатии будет открываться модальное окно
    createItemButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path style="fill: var(--slate-400);" d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
    `; // SVG иконка кнопки

    // Кнопка для удаления всего списка
    const deleteListButton = document.createElement('button');
    deleteListButton.classList.add('icon'); // Тип кнопки : Иконка
    deleteListButton.addEventListener('click', () => { // Повесить listener, удаляющий список при нажатии

        // Удалить из DOM
        listHeader.remove();
        listContainer.remove();

        // Удалить из массива списков
        lists = lists.filter((l) => l.id !== id);
        localStorage.setItem('items', JSON.stringify(lists));
    });
    deleteListButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" height="24">
            <path style="fill: var(--slate-400);"
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
    `; // SVG иконка кнопки удаления списка

    // Поместить кнопки внутрь контейнера
    actionContainer.append(createItemButton, deleteListButton)

    // Поместить все внутринности (Заголовок, Разделитель, Кнопки) в хедер
    listHeader.append(listTitle, listDivider, actionContainer);

    // Вернуть хедер и контейнер для последующей работы с ним
    return { listHeader, listContainer }
}

/**
 * Создать и отобразить новый список на странице
 * 
 * @param {string} title - Заголовок списка
 */
function handleCreateList(title = document.getElementById('list-title').value) {

    // Создать уникальный ID для списка
    const id = Math.round(Math.random() * 1000000);

    // Проверить размер заголовка (мин: 1, макс: 64)
    if (title.length <= 0 || title.length > 64) {
        console.log('Неподходящая длина заголовка списка');
        return;
    }

    // Создать новый список
    const { listHeader, listContainer } = createListContainer(id, title);

    // Вставить список на сайт
    listsContainer.append(listHeader);
    listsContainer.append(listContainer);

    // Добавить список внутрь массива списков
    lists.push({
        id: id,
        title: title,
        items: []
    })

    // Сохранить новое значение в локальное хранилище
    localStorage.setItem('items', JSON.stringify(lists));

}