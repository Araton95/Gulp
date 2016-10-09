# AJAX

## Что такое AJAX?

AJAX (аббревиатура от «Asynchronous Javascript And Xml») — технология обращения к серверу без перезагрузки страницы.

## Взаимодействие с сервером

Отправка форм, подзагрузка контента (например, при скроле).

## Отправка форм

### Запрос

```	html
	<form action="actionUrl" method="POST">
		<input type="text" name="name" value="" />
		<input type="email" name="email" value="" />
		<textarea name="message"></textarea>
		<button>Отправить</button>
	</form>
```

При отправке формы можно руководствоваться атрибутами action и method.

```
	$.ajax({
		url: form.attr('action'),
		type: form.attr('method'),
		data: ...
	});
```

## Отправка json 

Отправляется обьект содержащий, например данные формы, или любые другие данные.

```
	{
		"name": "John Cena",        
		"email": "john.cena@wwe.com"
		"message": "Hello"
	}
```

## Ответ сервера

```json
	{
		// Общие ошибки
		"errors": ["Error #1", "Error2"],
		
		// Ошибки валидации, для форм
		"validationErrors": {
			"name": ["Name is required", "Error2"],
			"email": ["E-mail is not valid", "Error2"],
			
			// Общие ошибки валидации
			"base": ["Name is required", "Error2"],
		},
		
		// Данные
		"id": "21",
		"name": "todo #1",
		"description": "sample desc",
		
		// Поле содержащее html с постфиксом html.
		"nameHtml": "<span class="red">J</span>ohn",
	}
```

Если нет полей "errors" или "validationerrors" значит все хорошо.

## Полезные ссылки

*[Документация JQuery](http://api.jquery.com/jquery.ajax/)
*[MDN FormData](https://developer.mozilla.org/ru/docs/Web/API/FormData)
