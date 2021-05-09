export class Wallet {

  address: string = '';
  balance: number = 0;
  constructor() {
  }

  assignWalletAddress(address: string) {
    this.address = address;
    console.log('Assigned wallet address: ', this.address);
  }
}
