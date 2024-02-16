// Выполнить функцию "handleDOMLoad" только при полной загрузке страницы
document.addEventListener('DOMContentLoaded', onLoad)

// Код выполнится до загрузки страницы, это необходимо, 
// чтобы не было мирцаний при установке сохраненной темы
beforeLoad()

// Функция, выполняемая до загрузки контента
function beforeLoad() {

    // Получить значение из localstorage (если оно есть)
    const storedTheme = localStorage.getItem('theme')

    // Установить сохраненную тему 
    // (Если тема светлая, то никаких классов не назначается, она работает по умолчанию)
    if (storedTheme === 'dark') {
        document.body.classList.add('dark');
    }

}

// Код выполниться только при полной загрузке страницы
function onLoad() {

    // Получить список всех кнопок, меняющих тему
    const themeBtnList = document.querySelectorAll('.theme-switch');

    // Назначить event listeners на каждую кнопку
    for (let i = 0; themeBtnList.length > i; i++) {
        themeBtnList[i].addEventListener('click', handleThemeSwitch);
    }

}

// Хендлер для смены темы
function handleThemeSwitch() {

    // Переключить тему на сайте
    document.body.classList.toggle('dark');

    // Переключить тему с локальном хранилище
    document.body.classList.contains('dark') ?
        localStorage.setItem('theme', 'dark') :
        localStorage.setItem('theme', 'light')

}