import {AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements  AfterViewInit{

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  // @ts-ignore
  map: google.maps.Map | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        this.renderMap(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.error('Error getting user location:', error);
        this.showPermissionDeniedMessage();
      }
    );
  }

  renderMap(latitude: number, longitude: number): void {
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 8
    };

    // @ts-ignore
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // @ts-ignore
    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map,
      title: 'Your Location'
    });
  }

  showPermissionDeniedMessage(): void {
    const confirmRetry = confirm('Geolocation permission is denied. Do you want to retry?');
    if (confirmRetry) {
      this.initMap();
    }
  }
}
