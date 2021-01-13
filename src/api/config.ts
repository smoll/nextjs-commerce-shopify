interface ShopifyConfig {
  domain: string
  token: string
  currencyCode?: string
  locale?: string
}

export class Config {
  private config: ShopifyConfig

  constructor(config: ShopifyConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<ShopifyConfig> = {}) {
    return Object.entries(userConfig).reduce<ShopifyConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<ShopifyConfig>) {
    Object.assign(this.config, newConfig)
  }
}

let config: Config;

function initConfig() {
  const DOMAIN = process.env.SHOPIFY_STOREFRONT_DOMAIN
  const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN
  
  if (!DOMAIN) {
    throw new Error(
      `The environment variable SHOPIFY_STOREFRONT_DOMAIN is missing and it's required to access your store`
    )
  }
  
  if (!TOKEN) {
    throw new Error(
      `The environment variable SHOPIFY_STOREFRONT_TOKEN is missing and it's required to access your store`
    )
  }

  return new Config({
    domain: DOMAIN,
    token: TOKEN,
  })
}

export function getConfig(userConfig?: Partial<ShopifyConfig>) {
  if (!config) {
    config = initConfig()
  }
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<ShopifyConfig>) {
  if (!config) {
    config = initConfig()
  }
  return config.setConfig(newConfig)
}

export default getConfig;
