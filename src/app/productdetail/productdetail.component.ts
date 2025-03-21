import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductdataService } from '../service/productdata.service';
import { CommonModule, formatNumber } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productdetail',
  imports: [CommonModule, FormsModule],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent implements OnInit {
  product: any;
  categoryNames: { [key: string]: string } = {
    ban: 'Bàn',
    bo_banan: 'Bộ bàn ăn',
    ghe: 'Ghế',
    ghesofa: 'Ghế sofa',
    giuongngu: 'Giường ngủ',
    tu_ke: 'Tủ kệ',
    combo: 'Combo nội thất'
  };
  constructor(private route: ActivatedRoute, private http: HttpClient, private productdataService: ProductdataService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productdataService.getProductById(id).subscribe(data => {
        this.product = data;
      });
    }
  }

}
