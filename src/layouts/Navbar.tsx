import { Text } from "../components";
import { Avatar, AvatarFallback } from "../components/ui/avatar";



const Navbar = () => {
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
                        <AvatarFallback className="bg-primary/5 text-primary">AE</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <Text
                            title="Afigo Efe"
                            type="h4"
                            className="font-medium"
                        />
                        <Text
                            title="Super Admin"
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