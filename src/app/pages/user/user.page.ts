import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User, UserService } from 'src/app/servico/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  users: User[];
  constructor(private service: UserService,
    private modalCtrl: ModalController) { }

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
