import Client from 'shopify-buy';
import { Shop } from '../utils/types';

type Options = {
  domain: string;
  token: string;
};

const getSiteInfo = async (options: Options): Promise<Shop> => {
  const { domain, token } = options;

  const client = Client.buildClient({
    storefrontAccessToken: token,
    domain: domain
  });
  const shopInfo: Shop = await client.shop.fetchInfo();
  return shopInfo;
};

export default getSiteInfo;
