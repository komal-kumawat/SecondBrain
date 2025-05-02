import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/genericButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSignin = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signin", {
                username,
                password
            });
    
            const token = response.data.token; // assuming backend sends { token: "..." }
            if (token) {
                localStorage.setItem("token", token); // Store the token
                alert("Signin successful");
                console.log(response.data);
                navigate("/Dashboard");
            } else {
                alert("Token not received. Try again.");
            }
    
        } catch (err) {
            alert(err || "Error in signing in");
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
            <div className="font-bold text-[40px] text-blue-800 p-6">Signin Page</div>
            <div className="bg-white rounded border min-w-48 p-[50px] flex flex-col gap-6">
                <Input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    placeholder="Password"
                    // type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-center">
                    <Button
                        variant="primary"
                        text="Signin"
                        size="md"
                        fullwidth={true}
                        loading={loading}
                        onClick={handleSignin}
                    />
                </div>
                <div className="text-center mt-4 text-sm">
                    If not signed up?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Go to Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}
