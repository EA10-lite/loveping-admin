import { Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";



const Feedback = () => {
    return (
        <div className="notes">
             <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Feedback"
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

export default Feedback;