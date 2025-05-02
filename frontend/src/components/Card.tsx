import { ShareIcon } from "../Icons/ShareIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import React from "react";
import { DeleteContent } from "./DeleteContent";
export interface cardProps {
    id: string;
    title: string;
    startIcon?: React.ReactNode;
    content?: React.ReactNode;
    tags?: string[];
    link: string;
    type: "video" | "audio" | "article" | "image";  // Specify the possible types
}

export const Card = (props: cardProps) => {
    const renderContent = () => {
        if (props.type === "video") {
            return (
                <iframe
                    width="100%"
                    height="100%"
                    src={props.link.replace("watch?v=", "embed/")}
                    title={props.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                />
            );
        } else if (props.type === "audio") {

            return (
                <div className="w-full p-4 border rounded shadow">
                    <audio controls className="w-[100%] cursor-pointer">
                        <source src="path/to/your-audio-file.mp3" type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            );
        }
        else if (props.type === "article") {
            return (
                <div className="p-4 border rounded shadow">
                    <p className="font-semibold">Article:</p>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline w-full h-full break-words">
                        {props.link}
                    </a>
                </div>
            );
        }
        else if (props.type === "image") {
            return (
                <img
                    src={props.link}
                    alt={props.title}
                    className="w-full h-auto rounded-md"
                />
            );
        } else {
            return props.content;
        }
    };


    return (
        <div className="m-6 p-8 bg-white rounded-lg shadow-md outline-slate-200 border-2 flex flex-col min-w-[250px] ">

            <div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold">{props.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="cursor-pointer" onClick={() => { }}>
                            <ShareIcon size="md" />

                        </div>

                        <div className="cursor-pointer" onClick={() => DeleteContent(props.id)}>
                            <DeleteIcon size="md" />

                        </div>
                    </div>
                </div>
                <a href={props.link} target="_blank">

                    <div className="mt-4">
                        {renderContent()}
                    </div>
                </a>

                {/* <div className="mt-4 flex flex-wrap gap-2">
                    {props.tags && props.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div> */}
            </div>
        </div>
    );
};
