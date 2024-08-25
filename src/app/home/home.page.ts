import { Component } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

// Extracting URL and Key from environment
const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherData: any;

  constructor(public httpClient: HttpClient) {
    this.loadData();
  }

  loadData() {
    // Constructing the full API URL
    const url = `${API_URL}/weather?q=Dublin&appid=${API_KEY}`;

    this.httpClient.get(url).subscribe(results => {
      console.log(results);
      this.weatherData = results;  // Save the results to use in the template
    }, error => {
      console.error('Error fetching weather data', error);
    });
  }
}

