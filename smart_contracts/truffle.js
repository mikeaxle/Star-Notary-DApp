var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = 'supply merry observe coffee artist cactus chair lunch normal spin will crack';

module.exports = {
  networks: { 
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"
    }, 
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/1e14f57075b14a15b7ad54c6ab230ef5') 
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};