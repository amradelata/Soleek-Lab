import { Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';

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
  selectedImageData: string = '';
  // Popups vars
  isThePopOpen: boolean = false;
  popupData: any = {};

  // Confirm vars
  isTheConfirmOpen: boolean = false;
  confirmData: any = {};

  // Edit related vars
  editMode: boolean = false;
  editFormData: any = {};

  // Alert
  showAlert: boolean = false;

  // This function will handle the selected image
  fileSelected(e) {
    let fileInput = e.target;
    let image = fileInput.files[0];

    if (image === undefined) {
      return false;
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (x: any) => {
        this.selectedImageData = x.target.result;
      };
    }
  }

  updateImage(e) {
    let fileInput = e.target;
    let image = fileInput.files[0];

    if (image === undefined) {
      return false;
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (x: any) => {
        this.editFormData.image = x.target.result;
      };
    }
  }

  // Push the new product to the products array
  saveProduct() {
    // Validate data!
    if (
      this.name === '' ||
      this.category === '' ||
      this.price === 0 ||
      this.selectedImageData === ''
    ) {
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    } else {
      const newProduct = {
        id: this.generateRandomID(),
        name: this.name,
        category: this.category,
        price: this.price,
        image: this.selectedImageData

      };
      this.products.push(newProduct);

      // reset vars
      this.name = '';
      this.category = '';
      this.price = 0;
      this.selectedImageData = '';
      this.showAlert = false;
    }
  }

  generateRandomID() {
    let x = Math.random();
    x = x * 10000;
    x = Math.floor(x);
    return x;
  }

  deleteMe(id, e) {
    e.stopPropagation();
    this.isTheConfirmOpen = true;
    this.confirmData = this.products.find(product => {
      if (id === product.id) {
        return true;
      }
    });
  }

  delete(id) {
    let filteredArray = this.products.filter(product => {
      if (id === product.id) {
        return false;
      } else {
        return true;
      }
    });
    this.products = filteredArray;
    this.isTheConfirmOpen = false;
  }

  openPopup(id) {
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
  closeConfirm() {
    this.isTheConfirmOpen = false;
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

