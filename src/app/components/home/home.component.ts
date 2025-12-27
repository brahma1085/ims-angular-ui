import { Component,CUSTOM_ELEMENTS_SCHEMA,AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import SwiperCore from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { MatIconModule } from '@angular/material/icon';
import { KeycloakService } from '../../auth/keycloak.service';
import { trigger, transition, style, animate } from '@angular/animations';


SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule    
  ],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out')
      ])
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('heroSwiper', { static: false }) swiperEl!: ElementRef;

  constructor(private router: Router,private kc: KeycloakService) {}

   ngAfterViewInit(): void {
    const swiper = this.swiperEl.nativeElement.swiper;

    this.swiperEl.nativeElement.addEventListener('mouseenter', () => {
      swiper.autoplay.stop();
    });

    this.swiperEl.nativeElement.addEventListener('mouseleave', () => {
      swiper.autoplay.start();
    });
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  isAdmin(): boolean {
		return this.kc.hasRole('ADMIN');
	}

	openUsers() {
		this.router.navigateByUrl('/users');
	}
}
