const init_state = {
    email:'',
    password:'',
}

const  inputReducer = (state = init_state, action) => {
    switch (action.type) {
        case "EMAIL":
            state = {
                ...state,
                email: action.payload
            }
            break
        case "PASSWORD":
            state = {
                ...state,
                password: action.payload
            }
            break
        default:
            return state;
    }
    return state;
}

export default inputReducer;