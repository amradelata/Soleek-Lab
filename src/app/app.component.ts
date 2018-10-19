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
  products: any[];
  name: string;

  // selectedImageData: string = '';
  selectedImageName: string = '';

  fileSelected(e) {

    let fileInput = e.target;
    let image = fileInput.files[0]; // from this object you can access the filename and its size!
    console.log(image);
    if (image === undefined) {
      return false
    } else {
      this.selectedImageName = image.name;
    }


    // var reader = new FileReader();
    // reader.readAsDataURL(image)
    // reader.onload = (x: any) => {
    //   // console.log(x.target.result);
    //   this.selectedImageData = x.target.result;
    // };

  }
  onClick() {
    this.products.push({

    });
  }
  addProduct(product) {
    console.log(product);
    return false;
  }
  ngOnInit() {
    this.products = [
      {
        id: 11111,
        name: 'test 3',
        price: 22,
        category: 'test category name 1'
      },
      {
        id: 22222,
        name: 'test',
        price: 10,
        category: 'test category name 2 '
      }, {
        id: 33333,
        name: 'test 2',
        price: 22,
        category: 'test category name 3'
      },
    ];
  }
}
// interface products{
//   name:string;
//   category:string;
//   price:number;
// }

