import * as SHA256 from 'crypto-js/sha256';
import { Block } from './block.class';
import { Transaction } from './transaction.class';

export class Blockchain {
  chain: Block[] = [];
  difficulty: number = 3;
  miningReward: number = 50;
  registeredAddresses: string[] = [];


  constructor() {
    this.createGenesisBlock();
    this.registeredAddresses = ['wallet-Alice', 'wallet-Bob', 'wallet-Charlie', 'wallet-Miner49r'];
    this.airdropCoins( 100 );
  }

  airdropCoins( coins: number ) {
    let airdropTransactions: Transaction[] = [];
    for (const addr of this.registeredAddresses) {
      let transaction = new Transaction( Date.now(), "mint", addr, coins);
      airdropTransactions.push( transaction );
    }
    this.mineCurrentBlock('wallet-Miner49r',airdropTransactions);
  }

  createGenesisBlock(){
    let txn = new Transaction( Date.now(), "mint", "genesis", 0);
    let block = new Block( Date.now(), [ txn ], "0");
    this.chain.push( block );
  }

  getLatestBlock() {
    return this.chain[ this.chain.length - 1 ]
  }

  mineCurrentBlock( minerAddress: string, transactions: Transaction[]): Promise<any> {
    let validatedTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      if ( transaction.payerAddress === "mint" || this.validateTransaction( transaction ) ) {
        validatedTransactions.push( transaction );
      }
    }
    console.log("Validated Transactions: ", validatedTransactions.length);

    validatedTransactions.push( new Transaction(Date.now(), "mint", minerAddress, this.miningReward))
    let promise = new Promise( (resolve, reject) => {
      let block = new Block(Date.now(),validatedTransactions, this.getLatestBlock().hash);
      block.mineBlock( this.difficulty )
        .then(() => {
          console.log('current block successfully mined...');
          this.chain.push( block );
          resolve(block);
        });
    });
    return promise;
  }

  validateTransaction( transaction: any ) {
    let payerAddress = transaction.payerAddress;
    let balance = this.getAddressBalance( payerAddress );
    if ( balance >= transaction.amount ) {
      return true
    } else {
      return false;
    }
  }

  getAddressBalance(address: string) {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.payerAddress === address) {
          balance -= transaction.amount;
        }
        if (transaction.payeeAddress === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
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

  receiveTransaction(transaction: Transaction) {
    console.log("Transaction received by blockchain, Amount: ", transaction.amount);
    this.mineCurrentBlock( 'wallet-Miner49r', [transaction]);
  }
}
