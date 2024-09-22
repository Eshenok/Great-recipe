import breakfast from './assets/category_breakfast.svg';
import meat from './assets/category_meat.svg';
import other from './assets/category_miscellaneous.svg';
import side from './assets/category_side.svg';
import pasta from './assets/category_pasta.svg';
import seafood from './assets/category_seafood.svg';
import vegan from './assets/category_vegetarian.svg';
import start from './assets/category_starter.svg';
import dessert from './assets/category_dessert.svg';
import LanguageType from './Types/LanguageType';
import { CategoryItemType } from './Types/CategoryItemType';

type Texts = {
  reses: Record<string, string>;
  menu: Record<string, string>;
  smiles: Record<number, number>;
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
    smiles: {
      1: 128528,
      2: 128521,
      3: 129323,
      4: 128523,
      5: 129321
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
      reg: 'Registration',
      rate: 'Liked? Rate it!',
      nf: "mh... it's empty here",
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
      checkPassErr: 'Password mismatch',
      nfWhatHappens: 'What happened?',
      nfWhatToDo: 'What to do?',
      nfGood: 'Everything is good, it happens',
      nfWhatHappensTxt: 'The link you followed may be out of date or contain a typo.',
      nfWhatToDoTxtFH: 'Go to the page ',
      nfWhatToDoTxtLH: 'which definetely exists.',
      nfWhatToDoTxtLFH: 'Or ',
      nfWhatToDoTxtLLH: 'and we will fix everything.',
      nfWhatToDoLinkF: 'from the menu, ',
      nfWhatToDoLinkL: 'write to us ',
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
    smiles: {
      1: 128528,
      2: 128521,
      3: 129323,
      4: 128523,
      5: 129321
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
      reg: 'Регистрация',
      rate: 'Понравился? Оцени!',
      nf: "упс... тут пусто"
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
      checkPassErr: 'Пароли не совпадают',
      nfWhatHappens: 'Что произошло?',
      nfWhatToDo: 'Что делать дальше?',
      nfGood: 'Все хорошо, так бывает',
      nfWhatHappensTxt: 'Возможно ссылка, по которой вы перешли, устарела или содержит опечатку.',
      nfWhatToDoTxtFH: 'Перейдите на нашу ',
      nfWhatToDoTxtLH: 'которая точно существует.',
      nfWhatToDoTxtLFH: 'Или ',
      nfWhatToDoTxtLLH: 'и мы все исправим.',
      nfWhatToDoLinkF: 'главную страницу, ',
      nfWhatToDoLinkL: 'напишите нам ',
    }
  }
}

export const MAX_PREV_QUERYIES = 20;