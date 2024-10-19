const cards = document.querySelectorAll('.cards');
const cardClose = document.querySelectorAll('.card-close');
const cardNext = document.querySelectorAll('.card-next');
let topValue = 20;
let widthValue = 100;
let leftValue = 2;

function openCard(i){
    const currentCard = cards[i];
    const previousCard = cards[i - 1];
    const nextCard = cards[i + 1];

    currentCard.style.left = leftValue+"%";
    currentCard.style.width = (widthValue - 4)+"%";
    currentCard.style.top = topValue+"px";

    nextCard.style.top = (topValue + 10)+"px"; 

    if(previousCard != undefined){
        previousCard.style.top = (topValue + 10)+"px";
        previousCard.style.width = (widthValue - 8)+"%";
        previousCard.style.left = (leftValue + 2)+"%";
    }
}

function closeCard(i){
    const currentCard = cards[i + 1];
    const previousCard = cards[i];
    const previousCardPrevSibling = previousCard.previousElementSibling;

    currentCard.style.top = "999px";

    if(previousCard != undefined){
        previousCard.style.width = widthValue+"%";
        previousCard.style.left = "0";
        previousCard.style.top = (topValue + 10)+"px";
    }

    if(previousCardPrevSibling != undefined){
        previousCardPrevSibling.style.width = (widthValue - 4)+"%";
        previousCardPrevSibling.style.left = leftValue+"%";
        previousCardPrevSibling.style.top = topValue+"px";
    }else{return;}
};

cardNext.forEach((nextBtn, i) => {
    nextBtn.addEventListener('click', e => {
        e.preventDefault();
        openCard(i);
    }, false);
});

cardClose.forEach((closeBtn, i) => {
    closeBtn.addEventListener('click', e => {
        e.preventDefault();
        closeCard(i);
    }, false);
})

window.addEventListener('load', () => {
    cards[0].style.top = topValue+"px";
    cards[0].style.width = widthValue+"%";
})
