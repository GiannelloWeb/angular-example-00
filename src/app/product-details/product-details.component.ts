import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { products } from "../products";
import { CartService } from "../cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product;
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  coords = [
    {
      lat: 0,
      lon: 0,
      time: 0
    }
  ];
  err = {
    msg: "",
    status: false
  };
  watcher = 0;
  getLocation() {
    this.watcher = window.navigator.geolocation.watchPosition(
      position => {
        this.coords.push({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          time: position.timestamp
        });
        this.err = {
          msg: "",
          status: false
        };
      },
      err => {
        this.err = {
          msg: err.message,
          status: true
        };
      },
      this.options
    );
  }

  addToCart(product) {
    window.alert("Your " + product.name + " has been added to the cart!");
    this.cartService.addToCart(product);
    window.navigator.vibrate([300, 200, 100, 100, 100, 100, 100, 100, 300]);
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.product = products[+params.get("productId")];
    });
  }
}
/*+params.get("productId")*/
