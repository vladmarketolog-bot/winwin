/**
 * Handles form submissions for WinWin Group website.
 * Sends data to Google Sheets via Google Apps Script.
 */

// =========================================================================
// ВАЖНО: Вставь сюда свой URL веб-приложения (Web App URL) от Google Apps Script
// Пример: 'https://script.google.com/macros/s/AKfycbx.../exec'
// =========================================================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLvwxRSROW7fWT1zbtyrksVCCy7X3IylHpJTBag0mcOE6vaKZLHeYGrtVRxR5POZks/exec';

async function handleFormSubmit(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Проверяем, настроен ли URL
    if (SCRIPT_URL === 'INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE' || SCRIPT_URL === '') {
        alert('Ошибка настройки: В файле assets/js/form-handler.js не указан SCRIPT_URL. Пожалуйста, сообщите администратору.');
        console.error('SCRIPT_URL is missing.');
        return;
    }

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Отправить';

    // Блокируем кнопку, чтобы не нажали дважды
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка...';
    }

    // Собираем данные формы
    const formData = new FormData(form);
    const data = {};

    // Преобразуем FormData в простой объект
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Добавляем источник (текущая страница)
    data['source'] = window.location.pathname;

    try {
        // Отправляем данные используя fetch
        // mode: 'no-cors' позволяет отправлять данные на другой домен (Google) без ошибок CORS в консоли,
        // но мы не сможем прочитать ответ (он будет "opaque").
        // Для простых форм это допустимо: если fetch не упал с ошибкой сети, считаем, что отправилось.
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Успех!
        alert('Спасибо! Ваша заявка успешно отправлена. Менеджер свяжется с вами в течение 15 минут.');
        form.reset(); // Очищаем форму

        // Если это модальное окно, можно его закрыть
        if (typeof modalOpen !== 'undefined') {
            // Alpine.js variable handling via DOM if needed, 
            // but 'modalOpen = false' might not work directly inside this pure JS function 
            // unless we dispatch an event or users click 'X'.
            // For now, simple alert is enough feedback.

            // Попытаемся закрыть модалку, если используется Alpine
            if (window.Alpine) {
                // Найти элемент с x-data, содержащий modalOpen
                // Это сложно сделать универсально, поэтому оставим пользователю закрыть самому или Reset
            }
        }

    } catch (error) {
        console.error('Error!', error);
        alert('Произошла ошибка при отправке. Пожалуйста, позвоните нам по номеру +7 (843) 297-57-95.');
    } finally {
        // Возвращаем кнопку в исходное состояние
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    }
}
