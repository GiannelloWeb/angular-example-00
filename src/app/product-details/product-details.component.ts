import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { products } from "../products";
import { CartService } from "../cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product;
  options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 5000
  };
  coords = [
    {
      lat: 0,
      lon: 0,
      time: 0,
      accuracy: 0,
      speed: 0
    }
  ];
  err = {
    msg: "",
    code: 0,
    status: false
  };
  watcher = 0;
  watcherStat = true;
  getLocation(act) {
    if (act === "on") {
      console.log("geolocation On");
      this.watcherStat= false;
      this.watcher = window.navigator.geolocation.watchPosition(
        position => {
          this.coords.push({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            time: position.timestamp,
            accuracy: position.coords.accuracy,
            speed: position.coords.speed
          });
          this.err = {
            msg: "",
            code: 0,
            status: false
          };
          
          console.log(position.coords.heading, position.coords.speed);
        },
        err => {
          this.err = {
            msg: err.message,
            code: err.code,
            status: true
          };
          console.error("geolocation error", err.message);
        },
        this.options
      );
    } else if (act === "off") {
      window.navigator.geolocation.clearWatch(this.watcher);
      console.log("geolocation off");
    }
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
  ngOnDestroy() {
    this.getLocation("off");
  }
}
/*+params.get("productId")*/
