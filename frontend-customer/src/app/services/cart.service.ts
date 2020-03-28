import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartService {
  cartChanged = new Subject<any>();

  constructor() { }

  initCart() {
    if (localStorage.getItem('cart') == null) {
      localStorage.setItem('cart', '[]');
    }
    return JSON.parse(localStorage.getItem('cart'));
  }

  addToCart(item) {
    let cart = this.retrieveCart();
    // check if item exists in cart already
    // if it exists, then we add the quantity item
    console.log(cart);
    console.log(item);
    const index = this.indexOf(item, cart);
    console.log(index);

    if (index === -1) {
      item.quantity = 1;
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      alert('or here');
      this.addQuantity(item);
    }
  }

  removeFromCart(item) {
    console.log(item);
    let cart = this.retrieveCart();
    const index = this.indexOf(item, cart);

    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartChanged.next(cart);
  }

  retrieveCart() {
    console.log(localStorage.getItem('cart'));
    return JSON.parse(localStorage.getItem('cart'));
  }

  /**
   * Increase quantity of existing item in cart
   * @param item
   */
  addQuantity(item) {
    console.log(item);
    let cart = this.retrieveCart();
    const index = this.indexOf(item, cart);

    cart[index].quantity++;
    console.log('cart', cart);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartChanged.next(cart);
  }

  decreaseQuantity(item) {
    // if item quantity becomes 0, we remove item from cart
    let cart = this.retrieveCart();
    const index = this.indexOf(item, cart);

    if (cart[index].quantity === 1) {
      this.removeFromCart(item);
    } else {
      cart[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartChanged.next(cart);
    }
  }

/**
 *
 * custom indexof function to search fr objects in an array
 * @params: item, the item to search
 * @params: arr, the array to search for the item
 * @returns: number. index of item if found, else -1 if not found
 */
  indexOf(item, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === item.id) {
        return i;
      }
    }

    return -1;
  }

}
