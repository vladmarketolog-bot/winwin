/**
 * Handles form submissions for WinWin Group website.
 * Sends data to Google Sheets via Google Apps Script.
 */

// =========================================================================
// ВАЖНО: Вставь сюда свой URL веб-приложения (Web App URL) от Google Apps Script
// =========================================================================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznkgfUUFjfPYwmfNKMKOLKacwF3PPWFW1vStXU42yHjIZt3gTu9rrgxvgmS_Uy2BdqAQ/exec';

async function handleFormSubmit(event) {
    event.preventDefault();

    if (SCRIPT_URL === 'INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE' || SCRIPT_URL === '') {
        alert('Ошибка настройки: SCRIPT_URL не указан.');
        return;
    }

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Отправить';

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка...';
    }

    // Собираем основные данные формы
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    // Добавляем технические данные
    data['source'] = window.location.pathname;
    data['referrer'] = document.referrer;
    data['device'] = `${navigator.platform} | ${window.screen.width}x${window.screen.height}`;
    data['browser'] = navigator.userAgent;

    // Сбор UTM-меток
    const urlParams = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
        data[param] = urlParams.get(param) || '';
    });

    // Попытка получить IP и Гео (не блокирует отправку при ошибке)
    try {
        const ipResponse = await fetch('https://ipapi.co/json/', { method: 'GET' });
        if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            data['ip'] = ipData.ip;
            data['country'] = ipData.country_name;
            data['city'] = ipData.city;
        }
    } catch (e) {
        console.warn('Не удалось получить GeoIP данные:', e);
    }

    try {
        // Отправка в Google Apps Script
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' }
        });

        alert('Спасибо! Ваша заявка успешно отправлена. Менеджер свяжется с вами в течение 15 минут.');
        form.reset();

        if (typeof modalOpen !== 'undefined') {
            // Попытка закрыть модалку через Alpine, если доступно
            if (window.Alpine) {
                // Триггер события для закрытия (если настроено) или просто пользователь закроет сам
            }
        }

    } catch (error) {
        console.error('Error!', error);
        alert('Произошла ошибка при отправке. Пожалуйста, позвоните нам по номеру +7 (843) 297-57-95.');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    }
}
