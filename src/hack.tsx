export const getHack = () => {
    // @ts-expect-error
    return window.Boot.prototype.game
}
export const getPlayer = () => {
    const hack = getHack()
    if (!hack?._rootContainer?._inversifyContainer?._bindingDictionary?._map) return null
    const data = Object.fromEntries(hack?._rootContainer._inversifyContainer._bindingDictionary._map)
    const key = Object.keys(data).find(e => data[e][0].cache?.player)
    return data?.[key]?.[0]?.cache?.player ?? null
}
export const getGameData = () => {
    const hack = getHack()
    return Object.fromEntries(hack._state._states).Boot._gameData
}
export const saveGame = () => {
    const player = getPlayer()
    const hack = getHack()

    hack.input.onDown._bindings[0].context.processPlayer = true
    player.forceSaveCharacter()
}
export const getMembership = (membership = true) => {
    const hack = getHack()
    const player = getPlayer()
    function getMemberModule () { return player.hasMembership.toString().split("\"")[1] }
    Object.fromEntries(hack._rootContainer._inversifyContainer._bindingDictionary._map)[getMemberModule()][0].cache.data.membership.active = membership
}
export const getWorld = () => {
    const hack = getHack()
    return hack._state._current._world
}

export const setFromUserID = async (userId) => {
    const hack = getHack()
    if (!hack?._rootContainer?._inversifyContainer?._bindingDictionary?._map) return false
    const data = Object.fromEntries(hack?._rootContainer._inversifyContainer._bindingDictionary._map)
    const key = Object.keys(data).find(e => data[e][0].cache?._playerDataProvider)
    const playerDataProvider = data[key][0].cache._playerDataProvider
    const token = hack.input.onDown._bindings[0]._context.jwtAuthProvider.getToken()
    const playerData = (await (await fetch(`https://api.prodigygame.com/game-api/v2/characters/${userId}?fields=inventory%2Cdata%2CisMember%2Ctutorial%2Cpets%2Cencounters%2Cquests%2Cappearance%2Cequipment%2Chouse%2Cachievements%2Cstate&userID=${playerDataProvider.player.userID}`, { headers: { Authorization: `Bearer ${token}` } })).json())[userId]
    console.log(playerData)
    playerDataProvider.player.init({ ...playerData, token })
    playerDataProvider.initialize(playerDataProvider.player)
    return true
}

export const getLegacyMembership = (membership = true) => {
    const hack = getHack()
    const player = getPlayer()
    function getLegacyMemberModule () { return player.hasLegacyMembership.toString().split("\"")[1] }
    Object.fromEntries(hack._rootContainer._inversifyContainer._bindingDictionary._map)[getLegacyMemberModule()][0].implementationType.prototype.meetsRequirements = () => { return membership }
}

export const launchCard = async (userID) => {
    const token = _.game.input.onDown._bindings[0]._context.jwtAuthProvider.getToken()
    const playerData = (await (await fetch(`https://api.prodigygame.com/game-api/v2/characters/${userID}?fields=inventory%2Cdata%2CisMember%2Ctutorial%2Cpets%2Cencounters%2Cquests%2Cappearance%2Cequipment%2Chouse%2Cachievements%2Cstate&userID=${_.player.userID}`, { headers: { Authorization: `Bearer ${token}` } })).json())[userID]
    // eslint-disable-next-line no-proto
    const p = _.player.__proto__.constructor(_.game)
    p.init(playerData)
    _.instance.prodigy.open.card(p, false, false)
}
