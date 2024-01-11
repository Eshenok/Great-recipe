import breakfast from './assets/category_breakfast.svg';
import meat from './assets/category_meat.svg';
import other from './assets/category_miscellaneous.svg';
import side from './assets/category_side.svg';
import pasta from './assets/category_pasta.svg';
import seafood from './assets/category_seafood.svg';
import vegan from './assets/category_vegetarian.svg';
import start from './assets/category_starter.svg';

export const TEXTS = {
  en: {
    menu: {
      menu: 'Menu',
      profile: 'Profile',
      fridge: 'My fridge'
    },
    inputph: {
      search: ['Search name & ing.', 'Apple', 'Bread', 'Garlic', 'Venetian Duck Ragu', 'Apple Frangipan Tart'],
      fridge: ['Add product'],
      account: {
        pass: 'Password',
        name: 'Name',
        email: 'example@example.com',
      }
    },
    categories: {
      breakfast: {name: 'Breakfast', image: breakfast},
      meat: {name: 'Meat', image: meat},
      side: {name: 'Side', image: other},
      other: {name: 'Other', image: side},
      pasta: {name: 'Pasta', image: pasta},
      seafood: {name: 'Seafood', image: seafood},
      vegan: {name: 'Vegetarian', image: vegan},
      start: {name: 'Starter', image: start},
    },
    titles: {
      infridge: 'In Fridge',
      category: 'Category:',
      recipes: 'Recipes',
      fridge: 'My Fridge',
      profile: 'My Profile',
      login: 'Login',
      reg: 'Registration'
    }
  },
  ru: {
    menu: {
      menu: 'Меню',
      profile: 'Профиль',
      fridge: 'Кухня'
    },
    inputph: {
      search: ['Поиск по наименованию или инг.', 'Яблоко', 'Хлеб', 'Чеснок', 'Венецианское утиное рагу', 'Шарлотка'],
      fridge: ['Добавить продукт'],
      account: {
        pass: 'Пароль',
        name: 'Имя',
        email: 'example@example.ru',
      }
    },
    categories: {
      breakfast: {name: 'Завтраки', image: breakfast},
      meat: {name: 'Мясо', image: meat},
      side: {name: 'Гарниры', image: side},
      other: {name: 'Другое', image: other},
      pasta: {name: 'Паста', image: pasta},
      seafood: {name: 'Морепродукты', image: seafood},
      vegan: {name: 'Вегетарианское', image: vegan},
      start: {name: 'Стартеры', image: start},
    },
    titles: {
      infridge: 'На кухне',
      category: 'Категории:',
      recipes: 'Рецепты',
      fridge: 'Моя кухня',
      profile: 'Мой профиль',
      login: 'Вход',
      reg: 'Регистрация'
    }
  }
}
