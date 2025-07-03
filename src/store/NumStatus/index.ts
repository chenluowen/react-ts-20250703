type actionNamesType = {
    [key: string]: string;
    add1: string,
    add2: string
}

export default {
    state: {
        num:20
    },
    actions: {
        add1(newState:{num:number}, action: { type: string }) { 
            newState.num ++
        },
        add2(newState:{num:number}, action: { type: string, val: number }) { 
            newState.num += action.val
        }
    },
    actionNames: {
        add1: 'add1',
        add2: 'add2'
    },
    asyncActions: {
        asyncAdd1(dispatch: Function){
            setTimeout(() => { 
                dispatch({type:'add1'})
            },1000)
        }
    }

}