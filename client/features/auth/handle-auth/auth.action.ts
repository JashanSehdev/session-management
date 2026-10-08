import api from "@/app/api/api";
import { LoginInputs } from "@/app/ui/login/login.type";
import { signupInput } from "@/app/ui/signup/signup.type";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUserAsync = createAsyncThunk(
    'auth/login',
    async(loginuser : LoginInputs, thunkApi) =>{
        try {
            const response = await api.post("/auth/login", loginuser)

            return response.data
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)

export const registerUserAsync = createAsyncThunk(
    'auth/register',
    async(signupDate : signupInput, thunkApi) =>{
        try {
            const response = await api.post("/auth/register", signupDate)
            return response.data
        } catch(error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)