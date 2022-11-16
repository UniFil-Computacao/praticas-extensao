import { Component, OnInit } from '@angular/core';
import { ModalUserPage } from '../../modal-user/modal-user.page';
import { ModalController } from '@ionic/angular';
import { User, UserService } from 'src/app/servico/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User[];
  userResponse: string;
  constructor(private service: UserService,
    private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
  }
  newUser(){
    this.modalCtrl.create({
      component: ModalUserPage
    }).then(modal => modal.present());
    this.userResponse = "Usuário cadastrado com sucesso";
  }
  startAuth(form: NgForm){
    const login = form.value;
    this.service.login(login).subscribe(response => this.user = response);
    if (this.user == undefined ) {
      this.userResponse = "Erro Credenciais Inválidas";
      return this.userResponse;
    }else{
      this.userResponse = "";
      return this.router.navigate(['/offer']);
    }
  }
}
