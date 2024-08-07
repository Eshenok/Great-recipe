import breakfast from './assets/category_breakfast.svg';
import meat from './assets/category_meat.svg';
import other from './assets/category_miscellaneous.svg';
import side from './assets/category_side.svg';
import pasta from './assets/category_pasta.svg';
import seafood from './assets/category_seafood.svg';
import vegan from './assets/category_vegetarian.svg';
import start from './assets/category_starter.svg';
import dessert from './assets/category_dessert.svg';
import {ServerRecipeType} from "./Types/ServerRecipeType";
import LanguageType from './Types/LanguageType';
import { CategoryItemType } from './Types/CategoryItemType';

type Texts = {
  reses: Record<string, string>;
  menu: Record<string, string>;
  inputlabel: Record<string, string>;
  inputph: Record<string, string | string[] | { [key: string]: string }>;
  categories: Record<string, CategoryItemType>;
  titles: Record<string, string>;
  filter: Record<string, string>;
  btns: Record<string, string>;
  info: Record<string, string>;
};

export const BASE_URL = 'http://localhost:2020';

export const TEXTS: Record<LanguageType, Texts> = {
  en: {
    reses: {
      '200 Update': 'User updated',
      '401': 'Uncorrect email or password',
      '404': 'User not found',
      '403': 'Access forbidden',
      '409': 'User has been created',
      '500': 'Server error',
    },
    menu: {
      menu: 'Menu',
      profile: 'Profile',
      fridge: 'My fridge'
    },
    inputlabel: {
      pass: 'Password',
      oldPass: 'Current password',
      newPass: 'New password',
      passcheck: 'Confirm password',
      name: 'Name',
      email: 'Email'
    },
    inputph: {
      search: ['Search name & ing.', 'Apple', 'Bread', 'Garlic', 'Venetian Duck Ragu', 'Apple Frangipan Tart'],
      fridge: ['Add product'],
      ings: 'Quantity',
      account: {
        pass: 'Password',
        name: 'Name',
        email: 'example@example.com',
        passcheck: '********'
      }
    },
    categories: {
      breakfast: {name: 'Breakfast', image: breakfast},
      meat: {name: 'Meat', image: meat},
      side: {name: 'Side', image: other},
      miscellaneous: {name: 'Other', image: side},
      pasta: {name: 'Pasta', image: pasta},
      seafood: {name: 'Seafood', image: seafood},
      vegetarian: {name: 'Vegetarian', image: vegan},
      starter: {name: 'Starter', image: start},
      dessert: {name: 'Dessert', image: dessert},
    },
    titles: {
      infridge: 'In Fridge',
      category: 'Category:',
      recipes: 'Recipes',
      fridge: 'My Fridge',
      profile: 'My Profile',
      login: 'Login',
      reg: 'Registration'
    },
    filter: {
      rating: 'User rating',
      ingr: 'Ingredients up to',
      favourite: 'Favourite',
    },
    btns: {
      log: 'Login',
      submit: 'Submit',
      reg: 'Registration',
      edit: 'Edit profile',
      exit: 'Exit',
      change: 'Change Password',
      clearFilter: 'clear filter',
      ings: 'Ingridients',
      back: 'Go back'
    },
    info: {
      recipesNf: 'No one receipt find',
      checkPassErr: 'Password mismatch'
    },
  },
  ru: {
    reses: {
      '200 Update': 'Пользователь успешно обновлен',
      '401': 'Неправильная почта или пароль',
      '404': 'Пользователь не найден',
      '403': 'Доступ запрещен',
      '409': 'Такой пользователь уже существует',
      '500': 'Произошла непредвиденная ошибка',
    },
    menu: {
      menu: 'Меню',
      profile: 'Профиль',
      fridge: 'Кухня'
    },
    inputlabel: {
      pass: 'Пароль',
      oldPass: 'Текущий пароль',
      newPass: 'Новый пароль',
      passcheck: 'Подтвердите пароль',
      name: 'Имя',
      email: 'Почта'
    },
    inputph: {
      search: ['Поиск по наименованию или инг.', 'Яблоко', 'Хлеб', 'Чеснок', 'Венецианское утиное рагу', 'Шарлотка'],
      fridge: ['Добавить продукт'],
      ings: 'Кол-во',
      account: {
        pass: 'Пароль',
        name: 'Имя',
        email: 'example@example.ru',
        passcheck: '********'
      }
    },
    categories: {
      breakfast: {name: 'Завтраки', image: breakfast},
      meat: {name: 'Мясо', image: meat},
      side: {name: 'Гарниры', image: side},
      miscellaneous: {name: 'Другое', image: other},
      pasta: {name: 'Паста', image: pasta},
      seafood: {name: 'Морепродукты', image: seafood},
      vegetarian: {name: 'Вегетарианское', image: vegan},
      starter: {name: 'Стартеры', image: start},
      dessert: {name: 'Дессерты', image: dessert},
    },
    titles: {
      infridge: 'На кухне',
      category: 'Категории:',
      recipes: 'Рецепты',
      fridge: 'Моя кухня',
      profile: 'Мой профиль',
      login: 'Вход',
      reg: 'Регистрация'
    },
    filter: {
      rating: 'Оценка',
      ingr: 'По количеству инг.',
      favourite: 'Избранное',
    },
    btns: {
      log: 'Вход',
      submit: 'Подтердить',
      reg: 'Регистрация',
      edit: 'Изменить профиль',
      exit: 'Выход',
      change: 'Сменить пароль',
      clearFilter: 'очистить фильтр',
      ings: 'Игнридиентов',
      back: 'Назад'
    },
    info: {
      recipesNf: 'Ни одного рецепта не найдено',
      checkPassErr: 'Пароли не совпадают'
    }
  }
}

export const TEST_RECIPE: ServerRecipeType   = {
  "_id": "64e9c84d12cc191bd61eb812",
  "idMeal": "52768",
  "strMeal": "Apple Frangipan Tart",
  "strDrinkAlternate": null,
  "strCategory": "Meat",
  "strArea": "British",
  "strInstructions": "Preheat the oven to 200C/180C Fan/Gas 6.\r\nPut the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter. Tip into the tart tin and, using the back of a spoon, press over the base and sides of the tin to give an even layer. Chill in the fridge while you make the filling.\r\nCream together the butter and sugar until light and fluffy. You can do this in a food processor if you have one. Process for 2-3 minutes. Mix in the eggs, then add the ground almonds and almond extract and blend until well combined.\r\nPeel the apples, and cut thin slices of apple. Do this at the last minute to prevent the apple going brown. Arrange the slices over the biscuit base. Spread the frangipane filling evenly on top. Level the surface and sprinkle with the flaked almonds.\r\nBake for 20-25 minutes until golden-brown and set.\r\nRemove from the oven and leave to cool for 15 minutes. Remove the sides of the tin. An easy way to do this is to stand the tin on a can of beans and push down gently on the edges of the tin.\r\nTransfer the tart, with the tin base attached, to a serving plate. Serve warm with cream, crème fraiche or ice cream.",
  "strMealThumb": "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
  "strTags": "Tart,Baking,Fruity",
  "dateModified": null,
  "quantityLiked": [
    "6541258360cbb0c1f09d7c02",
    "65426ba66a994ccbd061e977"
  ],
  "rating": [
    {
      "user": "65426ba66a994ccbd061e977",
      "rate": 5,
      "_id": "65a2e4908f4f1768251932fb"
    }
  ],
  "__v": 4,
  "arrIngredients": [
    "digestive biscuits",
    "butter",
    "bramley apples",
    "butter, softened",
    "caster sugar",
    "free-range eggs, beaten",
    "ground almonds",
    "almond extract",
    "flaked almonds",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  "arrMeasure": [
    "175g/6oz",
    "75g/3oz",
    "200g/7oz",
    "75g/3oz",
    "75g/3oz",
    "2",
    "75g/3oz",
    "1 tsp",
    "50g/1¾oz",
    "",
    "",
    "",
    "",
    "",
    "",
    null,
    null,
    null,
    null,
    null
  ]
}
