import { ReactElement } from "react"

const SidebarItems = ({text,icon , onClick}:{text:string,icon:ReactElement , onClick:()=>void}) => {
  return (
    <div className="flex py-4 px-2 items-center text-gray-700  cursor-pointer hover:bg-gray-200 " onClick={onClick}>
        <div className="pr-2">{icon}</div>
        <div>{text}</div>
      
    </div>
  )
}

export default SidebarItems
