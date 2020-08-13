const init = []

export default(state = init,action) => {
    switch (action.type) {
        case 'USER_REPLAY_BY_ME' :
            return action.replay
        default :
            return state
    }
}