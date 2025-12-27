import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { InventoryItem } from '../../models/inventory.model';
import { InventoryStock } from '../../models/inventory-stock.model';

import { MatDialog } from '@angular/material/dialog';

import { InventoryStockService } from '../../services/inventory-stock.service';
import { StockFormDialogComponent } from './stock-form-dialog.component';

@Component({
	selector: 'app-stock-list',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatButtonModule,
		MatIconModule
	],
	templateUrl: './stock-list.component.html'
})
export class StockListComponent implements OnChanges {

	@Input() item!: InventoryItem;
	
	@Output() stockAdded = new EventEmitter<InventoryStock>();
	@Output() stockUpdated = new EventEmitter<InventoryStock>();
	@Output() stockDeleted = new EventEmitter<number>();

	displayedColumns = ['skuCode', 'quantity', 'actions'];

	// ✅ CRITICAL: use MatTableDataSource
	dataSource = new MatTableDataSource<InventoryStock>([]);

	constructor(
	    private stockService: InventoryStockService,
	    private dialog: MatDialog
	  ) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['item']) {
			console.log('Stocks received:', this.item?.stocks);

			this.dataSource.data = this.item?.stocks ?? [];

			// 🔑 Forces Material table to render rows
			this.dataSource._updateChangeSubscription();
		}
	}
	
	addStock() {
	   this.dialog.open(StockFormDialogComponent)
	     .afterClosed()
	     .subscribe(payload => {
	       if (!payload) return;

	       this.stockService.addStock(this.item.id, payload)
	         .subscribe(stock => {
			   this.stockAdded.emit(stock);
		   	 });
	     });
	 }

	 editStock(stock: InventoryStock) {
	   this.dialog.open(StockFormDialogComponent, {
	     data: { stock }
	   }).afterClosed().subscribe(payload => {
	     if (!payload) return;

	     this.stockService.updateStock(stock.id, payload)
	       .subscribe(updated => {
			 this.stockUpdated.emit(updated);
	       });
	   });
	 }

	 deleteStock(stock: InventoryStock) {
	   this.stockService.deleteStock(stock.id)
	     .subscribe(() => {
		   this.stockDeleted.emit(stock.id);
	    });
	 }
	
}
