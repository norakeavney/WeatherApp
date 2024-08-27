import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherDetail[];
  name: string;
  timezone: number; // Timezone offset in seconds from UTC
}

interface WeatherDetail {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cityName: string = '';
  localTemp: any = {};
  localTime: Date = new Date();
  weatherDetails: WeatherDetail[] = [];
  weatherIcon: string = '';
  loading: boolean = true;
  searchQuery: string = '';
  backgroundColor: string = '';

  constructor(
    public httpClient: HttpClient,
    public loadingController: LoadingController,
  ) {
    this.loadData('Dublin'); // Default city
  }

  
  async loadData(city: string) {
    this.loading = true;

    const url = `${API_URL}/weather?q=${city}&appid=${API_KEY}`;

    this.httpClient.get<WeatherResponse>(url).subscribe(
      results => {
        this.localTemp = results.main;
        this.weatherDetails = results.weather;
        this.cityName = results.name;
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails[0].icon}@4x.png`;        this.loading = false;
      },
      error => {
        console.error('Error fetching data', error);
        this.loading = false;
      }
    );
  }

  

  onSearchChange(event: any) {
    const query = event.detail.value;
    if (query && query.trim() !== '') {
      this.loadData(query);
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.cityName = '';
    this.localTemp = {};
    this.weatherDetails = [];
    this.localTime = new Date();
  }
}
