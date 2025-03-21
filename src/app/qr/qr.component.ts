import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  imports: [CommonModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QRComponent implements OnInit, OnDestroy {
  timeLeft: number = 600; // 10 phút = 600 giây
  displayTime: string = '';
  interval: any;
  constructor(private router: Router) {}
  selectBank(imageSrc: string): void {
    const bankImage = document.getElementById('selectedBankImage') as HTMLImageElement;
    bankImage.src = imageSrc;
    console.log(imageSrc)
    bankImage.style.display = 'inline';
  }


  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  }

  ngOnInit() {
    const now = Date.now(); // Thời gian hiện tại (milliseconds)
    
    // Lấy timestamp khi thanh toán bắt đầu, nếu không có thì tạo mới
    const startTime = localStorage.getItem('paymentStartTime');
    if (!startTime) {
      localStorage.setItem('paymentStartTime', now.toString());
    }
  
    this.updateTimeLeft(); // Cập nhật thời gian còn lại ngay khi load trang
  
    // Bắt đầu đếm ngược
    this.interval = setInterval(() => {
      this.updateTimeLeft();
      if (this.timeLeft <= 0) {
        clearInterval(this.interval);
        localStorage.removeItem('paymentStartTime'); // Xóa khi hết thời gian
        this.router.navigate(['/ket-qua-thanh-toan'], { queryParams: { status: 'fail' } });
      }
    }, 1000);
  }
  
  // Hàm cập nhật thời gian còn lại
  updateTimeLeft() {
    const startTime = parseInt(localStorage.getItem('paymentStartTime') || '0', 10);
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Số giây đã trôi qua
    this.timeLeft = Math.max(600 - elapsedTime, 0); // Đảm bảo không âm
  }
  
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  
}


 