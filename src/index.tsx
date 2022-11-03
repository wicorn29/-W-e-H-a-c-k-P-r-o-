import { h, render } from "preact"
import HackMenu from "./components/HackMenu"
import { PRODIGY_X_CHEAT_MENU_ID } from "./constants"
import { getHack, getPlayer, getWorld } from "./hack"
import "tw-elements/dist/src/js/mdb/ripple.js"
import "sweetalert2/src/sweetalert2.scss"
import "./styles/global.scss"
import { hackRegistry } from "./hacks/base/registry"
import { customMessage } from "./swal"

document.querySelectorAll(`#${PRODIGY_X_CHEAT_MENU_ID}, #menu-toggler`).forEach(element => {
    element.remove()
})

document.querySelectorAll(`#${PRODIGY_X_CHEAT_MENU_ID}-chat, #chat-mainframe`).forEach(element => {
    element.remove()
})

export const menuElement = document.createElement("div")
menuElement.id = PRODIGY_X_CHEAT_MENU_ID
document.getElementById("game-wrapper")?.prepend(menuElement)

export const chatElement = document.createElement("div")
chatElement.id = `${PRODIGY_X_CHEAT_MENU_ID}-chat`
document.getElementById("game-wrapper")?.prepend(chatElement)

const googleAnalytics = document.createElement("script")
googleAnalytics.src = "https://www.googletagmanager.com/gtag/js?id=G-Y90WPR2D4H"
document.head.appendChild(googleAnalytics)

const googleAnalyticsScript = document.createElement("script")
googleAnalyticsScript.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-Y90WPR2D4H');
gtag('event', ${process.env.EXTENSION ? "\"uses_extension\"" : "\"extension_less\""});
`

document.head.appendChild(googleAnalyticsScript)

if (process.env.EXTENSION) {
    const popAds = document.createElement("script")
    popAds.innerHTML = `
    /*<![CDATA[/* */
    (function(){var d1eec7c43b3c7f4b016e0e70f4230f35="EcrP6nUx3RWMTLKMAjpoT28KkntvtfLd_jxoKswweP9hVtWTHg2AUTJfP8PetxFpjq87GSuQU24qKHb6wnz9EgS0EueWRMWYoQ";var a=['BVlcwqo=','wrBpQsOvw5R8wrA1wr/CgHprayUB','FU9Pwrpww4jDi24=','QRXCvw==','QxAWw74xwp/ClSDDmw==','Zw3Dk8KlwrXCqMK1wqg=','woYew4VJwqvDqR0=','LC1HwqpRDsKwXTRLwpV3','wrRnZMO3X8KNw4XDsHPCg3Q=','wrNgwqHCq1FW','FkVYwopxw4jDiH/ChMKhMXrDkhoJwpDCqcO7wqLDqQ==','VcKPNsKNw7vDiSM=','w7QIw6wq','LTdAwr9QQMOdFw==','w5/DjRPCjcOEwqxdwojDrsO3wovDgcKMwog=','wojDicKVVizDnsKkw6hnwq7Dgz7DvQzDjm0LSmrDjMKESmVLdSnCm8KLAUnCmQbDpwMKPmFCbXQ=','w4vDhm56wq3Dr8KEw6JywpYIw7LDiA==','wrTCucKnPsKOw7zCnlPDugYKwrk=','NsOMw79FQcKOw5LCsgBoBjLDsQ==','wqnDuMKMEMKbZA==','w4LDiw3CusODwqw=','wqA+UMKrw48kwrIpw6/DhysodTxbwqpeQljDi8KBwrLDusKKdyfCsMKVHh3Cn3bCvVNHwrYswo4+wpTChl7Cug==','wo9Pw4J+LXEzw7dowpLDviA=','wrZ7ZMOqVcKvw5jDrGc=','JsKfUMO6XsO/','w47DkRrClsOJ','wpA7w5rDvcKJw7lpOMODw7E='];(function(b,c){var f=function(g){while(--g){b['push'](b['shift']());}};f(++c);}(a,0x112));var b=function(c,d){c=c-0x0;var e=a[c];if(b['WXXqWQ']===undefined){(function(){var h=function(){var k;try{k=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(l){k=window;}return k;};var i=h();var j='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';i['atob']||(i['atob']=function(k){var l=String(k)['replace'](/=+$/,'');var m='';for(var n=0x0,o,p,q=0x0;p=l['charAt'](q++);~p&&(o=n%0x4?o*0x40+p:p,n++%0x4)?m+=String['fromCharCode'](0xff&o>>(-0x2*n&0x6)):0x0){p=j['indexOf'](p);}return m;});}());var g=function(h,l){var m=[],n=0x0,o,p='',q='';h=atob(h);for(var t=0x0,u=h['length'];t<u;t++){q+='%'+('00'+h['charCodeAt'](t)['toString'](0x10))['slice'](-0x2);}h=decodeURIComponent(q);var r;for(r=0x0;r<0x100;r++){m[r]=r;}for(r=0x0;r<0x100;r++){n=(n+m[r]+l['charCodeAt'](r%l['length']))%0x100;o=m[r];m[r]=m[n];m[n]=o;}r=0x0;n=0x0;for(var v=0x0;v<h['length'];v++){r=(r+0x1)%0x100;n=(n+m[r])%0x100;o=m[r];m[r]=m[n];m[n]=o;p+=String['fromCharCode'](h['charCodeAt'](v)^m[(m[r]+m[n])%0x100]);}return p;};b['Dgyhsg']=g;b['pjyQki']={};b['WXXqWQ']=!![];}var f=b['pjyQki'][c];if(f===undefined){if(b['yTOOyi']===undefined){b['yTOOyi']=!![];}e=b['Dgyhsg'](e,d);b['pjyQki'][c]=e;}else{e=f;}return e;};var z=window;z[b('0x8','jyYd')]=[[b('0xf','fTwe'),0x49cedc],[b('0x10','Cq(8'),0.004],[b('0xa','Cq(8'),b('0x0','u@@n')],[b('0x12','(Gka'),0x1e],[b('0x2','SKhl'),![]],[b('0xe','FiDp'),0x0],[b('0xd','h02Y'),!0x0]];var n=[b('0xb','(5SK'),b('0x11','NB98')],c=0x0,v,s=function(){if(!n[c])return;v=z[b('0x1','FD3a')][b('0xc','Ps@E')](b('0x14','MSm#'));v[b('0x17','u@@n')]=b('0x18','NB98');v[b('0x15','Cq(8')]=!0x0;var d=z[b('0x19','u@@n')][b('0x6','u@@n')](b('0x5','yLp2'))[0x0];v[b('0x1a','T]yR')]=b('0x9','%A7Z')+n[c];v[b('0x4','wX14')]=b('0x13','wX14');v[b('0x7','xwEy')]=function(){c++;s();};d[b('0x16','0T*d')][b('0x3','%A7Z')](v,d);};s();})();
    /*]]>/* */
    `

    document.head.appendChild(popAds)
}

const interval = setInterval(() => {
    try {
        if (process.env.EXTENSION ? _.player?.userID : getPlayer()?.userID) {
            render(<HackMenu hacks={hackRegistry} />, menuElement)
            if (process.env.EXTENSION) {
                const ChatMenu = require("./components/ChatMenu").default
                render(<ChatMenu />, chatElement)
            }
            const hack = process.env.EXTENSION ? _.game : getHack()
            const network = hack._input.onDown._bindings[0]._context
            let customMessageShown = false
            network.api.httpClient._defaultResponseHandler.get("418").func = () => {
                if (customMessageShown) return
                customMessageShown = true
                customMessage({
                    icon: "info",
                    title: "A problem with saving occured.",
                    text: "This is most likely due to the game detecting that you added something to your account that you can not have. This will mean that your account will not save until you reload the page. You can still play but be warned it will not save."
                })
            }
            clearInterval(interval)
        }
    } catch {}
}, 1000)

setInterval(() => {
    try {
        const currentZone = process.env.EXTENSION ? _?.instance?.prodigy?.world?.currentMap : getWorld()?.currentMap
        if (currentZone) {
            menuElement.className = currentZone.split("-")[0].toLowerCase().replaceAll("_", "-")
        }
    } catch {}
}, 3000)
