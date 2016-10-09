# javascript

## Общая структура:

* **/js**
  - **/Application.js**
      - Инициализирует необходимые глобальные объекты и переменные
  - **/Components**
      - Содержит классы компонентов.
      - Классы располагаются в отдельных файлах.
* **/vendor**
  - Содержит все js вендоры и библиотеки, jQuery, lodash и т.д.

## Глобальные объекты и переменные:

Глобальный объект $$ (два бакса) содержит ссылки на экземляры классов и глобальные переменные. 
Также в $$ можно закешировать window и/или body.

```javascript
	$$.window = $(window);
	$$.body = $(document.body);
```

## Классы:

Как правило, в большинстве случаев классы находятся в одноимённых файлах. Допустимо группировать в одном файле классы 
относящиеся к одной задаче, например класс редактора и классы фигур для редактора. 

Класс Application выполняет роль инициализатора, допустимо выполнять в нём простые действия, которые не имеет смысл 
заворачивать в класс.

```javascript
var $$ = $$ || {};

class Application {
	constructor () {
		this._initNavigateEffects();
		this._initGoogleMap();
		this._initQRPrint();
	}

	_initNavigateEffects () {
		$('.js-background').each(function () {
			if (!$$.isMobile) {
                $$.navigateEffects = new $$.NavigateEffects($(this));
                    $$.route = new $$.Route($$.body);
                } else {
                    $$.navigateEffects = new $$.MobileNavigateEffects($(this));
                }
		});
	}

	_initGoogleMap () {
		$('.b-map').each(function () {
			$$.googleMap = new GoogleMap();
		});
	}
	
	_initQRPrint () {
        $('.js-print-qr').on('click', function (event) {
            event.preventDefault();
            $(this).printThis();
        });
    }
}

$(function () {
	$$.body = $(document.body);
	$$.isMobile = $$.body.data('isMobile');
	
	$$.application = new Application();
});
```

Пример класса:

```javascript
var $$ = $$ || {};

$$.Contacts = class Contacts {
	constructor (root) {
		this.root = root;

		//TODO MAGIC
		this.isVisible = $$.window.width() > 980;

		this._cacheNodes();
		this._createComponents();
		this._bindEvents();
	}

	_cacheNodes () {
		this.nodes = {
			toggle: this.root.find('.js-toggle-form-button'),
			arrow: this.root.find('.js-arrow'),
			openFeedbackInMenuButton: this.root.find('.js-feedback-button-link'),
			openFeedbackButton: this.root.find('.js-open-feedback-contacts'),
			closeButton: this.root.find('.js-close-feedback'),
			feedbackForm: this.root.find('.js-feedback-form')
		};
	}

	_createComponents () {
		this.feedbackForm = new $$.FeedbackForm(this.nodes.feedbackForm);

		this.nodes.feedbackForm.perfectScrollbar();
	}

	_bindEvents () {
		this.nodes.openFeedbackInMenuButton.on('click', () => {
			this._closeForm();
		});

		this.nodes.toggle.on('click', () => {
			this._toggleForm();
		});

		this.nodes.openFeedbackButton.on('click', () => {
			this._openForm();
		});

		this.nodes.closeButton.on('click', () => {
			this._closeForm();
		});

		$$.window.off('resize.contacts');
		
		$$.window.on('resize.contacts', () => {
			if (!this.isVisible) {
				this.root.css({
					left: -this.root.width()
				});
			}
		});
	}

	_toggleForm () {
		if (this.isVisible) {
			this._closeForm();
		} else {
			this._openForm();
		}
	}

	_closeForm () {
		this.isVisible = false;

		this.root
			.removeClass('active')
			.velocity('stop')
			.velocity({
				left: -this.root.width()
			},
			200,
			'linear',
			() => {
				this.nodes.arrow.addClass('to-right');
			}
		);
	}

	_openForm () {
		this.isVisible = true;

		this.root
			.addClass('active')
			.velocity('stop')
			.velocity({
				left: 0
			},
			200,
			'linear',
			() => {
				this.nodes.arrow.removeClass('to-right');
			}
		);
	}
}
```

Общая структура класса:

- В конструкторе:
	- Задаются опции по умолчанию.
	- Объявляются и инициализируются значениями по-умолчанию поля класса.
	- Вызываются базовые методы: _cacheNodes, _createComponents, _bindEvents, _ready.

```javascript
\\root всегда объект jQuery
constructor (root, options = {}) {
	var defaultOptions = {
		duration: 1000,
		easing: 'swing'
	};
	
	this.root = root;
	this.options = _.assign(defaultOptions, options);

	this.boolean = false;
	this.number = 0;
	this.string = "";
	this.object = null;
	this.array = [];

	this._cacheNodes();
	this._createComponents();
	this._bindEvents();
	this._ready();
}
```

- В методе **`_cacheNodes()`**
	- Происходит кеширование всех используемых элементов.

```javascript
_cacheNodes () {
	this.nodes = {
		menu: this.root.find('.js-menu'),
		popup: $()
	};

	this.nodes.items = this.nodes.menu.find('.item');
	this.nodes.activeItem = this.nodes.items.filter('.active');
}
```

- В методе **`_createComponents()`**
	- Происходит создание необходимых компонентов

```javascript
_createComponents () {
	this.nodes.menu.each(function () {
		new Menu($(this));
	});
}
```

- В методе **`_bindEvents()`**
	- Происходит подписка на события

```javascript
_bindEvents () {
	this.nodes.activeItem.on('click', () => {
		// DO something
	});
}
```
 
- В методе **`_ready()`**
	- Выполняются действия по-умолчанию, после того как класс создан и проинициализирован.

```javascript
_ready () {
	this.width = this.root.width();
	this.text = this.root.text();
	
	this._sayHello();
}
```

## Код-стиль:

- **Именование**
	 - Для именования используется верблюжья нотация
	 - `UpperCamelCase` для наименования классов
	 - `lowerCamelCase` для наименования экземпляров классов, методов, полей и переменных.
	 - `_privateMethod` для обозначения приватных методов используется подчеркивание.
	 - Название переменной передает ее суть.
	 - Не используются сокращения (`event, element, index` и т.д.)
		 - кроме общеизвестных `max, min, prev, add, id` и т.д.
- **Отступы**
	- После объявления переменных.
	- До и после использования фигурных скобок `{ }`
- **Пробелы**
	- При объявлении функции до и после скобок `function () {`.
	- После запятой.
	- До и после операторов `a + b`
		- кроме унарных `index++`;
- **Условия**
	- Используется строгое сравнение `===, !==`

При объявлении объекта с помощью литеральной нотации каждое поле записывается на новой строке, кроме случаев если поле одно.
```javascript
var myObject = {
	key1: 'value1',
	key2: 'value2'
};

//Пробелы слева от свойства и справа от значения обязательны.
var myObject = { key1: 'value1' };
```

- **if, else, for, while etc...**
  - обязательны фигурные скобки даже для однострочных записей.
  - "тело" начинается со следующей строчки.

```javascript
if (!items.length) {
	return;
}
```

## Комментарии

В случаях когда на проекте работает больше одного разработчика и если название метода не говорит само за себя 
или инструкция может вызвать вопросы необходимо оставлять комментарии. Для методов в JSDoc формате. 

## lodash:

[Документация](https://lodash.com/docs)

В проектах используется библиотека lodash.
Использование функций lodash приоритетнее чем использование нативных.

- **Например**

```javascript
var firstItem = _.first(array);
var lastItem = _.last(array);

_.forEach(array, function (n) {
  console.log(n);
});

this.options = _.assign(defaultOptions, options);
```
