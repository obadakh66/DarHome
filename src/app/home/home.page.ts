import { Component, OnInit } from '@angular/core';
import { Category } from './categories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  allCategories:Category=new Category();
  constructor(private router:Router) {}
ngOnInit(){
console.log(this.allCategories.categories)
}
navigateToNewOrder(categoryId){
this.router.navigate(["/new-order/"+categoryId])
}
}
