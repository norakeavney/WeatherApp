import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  darkMode: boolean = false;

  constructor() {
    this.loadSettings();
  }

  loadSettings() {
    const darkModeSetting = localStorage.getItem('darkMode');
    if (darkModeSetting !== null) {
      this.darkMode = darkModeSetting === 'true';
      this.toggleDarkMode(); // Apply the saved theme
    } else {
      this.darkMode = false; // Default to light mode if no setting is saved
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode.toString());
  }
}
