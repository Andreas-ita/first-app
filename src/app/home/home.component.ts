import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [CommonModule, CarouselComponent],
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

    //carousel item data
    carouselItems = ['Soccer', 'Aviator', 'Dino', 'Jackpot', 'Roulette', 'My Account'];

    constructor() {

    }

    @ViewChild('carousel', { static: false }) carousel!: ElementRef;

    scrollCarousel(direction: 'left' | 'right') {
        const scrollAmount = 200;
        const el = this.carousel.nativeElement;
        if (direction === 'left') {
            el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    ngOnInit() {

    }

}