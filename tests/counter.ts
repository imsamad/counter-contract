import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {  Counter } from "../target/types/counter";
import { Keypair, PublicKey } from "@solana/web3.js";

import { getKeypairFromFile } from "@solana-developers/helpers";

describe("counter",  () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;
  const counter_account = new Keypair();
  // const connection = provider.connection;
  const [counter_account_pda] = PublicKey.findProgramAddressSync([Buffer.from('counter')],program.programId);

  it("Is initialized!", async () => {
    
    // const wallet =await getKeypairFromFile('~/.config/solana/id.json')
    // var accountBalanceBefore = await connection.getBalance(counter_account.publicKey);

    // var walletBalanceBefore = await connection.getBalance(wallet.publicKey);

    // const requiredLamports = await connection.getMinimumBalanceForRentExemption(16);

    // const tx = await program.methods
    //   .initialize()
    //   .accounts({
    //     counter: counter_account.publicKey,
    //   })
    //   .signers([wallet,counter_account])
    //   .rpc({
    //     skipPreflight: true,
    //   });

    // with pda
    const tx = await program.methods
      .initialize()
      .rpc();

    // const accountInfo = await connection.getAccountInfo(counter_account.publicKey);
    // console.log(accountInfo)  
    console.log("Your transaction signature", tx);

//     const counter_account_data = await program.account.counter.fetch(
//       counter_account.publicKey
//     );
    
//     console.log(`counter_account_data: `, counter_account_data);

//     var accountBalanceAfter = await connection.getBalance(counter_account.publicKey);

//     var walletBalanceAfter = await connection.getBalance(wallet.publicKey);
//     console.log({
//       accountBalanceBefore,
// walletBalanceBefore,
// requiredLamports,
// accountBalanceAfter,
// walletBalanceAfter,
//     })
  });

  it('increment', async () => {
    // const txm =  await program.methods.increment().accounts({
    //   counter:counter_account.publicKey
    // }).rpc();
    const txm =  await program.methods.increment().rpc();

    console.log('txn: ',txm)
    
    const accData = await program.account.counter.fetch(counter_account_pda);

    console.log('accData: ',accData)
  })
});
