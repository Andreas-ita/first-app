import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule, RouterModule, RouterLink],
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
    @ViewChild('slidesContainer') slidesContainer!: ElementRef;

    currentIndex = 0;
    private autoSlideInterval: any;

    // Define slides here
    slides = [
        {
            title: ' ',
            subtitle: ' ',
            imageUrl: '/assets/Aviator.png',
            buttonText: 'Sign Up Now',
            buttonLink: '/register'
        },
        {
            title: ' ',
            subtitle: ' ',
            imageUrl: '/assets/BET.png',
            buttonText: 'Start Betting',
            buttonLink: '/login'
        },
        {
            title: ' ',
            subtitle: ' ',
            imageUrl: '/assets/Special.png',
            buttonText: 'Claim Bonus',
            buttonLink: '/register'
        }
    ];

    ngOnInit() {
        // Auto-slide every 6 seconds
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 6000);
    }

    ngOnDestroy() {
        clearInterval(this.autoSlideInterval);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }

    goToSlide(index: number) {
        this.currentIndex = index;
        const slideWidth = this.slidesContainer.nativeElement.offsetWidth;
        this.slidesContainer.nativeElement.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
        });
    }
}