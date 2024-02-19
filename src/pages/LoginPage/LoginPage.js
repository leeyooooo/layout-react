import {useState, useContext} from "react"
import {login, getMe} from "../../WebApi"
import { setAuthToken } from "../../utils";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../contexts";
export default function LoginPage() {
  const {setUser} =useContext(AuthContext)
  const [username ,setUsername] =useState('');
  const [password, setPassword] =useState('');
  const [errorMessage,setErrorMessage]=useState();
  const  history =useNavigate()
  const handleSubmit =e=>{
    setErrorMessage(null)
    login(username,password).then(data => {
      if(data.ok ===0){
        return setErrorMessage(data.message)
      }
      
      setAuthToken(data.token)
      getMe.then(response =>{
        if(response.ok!==1){
          setAuthToken(null)
          return setErrorMessage(response.toString())
        }
        setUser(response.data)
        history.push("/")
      })
      
    })
    };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:<input value={username} onChange={e => setUsername(e.target.value)}/>
      </div>
      <div>
        password<input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <button>登入</button>
  </form>
  );
}
