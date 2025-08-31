import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome {
  username = '';
  constructor(private router: Router){
  }
  ngOnInit(){
    const u = sessionStorage.getItem('username');
    if (!u) {
      this.router.navigate(['/login']);
      return;
    }
    this.username = u;
  }

  logout() {
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
