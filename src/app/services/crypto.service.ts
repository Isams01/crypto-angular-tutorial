import { Injectable } from '@angular/core';
import { Blockchain } from '../../classes/blockchain.class';
import { Block } from '../../classes/block.class';

@Injectable()
export class CryptoService {

  cryptoChain = new Blockchain();

  constructor() {
    console.log("Starting to mine a new block...");
    this.cryptoChain.addBlock( new Block(1, "05/02/2021", {amount: 10}, '') );


    console.log("Starting to mine a new block...");
    this.cryptoChain.addBlock( new Block(2, "05/02/2021", {amount: 25}, '') );

   }
}
