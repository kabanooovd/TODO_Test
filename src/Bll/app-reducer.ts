const SET_GLOBAL_DISABLED_MODE = 'app/SET_GLOBAL_DISABLED_MODE'
const SET_NOTIFICATION = 'app/SET_NOTIFICATION'

export type AppStateTypes = {
    globalDisabledMode: boolean
    noticeMode: boolean
}

const initState = {
    globalDisabledMode: false,
    noticeMode: false,
}

export const appReducer = (state: AppStateTypes = initState, action: AppActionTypes): AppStateTypes => {
    switch (action.type) {
        case SET_GLOBAL_DISABLED_MODE:
            return {...state, globalDisabledMode: action.globalDisabledMode}
        case SET_NOTIFICATION:
            return {...state, noticeMode: action.noticeMode}
        default: return state
    }
}

export const setNotification = (noticeMode: boolean) => {
    return {type: SET_NOTIFICATION, noticeMode} as const
}

export const setGlobalDisabledMode = (globalDisabledMode: boolean) => {
    return {type: SET_GLOBAL_DISABLED_MODE, globalDisabledMode} as const
}

type AppActionTypes = ReturnType<
    typeof setGlobalDisabledMode |
    typeof setNotification
>