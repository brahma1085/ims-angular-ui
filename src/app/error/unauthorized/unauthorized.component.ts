import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
   		CommonModule,
   		MatCardModule
   	],
  template: `
  <mat-card>
    <h1>401</h1>
    <p>Please login to continue</p>
    <button mat-raised-button color="primary" routerLink="/">Home</button>
  </mat-card>
  `
})
export class UnauthorizedComponent {}
