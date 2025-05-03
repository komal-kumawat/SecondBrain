import { useState } from "react";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { Button } from "./genericButton";
import { Input } from "./Input";
import axios from "axios"
export function CreateContentModel({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const addContent = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if(!token){
                alert("you need to signin first");
                return;
            }
            const response = await axios.post("http://localhost:3000/api/v1/content", {
                title, link, type  
            }, {
                headers: {
                    authorization: token
                }
            });
            alert("Content added successfully: " + response.data.msg);
            console.log(response.data);
            onClose();
        } catch (error) {
            alert("Unable to add content: " + error);
            console.log(error);
        } finally {
            setLoading(false);
            setTitle("");
            setLink("");
            setType("");
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark semi-transparent background */}
            <div className="absolute inset-0 bg-slate-900 opacity-60"></div>

            {/* Modal */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-[300px] min-h-[250px]">
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                        <DeleteIcon size="md" />
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                    <Input placeholder="Link" onChange={(e) => setLink(e.target.value)} value={link} />
                    <Input placeholder="Type" onChange={(e) => setType(e.target.value)} value={type} />

                </div>
                <div className="flex justify-center mt-4">
                    <Button variant="primary" text="Submit" size="md" onClick={addContent} loading={loading} />
                </div>
            </div>
        </div>
    );
}

