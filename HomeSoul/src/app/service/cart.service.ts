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

 
  
  getTotalPrice(): number {
    return this.selectedItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  }
  getCustomerInfo() {
    return {
      name: 'Nguyễn Văn A',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '0123456789',
      email: 'email@example.com'
    };
  }
  
}
