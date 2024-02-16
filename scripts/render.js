// Получить меню с фильтрами
const itemsFilter = document.getElementById('items-filter');

/**
 * Рендер списков на сайте с указанным фильтром
 * 
 * @param {number} filter - Какой использовать фильтр отобращения to-dos (0: Все, 1: Активные, 2: Выполненные)
 */
function renderLists(filter = itemsFilter.selectedIndex) {

    // Пройтись по всем спискам
    lists.forEach((list) => {

        // Создать заголовок & контейнер для to-do списка
        const { listHeader, listContainer } = createListContainer(list.id, list.title);

        // Вставить на сайт
        listsContainer.append(listHeader);
        listsContainer.append(listContainer);

        // Пройтись по всем to-do списка
        list.items.forEach((item) => {

            // Данные для создания to-do
            const data = { 
                checked: item.checked, // Выполнен ли to-do
                itemId: item.id, // Уникальный ID to-do
                id: list.id, // ID списка, в котором находится to-do
                title: item.title, // Заголовок
                description: item.description // Описание
            }

            // Отфильтровать to-do
            switch (filter) {
                case 0: // Отобразить все
                    handleInsertItem(data);
                    break;

                case 1: // Отобразить только активные
                    if (!item.checked) handleInsertItem(data);
                    break;

                case 2: // Отобразить только выполненные
                    if (item.checked) handleInsertItem(data);
                    break;

                default: // По умолчанию отобразить все
                    handleInsertItem(data);
                    break;
            }

        });
    });
}

/** Очистить весь контейнер со списками */
function cleanLists() {
    listsContainer.innerHTML = ''
}

// Отобразить список на странице
renderLists();

// При каждом изменении фильтра ререндерить все списки
itemsFilter.addEventListener('change', (event) => {
    cleanLists()
    renderLists(event.target.selectedIndex)
});