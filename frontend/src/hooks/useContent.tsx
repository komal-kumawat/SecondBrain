import { useState, useEffect } from "react";
import axios from "axios";
export function useContent() {
    const [contents, setContents] = useState([]);
    const refresh = ()=>{
        axios
        .get("http://localhost:3000/api/v1/content", {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response.data.createdContent);
            setContents(response.data.createdContent);

        })
        .catch((error) => {
            console.error("Error fetching content:", error);
        });
    }
    useEffect(() => {
       refresh();
       let interval = setInterval(()=>{refresh()},10*1000);
       return ()=>{
        clearInterval(interval);
       }
    }, []);
    return contents;
}
