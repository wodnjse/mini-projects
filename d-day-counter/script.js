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

    const remainingDate = Math.floor(remaining / 3600 / 24);
    const remainingHours = Math.floor((remaining / 3600) % 24);
    const remainingMinutes = Math.floor(remaining / 60) % 60;
    const remainingSeconds = Math.floor(remaining) % 60;

    console.log(remainingDate, remainingHours, remainingMinutes, remainingSeconds);
}