// Define elements using proper TypeScript typing
const cards = document.querySelectorAll<HTMLElement>('.cards');
const cardClose = document.querySelectorAll<HTMLButtonElement>('.card-close');
const cardNext = document.querySelectorAll<HTMLButtonElement>('.card-next');

// Variables for positioning
let topValue = 20;
let widthValue = 100;
let leftValue = 2;

function openCard(i: number): void {
    const currentCard = cards[i] as HTMLElement;
    const previousCard = cards[i - 1] as HTMLElement | undefined;
    const nextCard = cards[i + 1] as HTMLElement | undefined;

    // Ensure current card exists
    if (currentCard) {
        currentCard.style.left = `${leftValue}%`;
        currentCard.style.width = `${widthValue - 4}%`;
        currentCard.style.top = `${topValue}px`;
    }

    if (nextCard) {
        nextCard.style.top = `${topValue + 10}px`;
    }

    if (previousCard) {
        previousCard.style.top = `${topValue + 10}px`;
        previousCard.style.width = `${widthValue - 8}%`;
        previousCard.style.left = `${leftValue + 2}%`;
    }
}

function closeCard(i: number): void {
    const currentCard = cards[i + 1] as HTMLElement | undefined;
    const previousCard = cards[i] as HTMLElement | undefined;
    const previousCardPrevSibling = previousCard?.previousElementSibling as HTMLElement | null;

    // Ensure current and previous cards exist
    if (currentCard) {
        currentCard.style.top = "999px";
    }

    if (previousCard) {
        previousCard.style.width = `${widthValue}%`;
        previousCard.style.left = "0";
        previousCard.style.top = `${topValue + 10}px`;
    }

    if (previousCardPrevSibling) {
        previousCardPrevSibling.style.width = `${widthValue - 4}%`;
        previousCardPrevSibling.style.left = `${leftValue}%`;
        previousCardPrevSibling.style.top = `${topValue}px`;
    }
}

// Add event listeners to the 'next' buttons
cardNext.forEach((nextBtn, i) => {
    nextBtn.addEventListener('click', (e: Event) => {
        e.preventDefault();
        openCard(i);
    }, false);
});

// Add event listeners to the 'close' buttons
cardClose.forEach((closeBtn, i) => {
    closeBtn.addEventListener('click', (e: Event) => {
        e.preventDefault();
        closeCard(i);
    }, false);
});

// Set the initial card position on window load
window.addEventListener('load', () => {
    if (cards[0]) {
        cards[0].style.top = `${topValue}px`;
        cards[0].style.width = `${widthValue}%`;
    }
});


window.addEventListener('load', () => {
    cards[0].style.top = topValue+"px";
    cards[0].style.width = widthValue+"%";
})
