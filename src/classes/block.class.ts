import { withModule } from '@angular/core/testing';
import * as SHA256 from 'crypto-js/sha256';
import { Transaction } from './transaction.class';

export class Block{
  timestamp: any;
  transactions: Transaction[] = [];
  previousHash: string = '';
  hash: string = '';
  nonce: number = 0;

  constructor(timestamp: any, transactions: any, previousHash: string) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256( this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock( difficulty: any ): Promise<any> {
    let promise = new Promise( (resolve, reject ) => {
      while ( this.hash.substring(0, difficulty) != Array(difficulty + 1).join( "0" ) ) {
        this.nonce++
        this.hash = this.calculateHash();
      }
      console.log("Block successfully hashed (" + this.nonce + " iterations) Hash: " + this.hash);
      resolve(this.hash);
    });
    return promise;
  }

}
