import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductdataService } from '../service/productdata.service';

@Component({
  selector: 'app-addsp',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './addsp.component.html',
  styleUrl: './addsp.component.css'
})
export class AddspComponent {
  productName: string = '';
  productSKU: string = '';
  productDescription: string = '';
  productPrice: string = '';
  isVisible: boolean = true;
  Productdiscount:  string = '';
  Productquantity: string = '';
  ProductsizeMat : string = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  


  categoryNames: { [key: string]: string } = {
    ban: 'Bàn',
    bo_banan: 'Bộ bàn ăn',
    ghe: 'Ghế',
    ghesofa: 'Ghế sofa',
    giuongngu: 'Giường ngủ',
    tu_ke: 'Tủ kệ',
    combo: 'Combo nội thất'
  };

  constructor(  private route: ActivatedRoute, private productdataService: ProductdataService, private _http: HttpClient,private router: Router ) { }
  
  // saveProduct() {
  //       const productData = {
  //     productName: this.productName,
  //     productPrice: this.productPrice,
  //     productDescription: this.productDescription,
  //     productSKU: this.productSKU,
  //     isVisible: this.isVisible
      
  //   };
  
  //   this._http.post<{ message: string; product: any }>('http://localhost:3000/them-san-pham', productData)
  // .subscribe({
  //   next: (res) => {
  //     console.log("✅ Sản phẩm đã được thêm:", res);
  //     alert("Thêm sản phẩm thành công!");
  //     this.router.navigate([`/sanpham/${res.product._id}`]); // Chuyển hướng về trang sản phẩm
  //   },
  //   error: (error) => {
  //     alert(error.error.message); // Hiển thị lỗi thay vì chỉ log trong console
  //   }
  // });

  // }

// Hàm lưu sản phẩm với dữ liệu ảnh
saveProduct(productData: any=null,) {
  this._http.post<{ message: string; product: any }>('http://localhost:3000/them-san-pham', productData)
    .subscribe({
      next: (res) => {
        console.log("✅ Sản phẩm đã được thêm:", res);
        alert("Thêm sản phẩm thành công!");
        this.router.navigate([`/sanpham/${res.product._id}`]);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
}
//==================


onFileSelected(event: any) {
  const file = event.target.files[0]; 
  if (file) {
    this.imageFile = file;

    // Hiển thị ảnh xem trước
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

onSubmit() {
  if (!this.imageFile) {
    alert("Vui lòng chọn ảnh!");
    return;
  }

  const formData = new FormData();
  formData.append('image', this.imageFile);

  this._http.post<{ message: string; imageUrl: string }>('http://localhost:3000/upload', formData)
  .subscribe({
    next: (res) => {
      alert("Ảnh đã được tải lên!");
      console.log("✅ Ảnh đã được tải lên:", res.imageUrl);

      // Gán đường dẫn ảnh vào dữ liệu sản phẩm
      const productData = {
        productName: this.productName,
        productPrice: this.productPrice,
        productDescription: this.productDescription,
        productSKU: this.productSKU,
        isVisible: this.isVisible,
        productImage: res.imageUrl // Lưu đường dẫn ảnh vào DB
      };

      this.saveProduct(productData); // Gửi sản phẩm lên server
    },
    error: (error) => {
      alert(error.error.message);
    }
  });
}

  }

