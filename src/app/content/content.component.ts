import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';


interface CartItem {
  id: number;
  name: string;
  image: string;
  color: string;
  availableColors: string[];
  price: number;
  quantity: number;
  selected: boolean;
  totalPrice: number;
}

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class ContentComponent {
  allSelected: boolean = false;
  cart: CartItem[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit() {
    this.loadCartData();
  }

  loadCartData() {
    this.http.get<any[]>('assets/cart.json').subscribe({
      next: (data) => {
        this.cart = data.map((item, index) => ({
          id: index + 1,
          name: item["Tên sản phẩm"],
          price: this.parsePrice(item["Giá hiện tại"]),
          image: item["Ảnh sản phẩm"]?.[0] || 'assets/default.jpg',
          color: "",
          availableColors: [],
          quantity: 1,
          selected: false,
          totalPrice: this.parsePrice(item["Giá hiện tại"])
        }));
      },
      error: (err) => console.error("Lỗi tải dữ liệu giỏ hàng:", err)
    });
  }

  parsePrice(priceString: string): number {
    return parseFloat(priceString.replace(/[₫,]/g, '')) || 0;
  }

  toggleSelectAll(event: any) {
    this.allSelected = event.target.checked;
    this.cart.forEach(item => item.selected = this.allSelected);
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    item.totalPrice = item.price * item.quantity;
  }

  decreaseQuantity(item: CartItem, index: number) {
    if (item.quantity > 1) {
      item.quantity--;
      item.totalPrice = item.price * item.quantity;
    } else {
      const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này?");
      if (confirmDelete) {
        this.removeItem(index);
      }
    }
  }

  removeItem(index: number) {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmDelete) {
      this.cart.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    return this.cart
      .filter(item => item.selected)
      .reduce((total, item) => total + item.totalPrice, 0);
  }

  goToOrder() {
    const selectedItems = this.cart.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }
    
    this.cartService.setSelectedItems(selectedItems);
    this.router.navigate(['/order']); // Chuyển hướng đến trang đặt hàng
  }
}
