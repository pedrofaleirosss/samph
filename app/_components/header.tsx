import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SidebarContent from "./sidebar-content";

const Header = () => {
  return (
    <nav className="flex flex-row items-center justify-between bg-primary p-5 shadow-xl">
      <Link href="/pools">
        <Image src="/logo-menu.png" alt="SAMPH" width={120} height={18} />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon">
            <MenuIcon size={30} />
          </Button>
        </SheetTrigger>
        <SidebarContent />
      </Sheet>
    </nav>
  );
};

export default Header;
