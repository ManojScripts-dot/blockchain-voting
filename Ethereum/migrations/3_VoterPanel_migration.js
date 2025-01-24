const VoterPanel = artifacts.require("VoterPanel");

module.exports = async function (deployer, network, accounts) {
  // Replace with your actual AdminPanel contract address
  const adminPanelAddress = "0xA3E1b370e1290A341178dB42103c9B6eC7cE331E";

  console.log(`Deploying VoterPanel with AdminPanel address: ${adminPanelAddress}`);

  await deployer.deploy(VoterPanel, adminPanelAddress);

  const voterPanelInstance = await VoterPanel.deployed();
  console.log("VoterPanel deployed successfully at address:", voterPanelInstance.address);
};
