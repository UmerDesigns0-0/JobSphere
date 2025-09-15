import { toast } from "react-toastify"

function Dlt() {
    const toas = toast.success("Job deleted successfully!");

  return (
    <>
      <div className="toggle py-10 px-4 md:px-0">
            <button
              onClick={() => toas.success("Job deleted successfully!")}
              className="mx-2 px-4 py-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
            >
              Edit
            </button> </div>
    </>
  );
}

export default Dlt;