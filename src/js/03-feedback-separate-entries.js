// HTML містить розмітку форми.Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// Виконуй це завдання у файлах 03 - feedback.html і 03 - feedback.js.Розбий його на декілька підзавдань:

// TODO: Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// TODO: Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.В іншому випадку поля повинні бути порожніми.
// TODO: Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// TODO: Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import _ from "lodash";

const form = document.querySelector(".feedback-form")
form.addEventListener("input", inputHandler)

// Every form field with unique name gets unique key in the localstorage and value is written in it. 
function inputHandler(evt) {
    localStorage.setItem(`${evt.target.name}-field-value`, evt.target.value);
}

// looping through all the form fields and filling stored data in the localstorage
[...form.elements].forEach(element => {
    console.log(localStorage.getItem(`${element.name}-field-value`));
    if (!localStorage.key) {
        return;
    }
    element.value = localStorage.getItem(`${element.name}-field-value`);
});

