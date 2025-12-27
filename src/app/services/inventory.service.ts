import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory.model';
import { environment } from '../../environments/environment';
import { PageResponse } from '../models/page-response.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {

	private BASE_URL = environment.apiBaseUrl + '/api/inventory';


	constructor(private http: HttpClient) { }

	all(): Observable<InventoryItem[]> {
		return this.http.get<InventoryItem[]>(this.BASE_URL);
	}

	get(id: number): Observable<InventoryItem> {
		return this.http.get<InventoryItem>(`${this.BASE_URL}/${id}`);
	}

	create(data: InventoryItem): Observable<InventoryItem> {
		return this.http.post<InventoryItem>(this.BASE_URL, data);
	}

	update(id: number, data: InventoryItem): Observable<InventoryItem> {
		return this.http.put<InventoryItem>(`${this.BASE_URL}/${id}`, data);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(`${this.BASE_URL}/${id}`);
	}

	getPaged(
		page: number,
		size: number,
		sortBy: string,
		direction: string,
		search: string
	): Observable<PageResponse<InventoryItem>> {

		const params = new HttpParams()
			.set('page', page)
			.set('size', size)
			.set('sort', `${sortBy},${direction}`).set('search', search);
			
		return this.http.get<PageResponse<InventoryItem>>(this.BASE_URL, { params });
	}
}
