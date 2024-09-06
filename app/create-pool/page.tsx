import CreatePoolForm from "../_components/create-pool-form";
import Header from "../_components/header";

const CreatePoolPage = () => {
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
