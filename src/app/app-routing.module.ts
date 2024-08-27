import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Define routes for the application
const routes: Routes = [
  {
    path: '', // Default path
    redirectTo: 'home', // Redirect to 'home'
    pathMatch: 'full' // Ensure full match before redirecting
  },
  {
    path: 'home', // Route for Home page
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) // Lazy load Home module
  },
  {
    path: 'about', // Route for About page
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule) // Lazy load About module
  },
  {
    path: 'settings',  // Route for Settings page
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule) // Lazy load Settings module
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], // Preload all modules for faster navigation
  exports: [RouterModule] // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule { }
