import { Dash } from "../components/dash"

export default function Home() {
    return (
        <div className="container mx/auto">
            <h1 className="py-4 px-4 font-bold text 2x-l">USDC users</h1>
            <div className="flex flex-wrap">
                <Dash />
            </div>
        </div>
    )
}
