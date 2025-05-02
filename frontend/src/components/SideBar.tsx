import { Logo } from "../Icons/logo";
import SidebarItems from "./SidebarItems";
import { YouTubeIcon } from "../Icons/YoutubeIcon";
import { PlusIcon } from "../Icons/PlusIcon";
import { ArticleIcon } from "../Icons/ArticleIcon";
import { AudioIcon } from "../Icons/AudioIcon";
import { ImageIcon } from "../Icons/ImageIcon";
import { useNavigate } from "react-router-dom";
import { Button } from "./genericButton"; // Reuse your button component

const SideBar = ({ onSectionChange }: { onSectionChange: (section: string) => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="fixed p-6 py-8 w-76 md:w-[250px] md:p-8 bg-white border-r h-screen text-[17px] flex flex-col">
      <div>
        <div className="flex items-center space-x-2">
          <Logo />
          <div className="font-bold text-[25px]">Brainly</div>
        </div>
        <div className="mt-6">
          <SidebarItems text="All" icon={<PlusIcon size="md" />} onClick={() => onSectionChange("all")} />
          <SidebarItems text="Article" icon={<ArticleIcon size="md" />} onClick={() => onSectionChange("article")} />
          <SidebarItems text="Video" icon={<YouTubeIcon size="md" />} onClick={() => onSectionChange("video")} />
          <SidebarItems text="Audio" icon={<AudioIcon size="md" />} onClick={() => onSectionChange("audio")} />
          <SidebarItems text="Image" icon={<ImageIcon size="md" />} onClick={() => onSectionChange("image")} />
        </div>
      </div>

      <div className=" flex items-center">
        <Button
          text="Logout"
          variant="secondary"
          fullwidth={true}
          onClick={handleLogout}
          size="md"
        />
      </div>
    </div>
  );
};

export default SideBar;
