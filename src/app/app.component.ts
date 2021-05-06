import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-crypto';
  blockchain = '';
  // cryptoSvc = new CryptoService()

  constructor( public cryptoSvc: CryptoService) {
    this.blockchain = JSON.stringify( this.cryptoSvc.cryptoChain )
  }
}
