import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

interface Voucher {
  id: string;
  code: string;
  description: string;
  discount: number;
  min_order_value: number;
  expiry_date: string;
}


@Component({
  selector: 'app-khuyenmai',
  imports: [CommonModule],
  templateUrl: './khuyenmai.component.html',
  styleUrl: './khuyenmai.component.css'
})


export class KhuyenmaiComponent implements OnInit, OnDestroy {
constructor(private router: Router,private http: HttpClient,private productService: ProductService) {}
vouchers: Voucher[] = [];
images: string[] = [
  'assets/sofabanner.png',
  'assets/banner2.png',
  'assets/banner22.png'
  // Thêm các đường dẫn ảnh của bạn vào đây
];
  // goToPage() {
  //   this.router.navigate(['/trang-chu']);
  // }

  goToPage1() {
    this.router.navigate(['/danh-muc']);
  }

  goToPage2() {
    this.router.navigate(['/tat-ca-san-pham']);
  }
//=======================chuyển ảnh==========
currentIndex = 0;

intervalId: any;

ngOnInit(): void {
  // this.slideWidth = document.querySelector('.slider-container')?.clientWidth || 0;
  this.startAutoSlide();
  this.loadVouchers();
  this.getProducts();

  
}
loadVouchers(): void {
  this.http.get<{ vouchers: Voucher[] }>('assets/vouchers.json').subscribe(
    (data) => {
      this.vouchers = data.vouchers;
    },
    (error) => {
      console.error('Lỗi khi tải JSON:', error);
    }
  );
}




saveVoucher(voucher: Voucher): void {
  alert(`Bạn đã lưu voucher: ${voucher.code}`);
}

ngOnDestroy(): void {
  this.stopAutoSlide();
  
}


startAutoSlide(): void {
  this.intervalId = setInterval(() => {
    this.nextSlide();
  }, 5000);
}

stopAutoSlide(): void {
  clearInterval(this.intervalId);
}
nextSlide(): void {
  this.currentIndex = (this.currentIndex + 1) % this.images.length;
  this.updateSliderPosition();
}

prevSlide(): void {
  this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  this.updateSliderPosition();
}


updateSliderPosition(): void {
  const slider = document.querySelector('.slider') as HTMLElement;
  if (slider) {
    slider.style.transform = `translateX(${-this.currentIndex * 120}%)`;
  }
}


//=============== sản phẩm sale=====
pagedProducts: any[] = [];

getProducts() {
  this.productService.getAllProducts().subscribe(
    (data) => {
      console.log("Dữ liệu sản phẩm nhận được:", data);

      this.pagedProducts = data.sort(() => Math.random() - 0.5).slice(0, 4).map(product => {
        const originalPrice = Number(product["Giá hiện tại"].replace(/\D/g, "")); // Chuyển về số
        const discountedPrice = originalPrice * 0.7; // Giảm 30%

        console.log(`Sản phẩm: ${product["Tên sản phẩm"]}, Giá gốc: ${originalPrice}, Giá giảm: ${discountedPrice}`);

        return {
          ...product,
          originalPrice: originalPrice, // Lưu giá gốc dưới dạng số
          discountedPrice: discountedPrice // Giá sau giảm
        };
      });

      console.log("Danh sách sản phẩm sau khi xử lý:", this.pagedProducts);
    },
    (error) => {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  );
}




  //==============================

  categories = [
    { name: 'BỘ GIƯỜNG - RÈM NGỦ', image: 'assets/anhgiuong.png', link: '/san-pham/giuongngu' },
    { name: 'BỘ BÀN ĂN', image: 'assets/anhbanan.png', link: '/san-pham/bo_banan' },
    { name: 'BỘ BÀN LÀM VIỆC', image: 'assets/anhghean.png', link: '/san-pham/ghe' },
    { name: 'COMBO TỦ - GƯƠNG', image: 'assets/anhtu.png', link: '/san-pham/tu_ke' },
    { name: 'BỘ SOFA', image: 'assets/anhsofa.png', link: '/san-pham/ghesofa' }
  ];

  navigateTo(link: string) {
    this.router.navigate([link]);
  }

  goToMoreInfo() {
    this.router.navigate(['/more-info']); // Chuyển hướng khi nhấn "Xem thêm"
  }

  playVideo() {
    alert('Phát video...'); // Xử lý khi nhấn nút Play (có thể mở modal video)
  }

  goToSanPham1() {
    this.router.navigate(['/san-pham']);
  }

  goToSanPham2() {
    this.router.navigate(['/san-pham']);
  }

  goToSanPham3() {
    this.router.navigate(['/san-pham']);
  }

  goToSanPham4() {
    this.router.navigate(['/san-pham']); // Chuyển đến trang uu dai
  }

  dichvuList = [
    { icon: 'assets/icons/giaohanglapdat.png', title: 'GIAO HÀNG & LẮP ĐẶT', subtitle: 'Miễn Phí' },
    { icon: 'assets/icons/doitra11.png', title: 'ĐỔI TRẢ 1 - 1', subtitle: 'Miễn Phí' },
    { icon: 'assets/icons/baohanh.png', title: 'BẢO HÀNH 2 NĂM', subtitle: 'Miễn Phí' },
    { icon: 'assets/icons/tuvan.png', title: 'TƯ VẤN THIẾT KẾ', subtitle: 'Miễn Phí' }
  ];

}
