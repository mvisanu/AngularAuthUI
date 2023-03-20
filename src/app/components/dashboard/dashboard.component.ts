import { UserStoreService } from './../../services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: any = [];
  public fullName: string = "";
  public role!: string;

  constructor(private authService: AuthService, private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.authService.getUsers('')
    .subscribe( res => {
      this.users = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val => {
      const fullNameFromToken = this.authService.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logout() {
    this.authService.signOut();
  }

}
