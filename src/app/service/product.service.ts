import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private categoryUrlMap: { [key: string]: string } = {
    ban: 'assets/data_json/ban.json',
    bo_banan: 'assets/data_json/bo_banan.json',
    ghe: 'assets/data_json/ghe.json',
    ghesofa: 'assets/data_json/ghesofa.json',
    giuongngu: 'assets/data_json/giuongngu.json',
    tu_ke: 'assets/data_json/tu_ke.json',
    combo: 'assets/data_json/combo.json'
  };



  constructor(private http: HttpClient) {}
  

 
  getAllProducts(): Observable<any[]> {
    const requests = Object.values(this.categoryUrlMap).map(url => this.http.get<any[]>(url));
    return forkJoin(requests).pipe(
      map(responses => responses.flat()) // Gộp tất cả sản phẩm từ các file JSON
    );
  }

  getProductsByCategory(category: string): Observable<any[]> {
    const url = this.categoryUrlMap[category];
    console.log('Fetching data from:', url); // Kiểm tra URL
    return url ? this.http.get<any[]>(url).pipe(
      map(response => {
        console.log('Data received:', response); // Kiểm tra dữ liệu
        return response;
      })
    ) : of([]);
  }


  //dẫn tới chi tiết sản phẩm
  
}