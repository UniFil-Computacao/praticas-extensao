import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/servico/user.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.page.html',
  styleUrls: ['./modal-user.page.scss'],
})
export class ModalUserPage implements OnInit {
  message = 'This modal example uses the modalController to present and dismiss modals.';
  name: string;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private service: UserService
  ) { }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalUserPage,
    });
    modal.present();
  }

  ngOnInit() {
  }

  fecharModal(){
    this.modalCtrl.dismiss;
  }

  formSubmit(form: NgForm){
    const user = form.value;
    this.service.store(user).subscribe(response => 
      this.modalCtrl.dismiss());
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
