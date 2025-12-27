import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ REQUIRED
import { MatInputModule } from '@angular/material/input';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';
import { InventoryStock } from '../../models/inventory-stock.model';
import { InventoryFormDialogComponent } from './inventory-form-dialog/inventory-form-dialog.component';
import { ConfirmDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { StockListComponent } from '../stock-list/stock-list.component';
import {
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/animations';



@Component({
	selector: 'app-inventory-list',
	standalone: true,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({
				height: '0px',
				minHeight: '0',
				overflow: 'hidden'
			})),
			state('expanded', style({
				height: '*',
				overflow: 'visible'
			})),
			transition('expanded <=> collapsed',
				animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
			),
		])
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatTableModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatToolbarModule,
		MatPaginatorModule,
		MatSortModule,
		StockListComponent
	],
	templateUrl: './inventory-list.component.html',
	styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent implements OnInit {

	displayedColumns: string[] = ['expand', 'id', 'name', 'price', 'stock', 'actions'];

	@ViewChild(MatTable) table!: MatTable<InventoryItem>;

	// ✅ Correct for server‑side pagination
	data: InventoryItem[] = [];

	totalElements = 0;
	pageSize = 10;
	pageIndex = 0;
	sortBy = 'id';
	direction = 'asc';
	search = '';
	search$ = new Subject<string>();

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private inventoryService: InventoryService,
		private dialog: MatDialog,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.search$
			.pipe(
				debounceTime(300),
				distinctUntilChanged()
			)
			.subscribe(value => {
				this.search = value;
				this.pageIndex = 0;
				this.loadItems();
			});
		this.loadItems();
	}

	loadItems(): void {
		this.inventoryService
			.getPaged(this.pageIndex, this.pageSize, this.sortBy, this.direction, this.search)
			.subscribe(response => {
				Promise.resolve().then(() => {
					this.data = response.content;
					this.totalElements = response.totalElements;
					this.cdr.detectChanges();   // ✅ resolves NG0100
				});

			});
	}

	//expandedItem: InventoryItem | null = null;
	expandedItemId: number | null = null;

	//toggle(item: InventoryItem): void {
		//this.expandedItem = this.expandedItem === item ? null : item;
	//}
	toggle(item: InventoryItem): void {
		console.log('TOGGLE CLICKED, item.id =', item.id);
	  	this.expandedItemId = this.expandedItemId === item.id ? null : item.id;
		console.log('expandedItemId set to:', this.expandedItemId);
		this.table.renderRows();
	}

	isExpandedRow = (_index: number, row: InventoryItem): boolean => {
	  console.log('isExpandedRow called → row:', row.id,'expandedItemId:', this.expandedItemId);
	  return this.expandedItemId === row.id;
	};

	onPageChange(event: PageEvent): void {
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadItems();
	}

	onSortChange(sort: Sort): void {
		console.log("sorting");
		this.sortBy = sort.active;
		this.direction = sort.direction || 'asc';
		this.loadItems();
	}

	onSearch(value: string) {
		this.search = value;
		this.pageIndex = 0;
		this.loadItems();
	}

	addItem(): void {
		this.dialog.open(InventoryFormDialogComponent)
			.afterClosed()
			.subscribe(() => this.loadItems());
	}

	edit(item: InventoryItem): void {
		this.dialog.open(InventoryFormDialogComponent, {
			data: item
		}).afterClosed().subscribe(() => this.loadItems());
	}

	delete(item: InventoryItem): void {
		this.dialog.open(ConfirmDialogComponent, {
			data: item
		}).afterClosed().subscribe(() => this.loadItems());
	}
	
	onStockAdded(itemId: number, stock: InventoryStock) {
	  this.data = this.data.map(item =>
	    item.id === itemId? {...item, stocks: [...(item.stocks ?? []), stock] } : item
	  );
	  this.table.renderRows();
	}

	onStockUpdated(itemId: number, stock: InventoryStock) {
	  this.data = this.data.map(item =>
	    item.id === itemId? {...item, stocks: item.stocks!.map(s => s.id === stock.id ? stock : s)} : item
	  );
	  this.table.renderRows();
	}

	onStockDeleted(itemId: number, stockId: number) {
	  this.data = this.data.map(item =>
	    item.id === itemId? {...item, stocks: item.stocks!.filter(s => s.id !== stockId)} : item
	  );
	  this.table.renderRows();
	}

}
