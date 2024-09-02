import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import LogoutButton from "./logoutButton";

const SidebarContent = async () => {
  const session = await getServerSession(authOptions);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        <div className="flex items-center gap-2">
          {/* <Avatar>
                <AvatarImage src={data.user.image!} />
              </Avatar> */}

          <div>
            <p className="font-bold">{session?.user?.name}</p>
            <p className="text-xs">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-solid py-5">
        <LogoutButton />
      </div>
    </SheetContent>
  );
};

export default SidebarContent;
