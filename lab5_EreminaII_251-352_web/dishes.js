const dishes = [
    // ==================== СУПЫ ====================
    {
        keyword: 'gazpacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        kind: 'veg',
        count: '350 г',
        image: 'images/soup1.jpg'
    },
    {
        keyword: 'mushroom_soup',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        kind: 'veg',
        count: '330 г',
        image: 'images/soup2.jpg'
    },
    {
        keyword: 'norwegian_soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        kind: 'fish',
        count: '330 г',
        image: 'images/soup3.jpg'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        kind: 'meat',
        count: '425 г',
        image: 'images/soup4.jpg'
    },
    {
        keyword: 'tom_yam',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        kind: 'fish',
        count: '500 г',
        image: 'images/soup5.jpg'
    },
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        kind: 'meat',
        count: '350 г',
        image: 'images/soup6.jpg'
    },

    // ==================== ГЛАВНЫЕ БЛЮДА ====================
    {
        keyword: 'fried_potato',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        kind: 'veg',
        count: '250 г',
        image: 'images/main1.jpg'
    },
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main',
        kind: 'meat',
        count: '310 г',
        image: 'images/main2.jpg'
    },
    {
        keyword: 'cutlets',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 225,
        category: 'main',
        kind: 'meat',
        count: '280 г',
        image: 'images/main3.jpg'
    },
    {
        keyword: 'fish_cutlet',
        name: 'Рыбная котлета с рисом и спаржей',
        price: 320,
        category: 'main',
        kind: 'fish',
        count: '270 г',
        image: 'images/main4.jpg'
    },
    {
        keyword: 'pizza_margarita',
        name: 'Пицца Маргарита',
        price: 450,
        category: 'main',
        kind: 'veg',
        count: '470 г',
        image: 'images/main5.jpg'
    },
    {
        keyword: 'pasta_shrimp',
        name: 'Паста с креветками',
        price: 340,
        category: 'main',
        kind: 'fish',
        count: '280 г',
        image: 'images/main6.jpg'
    },

    // ==================== САЛАТЫ / СТАРТЕРЫ ====================
    {
        keyword: 'korean_salad',
        name: 'Корейский салат с овощами и яйцом',
        price: 330,
        category: 'salad',
        kind: 'veg',
        count: '250 г',
        image: 'images/salad1.jpg'
    },
    {
        keyword: 'caesar_chicken',
        name: 'Цезарь с цыпленком',
        price: 370,
        category: 'salad',
        kind: 'meat',
        count: '220 г',
        image: 'images/salad2.jpg'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad',
        kind: 'veg',
        count: '235 г',
        image: 'images/salad3.jpg'
    },
    {
        keyword: 'tuna_salad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad',
        kind: 'fish',
        count: '250 г',
        image: 'images/salad4.jpg'
    },
    {
        keyword: 'fries_caesar',
        name: 'Картофель фри с соусом Цезарь',
        price: 280,
        category: 'salad',
        kind: 'veg',
        count: '235 г',
        image: 'images/salad5.jpg'
    },
    {
        keyword: 'fries_ketchup',
        name: 'Картофель фри с кетчупом',
        price: 260,
        category: 'salad',
        kind: 'veg',
        count: '235 г',
        image: 'images/salad6.jpg'
    },

    // ==================== НАПИТКИ ====================
    {
        keyword: 'orange_juice',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'images/drink1.jpg'
    },
    {
        keyword: 'apple_juice',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'images/drink2.jpg'
    },
    {
        keyword: 'carrot_juice',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'images/drink3.jpg'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/drink4.jpg'
    },
    {
        keyword: 'green_tea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/drink5.jpg'
    },
    {
        keyword: 'black_tea',
        name: 'Черный чай',
        price: 90,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'images/drink6.jpg'
    },

    // ==================== ДЕСЕРТЫ ====================
    {
        keyword: 'pakhlava',
        name: 'Пахлава',
        price: 220,
        category: 'dessert',
        kind: 'small',
        count: '300 г',
        image: 'images/dessert1.jpg'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 240,
        category: 'dessert',
        kind: 'medium',
        count: '125 г',
        image: 'images/dessert2.jpg'
    },
    {
        keyword: 'choco_cheesecake',
        name: 'Шоколадный чизкейк',
        price: 260,
        category: 'dessert',
        kind: 'medium',
        count: '125 г',
        image: 'images/dessert3.jpg'
    },
    {
        keyword: 'choco_cake',
        name: 'Шоколадный торт',
        price: 270,
        category: 'dessert',
        kind: 'small',
        count: '140 г',
        image: 'images/dessert4.jpg'
    },
    {
        keyword: 'donuts_3',
        name: 'Пончики (3 штуки)',
        price: 410,
        category: 'dessert',
        kind: 'medium',
        count: '350 г',
        image: 'images/dessert5.jpg'
    },
    {
        keyword: 'donuts_6',
        name: 'Пончики (6 штук)',
        price: 650,
        category: 'dessert',
        kind: 'large',
        count: '700 г',
        image: 'images/dessert6.jpg'
    }
];