import { Category } from "./hacks/base/categories"
import { Game } from "./types/game"
import { GameData } from "./types/gameData"
import { Player } from "./types/player"

/* eslint-disable no-unused-vars */
declare global {
    type HackFunction = (hack: Game, player: Player, gameData: GameData) => Promise<void> | void
    type ToggleFunction = (hack: Game, player: Player, gameData: GameData, toggleState: boolean, setToggled: Function) => Promise<void> | void
    interface HackData {
        name: string
        description?: string
        onClick: HackFunction | ToggleFunction
        type: "hack" | "toggle"
        category: Category
        extensionOnly?: boolean
        getDefaultValue?: (hack: any, player: any, gameData: any) => boolean // for toggle hacks
    }
    interface Window {
        gtag: (...args: any[]) => void
    }
    const _: any
}

declare module "*.scss"

export {}
