function transfer(){
}

const Matic = require('maticjs').default
const config = require('./config')

transfer.transact = function(){
  const from = config.FROM_ADDRESS // from address
  const recipient = '0xfc5E5B504Ad7b6575Fe4123214E46855C26c2F64' // receipent address

  const token = config.MATIC_TEST_TOKEN // test token address
  const amount = '10000000000000000' // amount in wei

  // Create object of Matic
  const matic = new Matic({
    maticProvider: config.MATIC_PROVIDER,
    parentProvider: config.PARENT_PROVIDER,
    rootChainAddress: config.ROOTCHAIN_ADDRESS,
    syncerUrl: config.SYNCER_URL,
    watcherUrl: config.WATCHER_URL,
  })

  matic.wallet = config.PRIVATE_KEY // prefix with `0x`

  console.log(recipient, amount, from);
  matic.transferEthers(recipient, amount, {
    parent: true,
    from,
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash)
    },
    onError: (err) => {
      console.log("Error " , err)
    }
  })
}

module.exports = transfer;

// // Send Tokens
// matic.transferTokens(token, recipient, amount, {
//   from,
//   parent: true, // For token transfer on Main network (false for Matic Network)
//   onTransactionHash: (hash) => {
//     // action on Transaction success
//     console.log(hash) // eslint-disable-line
//   },
//   gasLimit: 1753662,
//   onError: (err) => {
//     console.log("Error occured ", err );
//   }
// })
