import axios from "axios";

export const DeleteContent = async (contentId: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("need to signin , token is required");
            return;

        }
        await axios.delete(`http://localhost:3000/api/v1/content/${contentId}`, {
            headers: {
                authorization: token,
                "Content-Type": "application/json"
            }
        });
        alert("content deleted successfully");

    } catch (err) {
        alert("unable to delete content:" + err);
        console.log(err);
    }
}