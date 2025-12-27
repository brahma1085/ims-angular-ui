import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private BASE_URL = '/api/customers';
  constructor(private http: HttpClient) {}

  all(): Observable<Order[]> {
    return this.http.get<Order[]>(this.BASE_URL);
  }

  get(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.BASE_URL}/${id}`);
  }

  create(data: Order): Observable<Order> {
    return this.http.post<Order>(this.BASE_URL, data);
  }

  update(id: number, data: Order): Observable<Order> {
    return this.http.put<Order>(`${this.BASE_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
