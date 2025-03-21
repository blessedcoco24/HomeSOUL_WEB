import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-danhmuc',
  imports: [CommonModule,FormsModule],
  templateUrl: './danhmuc.component.html',
  styleUrl: './danhmuc.component.css'
})
  
  
  export class DanhmucComponent implements OnInit  {
    products: any[] = [];
    currentPage = 0; // Trang hiện tại
  pageSize = 9; // Số sản phẩm mỗi trang
  pagedProducts: any[] = []; // Danh sách sản phẩm hiển thị theo trang
  Object = Object; // Thêm dòng này để Angular nhận diện Object
  selectedCategories: string[] = []; // Lưu danh mục đã chọn
  filteredProducts: any[] = [];
  selectedPriceRanges: any[] = [];
  category: string = '';
  
  // lọc giá
  priceRanges = [
    { label: 'Giá dưới 1,000,000₫', min: 0, max: 1000000 },
    { label: '1,000,000₫ - 3,000,000₫', min: 1000000, max: 3000000 },
    { label: '3,000,000₫ - 5,000,000₫', min: 3000000, max: 5000000 },
    { label: 'Giá trên 5,000,000₫', min: 5000000, max: Infinity }
  ];
  
  sortOrder: string = ''; // 'asc' cho thấp đến cao, 'desc' cho cao đến thấp
  
  // =============
    // constructor(private productService: ProductService) {}
    // ngOnInit(){
    //   this.getProducts();
    constructor(private route: ActivatedRoute, private productService: ProductService) {}
    // }
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.category = params.get('category') || '';
        console.log(this.category)
        this.loadProducts();
      });
    }
    // loadProducts() {
    //   if (this.category) {
    //     this.productService.getProductsByCategory(this.category).subscribe(data => {
    //       console.log('Dữ liệu sản phẩm:', data);
    //       this.products = data;
    //     });
    //   }
    // }
    loadProducts() {
      if (this.category) {
        this.productService.getProductsByCategory(this.category).subscribe(data => {
          console.log('Dữ liệu sản phẩm:', data);
          this.products = data;
          this.filteredProducts = data; // Để khi lọc không bị mất dữ liệu gốc
          this.currentPage = 0
          this.updatePage(); // Cập nhật danh sách hiển thị
        });
      }
    }
    
  
  
    updatePage() {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.pagedProducts = this.filteredProducts.slice(start, end);
    }
  
  
  
  
  
    getProducts(){
      this.productService.getAllProducts().subscribe(data => {
        console.log("Dữ liệu sản phẩm nhận được:", data);
        this.products = data;
       
        this.filteredProducts = data;
        this.updatePage()
  
      }, 
      (error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error); // Debug lỗi
      });
    }
  
  
  
  //---------------
  
    convertPrice(priceStr: string): number {
      return parseInt(priceStr.replace(/[₫,]/g, ''), 10);
    }
  
      
  //----------------
  
  togglePriceFilter(range: any) {
    const index = this.selectedPriceRanges.indexOf(range);
    if (index > -1) {
      this.selectedPriceRanges.splice(index, 1);
    } else {
      this.selectedPriceRanges.push(range);
    }
    this.sortProducts()
    this.applyFilters(); // Gọi lại bộ lọc chung
  }
  
  
    applyFilters() {
      if (this.selectedPriceRanges.length === 0) {
        this.filteredProducts = this.products; // Nếu không chọn gì, hiển thị tất cả
        return;
      }
  
      this.filteredProducts = this.products.filter(product => {
        const price = this.convertPrice(product["Giá hiện tại"]);
        return this.selectedPriceRanges.some(range => price >= range.min && price <= range.max);
      });
      this.updatePage()
    }
  
    
    sortProducts() {
      if (this.sortOrder === 'asc') {
        this.filteredProducts.sort((a, b) => this.convertPrice(a["Giá hiện tại"]) - this.convertPrice(b["Giá hiện tại"]));
      } else if (this.sortOrder === 'desc') {
        this.filteredProducts.sort((a, b) => this.convertPrice(b["Giá hiện tại"]) - this.convertPrice(a["Giá hiện tại"]));
      }
      this.updatePage();
    }
  
    setSortOrder(event: Event) {
      const target = event.target as HTMLSelectElement; // Ép kiểu
      this.sortOrder = target.value;
      this.sortProducts();
    }
  
  
  
  
  
  
    nextPage() {
      if ((this.currentPage + 1) * this.pageSize < this.filteredProducts.length) {
        this.currentPage += 1;
        this.updatePage();
      }
    }
    
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
        this.updatePage();
      }
    }
    
  }
  
  
  