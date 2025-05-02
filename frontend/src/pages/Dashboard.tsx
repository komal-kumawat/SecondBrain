import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { Button } from "../components/genericButton";
import SideBar from "../components/SideBar";
import { ShareIcon } from "../Icons/ShareIcon";
import { PlusIcon } from "../Icons/PlusIcon";
import { useContent } from "../hooks/useContent";
import { ShareModal } from "../components/ShareModal";
import axios from "axios";

type ContentItem = {
  _id: string;
  type: "video" | "audio" | "image" | "article"; // adjust if you have other types
  link: string;
  title: string;
};


export default function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [activeSection, setActiveSection] = useState("all"); // default section
  const contents: ContentItem[] = useContent() || [];


  useEffect(() => {
    document.body.style.overflow = modelOpen ? "hidden" : "auto";
  }, [modelOpen]);

  return (
    <div
      className="flex w-screen h-screen flex-wrap overflow-x-hidden"
      style={{ backgroundColor: "whitesmoke" }}
    >
      <SideBar onSectionChange={setActiveSection} />
      <div className="ml-[250px] w-full">
        <div className="flex items-center justify-between  p-2 gap-4 flex-wrap">
          <div className="text-[30px] font-bold p-2 capitalize">
            {activeSection === "all" ? "All Notes" : activeSection}
          </div>
          <div className="flex flex-wrap gap-2 p-2">
            <Button
              variant="secondary"
              startIcon={<ShareIcon size="md" />}
              text="Share Brain"
              size="md"
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/brain/share",
                    { share: true },
                    {
                      headers: {
                        authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  const url = `http://localhost:5173/brain/${response.data.hash}`;
                  setShareLink(url);
                  setShareModalOpen(true);
                } catch (error) {
                  console.error("Share error:", error);
                  alert("Failed to generate share link.");
                }
              }}
            />
            <Button
              variant="primary"
              startIcon={<PlusIcon size="md" />}
              text="Add Content"
              size="md"
              onClick={() => setModelOpen(true)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {contents.length > 0 ? (
            activeSection === "all" ? (
              contents.map(({ _id, type, link, title }) => (
                <Card key={_id} id={_id} type={type} link={link} title={title} />
              ))
            )
            : contents
              .filter(({ type }) => type === activeSection)
            .map(({ _id, type, link, title }) => (
              <Card key={_id} id={_id} type={type} link={link} title={title} />
            ))
          ) : (
          <div className="text-center w-full mt-8">No content available</div>
          )}
        </div>



        <CreateContentModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
        />
        {shareModalOpen && (
          <ShareModal link={shareLink} onClose={() => setShareModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
