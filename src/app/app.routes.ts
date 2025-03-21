

import { NgModule } from '@angular/core';
import {  Routes } from '@angular/router';
import { XemproductsComponent } from './xemproducts/xemproducts.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { QRComponent } from './qr/qr.component';
import { OrderedComponent } from './ordered/ordered.component';
import { ThanhToanComponent } from './thanh-toan/thanh-toan.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { OrderComponent } from './order/order.component';
import { OrderpayComponent } from './orderpay/orderpay.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { QlsanphamComponent } from './qlsanpham/qlsanpham.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AddspComponent } from './addsp/addsp.component';
import { ContentComponent } from './content/content.component';




export const routes: Routes = [

  // Thêm các route khác ở đây
  { path: 'tat-ca-san-pham', component: XemproductsComponent},
  { path: 'dat-hang/thanh-cong', component: OrderedComponent },
  //chọn pttt
  { path: 'dat-hang/phuong-thuc-thanh-toan', component: ThanhToanComponent},
  {path: 'san-pham/:category', component: DanhmucComponent},
  {path: 'dat-hang/thanh-toan',component: QRComponent},
  { path: 'don-hang', component: OrdersComponent},
  { path: 'ket-qua-thanh-toan', component: PaymentResultComponent},
  { path: 'ket-qua-tim-kiem', component: XemproductsComponent},
  { path: 'order', component: OrderComponent },
  { path: 'order/thanh-toan', component: ThanhToanComponent},
  { path: 'thong-tin-thanh-toan', component :OrderpayComponent},
  { path: 'khuyen-mai', component: KhuyenmaiComponent},
  { path: 'Admin/quan-ly-san-pham', component: QlsanphamComponent},
  { path: 'sanpham/:id', component: ProductdetailComponent},
  { path: 'them-san-pham', component: AddspComponent},
  { path: 'gio-hang', component: ContentComponent}
];

@NgModule({
  imports: [],
  exports: []
})
export class AppRoutingModule { }

