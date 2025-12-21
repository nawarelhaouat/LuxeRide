import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[revealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {

  // ✅ accepte "" et convertit en bottom
  @Input('revealOnScroll')
  set revealOnScroll(value: '' | 'bottom' | 'top' | null | undefined) {
    this.direction = (value === '' || value == null) ? 'bottom' : value;
  }

  @Input() once = false; // ✅ par défaut: rejoue à chaque fois

  private direction: 'bottom' | 'top' = 'bottom';
  private observer?: IntersectionObserver;

  // ✅ pour détecter up/down
  private lastY = typeof window !== 'undefined' ? window.scrollY : 0;

  constructor(private el: ElementRef<HTMLElement>, private r: Renderer2) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;

    // base class
    this.r.addClass(node, 'reveal');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        // direction scroll
        const currentY = window.scrollY;
        const scrollDir = currentY > this.lastY ? 'down' : 'up';
        this.lastY = currentY;

        if (entry.isIntersecting) {
          // nettoyer classes direction
          this.r.removeClass(node, 'enter-down');
          this.r.removeClass(node, 'enter-up');

          // ✅ choisir direction anim:
          // - si revealOnScroll="top" => toujours venir d'en haut
          // - sinon => dépend du scroll
          if (this.direction === 'top') {
            this.r.addClass(node, 'enter-up');
          } else {
            this.r.addClass(node, scrollDir === 'down' ? 'enter-down' : 'enter-up');
          }

          this.r.addClass(node, 'is-visible');
          if (this.once) this.observer?.unobserve(node);
        } else {
          if (!this.once) {
            this.r.removeClass(node, 'is-visible');
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
