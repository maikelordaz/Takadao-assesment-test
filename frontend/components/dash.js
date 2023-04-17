import { gql, useQuery } from "@apollo/client"

export default function Dash() {
    const GET_TRANSFERS = gql`
        {
            transfers {
                id
                from
                to
                value
            }
        }
    `
    const { loading, error, data } = useQuery(GET_TRANSFERS)

    return (
        <div className="flex flex-col justify-center items-center mb-10">
            <div className="overflow-x-auto w-11/12 rounded-3xl px-4">
                <div className="p-1.5 w-full inline-block align-middle border rounded-lg bg-white pt-10 px-4">
                    <div className="dashboard-letters mb-1">Active transfers</div>
                    <div>
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
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    data.transfers.map((tx) => {
                                        return (
                                            <tr key={tx.id}>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap flex justify-start">
                                                    {data.transfers.to}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    {data.transfers.value}
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
