const dateFormMaker = function () {
    const inputYear = document.querySelector('#target-year-input');
    const inputMonth = document.querySelector('#target-month-input');
    const inputDate = document.querySelector('#target-date-input');
};

const counterMaker = function () {
    const nowDate = new Date();
    const targetDate = new Date('2024-01-01');
    const remaining = ~~((targetDate - nowDate) / 1000)  // '~~': Math.floor()보다 빠름

    console.log(remaining);
}