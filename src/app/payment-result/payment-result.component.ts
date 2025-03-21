import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  imports: [CommonModule],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent {
  paymentSuccess: boolean = true; // Mặc định là thành công
   constructor(private route: ActivatedRoute ,private router: Router) {}
    goToOrdersPage() {
      this.router.navigate(['/don-hang']);
    }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        if (params['status'] === 'fail') {
          this.paymentSuccess = false;
        }
      });
    }
}
