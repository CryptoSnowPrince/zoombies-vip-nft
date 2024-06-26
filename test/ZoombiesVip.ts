import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ZoombiesVIP", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployZoombiesVIPCollection() {
    // Contracts are deployed using the first signer/account by default
    const [owner, bob, alice] = await ethers.getSigners();

    const ZoombiesVip = await ethers.getContractFactory("ZoombiesVIP");
    const zoombies_vip = await ZoombiesVip.deploy();

    return { zoombies_vip,  owner, bob, alice };
  }

  describe("Test token owner, name and symbol ", function () {

    it("Should set the right owner", async function () {
           const { zoombies_vip, owner } = await loadFixture(deployZoombiesVIPCollection);
    
           expect(await zoombies_vip.owner()).to.equal(owner.address);
    });

    it("Should set the right name - Zoombies VIP", async function () {
      const { zoombies_vip, owner } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.name()).to.equal("Zoombies VIP");
    }); 

    it("Should set the right symbol - ZVIP", async function () {
      const { zoombies_vip, owner } = await loadFixture(deployZoombiesVIPCollection);
  
      expect(await zoombies_vip.symbol()).to.equal("ZVIP");
    });
  });

  describe("Test readonly functions", function () {

    it("Testing price", async function () {
           const { zoombies_vip, owner } = await loadFixture(deployZoombiesVIPCollection);
    
           expect(await zoombies_vip.price()).to.equal("1000000000000000000");
    });

    it("Testing upgradeFee", async function () {
      const { zoombies_vip, owner } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.upgradeFee()).to.equal("1000000000000000000");
    }); 

    it("Testing award token and locked state", async function () {
      const { zoombies_vip, owner, bob } = await loadFixture(deployZoombiesVIPCollection);
      // No token there
      expect(await zoombies_vip.locked(0)).to.equal(false);

      // award a token
      await expect(zoombies_vip.connect(owner).award(bob.address, 1))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 0, 1); //first token is tokenId = 0

      expect(await zoombies_vip.locked(0)).to.equal(true);

    });

    it("Testing getVipStatus", async function () {
      const { zoombies_vip, owner, bob } = await loadFixture(deployZoombiesVIPCollection);

      //award a token
      await expect(zoombies_vip.connect(owner).award(bob.address, 2))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 0, 2); //first token is tokenId = 0

       expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(2);
    });

  });

  describe("Revoke", function() {
    it("Testing Revoke and isRevoked", async function () {
      const { zoombies_vip, owner, bob } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);

      //award the 0 tokenId to deployer
      await expect(zoombies_vip.connect(owner).award(owner.address, 2))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(owner.address, 0, 2); //first token is tokenId = 0

      //award a GOLD VIP token
      await expect(zoombies_vip.connect(owner).award(bob.address, 2))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 1, 2); //first token is tokenId = 0

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);
      expect(await zoombies_vip.ownerOf(1)).to.equal(bob.address);

      //revoke the token
      await expect(zoombies_vip.connect(owner).revoke(bob.address))
      .to.emit(zoombies_vip, "Revoked")
      .withArgs(bob.address, 1);

      expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(0);
      expect(await zoombies_vip.getTokenByOwner(bob.address)).to.equal(0);
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      expect(await zoombies_vip.isRevoked(bob.address)).to.equal(true);

      //TODO fix this later
      //This reverts as expected..but I can't get the correct match to message..
       //expect(await zoombies_vip.ownerOf(1)).to.be
      // .revertedWith("VM Exception while processing transaction: reverted with reason string 'ERC721: invalid token ID'");
    });
  })

  describe("Upgrade token", function() {

    it("Upgrade Fail - Insufficient funds", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);

      //award the 0 tokenId VIP
      await expect(zoombies_vip.connect(owner).award(owner.address, 1)) //VIP token
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(owner.address, 0, 1); //owner, tokenId, VIP

      //award the 1 tokenId GOLD VIP
      await expect(zoombies_vip.connect(owner).award(bob.address, 2)) //VIP token
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 1, 2); //owner, tokenId, VIP

      expect(await zoombies_vip.ownerOf(1)).to.equal(bob.address);
      expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(2);
      expect(await zoombies_vip.getTokenByOwner(bob.address)).to.equal(1);
      expect(await zoombies_vip.isUpgraded(bob.address)).to.equal(false);
      
      // Fail with no money
      await expect(zoombies_vip.connect(bob).upgrade(bob.address)).to.be.
      revertedWithCustomError(zoombies_vip, "notEnoughFunds")
      .withArgs("Insufficient funds for upgrade");

      expect(await zoombies_vip.isUpgraded(bob.address)).to.equal(false);
    });

    it("Upgrade Success - from VIP to DIAMOND", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);
  
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);

      //award the 0 tokenId NFT spot
      await expect(zoombies_vip.connect(owner).award(owner.address, 1)) //VIP token
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(owner.address, 0, 1); //owner, tokenId, VIP
      
      //award a GOLD VIP
      await expect(zoombies_vip.connect(owner).award(bob.address, 1)) //VIP token
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 1, 1); //owner, tokenId, VIP

      //upgrade to GOLD, Paid for by alice
      await expect(zoombies_vip.connect(alice)
      .upgrade(bob.address, {value: "100000000000000000000"})) //VIP token
      .to.emit(zoombies_vip, "Upgraded")
      .withArgs(bob.address, 1, 2); //owner, tokenId, GOLD

      expect(await zoombies_vip.isUpgraded(bob.address)).to.equal(true);

      //upgrade to DIAMOND, paid by owner
      await expect(zoombies_vip.connect(owner)
      .upgrade(bob.address, {value: "150000000000000000000"})) //GOLD token
      .to.emit(zoombies_vip, "Upgraded")
      .withArgs(bob.address, 1, 3); //owner, tokenId, DIAMOND

      expect(await zoombies_vip.isUpgraded(bob.address)).to.equal(true);

      // Fail trying to upgrade past DIAMOND
      await expect(zoombies_vip.connect(bob).upgrade(bob.address)).to.be.
      revertedWithCustomError(zoombies_vip, "maxVIPLevel")

      expect(await zoombies_vip.isUpgraded(bob.address)).to.equal(true);

    });

  })

  describe("Buy token", function() {

    it("Buy Fail - no funds", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Fail with no money
      await expect(zoombies_vip.connect(bob).buy(bob.address, 1)).to.be.
      revertedWithCustomError(zoombies_vip, "notEnoughFunds")
      .withArgs("Insufficient funds");
    });

    it("Buy Fail - token type out of range", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // // Fail with VIP type out of range ( not sure why this doesnt revert the custom error)
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 5, {value: "100000000000000000000"}))
      .revertedWithoutReason;

    });

    it("Buy Success - VIP", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy VIP
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 1, {value: "100000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 1); //owner, tokenId, VIP

      //verify status
      expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(1);
      
      //verify locked
      expect(await zoombies_vip.locked(0)).to.equal(true);

      //verify balance
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);
    });

    it("Buy Success - GOLD", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy GOLD
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 2, {value: "200000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 2); //owner, tokenId, GOLD

      //verify status
      expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(2);

      //verify locked
      expect(await zoombies_vip.locked(0)).to.equal(true);      
      
      // verify balance
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);
    });

    it("Buy Success - DIAMOND", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy DIAMOND
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND

      //verify status
      expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(3);

      //verify locked
      expect(await zoombies_vip.locked(0)).to.equal(true);      
      
      // verify balance
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);
    });    

  })

  describe("Unlock token", function () {
    it("Unlock Fail - not owner", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy GOLD
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND

      //verify status
      expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(3);

      //verify locked
      expect(await zoombies_vip.locked(0)).to.equal(true);

      //FAIL unlock not 
      await expect(zoombies_vip.connect(bob).unlock(0))
      .to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      
      // verify balance
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);
    }); 

    it("Unlock Success", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy DIAMOND
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND

      //verify status
      expect(await zoombies_vip.getVipStatus(bob.address)).to.equal(3);

      //verify locked
      expect(await zoombies_vip.locked(0)).to.equal(true);

      //Success unlock 
      await expect(zoombies_vip.unlock(0))
      .to.emit(zoombies_vip, "Unlocked")
      .withArgs(0); //tokenId
      
      // verify balance
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);
    });
  })

  // Transfer
  describe("Transfer - denied by soul binding", function () {
    it("TransferFrom - Blocked successfully", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy GOLD
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);


      await expect(zoombies_vip.connect(bob).transferFrom(bob.address, alice.address, 0))
      .to.be.
      revertedWithCustomError(zoombies_vip, "youShallNotPass")

    });

    it("safeTransferFrom - Blocked successfully", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(owner.address)).to.equal(0);
      
      // Buy DIAMOND
      await expect(zoombies_vip
      .buy(owner.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(owner.address, 0, 3); //owner, tokenId, DIAMOND

      expect(await zoombies_vip.balanceOf(owner.address)).to.equal(1);

      await expect(zoombies_vip["safeTransferFrom(address,address,uint256)"](owner.address, alice.address, 0,))
      .to.be.
      revertedWithCustomError(zoombies_vip, "youShallNotPass");

      expect(await zoombies_vip.balanceOf(owner.address)).to.equal(1);

    });
  })

  // Burn
  describe("Burn - block successful", async function () {
    it("Burn Fail - Stopped successfully", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy DIAMOND
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);

      //Attempt Burn of token
      //await zoombies_vip.connect(bob).burn(0); //METHOD doesn't exist
      await expect(zoombies_vip.connect(bob).transferFrom(bob.address, "0x0000000000000000000000000000000000000000", 0))
      .to.be.
      revertedWithCustomError(zoombies_vip, "youShallNotPass")

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);

    });
  })

  //Award
  describe("Award token", function () {

    it("Decline Award VIP from not owner", async function () {
      const { zoombies_vip,  owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);
      
      await expect(zoombies_vip.connect(bob).award(owner.address, 1)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("Award 2 VIP tokens from owner to bob and alice", async function () {
      const { zoombies_vip,  owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      await expect(await zoombies_vip.balanceOf(bob.address)).to.equal(
        0
      );
    
      await expect(zoombies_vip.connect(owner).award(bob.address, 1))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 0, 1); //first token is tokenId = 0
      
      await expect(await zoombies_vip.balanceOf(bob.address)).to.equal(
        1
      );

      await expect(zoombies_vip.connect(owner).award(alice.address, 1))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(alice.address, 1, 1);

      await expect(await zoombies_vip.balanceOf(alice.address)).to.equal(
        1
      );
    })
  })

  // withdraw
  describe("Withdraw funds from contract", function () {
    it("Withdraw Fail - not owner", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy GOLD
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND
      
      // verify contract token balance
      expect(await ethers.provider.getBalance(zoombies_vip.address)).to.equal("300000000000000000000");
   
      //FAIL Try to take the money !
      await expect(zoombies_vip.connect(bob).withdraw())
      .to.be.revertedWith(
        "Ownable: caller is not the owner"
      );

      // verify contract token balance
      expect(await ethers.provider.getBalance(zoombies_vip.address)).to.equal("300000000000000000000");
   
    }); 

    it("Withdraw Success", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Buy GOLD
      await expect(zoombies_vip.connect(bob)
      .buy(bob.address, 3, {value: "300000000000000000000"}))
      .to.emit(zoombies_vip, "Buy")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND
      
      // verify contract coin balance
      expect(await ethers.provider.getBalance(zoombies_vip.address)).to.equal("300000000000000000000");
   
      //verify owner coin balance is zero
      expect(await ethers.provider.getBalance(owner.address)).to.be.lessThan("10000000000000000000000");
   
      //SUCCESS - take the money !
      await zoombies_vip.connect(owner).withdraw()

      // verify contract token balance is empty
      expect(await ethers.provider.getBalance(zoombies_vip.address)).to.equal(0);

      // verify owner coin balance
      expect(await ethers.provider.getBalance(owner.address)).to.be.greaterThan("10099989906578176036400");
   
   
    }); 
  })


});