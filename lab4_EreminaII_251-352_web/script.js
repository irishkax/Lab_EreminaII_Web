
// ЛР4: Отрисовка блюд, выбор, подсчёт стоимости

const order = {
    soup: null,
    main: null,
    drink: null
};

const categoryNames = {
    soup: 'Суп',
    main: 'Главное блюдо',
    drink: 'Напиток'
};



// 1. Отрисовка карточек блюд

function renderDishes() {
    document.querySelectorAll('.dishes-grid').forEach(container => {
        const category = container.dataset.category;

        const items = dishes
            .filter(d => d.category === category)
            .sort((a, b) => a.name.localeCompare(b.name));

        container.innerHTML = '';

        items.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.dataset.dish = dish.keyword;

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

    order[dish.category] = dish;
    renderOrderSummary();
}



// 3. Вывод блока "Ваш заказ" + подсчёт стоимости

function renderOrderSummary() {
    const summary = document.getElementById('order-summary');
    const categories = ['soup', 'main', 'drink'];

    const anySelected = categories.some(cat => order[cat] !== null);

    if (!anySelected) {
        summary.innerHTML = '<p class="empty-order">Ничего не выбрано</p>';
        return;
    }

    let html = '';
    let total = 0;

    categories.forEach(cat => {
        const dish = order[cat];
        html += `<div class="order-item">`;
        html += `<p class="order-category">${categoryNames[cat]}</p>`;

        if (dish) {
            html += `<p class="order-dish">${dish.name} ${dish.price}₽</p>`;
            total += dish.price;
        } else {
            const emptyText = cat === 'drink' ? 'Напиток не выбран' : 'Блюдо не выбрано';
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



// 4. Запуск

document.addEventListener('DOMContentLoaded', () => {
    renderDishes();
    renderOrderSummary();
});