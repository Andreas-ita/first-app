import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  standalone: true,
    selector: 'app-home',
    imports: [CommonModule, HousingLocationComponent],
    templateUrl: 'home.component.html',


  styleUrls: ['./home.component.css']
})

export class HomeComponent {

    housingLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);
    filteredLocationList: HousingLocation[] = [];

    //carousel item data
    carouselItems = ['Soccer', 'Aviator', 'Dino', 'Jackpot', 'Roulette', 'My Account'];

    constructor() {
        this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
            this.housingLocationList = housingLocationList;
            this.filteredLocationList = housingLocationList;
        });
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

    filterResults(text: string) {
        if (!text) this.filteredLocationList = this.housingLocationList;

        this.filteredLocationList = this.housingLocationList.filter(
            housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
        );
    }
}
