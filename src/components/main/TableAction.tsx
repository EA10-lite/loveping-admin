
import { MoreVertical } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"
import { Button } from "../ui/button";
const TableAction  = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 text-primary/50 hover:text-primary hover:bg-transparent">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-[#0F3826] border-[0.5px] border-[#0F2F26] rounded-sm text-white shadow-sm" align="end">
                <DropdownMenuLabel>File Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                <DropdownMenuItem>
                    New File...
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Share...
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Download</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

  export default TableAction;