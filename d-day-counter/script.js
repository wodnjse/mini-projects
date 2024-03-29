const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');
const savedDate = localStorage.getItem('saved-date');

const intervalIdArr = [];

const dateFormMaker = function() {
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDate = document.querySelector('#target-date-input').value;
    
    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
    return dateFormat;
};

const counterMaker = function(data) {
    if(data !== savedDate) {
        localStorage.setItem('saved-date', data);
    }
    const nowDate = new Date();
    const targetDate = new Date(data).setHours(0, 0, 0, 0);  // 자정 기준으로
    const remaining = (targetDate - nowDate) / 1000  // '~~': Math.floor()보다 빠름
    
    if (remaining <= 0) {
        container.style.display = 'none';
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval();
        return;
    } else if (isNaN(remaining)) {
        container.style.display = 'none';
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval();
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
    
    const format = function(time) {
        if (time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    };

    let i = 0;  
    for(let tag of documentArr) {
        const remainingTime = format(remainingObj[timeKeys[i]]);
        document.getElementById(tag).textContent = remainingTime;
        i++;
    }
};

const starter = function(targetDateInput) {
    if(!targetDateInput) {
        targetDateInput = dateFormMaker();
    }
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
    localStorage.removeItem('saved-date');
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

if(savedDate) {  // if문 괄호안의 값이 'truty'라면 실행 됨
    starter(savedDate);
} else {
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-day를 입력해 주세요.</h3>';
};