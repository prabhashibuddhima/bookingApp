import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'calendar-book', loadChildren: './calendar-book/calendar-book.module#CalendarBookPageModule', canActivate: [AuthGuard]  },
  { path: 'booking-list', loadChildren: './booking-list/booking-list.module#BookingListPageModule', canActivate: [AuthGuard]  },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'first-page', loadChildren: './first-page/first-page.module#FirstPagePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
