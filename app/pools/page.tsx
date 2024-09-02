import { getServerSession } from "next-auth";
import Header from "../_components/header";
import Search from "../_components/search";
import { authOptions } from "../_lib/auth";

const PoolsPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />

      <div className="mt-6 px-5 pb-6">
        <h2 className="font-semibold text-primary">Minhas Piscinas</h2>

        <div className="mt-6">
          <Search />
        </div>
      </div>
    </>
  );
};

export default PoolsPage;
