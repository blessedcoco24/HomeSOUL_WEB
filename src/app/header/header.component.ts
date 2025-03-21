import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchTerm: string = '';

  isSearchBoxVisible = false; // Biến để kiểm soát hiển thị thẻ tìm kiếm

  toggleSearchBox() {
    this.isSearchBoxVisible = !this.isSearchBoxVisible; // Đảo ngược trạng thái hiển thị
  }

  constructor(private router: Router) {}

  //---------------
  
searchProduct() {
  // this.isSearchBoxVisible = false; // Ẩn ô tìm kiếm
  this.router.navigate(['/ket-qua-tim-kiem'], { queryParams: { search: this.searchTerm } });
  console.log(this.searchTerm)
}
}
