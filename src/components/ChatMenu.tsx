import { h, FunctionalComponent } from "preact"
import { IconContext } from "react-icons"
import { GoPrimitiveDot } from "react-icons/go"
import { RiSendPlaneFill } from "react-icons/ri"
import { useEffect, useState, useRef } from "preact/hooks"
import { io, Socket } from "socket.io-client"
import MenuToggler from "./MenuToggler"
import { getPlayer, launchCard } from "../hack"
import { Player } from "../types/player"
import { error } from "../swal"
import { AiOutlineClockCircle } from "react-icons/ai"

interface Message {
    message: string
    name: string
    id: number
    badge?: string
}

const ChatMenu: FunctionalComponent = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [userCount, setUserCount] = useState<number>(0)
    const [socket, setSocket] = useState<Socket>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [slowMode, setSlowMode] = useState<number>(0)
    const [lastSentMessageTime, setLastSetMessageTime] = useState<number>(0)
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const messageRef = useRef<HTMLDivElement>(null)

    const player = getPlayer() as Player

    useEffect(() => {
        const socket = io("https://prodigy-x-chat.herokuapp.com", {
            query: {
                id: player.userID
            }
        })
        setSocket(socket)
        socket.on("userCount", (count: number) => {
            setUserCount(count)
        })
        socket.on("chat", (message: Message | boolean) => {
            if (message instanceof Boolean) {
                error("Message could not send.")
                return
            }
            setMessages(messages => [...messages, message as Message])
        })
        socket.on("slowMode", (time: number) => {
            setSlowMode(time)
        })
    }, [player.userID])

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollTo({
                behavior: "smooth",
                top: messageRef.current.scrollHeight
            })
        }
    }, [messages])

    useEffect(() => {
        if (!timeLeft) return

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timeLeft])

    function onSubmit (e: Event) {
        e.preventDefault()
        const input = inputRef.current
        if (input.value && Date.now() - slowMode >= lastSentMessageTime && input.value.length <= 300) {
            socket.emit("chat", {
                message: input.value,
                name: player.getName(),
                id: player.userID
            })
            input.value = ""
            setLastSetMessageTime(Date.now())
            setTimeLeft(slowMode / 1000)
        }
    }

    return (
        <div>
            <div className="absolute rounded w-72 h-4/5 bottom-16 right-8 bg-gray-200 bg-opacity-90 content-between" id="chat-mainframe" data-visible={visible}>
                <div className="w-[inherit]">
                    <div>
                        <p className="w-1/2 pl-3 mt-2 text-xl font-bold inline-block">Prodigy X Chat</p>
                        {/* @ts-expect-error */}
                        <p className="w-1/2 pr-5 mt-2 text-right text-sm font-bold inline-block text-[#5fc4b9]"><GoPrimitiveDot className="inline-block" color="#5fc4b9" />{userCount} Online</p>
                    </div>
                    <div className="flex flex-col overflow-y-auto no-scrollbar my-6 bg-opacity-90 w-full max-h-[56vh]" ref={messageRef}>
                        { /* eslint-disable-next-line array-callback-return */ }
                        {messages.map((message, index) => {
                            if (message.name) {
                                return (
                                    <div className="rounded bg-gray-300 m-1 p-2" key={index}>
                                        { /* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt={`${message.name}'s Avatar`} role="button" className="w-10 h-10 float-left mr-3" onClick={() => launchCard(message.id)} /> */ }
                                        <button className="font-bold text-sm" onClick={() => launchCard(message.id)}>{message.name}</button>
                                        <span className={`text-xs font-semibold ${message.badge ? "visible" : "invisible"} inline py-1 px-2 rounded-full text-blue-600 bg-blue-200 mx-2`}>
                                            {message.badge}
                                        </span>
                                        <p className="text-sm text-ellipsis overflow-hidden">{message.message}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="w-[inherit]">
                    {timeLeft === 0 && <p className="text-center">
                        Slow mode is on for {slowMode / 1000} seconds.
                    </p>
                    }
                    {timeLeft > 0 && <div className="flex justify-center">
                        {/* @ts-expect-error */}
                        <p className="text-right text-base inline-block">{timeLeft} {"  "} <AiOutlineClockCircle className="inline-block" /></p>
                    </div>}
                    <form className="flex flex-row h-auto" onSubmit={onSubmit}>
                        <input ref={inputRef} className="basis-5/6" type="text" placeholder="Enter message..." />
                        <button className="flex justify-center items-center rounded bg-blue-600 basis-1/6 mb-[12px]" type="submit">
                            <IconContext.Provider value={{ size: "30px", color: "white" }}>
                                {/* @ts-ignore */}
                                <RiSendPlaneFill />
                            </IconContext.Provider>
                        </button>
                    </form>
                </div>
            </div>
            <MenuToggler toggled={!visible} onToggle={() => setVisible(!visible)} bottomRight={true} />
        </div>
    )
}

export default ChatMenu
