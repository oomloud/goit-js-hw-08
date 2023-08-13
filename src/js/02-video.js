// Ознайомся з документацією бібліотеки Vimeo плеєра.
// Додай бібліотеку як залежність проекту через npm.
// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre - existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
// Зберігай час відтворення у локальне сховище.Нехай ключем для сховища буде рядок "videoplayer-current-time".
// Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
// Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.
// remove localstorage in case user watched the video to the very end of the video

import Player from '@vimeo/player';

const _ = require("lodash");
const iframe = document.querySelector('iframe');
const player = new Player(iframe)

// saving timestamp from local storage to variable
const savedTimestamp = JSON.parse(localStorage.getItem("videoplayer-current-time"));

// checking if there's timestamp saved in local storage for the video
if (savedTimestamp) {
    // setting the player position to the saved timestamp
    player.setCurrentTime(savedTimestamp.seconds).then(function (seconds) {
        // seconds = the actual time that the player seeked to
    }).catch(function (error) {
        switch (error.name) {
            case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;

            default:
                // some other error occurred
                break;
        }
    });
}

// reading the current video timestamp every 1s 
player.on('timeupdate', _.throttle((evt) => {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(evt))
    // deleting the localstorage data in case user watched the video to the very end of the video
    if (evt.percent === 1) {
        localStorage.removeItem("videoplayer-current-time");
    }
}, 1000, { trailing: true }))