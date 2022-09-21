import { useState } from "react"
import { Navigate } from "react-router-dom"
import useLocalStorage from "../../util/useLocalStorage"

function LoginWrapper({ children }) {
    const [jwt, setJwt] = useLocalStorage("", "jwt")
    const [isLoading,setIsLoading] = useState(true)
    const [isValid,setIsValid] = useState(null)
    fetch(`/user/validate?token=${jwt}`, {
        method: 'get'
    })
        .then(response => response.json())
        .then(isValid => {
            setIsValid(isValid)
            setIsLoading(false)
        })
    return isLoading ? "Loading..." : isValid ? children : <Navigate to={"/login"} />
}

export default LoginWrapper