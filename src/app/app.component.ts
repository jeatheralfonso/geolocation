import { Component, OnInit } from '@angular/core';

import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'geolocation';
  public latitude;
  public longitude;
  //for tracking
  HIGH_ACCURACY: boolean = true;
  MAX_CACHE_AGE_MILLISECOND: number = 1;
  MAX_NEW_POSITION_MILLISECOND: number = 5000;

  trackOptions = {
    enableHighAccuracy: this.HIGH_ACCURACY,
    maximumAge: this.MAX_CACHE_AGE_MILLISECOND,
    timeout: this.MAX_NEW_POSITION_MILLISECOND,
  };
  constructor(public locationService: LocationService) {

  }
  ngOnInit() {
    //let location = this.getLocation();
    this.startTracking();
  }
  getLocation() {
    this.locationService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
    });
  }

  startTracking(){
  
    navigator.geolocation.watchPosition((resp) => {
      
      console.log("Leyo leyo");
      
      this.latitude = resp.coords.latitude; 
      this.longitude =  resp.coords.longitude
      
    }, (err) => {
      console.log(err);
      
    }, this.trackOptions)
  }
}
