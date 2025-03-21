import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  private voucherUrl = 'assets/vouchers.json'; // Đường dẫn file JSON

  constructor(private http: HttpClient) {}

  getVouchers(): Observable<any> {
    return this.http.get<any>(this.voucherUrl);
  }
}
