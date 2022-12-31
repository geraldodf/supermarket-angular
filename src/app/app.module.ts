import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { OfertasEspeciaisComponent } from './templates/ofertas-especiais/ofertas-especiais.component';
import { ProdutosComponent } from './templates/produtos/produtos.component';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OfertasEspeciaisComponent,
    ProdutosComponent,
  ],
  imports: [BrowserModule, RouterModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
