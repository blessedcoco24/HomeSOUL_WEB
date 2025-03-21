import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { XemproductsComponent } from './xemproducts/xemproducts.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { ThanhToanComponent } from './thanh-toan/thanh-toan.component';
import { OrderedComponent } from './ordered/ordered.component';
import { OrdersComponent } from './orders/orders.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routes';
import { OrderpayComponent } from './orderpay/orderpay.component';
import { QRComponent } from './qr/qr.component';
import { OrderComponent } from './order/order.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { QlsanphamComponent } from './qlsanpham/qlsanpham.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, XemproductsComponent,CommonModule, FormsModule, ProductdetailComponent, RouterModule,DanhmucComponent,ThanhToanComponent,OrderedComponent,OrdersComponent,HeaderComponent, AppRoutingModule,OrderpayComponent,QRComponent, OrderComponent,KhuyenmaiComponent, QlsanphamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HomeSoul';
}
export class AppModule {}
