import { Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";


const Nudges = () => {
    return (
        <div className="nudges">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Nudges"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Nudges;