import { V1Service } from './../services/api/v1.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productTypeList = ['Brand New', 'Second Hand', 'Refurbrished'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: V1Service,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      productType: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['productType'].setValue(
        this.editData.productType
      );
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            this.toast.success({detail:"Success Message", summary: 'product added successfully',duration: 5000});
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (error) => {
            this.toast.success({detail:"Error Message", summary: 'Error while adding record',duration: 5000});
            console.log(error);
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.toast.success({detail:"Success Message", summary: 'product added successfully',duration: 5000});
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.toast.success({detail:"Error Message", summary: 'Error while adding record',duration: 5000});
      },
    });
  }
}
