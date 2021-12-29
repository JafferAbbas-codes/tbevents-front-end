import { SearchComponent } from './search/search.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { VenuePageComponent } from './venue-page/venue-page.component';
import { BookingComponent } from './booking/booking.component';
import { BookingsDashboardComponent } from './vendor/bookings-dashboard/bookings-dashboard.component';
// import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'venue/:id', component: VenuePageComponent },
  {
    path: 'venue/book/:id',
    component: BookingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bookings-dashboard',
    component: BookingsDashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
