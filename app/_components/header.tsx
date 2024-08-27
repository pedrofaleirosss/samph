import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-primary p-5 shadow-xl">
      <Link href="/pools">
        <Image src="/logo-menu.png" alt="SAMPH" width={120} height={18} />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon">
            <MenuIcon size={30} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>Menu</SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
