import { Plus } from "lucide-react";
import { Text } from "../../components";
import { Button } from "../../components/ui/button";



const Partners = () => {
    return (
        <div className="notes">
             <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Partners"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4 gap-1.5"
                    >
                        <Plus />
                        <span className="text-sm font-medium">Add Partner</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Partners;