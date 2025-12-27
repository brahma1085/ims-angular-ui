import { InventoryStock } from './inventory-stock.model';
export interface InventoryItem {
	id: number;
	name: string;
	stock: number;
	price: number;
	stocks?: InventoryStock[];
}
