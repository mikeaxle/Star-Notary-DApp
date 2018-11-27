// import hapi js
const Hapi = require("hapi");

// import web3
var Web3 = require('web3');

const url = {
    mainnet: 'https://mainnet.infura.io/v3/1e14f57075b14a15b7ad54c6ab230ef5',
    rinkeby: 'https://rinkeby.infura.io/v3/1e14f57075b14a15b7ad54c6ab230ef5',
}

var web3 = new Web3(url.rinkeby)
var address = '0x469b6D4bF2A5Bb2c0D86d68bC2806508f06a3ba6'
var contractAddress = '0x8062cFFB0a0E6DF9a16f853DCef260125D72c6B0'
var abi = [{
    "constant": false,
    "inputs": [{
            "name": "to",
            "type": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
        "name": "_tokenId",
        "type": "uint256"
    }],
    "name": "buyStar",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "_name",
            "type": "string"
        },
        {
            "name": "_starStory",
            "type": "string"
        },
        {
            "name": "_ra",
            "type": "string"
        },
        {
            "name": "_dec",
            "type": "string"
        },
        {
            "name": "_mag",
            "type": "string"
        },
        {
            "name": "_tokenId",
            "type": "uint256"
        }
    ],
    "name": "createStar",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "_tokenId",
            "type": "uint256"
        },
        {
            "name": "_price",
            "type": "uint256"
        }
    ],
    "name": "putStarUpForSale",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "from",
            "type": "address"
        },
        {
            "name": "to",
            "type": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "from",
            "type": "address"
        },
        {
            "name": "to",
            "type": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "name": "_data",
            "type": "bytes"
        }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "to",
            "type": "address"
        },
        {
            "name": "approved",
            "type": "bool"
        }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "from",
            "type": "address"
        },
        {
            "name": "to",
            "type": "address"
        },
        {
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "transferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": true,
            "name": "from",
            "type": "address"
        },
        {
            "indexed": true,
            "name": "to",
            "type": "address"
        },
        {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Transfer",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": true,
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "name": "approved",
            "type": "address"
        },
        {
            "indexed": true,
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Approval",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": true,
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "name": "operator",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "approved",
            "type": "bool"
        }
    ],
    "name": "ApprovalForAll",
    "type": "event"
},
{
    "constant": true,
    "inputs": [{
        "name": "owner",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "getApproved",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "owner",
            "type": "address"
        },
        {
            "name": "operator",
            "type": "address"
        }
    ],
    "name": "isApprovedForAll",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "ownerOf",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "uint256"
    }],
    "name": "starsForSale",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "interfaceId",
        "type": "bytes4"
    }],
    "name": "supportsInterface",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "uint256"
    }],
    "name": "tokenIdToStarInfo",
    "outputs": [{
            "name": "name",
            "type": "string"
        },
        {
            "name": "starStory",
            "type": "string"
        },
        {
            "name": "ra",
            "type": "string"
        },
        {
            "name": "dec",
            "type": "string"
        },
        {
            "name": "mag",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}
]


// contract instance
var contract = new web3.eth.Contract(abi, contractAddress)

// Create a server with a host and port
const server = Hapi.server({
    host: "localhost",
    port: 8000
  });

  server.route([{
      method: 'GET',
      path: '/star/{starTokenId}',
      handler: async(request, h) => {
        //   try {
              
        //   } catch(err) {
        //       return err
        //   }

        let _tokenId = request.params.starTokenId

        contract.methods.tokenIdToStarInfo()
        .then(res => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
      }
  }])


  // Start the server
async function start() {
    try {
      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("Server running at:", server.info.uri);
  }
  
  start();