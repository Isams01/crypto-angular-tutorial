import { Transaction } from './transaction.class'
import { Blockchain } from './blockchain.class'

export class AutoActivity {

  timerHandle: any;
  blockchain: Blockchain;
  currentPayerAddress: string = '';
  currentPayeeAddress: string = '';
  currentCoinAmount: number = 0;

  constructor( blockchain: Blockchain ) {
    this.blockchain = blockchain;
    this.timerHandle = setInterval(() => {
      this.transactionTrigger()
    }, 20000);
  }
  transactionTrigger() {
    this.randomizePayer();
    this.randomizePayee();
    this.randomizeCoinAmount();
    this.sendTransaction();
  }

  randomizePayer() {
    this.currentPayerAddress = this.blockchain.registeredAddresses[ Math.floor(Math.random() * this.blockchain.registeredAddresses.length)]
  }

  randomizePayee() {
    let payee: string = '';
    while( payee === '' || payee === this.currentPayerAddress) {
      payee = this.blockchain.registeredAddresses[ Math.floor(Math.random() * this.blockchain.registeredAddresses.length)]
    }
    this.currentPayeeAddress = payee
  }

  randomizeCoinAmount() {
    this.currentCoinAmount = Math.floor(Math.random() * 25) + 1;
  }

  sendTransaction() {
    let transaction = new Transaction( Date.now(), this.currentPayerAddress, this.currentPayeeAddress, this.currentCoinAmount);
    this.blockchain.receiveTransaction(transaction);
    console.log("Sent a random transaction for: ", transaction.amount)
  }
}
