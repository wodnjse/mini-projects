const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');
const intervalIdArr = [];

container.style.display = 'none';
messageContainer.innerHTML = '<h3>D-day를 입력해 주세요.</h3>';

const dateFormMaker = function() {
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;

    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
    return dateFormat;
};

const counterMaker = function(data) {
    const nowDate = new Date();
    const targetDate = new Date(data).setHours(0, 0, 0, 0);  // 자정 기준으로
    const remaining = (targetDate - nowDate) / 1000  // '~~': Math.floor()보다 빠름

    if (remaining <= 0) {
        container.style.display = 'none';
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval()
        return;
    } else if (isNaN(remaining)) {
        container.style.display = 'none';
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval()
        return;
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 24,
        remainingMinutes: Math.floor(remaining / 60) % 60,
        remainingSeconds: Math.floor(remaining) % 60
    };

    const documentArr = ['days', 'hours', 'minute', 'second'];
    const timeKeys = Object.keys(remainingObj);
    
    let i = 0;  
    for(let tag of documentArr) {
        const remainingTime = remainingObj[timeKeys[i]];
        document.getElementById(tag).textContent = remainingTime;
        i++;
    }
};

const starter = function() {
    const targetDateInput = dateFormMaker();
    container.style.display = 'flex';
    messageContainer.style.display = 'none';
    setClearInterval();
    counterMaker(targetDateInput);
    const intervalId = setInterval(() => {
        counterMaker(targetDateInput);
    }, 1000);
    intervalIdArr.push(intervalId);
};

const setClearInterval = function() {
    for (let i=0; i<intervalIdArr.length; i++) {
        clearInterval(intervalIdArr[i]);
    }
}

const resetTimer = function() {
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-day를 입력해 주세요.</h3>';
    messageContainer.style.display = 'flex';
    setClearInterval();
}