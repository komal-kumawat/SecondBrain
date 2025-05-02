import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/genericButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSignup = async()=>{
        setLoading(true);
        try{
            const response = await axios.post("http://localhost:3000/api/v1/signup",{username,password});
            alert("signup successfully ");
            console.log(response.data);
            setUsername("");
            setPassword("");
            navigate("/signin");
        }catch(error:any){
            alert(error || "Signup failed. Try again.");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
            <div className="font-bold text-[40px] text-blue-800 p-6">Signup Page</div>
            <div className="bg-white rounded border min-w-48 p-[50px] flex flex-col gap-6">
                <Input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <Input
                    placeholder="Password"
                    // type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="flex justify-center">
                    <Button
                        variant="primary"
                        text="Signup"
                        size="md"
                        fullwidth={true}
                        loading={loading}
                        onClick={handleSignup}
                    />
                </div>
                <div className="text-center mt-4 text-sm">
                    Already signed up?{" "}
                    <Link to="/signin" className="text-blue-600 hover:underline">
                        Go to Signin
                    </Link>
                </div>

            </div>
        </div>
    );
}
