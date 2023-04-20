require('dotenv').config();
const { ethers } = require('ethers');
const HDWalletProvider = require('@truffle/hdwallet-provider');
// import { ChainId } from '@biconomy/core-types';
// import SmartAccount from "@biconomy-devx/smart-account";
const { ChainId } = require('@biconomy/core-types');
const SmartAccount = require('@biconomy/smart-account').default;

// import { ChainId } from '@biconomy-sdk-dev/core-types';

const rpcUrl = process.env.ETH_RPC_URL;
const mnemonicPhrase = process.env.MNEMONIC;
const biconomyApiKey = process.env.BICONOMY_API_KEY;

async function main() {
    let hdprovider = new HDWalletProvider({
        mnemonic: mnemonicPhrase,
        providerOrUrl: rpcUrl,
    });
    const provider = new ethers.providers.Web3Provider(hdprovider);
    const eoa = await provider.getSigner().getAddress();
    console.log(eoa);
    // const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    // wallet.connect(provider);

    // console.log(provider);
    // console.log(wallet);

    const smartAccount = new SmartAccount(provider, {
        activeNetworkId: ChainId.GOERLI,
        supportedNetworksIds: [5],
        networkConfig: [
            {
                chainId: ChainId.GOERLI,
                dappAPIKey: biconomyApiKey,
                providerUrl: rpcUrl,
            },
        ],
    });
    const smartAccountInitialized = await smartAccount.init();
    // console.log(smartAccountInitialized); 

    const smartAccountState = await smartAccountInitialized.getSmartAccountState();
    console.log(smartAccountState);

    const tx = await smartAccountInitialized.deployWalletUsingPaymaster();
    console.log(tx);

    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
