import { WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

async function registerAsset() {
    try {
        const warp = WarpFactory.forMainnet().use(new DeployPlugin());
        const { contractTxId } = await warp.register('NscTg8uL5I12QSf8_WmTKxsiH4LTknOwjw9cIsfnVTg', 'node2');
        console.log(`Check the data: https://arweave.net/${contractTxId}`);
    } catch (error) {
        console.error(error);
    }
}

registerAsset()