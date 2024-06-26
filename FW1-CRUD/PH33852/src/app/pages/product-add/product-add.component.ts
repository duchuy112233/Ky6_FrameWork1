import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],

  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
 
  product: Product = {} as Product;
  addForm: FormGroup =  {} as FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      isShow: [false, Validators.required],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.addForm.valid) {
      console.log(this.addForm.valid);
      if (window.confirm('Thêm mới sản phẩm thành công')) {
            this.productService.addProduct(this.addForm.value).subscribe(() => {
              this.router.navigate(['/'])
      });
      }
  
    }
  }
}
