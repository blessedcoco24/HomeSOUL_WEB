import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductdataService {
  api_url = "http://localhost:3000";

  constructor(private _http: HttpClient) { }
  
  getProducts(): Observable<any>{
    // return this._http.get<any>(`${this.api_url}`).pipe( 
      return this._http.get<any>(`${this.api_url}/sanpham`).pipe(
      retry(2), catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    return throwError(()=> new Error(error.message))
}

// Trong ProductdataService
updateProductVisibility(productId: string, isVisible: boolean): Observable<any> {
  console.log('Product ID:', productId);
  return this._http.patch<any>(`${this.api_url}/sanpham/${productId}`, { isVisible })
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

getProductById(productId: string): Observable<any> {
  return this._http.get<any>(`http://localhost:3000/sanpham/${productId}`);
}

updateProduct(id: string, product: any): Observable<any> {
  console.log("Updating product with ID:", id); // Kiểm tra ID
  return this._http.put(`${this.api_url}/sanpham/${id.trim()}`, product, {
      headers: { "Content-Type": "application/json" }
  }).pipe(
      retry(2),
      catchError(this.handleError)
  );
}

// updateProduct(id: string, product: any): Observable<any> {
//   return this._http.put(`http://localhost:3000/Products/${id}`, product, {
//       headers: { "Content-Type": "application/json" }
//   });
// }
}