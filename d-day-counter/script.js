const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');
// container.style.display = 'none';
messageContainer.innerHTML = '<h3>D-day를 입력해 주세요.</h3>';

const dateFormMaker = function () {
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;

    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
    return dateFormat;
};

const counterMaker = function () {
    const targetDateInput = dateFormMaker();
    const nowDate = new Date();
    const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);  // 자정 기준으로
    const remaining = (targetDate - nowDate) / 1000  // '~~': Math.floor()보다 빠름

    if (remaining <= 0) {
        console.log('타이머가 종료되었습니다.');
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
    } else if (isNaN(remaining)) {
        console.log('유효한 시간대가 아닙니다.');
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor((remaining / 3600) % 24),
        remainingMinutes: Math.floor(remaining / 60) % 60,
        remainingSeconds: Math.floor(remaining) % 60
    };

    const documentObj = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minute: document.getElementById('minute'),
        second: document.getElementById('second')
    };

    const timeKeys = Object.keys(remainingObj);
    const docKeys = Object.keys(documentObj);

    for(let i=0; i<timeKeys.length; i++) {
        documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
    }

}