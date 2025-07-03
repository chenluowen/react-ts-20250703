import handleNum from './index'
// 假设 actionNames 的结构是固定的
type ActionNames = typeof handleNum.actionNames;
type ActionKey = keyof ActionNames;
//管理数据用的
let reducer = (state = handleNum.state, action: { type: string, val: number }) => { 
    //调用dispatch派发方法时，会执行这个方法
    let newState = JSON.parse(JSON.stringify(state))
    // switch (action.type) {
    //     case handleNum.add1:
    //         handleNum.actions.add1(newState, action)
    //         break;
    //     case handleNum.add2:
    //         handleNum.actions.add2(newState, action)
    //         break;
    //     default:
    //         break;
    // }

    // 使用 keyof 确保 key 类型正确
    for (let key in handleNum.actionNames) {
        if (Object.prototype.hasOwnProperty.call(handleNum.actionNames, key)) {
            const typedKey = key as ActionKey;
            if (action.type === handleNum.actionNames[typedKey]) {
                handleNum.actions[typedKey]?.(newState, action);
            }
        }
    }

    return newState
}
export default reducer