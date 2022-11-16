import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { UserPage } from './pages/user/user.page';
import { ModalUserPage } from './pages/modal-user/modal-user.page';

@NgModule({
  declarations: [AppComponent, UserPage, ModalUserPage],
  imports: [BrowserModule, 
   IonicModule.forRoot(),
   AppRoutingModule,
   HttpClientModule,
   FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
