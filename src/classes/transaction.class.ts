export class Transaction {
  timestamp: any
  payerAddress: any;
  payeeAddress: any;
  amount: number = 0;

  constructor( timestamp: any, payerAddr: any, payeeAddr: any, amount: number ) {
    this.timestamp = timestamp;
    this.payerAddress = payerAddr;
    this.payeeAddress = payeeAddr;
    this.amount = amount;
  }
}
