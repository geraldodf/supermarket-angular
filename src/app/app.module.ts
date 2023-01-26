import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { SpecialOffersComponent } from './templates/special-offers/special-offers.component';
import { ProductsComponent } from './templates/products/products.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SpecialOffersComponent,
    ProductsComponent,
    CartComponent,
  ],
  imports: [BrowserModule, RouterModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
