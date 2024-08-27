import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  darkMode: boolean = false;

  constructor(private nativeStorage: NativeStorage) {
    this.loadSettings();
  }

  loadSettings() {
    this.nativeStorage.getItem('darkMode').then(value => {
      this.darkMode = value;
      this.toggleDarkMode(); // Apply the saved theme
    }).catch(() => {
      this.darkMode = false; // Default to light mode if no setting is saved
    });
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme', this.darkMode);
    this.nativeStorage.setItem('darkMode', this.darkMode).then(() => {
      console.log('Dark mode setting saved');
    }).catch(error => {
      console.error('Error saving dark mode setting', error);
    });
  }
}
