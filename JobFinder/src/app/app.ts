import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
})
export class App {
  showLayout = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.showLayout = !['/login', '/signup'].includes(e.urlAfterRedirects);
      });
  }
}
