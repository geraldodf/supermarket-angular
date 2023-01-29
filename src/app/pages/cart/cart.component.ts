import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  list: string[] = ['Product-1', 'Product-1', 'Product-3', 'Product-4', 'Product-5'];

  ngOnInit(): void {

  }
}
