import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  customerInfo = {
    name: '',
    address: '',
    phone: '',
    email: ''
  };
  
  selectedItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.selectedItems = this.cartService.getSelectedItems(); 
    this.customerInfo = this.cartService.getCustomerInfo(); 

    // Tính tổng tiền
    this.totalPrice = this.selectedItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  }
}
