import { Injectable } from '@angular/core';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  //for tracking
  HIGH_ACCURACY: boolean = true;
  MAX_CACHE_AGE_MILLISECOND: number = 30000;
  MAX_NEW_POSITION_MILLISECOND: number = 5000;

  trackOptions = {
    enableHighAccuracy: this.HIGH_ACCURACY,
    maximumAge: this.MAX_CACHE_AGE_MILLISECOND,
    timeout: this.MAX_NEW_POSITION_MILLISECOND,
  };

  constructor() { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  startTracking(): Promise<any>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition((resp) => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        
      }, (err) => {
        reject(err);
      }, this.trackOptions)
    });
  
  }
}
