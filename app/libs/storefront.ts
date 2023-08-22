const {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} = require("@apollo/client");

const domain = process.env.NEXT_PUBLIC_STORE_DOMAIN;

// Storefront API Access
const storefrontApiAccessToken =
  process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN;
const storefrontApiVersion = process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION;

export const storefrontClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${domain}/api/${storefrontApiVersion}/graphql.json`,
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontApiAccessToken,
    },
  }),
  cache: new InMemoryCache(),
});
