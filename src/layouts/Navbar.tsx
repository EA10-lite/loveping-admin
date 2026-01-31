import { Text } from "../components";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useAdminStore } from "../store/adminStore";



const Navbar = () => {
    const { admin } = useAdminStore();

    const getInitials = (name: string) => {
        return name.split(" ").map((word) => word.charAt(0)).join("");
    }
    return (
        <div className="navbar w-full">
            <div className="flex items-center justify-between w-full">
                <Text
                    title="Dashboard"
                    type="h4"
                    className="font-medium text-lg text-white"
                />

                <div className="flex items-center gap-2">
                    <Avatar className="size-10">
                        <AvatarFallback className="bg-primary/5 text-primary">
                            {getInitials(admin?.full_name || "")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="">
                        <Text
                            title={admin?.full_name || ""}
                            type="h4"
                            className="font-medium"
                        />
                        <Text
                            title={admin?.user_type || ""}
                            type="p"
                            className="text-grey text-xs"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;