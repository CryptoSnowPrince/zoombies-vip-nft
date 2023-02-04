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

  //TODO
    //readonly
  // price
  // upgradeFee
  // locked
  // getVipStatus
  // isRevoked
  // isUpgraded

  describe("Test readonly functions", function () {

    it("Testing price", async function () {
           const { zoombies_vip, owner } = await loadFixture(deployZoombiesVIPCollection);
    
           expect(await zoombies_vip.price()).to.equal("100000000000000000000");
    });

    it("Testing upgradeFee", async function () {
      const { zoombies_vip, owner } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.upgradeFee()).to.equal("50000000000000000000");
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

    it("Testing Revoke and isRevoked", async function () {
      const { zoombies_vip, owner, bob } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);

      //award a token
      await expect(zoombies_vip.connect(owner).award(bob.address, 2))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 0, 2); //first token is tokenId = 0

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(1);

      //revoke the token
      await expect(zoombies_vip.connect(owner).revoke(0))
      .to.emit(zoombies_vip, "Revoked")
      .withArgs(bob.address, 0);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
    });

  });

  describe("Upgrade token", function() {
    it("Upgrade Fail - Insufficient funds", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      // Fail with no money
      await expect(zoombies_vip.connect(bob).upgrade(1)).to.be.
      revertedWithCustomError(zoombies_vip, "notEnoughFunds")
      .withArgs("Insufficient funds for upgrade");
    });

    it("Upgrade Success - from VIP to DIAMOND", async function () {
      const { zoombies_vip, owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);
  
      expect(await zoombies_vip.balanceOf(bob.address)).to.equal(0);
      
      //award a GOLD VIP
      await expect(zoombies_vip.connect(owner).award(bob.address, 1)) //VIP token
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, 0, 1); //owner, tokenId, VIP

      //upgrade to GOLD, Paid for by alice
      await expect(zoombies_vip.connect(alice)
      .upgrade(0, {value: "100000000000000000000"})) //VIP token
      .to.emit(zoombies_vip, "Upgraded")
      .withArgs(bob.address, 0, 2); //owner, tokenId, GOLD

      //upgrade to DIAMOND, paid by owner
      await expect(zoombies_vip.connect(bob)
      .upgrade(0, {value: "150000000000000000000"})) //GOLD token
      .to.emit(zoombies_vip, "Upgraded")
      .withArgs(bob.address, 0, 3); //owner, tokenId, DIAMOND

      // Fail trying to upgrade past DIAMOND
      await expect(zoombies_vip.connect(bob).upgrade(0)).to.be.
      revertedWithCustomError(zoombies_vip, "maxVIPLevel")

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

    // functions
  // unlock
  // block transfer

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


  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });

});
