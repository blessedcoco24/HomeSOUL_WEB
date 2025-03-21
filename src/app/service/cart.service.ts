import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Cung cấp service cho toàn bộ ứng dụng
})
export class CartService {
  private selectedItems: any[] = [];

  setSelectedItems(items: any[]) {
    this.selectedItems = items;
  }

  getSelectedItems() {
    return this.selectedItems;
  }
}
