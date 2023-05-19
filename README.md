# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn istall`
Istall all node_modules

### `npm start`

## 4.0.0-master (19.05.2023 - release )
- `bugfix`: кнопка "оформить заказ" теперь доступна только при собранном бургере
- `bugfix`: добавлена возможность изменять пароль в профиле
- `bugfix`: исправлена шапка панели навигации: активна при выбранном маршруте
- `bugfix`: отцентрировано изображение ингредиента в модальном окне
- `feature`: в компоненте `OrderingInfo` только авторизованные пользователи могут делать заказы. В противном случае вызывается простое модальное окно с предупреждением.
- `feature`: в utils добавлен GlobalSessionStorage для работы с локальным хранилищем браузера
- `feature`: доработан роутинг для маршурта /ingredients/:id: изменение динамического маршрута при открытии модального окна, открытие нового окна с деталями игредиента при переходе по  конкретному маршруту, сохранение открытого окна при перезагрузке
- `feature`: создан защищённый маршрут ProtectedRoute
- `feature`: добавлен экран маршрута /ingredients/:id — страница ингредиента.
- `feature`: добавлен экран маршрута /profile
- `feature`: добалены экраны /forgot-password и /reset-password
- `feature`: на экране /register клик на «Войти» направляет пользователя на маршрут /login.
- `feature`: на экране /login клик на «Восстановить пароль» направляет пользователя на маршрут /forgot-password.
- `feature`: создан экран /login, в котором клик на «Зарегистрироваться» перенаправляет пользователя на маршрут /register.
- `feature`: переработано хранилище store.rootReducer на formReducer, orderReducer, ingredientsReducer и modalReducer
- `feature`: создана главная страница приложения / - constructorPage
- `feature`: добавлена директория pages, установлены компоненты BrowserRouter, Router и Routes
- `feature`: добавлена библиотека react-router-dom
## 3.0.0-master (29.04.2023 - release)
- `bugfix`: общая логика проверки ответа во всех запросах вынесена в отдельную функцию checkResponse директории utils
- `bugfix`: убраны экшены для конкретных попапов из Modal
- `bugfix`: удалён getIngredientsData из App. Заменён на вызов thunk с запросом ингредиентов.
- `bugfix`: апи 'https://norma.nomoreparties.space/api/ вынесен в общую константу env.js для последующего добалвения в .env
- `bugfix`: убрана логика добавления ингредиента в заказ при клике на него (теперь через Dnd)
- `bugfix`: исравлено открытие заказа при нажатии на ингредиенты
- `feature`: добавлена логика DnD, Redux и усилителей
- `feature`: добавлен уникальный uuid для ингредиентов в заказе
- `bugfix`: исправлен баг с прокруткой хидера игредиентов при скролле
- `feature`: реализоавно добавление данных о количестве добавленных игредиентов в IngredientDetails
- `feature`: реализоавно получение и обновление номера заказа в модальном окне OrderDetails
- `feature`: реализовано получение списка ингредиентов от API в компоненте BurgerIngredients
- `feature`: инициализировано хранилище Redux
- `feature`: добавлены зависимости react-redux, redux-thunk, redux, react-dnd, react-dnd-html5-backend, uuid

## 2.0.0-master (15.04.2023 - release)
- `feature`: компоненты добавлены в index.js
- `bugfix`: В BurgerConstructor исравлен баг с подчётом финальной цены. Применён метод массива reduce вместо forEach
- `bugfix`: Удаление неиспользуемых стилей в модулях css
- `feature`: Добавлены компоненты содержимого модальных окон: IngredientDetails и OrderDetails
- `feature`: Добавлены компоненты главной страницы: Modal и ModalOverlay
- `feature`: Подключиение к API https://norma.nomoreparties.space/api/ingredients

## 1.0.0-master (08.04.2023 - release)
- `feature`: Вёрстка BurgerConstructor - компонента
- `feature`: Вёрстка BurgerIngredients - компонент
- `feature`: Вёрстка AppHeader - компонента
- `feature`: Установлена библиотека UI-компонентов

