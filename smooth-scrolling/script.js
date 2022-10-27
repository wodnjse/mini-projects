// 마우스 스크롤 시 횡스크롤 작동
const scrollHorizontal = document.querySelector(".scoller");

scrollHorizontal.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});