import Image from "next/image";
import { Button } from "./ui/button";

const GoogleSignInButton = () => {
  const loginWithGoogle = () => {
    console.log("login with google");
  };

  return (
    <Button
      onClick={loginWithGoogle}
      variant="outline"
      className="w-full gap-2"
    >
      <Image src="/google.png" alt="Google" width={24} height={24} />
      Entrar com Google
    </Button>
  );
};

export default GoogleSignInButton;
