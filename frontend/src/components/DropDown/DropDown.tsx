import { User } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const DropDown = () => {
  return (


    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User size={18} className=''/>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-24">
                <DropdownMenuLabel>Account Details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        My Lisitings
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuGroup>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Change Details</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>Change Email</DropdownMenuItem>
                        <DropdownMenuItem>Change Password</DropdownMenuItem>
                        <DropdownMenuItem>Change Profile Image</DropdownMenuItem>
                        <DropdownMenuItem>Update Current Location</DropdownMenuItem>
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default DropDown