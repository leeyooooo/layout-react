const layout = {


}

const title = {
	background: '',
	color: '',
	height:'50px',
	width:'800px',
	border:'10px solid black',
  fontSize: '16px',
  fontWeight: 'bold',
  margin:'20px',
  fontSize:'36px',
  textAlign: 'center'
}

const count = {
	background: '',
	color: '',
	height:'200px',
	width:'350px',
	border:'10px solid black',
  fontSize: '16px',
  fontWeight: 'bold',
	margin:'20px',
	marginLeft:'250px',
	fontSize:'36px',
  textAlign: 'center',
  lineHeight:'200px'
}
const Counter = () => {

	return(
		<>
		<div style={layout}>
			<div style={title}>
				Title
			</div>
			<div style={count}>
				Count
			</div>
		</div>
		</>
	)
}

export default Counter