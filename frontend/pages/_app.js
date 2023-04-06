import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/33833/erc20-snapshot/v0.0.3",
})
export default function App({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Takadao Web3 assessment test</title>
                <meta name="description" content="Maikel Ordaz Takadao assessment test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}
