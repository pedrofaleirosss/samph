import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import LogoutButton from "./logoutButton";
import { Avatar, AvatarImage } from "./ui/avatar";
import { House, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const SidebarContent = async () => {
  const session = await getServerSession(authOptions);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid border-gray-300 py-5">
        <div className="flex items-center gap-2">
          {session?.user?.image ? (
            <Avatar>
              <AvatarImage src={session.user.image} />
            </Avatar>
          ) : (
            <div className="rounded-full border-2 p-2">
              <User />
            </div>
          )}

          <div>
            <p className="font-bold">{session?.user?.name}</p>
            <p className="text-xs">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex py-5">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/pools">
            <House size={18} />
            Início
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-t border-solid border-gray-300 py-5">
        <LogoutButton />
      </div>
    </SheetContent>
  );
};

export default SidebarContent;
