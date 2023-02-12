import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'user',
    initialState: {
        user: {
            username: null,
            password: null,
            email:null,
            jwtToken: null,
            verifyCode: null,
        }
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user.username = action.payload.username;
            state.user.password = action.payload.password;
        },
        createAccountSuccess: (state,action) =>{
            state.user.username = action.payload.username;
            state.user.password = action.payload.password;
            state.user.email = action.payload.email
        },
        logoutSuccess: (state, action) => {
            state.user.username = null;
            state.user.jwtToken = null;
        },
        changeJwtToken: (state, action) => {
            state.user.jwtToken = action.payload;
        },
        changeVerifyCode: (state, action) => {
            state.user.verifyCode = action.payload;
        }
    },
});
export default slice.reducer
// Actions
const { loginSuccess, logoutSuccess, changeJwtToken ,changeVerifyCode,createAccountSuccess} = slice.actions
export const login = (username, password ) => async dispatch => {
    try {
        fetch(`users/${username}/${password}`)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .then(({ headers, json }) => {
                const _jwtToken = JSON.parse(headers.get("JWT-Token"))
                dispatch(changeJwtToken(_jwtToken))
            })
            .catch((err) => console.log('Error!!!!' + err));
        dispatch(loginSuccess({username,password}));
    } catch (e) {
        return console.error(e.message);
    }
}
export const logout = () => async dispatch => {
    try {
        return dispatch(logoutSuccess())
    } catch (e) {
        return console.error(e.message);
    }
}

export const getToken = (token) => async dispatch => {
    try {

        dispatch(changeJwtToken({ token }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const getCode = (code) => async dispatch => {
    try {

        dispatch(changeVerifyCode( code ));
    } catch (e) {
        return console.error(e.message);
    }
}

export const getAccount = (username,password,email) => async dispatch => {
    try {

        dispatch(createAccountSuccess({username,password,email}));
    } catch (e) {
        return console.error(e.message);
    }
}
 