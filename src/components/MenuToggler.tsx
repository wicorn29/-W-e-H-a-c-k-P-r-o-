import { h, FunctionalComponent } from "preact"
import { IconContext } from "react-icons"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"

interface MenuTogglerProps {
    toggled: boolean
    onToggle: () => void
    bottomRight?: boolean
}

const MenuToggler: FunctionalComponent<MenuTogglerProps> = ({ toggled, onToggle, bottomRight = false }) => {
    const Icon = toggled ? BsArrowUp : BsArrowDown

    return (
        <button className={`bg-gray-200 bg-opacity-90 forest:bg-green-700 forest:bg-opacity-80 shiverchill:bg-teal-500 shiverchill:bg-opacity-80 bonfire-spire:bg-rose-600 bonfire-spire:bg-opacity-[.85] absolute z-10${bottomRight ? " right-0 bottom-0" : ""}`} onClick={onToggle} id="menu-toggler">
            <IconContext.Provider value={{ size: "30px", color: "black" }}>
                <Icon />
            </IconContext.Provider>
        </button>
    )
}

export default MenuToggler
