import { gql, useQuery } from "@apollo/client"
import ABI from "../constants/abi"
import contractAddress from "../constants/address"

export default function Table() {
    const GET_TRANSFERS = gql`
        {
            transfers(
                orderBy: value
                orderDirection: desc
                where: {
                    to_not: "0x0000000000000000000000000000000000000000"
                    from_not: "0x0000000000000000000000000000000000000000"
                    value_not: "0"
                }
            ) {
                id
                from
                to
                value
            }
        }
    `
    const { loading, error, data } = useQuery(GET_TRANSFERS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>An error ocurr on the subgraph. Please refresh</p>
    if (data && data.transfers) {
        console.log(data.transfers)
    }

    return (
        <table className="divide-y divide-gray-200 min-w-full">
            <thead>
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-center whitespace-nowrap"
                    >
                        Address
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-center whitespace-nowrap"
                    >
                        Balance
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 min-w-screen">
                {data.transfers.map((transfer, i) => {
                    return (
                        <tr key={i}>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap flex justify-start">
                                {transfer.to}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {transfer.value}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
