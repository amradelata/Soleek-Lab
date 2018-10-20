import { Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SoleekLab';
  // This var is used to store the list of products
  products: any[];

  // These vars are used for two-way-data-binding
  name: string = '';
  category: string = '';
  price: number = 0;

  // This var is used to store the uploaded image name
  selectedImageName: string = '';

  // Popups vars
  isThePopOpen: boolean = false;
  popupData: any = {};

  // Edit related vars
  editMode: boolean = false;
  editFormData: any = {};

  // This function will handle the selected image
  fileSelected(e) {
    let fileInput = e.target;
    let image = fileInput.files[0]; // from this object you can access the filename and its size!

    if (image === undefined) {
      return false;
    } else {
      this.selectedImageName = image.name;
    }
  }

  // Push the new product to the products array
  saveProduct() {
    const newProduct = {
      id: this.generateRandomID(),
      name: this.name,
      category: this.category,
      price: this.price,
      date: new Date()
    };
    this.products.push(newProduct);

    // reset vars
    this.name = '';
    this.category = '';
    this.price = 0;
  }

  generateRandomID() {
    let x = Math.random();
    x = x * 10000;
    x = Math.floor(x);
    return x;
  }

  deleteMe(id) {
    let filteredArray = this.products.filter(product => {
      if (id === product.id) {
        return false;
      } else {
        return true;
      }
    });
    this.products = filteredArray;
  }

  openPopup(id) {
    console.log('opening the popup ...');
    this.isThePopOpen = true;
    let selectedProduct = this.products.find(product => {
      if (id === product.id) {
        return true;
      }
    });
    this.popupData = selectedProduct;
  }

  closePopup() {
    this.isThePopOpen = false;
  }

  editMe(id, e) {
    e.stopPropagation();

    this.editFormData = this.products.find(product => {
      if (id === product.id) {
        return true;
      }
    });
    this.editMode = true;
  }

  closeEditMode() {
    this.editMode = false;
  }

  ngOnInit() {
    this.products = [
      {
        id: this.generateRandomID(),
        name: 'test 3',
        price: 22,
        category: 'test category name 1',
        date: new Date()
      },
      {
        id: this.generateRandomID(),
        name: 'test',
        price: 10,
        category: 'test category name 2',
        date: new Date()
      },
      {
        id: this.generateRandomID(),
        name: 'test 2',
        price: 22,
        category: 'test category name 3',
        date: new Date()
      }
    ];
  }
}
// interface products{
//   name:string;
//   category:string;
//   price:number;
// }
