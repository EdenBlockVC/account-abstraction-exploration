import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
// import HDWalletProvider from '@truffle/hdwallet-provider';
// import { ChainId } from '@biconomy/core-types';
// import SmartAccount from "@biconomy-devx/smart-account";
import SmartAccount from "@biconomy-sdk-dev/smart-account";

// import { ChainId } from '@biconomy-sdk-dev/core-types';

dotenv.config();

const rpcUrl: string | undefined = process.env.ETH_RPC_URL;
const mnemonicPhrase: string = process.env.MNEMONIC as string;
const chainId: number = parseInt(process.env.CHAIN_ID || '1');
const biconomyApiKey: string = process.env.BICONOMY_API_KEY as string;

async function main(): Promise<void> {
    const wallet = ethers.Wallet.fromMnemonic(mnemonicPhrase);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    wallet.connect(provider);

    console.log(provider);
    console.log(wallet);

    const smartAccount = new SmartAccount(wallet, {
        supportedNetworksIds: [5],
        networkConfig: [
            {
                chainId: chainId,
                dappAPIKey: biconomyApiKey,
            }
        ]
    });


    // const walletProvider = new ethers.JsonRpcProvider(provider as unknown as providers.ExternalProvider);
    // const eoa = await walletProvider.getSigner().getAddress();
    // console.log(`EOA address: ${eoa}`);

    // const wallet = new SmartAccount(walletProvider, {
    //     activeNetworkId: ChainId.GOERLI,
    //     supportedNetworksIds: [ChainId.GOERLI, ChainId.POLYGON_MAINNET, ChainId.POLYGON_MUMBAI],
    //     networkConfig: [
    //         {
    //             chainId: ChainId.POLYGON_MUMBAI,
    //             dappAPIKey: "<DAPP_API_KEY>",
    //             providerUrl: "<YOUR_PROVIDER_URL>"
    //         },
    //         {
    //             chainId: ChainId.POLYGON_MAINNET,
    //             dappAPIKey: "<DAPP_API_KEY>",
    //             providerUrl: "<YOUR_PROVIDER_URL>"
    //         }
    //     ]
    // });

    // const smartAccount = await wallet.init();
    // const address = await smartAccount.getSmartAccountState();
    // console.log(`SmartAccount address: ${address.address}`);
    // process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
