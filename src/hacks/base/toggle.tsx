import { h, FunctionalComponent } from "preact"
import { useState } from "preact/hooks"
import { getGameData, getHack, getPlayer, saveGame } from "../../hack"
import { ArgumentFailureError } from "../../swal"

interface ToggleProps {
    name: string
    toggleFunction: ToggleFunction
    checkedByDefault?: boolean
}

const Toggle: FunctionalComponent<ToggleProps> = ({ name, toggleFunction, checkedByDefault = false }) => {
    const [toggled, setToggled] = useState<boolean>(checkedByDefault)

    async function onChange () {
        const newToggled = !toggled
        setToggled(newToggled)
        const hack = process.env.EXTENSION ? _.game : getHack() as any
        const player = process.env.EXTENSION ? _.player : getPlayer() as any
        const gameData = process.env.EXTENSION ? _.gameData : getGameData() as any
        if (hack) {
            try {
                await toggleFunction(hack, player, gameData, newToggled, setToggled)
                window.gtag("event", `toggle_${name.toLowerCase().replace(/ /g, "_")}_${newToggled}`, {
                    event_category: "Toggler",
                    event_label: name,
                    event_callback: () => {
                        console.log(`${name} toggle successful`)
                    }
                })
            } catch (error) {
                if (error instanceof ArgumentFailureError) return
                throw error
            }
            setTimeout(() => {
                player.appearanceChanged = true
                saveGame() // TODO: If on extension, use _ method.
            }, 1000)
        }
    }

    return (
        <div className="rounded px-4 py-1 pl-12 group mt-2 text-center odd:bg-blue-600 even:bg-emerald-600 forest:odd:bg-pink-400 forest:even:bg-orange-400 shiverchill:odd:bg-[#5AC6FF] shiverchill:even:bg-[#7589CC] bonfire-spire:odd:bg-[#F76E11] bonfire-spire:even:!text-black bonfire-spire:even:bg-[#FF9F45] md:mb-0 mr-3 text-white shadow-xl forest:shadow-md odd:shadow-blue-400 even:shadow-emerald-400 forest:odd:shadow-pink-400 forest:even:shadow-orange-400 shiverchill:odd:shadow-[#5AC6FF] shiverchill:even:shadow-[#7589CC] bonfire-spire:odd:shadow-[#F76E11] bonfire-spire:even:shadow-[#FF9F45]">
            <input className="checked:group-even:bg-blue-600 checked:group-odd:bg-emerald-600 forest:checked:group-even:bg-pink-400 forest:checked:group-odd:bg-orange-400 shiverchill:checked:group-odd:bg-[#7589CC] shiverchill:checked:group-even:bg-[#5AC6FF] bonfire-spire:checked:group-odd:bg-[#FF9F45] bonfire-spire:checked:group-even:bg-[#F76E11] switch-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-zinc-400 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id={`select-hack-${name}`} checked={toggled} onClick={onChange} />
            <label className="form-check-label inline-block font-normal mr-3" htmlFor={`select-hack-${name}`}>{name}</label>
        </div>
    )
}

export default Toggle
