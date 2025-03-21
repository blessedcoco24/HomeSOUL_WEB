import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { VoucherService } from '../service/voucher.service';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [CommonModule, FormsModule],
})
export class OrderComponent {
  selectedItems: any[] = [];
  vouchers: any[] = []; // Danh sách mã giảm giá từ file JSON
  selectedVoucher: any = null;
  shippingFee = 30000;

  constructor(
    private cartService: CartService,
    private voucherService: VoucherService
  ) {}

  ngOnInit() {
    this.selectedItems = this.cartService.getSelectedItems();

    // Lấy danh sách voucher từ file JSON
    this.voucherService.getVouchers().subscribe({
      next: (data) => {
        if (data && data.vouchers) {
          this.vouchers = [{ code: '', description: 'Không áp dụng', discount: 0, min_order_value: 0 }, ...data.vouchers];
          this.selectedVoucher = this.vouchers[0]; // Mặc định không áp dụng mã giảm giá
        }
      },
      error: (err) => console.error('Lỗi khi tải vouchers:', err),
    });
  }

  getSubtotal(): number {
    return this.selectedItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  }

  getDiscountAmount(): number {
    if (!this.selectedVoucher || this.selectedVoucher.code === '') {
      return 0; // Không áp dụng giảm giá
    }
    const subtotal = this.getSubtotal();
    return subtotal >= this.selectedVoucher.min_order_value ? (subtotal * this.selectedVoucher.discount) / 100 : 0;
  }

  getTotalPrice(): number {
    return this.getSubtotal() - this.getDiscountAmount() + this.shippingFee;
  }
}
