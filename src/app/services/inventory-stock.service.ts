import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryStock } from '../models/inventory-stock.model';

@Injectable({ providedIn: 'root' })
export class InventoryStockService {

	private baseUrl = '/api/inventory/stock';

	constructor(private http: HttpClient) { }

	addStock(itemId: number, payload: Partial<InventoryStock>): Observable<InventoryStock> {
		return this.http.post<InventoryStock>(
			`${this.baseUrl}/${itemId}`,
			payload
		);
	}

	updateStock(stockId: number, payload: Partial<InventoryStock>): Observable<InventoryStock> {
		return this.http.put<InventoryStock>(
			`${this.baseUrl}/${stockId}`,
			payload
		);
	}

	deleteStock(stockId: number): Observable<void> {
		return this.http.delete<void>(
			`${this.baseUrl}/${stockId}`
		);
	}
}
