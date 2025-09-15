import  Clockloader  from "react-spinners/Clockloader";


const color = "#4F39F6";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: color,
};
function Spinner({loading}) {
  return (
    <div>
      <Clockloader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;