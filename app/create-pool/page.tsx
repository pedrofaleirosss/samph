import { getServerSession } from "next-auth";
import CreatePoolForm from "../_components/create-pool-form";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import Home from "../page";

const CreatePoolPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return Home();
  }

  return (
    <>
      <Header />

      <div className="mt-6 px-5 pb-6">
        <h2 className="font-semibold text-primary">Nova Piscina</h2>

        <div className="mt-6">
          <CreatePoolForm />
        </div>
      </div>
    </>
  );
};

export default CreatePoolPage;
