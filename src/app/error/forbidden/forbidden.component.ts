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
    <h1>403</h1>
    <p>You do not have permission</p>
    <button mat-button routerLink="/home">Home</button>
  </mat-card>
  `
})
export class ForbiddenComponent {}
