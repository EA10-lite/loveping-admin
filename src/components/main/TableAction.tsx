
import { MoreVertical } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"
import { Button } from "../ui/button";


interface TableActionProps {
    View?: React.ReactNode;
    Edit?: React.ReactNode;
}
const TableAction  = ({
    View,
    Edit,
}: TableActionProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-primary/50 hover:text-primary hover:bg-transparent">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-[#0F3826] border-[0.5px] border-[#0F2F26] rounded-sm text-white shadow-sm p-4" align="end">
                {View && (
                    <DropdownMenuItem>
                        {View}
                    </DropdownMenuItem>
                )}
                {Edit && (
                    <DropdownMenuItem>
                        {Edit}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

  export default TableAction;