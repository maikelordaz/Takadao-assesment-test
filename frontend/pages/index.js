import Head from "next/head"
import Table from "../components/table"

export default function Home() {
    return (
        <div className="container mx/auto">
            <Head>
                <title>Takadao Web3 assessment test</title>
                <meta name="description" content="Maikel Ordaz Takadao assessment test" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="py-4 px-4 font-bold text 2x-l">USDC users</h1>
            <Table />
        </div>
    )
}
