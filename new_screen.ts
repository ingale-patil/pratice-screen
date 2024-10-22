import { AfterViewInit, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recon-card-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recon-card-view.component.html',
  styleUrl: './recon-card-view.component.css'
})
export class ReconCardViewComponent implements AfterViewInit{

  private cards: HTMLElement[] = [];
  private currentCard!: HTMLElement;
  private nextCard!: HTMLElement;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  

  ngAfterViewInit(): void {
    const cardElements = this.el.nativeElement.querySelectorAll('.card');
    this.cards = Array.from(cardElements) as HTMLElement[];

    // Initialize current card
    const currentCard = this.cards.find(card => card.classList.contains('card--current'));
    if (currentCard) {
      this.currentCard = currentCard;
    } else {
      this.currentCard = this.cards[this.cards.length - 1];
      this.triggerCardClick(this.cards[0]);  // Trigger first card's click by default
    }

    this.el.nativeElement.classList.add('cards--active');

    // Attach click event to all cards
    this.cards.forEach(card => {
      this.renderer.listen(card, 'click', () => this.onCardClick(card));
    });
  }
  

  onCardClick(card: HTMLElement): void {
    if (this.currentCard !== card) {
      this.clearClasses();

      // Add transition classes
      this.renderer.addClass(this.currentCard, 'card--out');
      this.currentCard = card;
      this.renderer.addClass(this.currentCard, 'card--current');

      // Find the next card
      const nextIndex = (this.cards.indexOf(this.currentCard) + 1) % this.cards.length;
      this.nextCard = this.cards[nextIndex];
      this.renderer.addClass(this.nextCard, 'card--next');
    }
  }
  clearClasses(): void {
    this.cards.forEach(card => {
      this.renderer.removeClass(card, 'card--current');
      this.renderer.removeClass(card, 'card--out');
      this.renderer.removeClass(card, 'card--next');
    });
  }

  triggerCardClick(card: HTMLElement): void {
    this.renderer.addClass(card, 'card--current');
    this.onCardClick(card);
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    if (event.deltaY > 0) {
      this.scrollToNextCard();
    } else {
      this.scrollToPreviousCard();
    }
  }

  // Move to the next card on scroll down
  scrollToNextCard(): void {
    const nextIndex = (this.cards.indexOf(this.currentCard) + 1) % this.cards.length;
    const nextCard = this.cards[nextIndex];
    this.onCardClick(nextCard);
  }

  // Move to the previous card on scroll up
  scrollToPreviousCard(): void {
    const prevIndex = (this.cards.indexOf(this.currentCard) - 1 + this.cards.length) % this.cards.length;
    const prevCard = this.cards[prevIndex];
    this.onCardClick(prevCard);
  }
}

  // recons = [
  //   {
  //     name: 'Recon 1',
  //     date: new Date(),
  //     last_run: { 
  //       date: new Date(), 
  //       time: '14:30', 
  //       loadId: '12345XYZ' 
  //     },
  //     run_details: [
  //       { id: 1, date: new Date(), status: 'Success' },
  //       { id: 2, date: new Date(), status: 'Failed' },
  //       { id: 3, date: new Date(), status: 'Success' },
  //       { id: 4, date: new Date(), status: 'Failed' },
  //       { id: 5, date: new Date(), status: 'Success' }
  //     ]
  //   },
  //   {
  //     name: 'Recon 2',
  //     date: new Date(),
  //     last_run: { 
  //       date: new Date(), 
  //       time: '16:45', 
  //       loadId: '98765ABC' 
  //     },
  //     run_details: [
  //       { id: 1, date: new Date(), status: 'Success' },
  //       { id: 2, date: new Date(), status: 'Success' },
  //       { id: 3, date: new Date(), status: 'Failed' },
  //       { id: 4, date: new Date(), status: 'Success' },
  //       { id: 5, date: new Date(), status: 'Success' }
  //     ]
  //   }
  // ];

  // arrays = [2,3,4,5]
