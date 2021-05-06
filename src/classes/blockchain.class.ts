import * as SHA256 from 'crypto-js/sha256';
import { Block } from './block.class';

export class Blockchain {
  chain: Block[];
  difficulty: number = 3;

  constructor() {
    this.chain = [ this.createGenesisBlock() ];
  }

  createGenesisBlock(){
    return new Block( 0, "05/02/2021", "Genesis Block", "0")
  }

  getLatestBLock() {
    return this.chain[ this.chain.length - 1 ]
  }

  addBlock(newBlock: any) {
    newBlock.previousHash = this.getLatestBLock().hash
    newBlock.mineBlock( this.difficulty );
    this.chain.push( newBlock )
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
