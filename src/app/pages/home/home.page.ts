import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User, UserService } from 'src/app/servico/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users: User[];
  constructor(private alertCtrl : AlertController, private service: UserService) {}
  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.users = response;
    })
  }
  remove(id: any){
    this.service.remove(id).subscribe(() => {
      this.service.getAll().subscribe(response => {
        this.users = response;
      })
    })
  }
}
