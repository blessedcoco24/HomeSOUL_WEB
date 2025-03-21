// product-management.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductdataService } from '../service/productdata.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-qlsanpham',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './qlsanpham.component.html',
  styleUrl: './qlsanpham.component.css'
})
export class QlsanphamComponent implements OnInit  {

// Thêm các thuộc tính mới

    // Search and filter variables
    searchKeyword: string = '';
    searchCode: string = '';
    hasSelectedProducts: boolean = false;
    filteredProducts: any[] = [];
    selectedCategory: string = '';
    allProducts: any[] = []; // Dữ liệu gốc từ DB
   
    // Data variables
    products: any[] = [];
    allSelected: boolean = false;
    categoryNames: { [key: string]: string } = {
      ban: 'Bàn',
      bo_banan: 'Bộ bàn ăn',
      ghe: 'Ghế',
      ghesofa: 'Ghế sofa',
      giuongngu: 'Giường ngủ',
      tu_ke: 'Tủ kệ',
      combo: 'Combo nội thất'
    };
    errMsg: string = '';
    editedProduct: any = {};

    constructor(  private route: ActivatedRoute, private productdataService: ProductdataService, private _http: HttpClient,private router: Router ) { }
 
    ngOnInit(): void {
      this.getProducts();
      this.loadProducts();

      const productId = "67d9855e332806af2a573b0c"; // Lấy từ route hoặc state
      this.fetchProduct(productId);
      
    } 
    fetchProduct(productId: string) {
      this._http.get(`http://localhost:3000/sanpham/${productId}`).subscribe(
        (product) => {
          console.log("Product fetched:", product);
          this.editedProduct = product;
        },
        (error) => console.error("Error fetching product:", error)
      );
    }

    
    


 
    getProducts(): void {
        this.productdataService.getProducts().subscribe(
          (data) => {
            this.products = data.map((p: any) => ({
              ...p,
              isVisible: p.isVisible !== undefined ? p.isVisible : true // Mặc định hiện sản phẩm
            }));
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
      
// Tạo một hàm để tự động gán danh mục nếu không có
getProductCategory(product: any): string {
  if (product['Danh mục']) {
    return this.categoryNames[product['Danh mục']] || 'Không có danh mục';
  }

  // Nếu sản phẩm chưa có danh mục, có thể gán dựa trên tên sản phẩm
  if (product['Tên sản phẩm'].toLowerCase().includes('bàn')) return "Bàn";
  if (product['Tên sản phẩm'].toLowerCase().includes('ghế')) return "Ghế";
  if (product['Tên sản phẩm'].toLowerCase().includes('tủ')) return "Tủ";
  if (product['Tên sản phẩm'].toLowerCase().includes('giường')) return "Giường";
  if (product['Tên sản phẩm'].toLowerCase().includes('combo')) return "Combo nội thất";

  return "Không có danh mục"; // Trường hợp không xác định
}

searchProducts() {
  console.log('Selected Category:', this.selectedCategory);
  console.log('Search Keyword:', this.searchKeyword);

  this.filteredProducts = this.allProducts.filter(product => {
    const productName = product['Tên sản phẩm']?.toLowerCase() || '';
    const categoryName = this.selectedCategory?.toLowerCase() || '';

    console.log('Product Name:', productName);

    // Kiểm tra điều kiện danh mục
    let matchesCategory = true;
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      matchesCategory = productName.includes(categoryName);
    }

    console.log('Matches Category:', matchesCategory);

    // Kiểm tra điều kiện từ khóa tìm kiếm
    let matchesKeyword = true;
    if (this.searchKeyword) {
      matchesKeyword = productName.includes(this.searchKeyword.toLowerCase());
    }

    console.log('Matches Keyword:', matchesKeyword);

    return matchesCategory && matchesKeyword;
  });

  console.log('Filtered Products:', this.filteredProducts);
}



    editSingleProduct(product: any): void {
      product.isEditing = true;
      this.editedProduct = { ...product };
    }
  
    cancelEditSingleProduct(product: any): void {
      product.isEditing = false;
    }

submitProduct(product: any) {
  if (!product || !product._id) {
    console.error("Sản phẩm không hợp lệ hoặc thiếu ID");
    return;
  }

  const updateData = {
    "Tên sản phẩm": product["Tên sản phẩm"],
    "Giá hiện tại": product["Giá hiện tại"],
    "Mô tả": product["Mô tả"],
    "Kích thước & Chất liệu": product["Kích thước & Chất liệu"],
    "SKU": product["SKU"],
    "Đánh giá": product["Đánh giá"],
    "Ảnh sản phẩm": product["Ảnh sản phẩm"]
  };
  console.log("📤 Gửi request cập nhật:", updateData);

  this._http.put(`http://localhost:3000/sanpham/${product._id}`, updateData)
    .subscribe(
      (res) => {
        console.log("✅ Cập nhật thành công:", res);
        alert("Sản phẩm đã được cập nhật!");
        this.loadProducts(); // Load lại danh sách
      },
      (error) => {
        console.error("❌ Lỗi khi cập nhật sản phẩm:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    );
}
  

loadProducts() {
  this._http.get<any[]>('http://localhost:3000/sanpham').subscribe(data => {
    this.allProducts = data.map(product => ({
      ...product,
      category: this.getCategory(product["Tên sản phẩm"])
    }));
    this.products = [...this.allProducts]; // Hiển thị ban đầu
    this.filterProducts();
  });
}



getCategory(productName: string): string {
  if (productName.includes("Bàn")) return "ban";
  if (productName.includes("Ghế")) return "ghe";
  return "all";
}

filterProducts() {
  this.searchProducts();
}

    toggleProductVisibility(product: any): void {
      product.isVisible = !product.isVisible;
      this.productdataService.updateProductVisibility(product._id, product.isVisible).subscribe(
        () => {},
        (error) => {
          console.error('Error updating product visibility:', error);
        }
      );
    }


    

    updateProduct() {
      console.log("Submitting product:", this.editedProduct);
      this.productdataService.updateProduct(this.editedProduct._id, this.editedProduct)
        .subscribe(
          response => console.log("Update success:", response),
          error => console.error("Update error:", error)
        );
    }
    

    
  
    toggleSelectAll(): void {
      this.allSelected = !this.allSelected;
      this.products.forEach(product => product.selected = this.allSelected);
      this.updateHasSelectedProducts();
    }
  
    toggleProductSelection(product: any): void {
      product.selected = !product.selected;
      this.updateHasSelectedProducts();
    }
  
    updateHasSelectedProducts(): void {
      this.hasSelectedProducts = this.products.some(product => product.selected);
    }
  
    editMultipleProducts(): void {
      console.log('Chỉnh sửa nhiều sản phẩm');
    }
// them mới

showAddOptions: boolean = false;

openAddOptions() {
  this.showAddOptions = true;
}

closeAddOptions() {
  this.showAddOptions = false;
}

navigateToAddProduct() {
  this.router.navigate(['/them-san-pham']);
}

navigateToAddCategory() {
  this.router.navigate(['/']);
}


  }
