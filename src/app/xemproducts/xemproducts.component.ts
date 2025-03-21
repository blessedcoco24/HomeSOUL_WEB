import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../service/product.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-xemproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xemproducts.component.html',
  styleUrl: './xemproducts.component.css'
})
export class XemproductsComponent implements OnInit  {
  products: any[] = [];
  currentPage = 0; // Trang hiện tại
pageSize = 9; // Số sản phẩm mỗi trang
pagedProducts: any[] = []; // Danh sách sản phẩm hiển thị theo trang
Object = Object; // Thêm dòng này để Angular nhận diện Object
selectedCategories: string[] = []; // Lưu danh mục đã chọn
filteredProducts: any[] = [];
selectedPriceRanges: any[] = [];

searchTerm: string = ''; 
notFound = false; // Biến kiểm tra không tìm thấy sản phẩm


// tên danh mục
categoryNames: { [key: string]: string } = {
  ban: 'Bàn',
  bo_banan: 'Bộ bàn ăn',
  ghe: 'Ghế',
  ghesofa: 'Ghế sofa',
  giuongngu: 'Giường ngủ',
  tu_ke: 'Tủ kệ',
  combo: 'Combo nội thất'
};


// lọc giá
priceRanges = [
  { label: 'Giá dưới 1,000,000₫', min: 0, max: 1000000 },
  { label: '1,000,000₫ - 3,000,000₫', min: 1000000, max: 3000000 },
  { label: '3,000,000₫ - 5,000,000₫', min: 3000000, max: 5000000 },
  { label: 'Giá trên 5,000,000₫', min: 5000000, max: Infinity }
];

sortOrder: string = ''; // 'asc' cho thấp đến cao, 'desc' cho cao đến thấp
searchedProducts: any[] = []; // Đảm bảo luôn là mảng



constructor(private productService: ProductService,  private route: ActivatedRoute) {}

ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.updatePage();
  
      this.route.queryParams.subscribe(params => {
        const searchTerm = params['search'];
        console.log('tìm',searchTerm)
        if (searchTerm) {
          this.searchProducts(searchTerm);
        }
      });
    });
  }
  
//-----------------tìm sản phẩm------------
searchProducts(keyword: string) {
  this.filteredProducts = this.products.filter(product =>
    product["Tên sản phẩm"].toLowerCase().includes(keyword.toLowerCase())
  );

  this.currentPage = 0;
  this.updatePage();
}



//-----------------
  updatePage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(start, end);
  }

//-----------------

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

//-------------bộ lọc------------
onFilterChange(category: string, event: any) {
  if (event.target.checked) {
    this.selectedCategories.push(category);
  } else {
    this.selectedCategories = this.selectedCategories.filter(c => c !== category);
  }
  this.filterProducts(); // Gọi luôn bộ lọc
}



filterProducts() {
  let sourceProducts = this.filteredProducts.length ? this.filteredProducts : this.products; // Nếu đã tìm kiếm thì lọc trên kết quả tìm kiếm

  // Lọc theo danh mục nếu có
  if (this.selectedCategories.length > 0) {
    const categoryRequests = this.selectedCategories.map(cat =>
      this.productService.getProductsByCategory(cat)
    );

    forkJoin(categoryRequests).subscribe(responses => {
      let allProducts = responses.flat();

      // Áp dụng bộ lọc giá trên danh sách đã lọc theo danh mục
      this.applyPriceFilter(allProducts);
    });
  } else {
    // Nếu không lọc danh mục, chỉ lọc theo giá
    this.applyPriceFilter(sourceProducts);
  }
}

applyPriceFilter(products: any[]) {
  if (this.selectedPriceRanges.length > 0) {
    products = products.filter(product => {
      const price = this.convertPrice(product["Giá hiện tại"]);
      return this.selectedPriceRanges.some
      (range => price >= range.min && price <= range.max);
    
    });
  }

  this.filteredProducts = [...products]; // Cập nhật danh sách sau khi lọc giá
  this.sortProducts();
  console.log(this.filterProducts)
  this.updatePage();
}




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
  
  this.filterProducts(); // Gọi lại bộ lọc chung
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



  ////----------lọc tăng giảm----------
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

//---------------chuyển trang---------------

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

