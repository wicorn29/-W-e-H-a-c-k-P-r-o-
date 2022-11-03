import { h, FunctionalComponent, Fragment } from "preact"
import { useState } from "preact/hooks"
import { getGameData, getHack, getPlayer } from "../hack"
import { sortGroups } from "../hacks/base/categories"
import Hack from "../hacks/base/hack"
import Toggle from "../hacks/base/toggle"
import { groupBy } from "../utils/groupBy"
import MenuToggler from "./MenuToggler"
import { IconContext } from "react-icons"
import { BsGlobe, BsDiscord, BsYoutube, BsGithub } from "react-icons/bs"

interface HackMenuProps {
    hacks?: HackData[]
}

const HackMenu: FunctionalComponent<HackMenuProps> = ({ hacks = [] }) => {
    const [visible, setVisible] = useState<boolean>(false)

    return (
        <Fragment>
            <MenuToggler toggled={visible} onToggle={() => setVisible(!visible)} />
            <div className={`p-7 absolute w-full left-0 transition-all ease-in-out duration-500 h-[40vh] overflow-y-scroll bg-gray-200 forest:bg-green-700 forest:bg-opacity-80 shiverchill:bg-teal-500 shiverchill:bg-opacity-80 bonfire-spire:bg-rose-600 bonfire-spire:bg-opacity-[.85] bg-opacity-90 ${visible ? "top-0" : "-top-[40vh]"}`}>
                <h1 className="text-5xl font-bold text-center">Prodigy X Cheat Menu</h1>
                <div className="flex space-x-5 text-center items-center justify-center mt-3">
                    <IconContext.Provider value={{ size: "25px" }}>
                        <a href="https://prodigyapi.github.io/ProdigyX/" target="_blank" rel="noreferrer">
                            <BsGlobe color="#87CEEB" />
                        </a>
                        <a href="https://discord.gg/D2jUxNr39K" target="_blank" rel="noreferrer">
                            <BsDiscord color="#5865F2" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCioIJQ4niel1ziD7YA5b3cA" target="_blank" rel="noreferrer">
                            <BsYoutube color="#FF0000" />
                        </a>
                        <a href="https://github.com/ProdigyAPI/ProdigyX" target="_blank" rel="noreferrer">
                            <BsGithub color="#000000" />
                        </a>
                    </IconContext.Provider>
                </div>
                <p className="text-base font-bold text-center mt-3">Join our discord for hack updates &#38; support: <a href="https://discord.gg/D2jUxNr39K" target="_blank" rel="noreferrer" className="underline decoration-blue-600">discord.gg/YRtwBJrmGa</a></p>
                {sortGroups(groupBy(hacks, hack => hack.category)).map(([category, hacks]) => (
                    <Fragment key={category}>
                        <h2 className="text-center text-3xl font-bold my-2 md:text-left ">{category}</h2>
                        <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start md:flex-wrap">
                            {hacks.map(hack => (
                                hack.type === "hack"
                                // @ts-ignore
                                    ? <Hack key={hack.name} name={hack.name} description={hack.description} hackFunction={hack.onClick} />
                                    : <Toggle key={hack.name} name={hack.name} toggleFunction={hack.onClick} checkedByDefault={hack.getDefaultValue?.(process.env.EXTENSION ? _.game : getHack(), process.env.EXTENSION ? _.player : getPlayer(), process.env.EXTENSION ? _.gameData : getGameData()) ?? false} />
                            ))}
                        </div>
                    </Fragment>
                ))}
            </div>
        </Fragment>
    )
}

export default HackMenu
