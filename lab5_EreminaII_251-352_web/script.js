// ======================================================
// ЛР5: Отрисовка, фильтры, выбор, подсчёт стоимости
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


// 1. Отрисовка карточек (с учётом активного фильтра)
function renderDishes() {
    document.querySelectorAll('.dishes-grid').forEach(container => {
        const category = container.dataset.category;
        const section = container.closest('.menu-section');

        const activeKind = section.dataset.activeFilter || null;

        let items = dishes.filter(d => d.category === category);
        if (activeKind) {
            items = items.filter(d => d.kind === activeKind);
        }

        items = items.sort((a, b) => a.name.localeCompare(b.name));

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
        order[dish.category] = null; // повторный клик — снять выбор
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


// 4. Блок "Ваш заказ" + подсчёт
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


// 5. Запуск
document.addEventListener('DOMContentLoaded', () => {
    renderDishes();
    renderOrderSummary();
    setupFilters();
});