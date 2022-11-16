import { Component, OnInit } from '@angular/core';
import { Offer, OfferService } from 'src/app/servico/offer.service';
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  nOffer;
  handlerMessage = '';
  roleMessage = '';
  offers: Offer[];
  constructor(private service: OfferService, private alertController: AlertController) { }

  async presentAlert(id: any) {
    const alert = await this.alertController.create({
      header: 'Dejesa excluir ?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sim',
          cssClass: 'alert-button-confirm',
          handler: () => this.remove(id),
        },
      ],
    });
    await alert.present();
  }

  dataHoje() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
 }

  async newOffer() {
    const alert = await this.alertController.create({
      header: 'Por favor informe os dados da oferta',
      inputs: [
        {
          placeholder: 'Titulo da Oferta',
          name:'name',
        },
        {
          name:'descri',
          type: 'textarea',
          placeholder: 'Descrição e Endereço da Oferta',
          attributes: {
            maxlength: 255,
          },
        },
        {
          type: 'number',
          name:'value',
          placeholder: 'Valor rm R$',
          min: 0,
          max: 1000000000,
        },
        {
          name:'date',
          type: 'date',
          placeholder: 'Data',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'OK',
          handler: (data) => this.create(data),
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.offers = response;
    })
  }
  remove(id: any){
    this.service.remove(id).subscribe(() => {
      this.service.getAll().subscribe(response => {
        this.offers = response;
      })
    })
  }
  create(data: any){
    this.service.store(data);
    this.service.getAll().subscribe(response => {
      this.offers = response;
    })
  }
}
