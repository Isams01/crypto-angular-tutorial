import * as SHA256 from 'crypto-js/sha256';
import { Block } from './block.class';
import { Transaction } from './transaction.class';

export class Blockchain {
  chain: Block[];
  difficulty: number = 3;
  miningReward: number = 50;

  constructor() {
    this.chain = [ this.createGenesisBlock() ];
  }

  createGenesisBlock(){
    return new Block("05/02/2021", "Genesis Block", "0")
  }

  getLatestBlock() {
    return this.chain[ this.chain.length - 1 ]
  }

  mineCurrentBlock( minerAddress: string, transactions: Transaction[]): Promise<any> {
    transactions.push( new Transaction(Date.now(), "mint", minerAddress, this.miningReward))
    let promise = new Promise( (resolve, reject) => {
      let block = new Block(Date.now(), transactions, this.getLatestBlock().hash);
      block.mineBlock( this.difficulty )
        .then(() => {
          console.log('current block successfully mined...');
          this.chain.push( block );
          resolve(block);
        });
    });
    return promise;
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[ i ];
      const previousBlock = this.chain[ i - 1 ];
      // validate integrity
      if ( currentBlock.hash !== previousBlock.calculateHash() ) {
        return false
      }

      // validate hash chain link
      if ( currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    // no discrepancies
    return true;
  }
}
