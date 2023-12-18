const title = {
  border: "1px solid black",
  width: "150px",
  textAlign: "center",
	marginBottom: "20px"
};

const count = {
	width: "150px",
  border: "1px solid black",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
};
const Counter = () => {
  return (
    <>
			<h1 style={title}>Title</h1>
      <div style={count}>Count</div>
    </>
  );
};

export default Counter;
