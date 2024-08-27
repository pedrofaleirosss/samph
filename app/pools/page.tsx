import Header from "../_components/header";
import Search from "../_components/search";

const PoolsPage = () => {
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
