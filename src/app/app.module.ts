import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CryptoService } from './services/crypto.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
