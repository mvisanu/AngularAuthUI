import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: any = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers('')
    .subscribe( res => {
      this.users = res;
    })
  }

  logout() {
    this.authService.signOut();
  }

}
