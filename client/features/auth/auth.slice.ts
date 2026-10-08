import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserAsync, registerUserAsync } from "./handle-auth/auth.action";
import { enqueueSnackbar } from "notistack";
import { createTransform } from "redux-persist";


type  InitialState = {
    user : User | null;
    loading : boolean;
    sessionCode : number | null


}
const initialState : InitialState = {
    user : null,
    loading : false,
    sessionCode : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setCode (state, action){ 
            state.sessionCode = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(loginUserAsync.fulfilled, (state, action : PayloadAction<User>) => {
            state.user = action.payload
            state.loading = false
             enqueueSnackbar('Login Successful', {variant : 'success'})
        })
        .addCase(registerUserAsync.fulfilled, (state, action : PayloadAction<User>) => {
            state.user = action.payload
            state.loading = false
            enqueueSnackbar('Registration Successful', {variant : 'success'})
        })
        .addCase(registerUserAsync.pending, (state) => {
            state.loading = true
           
        })
        .addCase(loginUserAsync.pending, (state) => {
            state.loading = true
            
        })

        .addCase(registerUserAsync.rejected, (state) => {
            state.loading = false
            enqueueSnackbar('Register failed', {variant : 'error'})
        })
        .addCase(loginUserAsync.rejected, (state, action : PayloadAction<any>) => {
            state.loading = false
            if (action.payload?.code === 'SESSION_FULL'){
                enqueueSnackbar(action.payload?.message, {variant : 'error'})
            } else {
                enqueueSnackbar('Login Failed', {variant: 'error'})
            }
            
        })


    }

   
})


export const authTransform = createTransform<InitialState, Omit<InitialState, 'sessionCode'>>(
    (inBoundState : any) => {
        const {sessionCode, ...rest} = inBoundState
        return rest
    },

    (outBoundState : any) => {
        return {
            ...outBoundState,
            sessionCode : null
        }
    },
    { whitelist : ['auth']}
)

export const {setCode} = authSlice.actions
export default authSlice.reducer