import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private storage: Storage, private auth: AuthenticationService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.auth.getIsAuthentication().then((val) => {
          if (val) {
            resolve(true);
          } else {
            this.router.navigate(['/first-page']);
            resolve(false);
          }
        });
      });
    });

  }
  
}
