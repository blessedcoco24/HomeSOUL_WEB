import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { VoucherService } from '../service/voucher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thanh-toan',
  imports: [CommonModule],
  templateUrl: './thanh-toan.component.html',
  styleUrl: './thanh-toan.component.css'
})
export class ThanhToanComponent {
  selectedPaymentMethod: string = 'cod'; // Mặc định là COD

  constructor(private router: Router, private cartService: CartService,
    private voucherService: VoucherService, private route: ActivatedRoute) {}

  //--------phần đơn hàng-----
  
  selectedItems: any[] = [];
  totalPrice: number = 0;


ngOnInit() {
        // this.selectedItems = this.cartService.getSelectedItems();
        // this.route.queryParams.subscribe(params => {
        //   this.totalPrice = params['total'] ? parseFloat(params['total']) : 0;
        // });
        // this.selectedItems = this.cartService.getSelectedItems();
  
  // this.route.queryParams.subscribe(params => {
  //   if (params['total']) {
  //     this.totalPrice = parseFloat(params['total']);
  //   } else {
  //     this.totalPrice = this.cartService.getTotalPrice(); // Nếu không có, lấy từ CartService
    
  //   }
  // });
    this.route.queryParams.subscribe(params => {
      this.totalPrice = params['total'] ? parseFloat(params['total']) : this.cartService.getTotalPrice();
    });
  
      }


    
  getSubtotal(): number {
    return this.selectedItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  }




  // bankOptions =""
  toggleBankOptions(): void {
    const bankOptions = document.getElementById('bankOptions') as HTMLElement;
    bankOptions.classList.toggle('active');
}

selectBank(imageSrc: string): void {
  const bankImage = document.getElementById('selectedBankImage') as HTMLImageElement;
  bankImage.src = imageSrc;
  console.log(imageSrc)
  bankImage.style.display = 'inline';
  this.hideBankOptions();
}
hideBankOptions(): void {
  const bankOptions = document.getElementById('bankOptions') as HTMLElement;
  bankOptions.classList.remove('active'); // Ẩn danh sách ngân hàng
}

// ví điện tử

toggleWalletOptions(): void {
  const walletOptions = document.getElementById('walletOptions') as HTMLElement;
  walletOptions.classList.toggle('active');
}


selectWallet(imageurl: string): void {
  const walletImage = document.getElementById('selectedWalletImage') as HTMLImageElement;
  walletImage.src = imageurl;
  console.log(imageurl)
  walletImage.style.display = 'inline';
  this.hideWalletOptions();
}

hideWalletOptions(): void {
  const walletOptions = document.getElementById('walletOptions') as HTMLElement;
  walletOptions.classList.remove('active'); 
}


// chuyển trang đặt hàng 
placeOrder() {
  // Lấy giá trị phương thức thanh toán đã chọn
  const selectedMethod = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value;
  
  if (selectedMethod === 'cod') {
    this.router.navigate(['/dat-hang/thanh-cong']); // Điều hướng đến trang đã đặt hàng thành công
  } else if (selectedMethod === 'bank-transfer') {
    this.router.navigate(['/thong-tin-thanh-toan']);
  } else {
    this.router.navigate(['/thong-tin-thanh-toan'], { queryParams: { total: this.totalPrice } });
  }
}
}

