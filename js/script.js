const filterByType = (type, ...values) => values.filter(value => typeof value === type), // проверяем на соответствие типу введенных данных 

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получаем коллекцию со страницы
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебираем и скрываем блок

	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //функция показывает блок в зависимости от резуьтата
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block'; // добавляет блок на страницу
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText; // записываем в span
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // функция для обработки ошибки

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // функция для обработки положительного результата

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // функция для обработки если данные не были введены

	tryFilterByType = (type, values) => { // функция обработки ошибок
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // получае данные из инпута в зависимости от выбранного селектора
			console.log(valuesArray);
			const alertMsg = (valuesArray.length) ? //делаем проверку на соответствие выбранным типам
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) { // если ошибка выводим сообщение
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получили кнопку 

filterButton.addEventListener('click', e => { // навешиваем событие click
	const typeInput = document.querySelector('#type'); //получаем selcetor
	const dataInput = document.querySelector('#data'); // получаем инпут ввода данных

	if (dataInput.value === '') { // проверка на пустоту
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //Метод устанавливает специальное сообщение для выбранного элемента
		showNoResults();
	} else {
		dataInput.setCustomValidity(''); //элемент не имеет пользовательской ошибки в параметре укажите пустую строку 
		e.preventDefault(); // отменяем стандартное поведение браузера
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызываем функцию обработки ошибки
	}
});
