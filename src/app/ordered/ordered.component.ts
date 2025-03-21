import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ordered',
  imports: [RouterModule],
  templateUrl: './ordered.component.html',
  styleUrl: './ordered.component.css'
})
export class OrderedComponent {
  constructor(private router: Router) {}
  goToOrdersPage() {
    this.router.navigate(['/don-hang']);
  }
}
