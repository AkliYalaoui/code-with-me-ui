import {useState,useContext,createContext} from 'react'

const authContext = createContext();
export const useAuth = _ => useContext(authContext);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(()=>{
       const sotrage = localStorage.getItem("user");
       if(sotrage && sotrage != "undefined" && sotrage != "null"){
           return JSON.parse(sotrage);
       }
       return null;
    });

    const updateUser = u =>{
        if(u){
            setUser(u);
            localStorage.setItem("user",JSON.stringify(u));
            
        }else{
            setUser(null);
            localStorage.removeItem("user");
        }
    }

    const value = [user,updateUser];

  return (
    <authContext.Provider value={value}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider