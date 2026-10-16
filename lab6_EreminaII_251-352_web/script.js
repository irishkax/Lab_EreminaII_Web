// ======================================================
// ЛР6: Проверка состава ланча + уведомления
// ======================================================

const order = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

const categoryNames = {
    soup: 'Суп',
    main: 'Главное блюдо',
    salad: 'Салат/стартер',
    drink: 'Напиток',
    dessert: 'Десерт'
};

const categoryOrder = ['soup', 'main', 'salad', 'drink', 'dessert'];


// 1. Отрисовка карточек (с фильтрами)
function renderDishes() {
    document.querySelectorAll('.dishes-grid').forEach(container => {
        const category = container.dataset.category;
        const section = container.closest('.menu-section');
        const activeKind = section.dataset.activeFilter || null;

        let items = dishes.filter(d => d.category === category);
        if (activeKind) items = items.filter(d => d.kind === activeKind);

        items = items.sort((a, b) => {
            if (a.kind !== b.kind) return a.kind.localeCompare(b.kind);
            return a.name.localeCompare(b.name);
        });

        container.innerHTML = '';

        items.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.dataset.dish = dish.keyword;
            if (order[dish.category] && order[dish.category].keyword === dish.keyword) {
                card.classList.add('selected');
            }
            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p class="dish-price">${dish.price}₽</p>
                <p class="dish-name">${dish.name}</p>
                <p class="dish-weight">${dish.count}</p>
                <button type="button" class="add-btn">Добавить</button>
            `;
            card.addEventListener('click', () => selectDish(dish.keyword));
            container.appendChild(card);
        });
    });
}


// 2. Выбор блюда
function selectDish(keyword) {
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;
    if (order[dish.category] && order[dish.category].keyword === keyword) {
        order[dish.category] = null;
    } else {
        order[dish.category] = dish;
    }
    renderDishes();
    renderOrderSummary();
}


// 3. Фильтры
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.closest('.menu-section');
            const kind = btn.dataset.kind;
            if (section.dataset.activeFilter === kind) {
                section.dataset.activeFilter = '';
                btn.classList.remove('active');
            } else {
                section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                section.dataset.activeFilter = kind;
                btn.classList.add('active');
            }
            renderDishes();
        });
    });
}


// 4. Блок "Ваш заказ"
function renderOrderSummary() {
    const summary = document.getElementById('order-summary');
    const anySelected = categoryOrder.some(cat => order[cat] !== null);
    if (!anySelected) {
        summary.innerHTML = '<p class="empty-order">Ничего не выбрано</p>';
        return;
    }
    let html = '';
    let total = 0;
    categoryOrder.forEach(cat => {
        const dish = order[cat];
        html += `<div class="order-item">`;
        html += `<p class="order-category">${categoryNames[cat]}</p>`;
        if (dish) {
            html += `<p class="order-dish">${dish.name} ${dish.price}₽</p>`;
            total += dish.price;
        } else {
            const emptyText = cat === 'drink'
                ? 'Напиток не выбран'
                : (cat === 'dessert' ? 'Десерт не выбран' : 'Блюдо не выбрано');
            html += `<p class="order-empty">${emptyText}</p>`;
        }
        html += `</div>`;
    });
    html += `<div class="order-total">`;
    html += `<p class="order-category">Стоимость заказа</p>`;
    html += `<p class="order-dish">${total}₽</p>`;
    html += `</div>`;
    summary.innerHTML = html;
}


// ======================================================
// 5. ПРОВЕРКА СОСТАВА ЛАНЧА ПРИ ОТПРАВКЕ ФОРМЫ
// ======================================================
function checkLunchComposition() {
    const has = cat => order[cat] !== null;

    // Ничего не выбрано вообще
    const anySelected = categoryOrder.some(cat => has(cat));
    if (!anySelected) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }

    // Если выбран ТОЛЬКО десерт (без супа, главного, салата, напитка)
    if (has('dessert') && !has('soup') && !has('main') && !has('salad') && !has('drink')) {
        return 'Выберите главное блюдо';
    }

    // Выбран напиток/десерт, но нет ни супа, ни главного, ни салата
    if ((has('drink') || has('dessert')) && !has('soup') && !has('main') && !has('salad')) {
        return 'Выберите главное блюдо';
    }

    // Выбран салат, но нет ни супа, ни главного
    if (has('salad') && !has('soup') && !has('main')) {
        return 'Выберите суп или главное блюдо';
    }

    // Есть суп, но нет ни главного, ни салата
    if (has('soup') && !has('main') && !has('salad')) {
        return 'Выберите главное блюдо/салат/стартер';
    }

    // Есть суп и салат, но нет главного и нет напитка
    if (has('soup') && has('salad') && !has('main') && !has('drink')) {
        return 'Выберите главное блюдо';
    }

    // Есть суп, главное, салат, но нет напитка
    if (has('soup') && has('main') && has('salad') && !has('drink')) {
        return 'Выберите напиток';
    }

    // Есть суп, главное, но нет салата и напитка — это вариант "Суп + Главное + Напиток" (комбо 2) — разрешено
    // Есть суп, главное, напиток — ОК
    // Есть главное, салат, напиток — ОК (комбо 4)
    // Есть главное, напиток — ОК (комбо 5)
    // Есть суп, салат, напиток — ОК (комбо 3)
    // Есть суп, главное, салат, напиток — ОК (комбо 1)

    return null; // всё в порядке
}


// 6. Модальное окно
function showModal(text) {
    document.getElementById('modal-text').textContent = text;
    document.getElementById('modal-overlay').classList.add('visible');
}

function hideModal() {
    document.getElementById('modal-overlay').classList.remove('visible');
}


// 7. Обработка отправки формы
function setupFormSubmit() {
    const form = document.getElementById('order-form');
    form.addEventListener('submit', (e) => {
        const errorText = checkLunchComposition();
        if (errorText) {
            e.preventDefault();
            showModal(errorText);
        }
    });
}


// 8. Кнопка "Окей"
function setupModal() {
    document.getElementById('modal-ok').addEventListener('click', hideModal);
}


// 9. Запуск
document.addEventListener('DOMContentLoaded', () => {
    renderDishes();
    renderOrderSummary();
    setupFilters();
    setupFormSubmit();
    setupModal();
});