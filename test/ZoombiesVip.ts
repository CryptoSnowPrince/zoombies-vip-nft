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

  describe("Award token", function () {

    it("Decline Award VIP from not owner" ,async function () {
      const { zoombies_vip,  owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);
      
      await expect(zoombies_vip.connect(bob).award(owner.address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      });

    it("Award 2 VIP tokens from owner to bob and alice" ,async function () {
      const { zoombies_vip,  owner, bob, alice } = await loadFixture(deployZoombiesVIPCollection);

      await expect(await zoombies_vip.balanceOf(bob.address)).to.equal(
        0
      );
    
      await expect(zoombies_vip.award(bob.address))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(bob.address, "0"); //first token is tokenId = 0
      
      await expect(await zoombies_vip.balanceOf(bob.address)).to.equal(
        1
      );

      await expect(zoombies_vip.award(alice.address))
      .to.emit(zoombies_vip, "Awarded")
      .withArgs(alice.address, "1");

      await expect(await zoombies_vip.balanceOf(alice.address)).to.equal(
        1
      );
    })
  })

  //

  // describe("Deployment", function () {
  //   it("Should set the right unlockTime", async function () {
  //     const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.unlockTime()).to.equal(unlockTime);
  //   });

  //   it("Should set the right owner", async function () {
  //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.owner()).to.equal(owner.address);
  //   });

  //   it("Should receive and store the funds to lock", async function () {
  //     const { lock, lockedAmount } = await loadFixture(
  //       deployOneYearLockFixture
  //     );

  //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
  //       lockedAmount
  //     );
  //   });

  //   it("Should fail if the unlockTime is not in the future", async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory("Lock");
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       "Unlock time should be in the future"
  //     );
  //   });
  // });

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
