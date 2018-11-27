const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => { 

    let user1 = accounts[1]
    let user2 = accounts[2]
    let randomMaliciousUser = accounts[3]

    let name = 'awesome star!'
    let starStory = "this star was bought for my wife's birthday"
    let ra = "1"
    let dec = "1"
    let mag = "1"
    let starId = 1


    beforeEach(async function() { 
        this.contract = await StarNotary.new({from: accounts[0]})
    })

    // test 1: create star
    describe('can create a star', () => { 
        // test create star and get name
        it('can create a star and get its name', async function () { 
            
            await this.contract.createStar(name, starStory, ra, dec, mag, starId, {from: user1})

            let starName = await this.contract.tokenIdToStarInfo(starId)

            assert.equal(starName[0], name)
        })
    })

     // test 2: star uniqueness
    describe('star uniqueness', () => {
        // test unique star coordinates
        it('only unique stars can be minted', async function() { 
            // first we mint our first star
            await this.contract.createStar(name, starStory, ra, dec, mag, starId, {from: user1})
            
            // then we try to mint the same star, and we expect an error
            expectThrow(this.contract.createStar(name, starStory, ra, dec, mag, starId + 1, {from: user1}));
        })

        // test unique token id
        it('only stars unique stars can be minted even if their ID is different', async function() { 
            // first we mint our first star
            await this.contract.createStar(name, starStory, ra, dec, '13', starId, {from: user1})
            
            // then we try to mint the same star, and we expect an error
            expectThrow(this.contract.createStar(name, starStory, ra, dec, '16', starId, {from: user2}))
        })

        // test unique star minting
        it('minting unique stars does not fail', async function() { 
            for(let i = 0; i < 10; i ++) { 
                let id = i
                let newRa = i.toString()
                let newDec = i.toString()
                let newMag = i.toString()

                await this.contract.createStar(name, starStory, newRa, newDec, newMag, id, {from: user1})

                let starInfo = await this.contract.tokenIdToStarInfo(id)
                assert.equal(starInfo[0], name)
            }
        })


    })

    // test 3: buying and selling stars
    describe('buying and selling stars', () => { 
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () { 
            await this.contract.createStar(name, starStory, dec, ra, mag, starId, {from: user1})    
        })

        // test if a user can put star uo for sale
        it('user1 can put up their star for sale', async function () { 
            assert.equal(await this.contract.ownerOf(starId), user1)
            await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            
            assert.equal(await this.contract.starsForSale(starId), starPrice)
        })

        // test if user can buy star
        describe('user2 can buy a star that was put up for sale', () => { 
            // put star up for sale
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            })

            // test if user is owner of star after purchase
            it('user2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(starId, {from: user2, value: starPrice, gasPrice: 0})
                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            // test of user balance is correcly changed after transaction
            it('user2 ether balance changed correctly', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')
                const balanceBeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0})
                const balanceAfterTransaction = web3.eth.getBalance(user2)

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })
})

// throw error function 
var expectThrow = async function(promise) { 
    try { 
        await promise
    } catch (error) { 
        assert.exists(error)
        return 
    }

    assert.fail('expected an error, but none was found')
}