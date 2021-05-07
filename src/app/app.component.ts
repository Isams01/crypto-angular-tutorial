import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { Validators, FormGroup, FormBuilder} from "@angular/forms"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  walletAddressForm: FormGroup;

  blockchain = '';
  balance: number = 0;
  // cryptoSvc = new CryptoService()

  constructor( public cryptoSvc: CryptoService, public fb: FormBuilder) {
    this.walletAddressForm = this.fb.group({
      walletAddress: ['', Validators.required]
    });
    this.blockchain = JSON.stringify( this.cryptoSvc.cryptoChain )
  }

  assignWalletAddress() {
    console.log('Called assignWalletAddress');
  }
}
