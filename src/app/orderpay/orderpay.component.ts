import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderpay',
  imports: [RouterModule, CommonModule],
  templateUrl: './orderpay.component.html',
  styleUrl: './orderpay.component.css'
})
export class OrderpayComponent {
  constructor(private router: Router) {}


 


  goToQRPage() {
    this.router.navigate(['/dat-hang/thanh-toan']);
  }
}

