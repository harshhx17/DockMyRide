const Matic = require('maticjs').default
const config = require('./config')

const token = config.ROPSTEN_TEST_TOKEN // test token address
const amount = '1000' // amount in wei
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// Approve token
matic
  .approveERC20TokensForDeposit(token, amount, {
    from,
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash) // eslint-disable-line
    }
  })
  .then(() => {
    // Deposit tokens
    console.log("pehla waala ho gaya")
    matic.depositERC20Tokens(token, from, amount, {
      from,
      onTransactionHash: (hash) => {
        // action on Transaction success
        console.log(hash) // eslint-disable-line
      },
      gasLimit: 1753662,
      onError: (err) => {
        console.log("Error occured: " + err);
      }
    })
  })
