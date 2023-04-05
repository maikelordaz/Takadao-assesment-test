import { useQuery, gql } from "@apollo/client"

const GET_USDC_HOLDERS = gql`
    {
        transfers(first: 2) {
            id
            from
            to
            value
        }
    }
`

export default function usdcHolders() {
    const { loading, error, data } = useQuery(GET_USDC_HOLDERS)
    console.log(data)
    return <div></div>
}
