import { PassThrough } from "stream";
import z from "zod";

const loginSchema = z.object({
    username : z.object({
        email : z.email(),
        password : z.string().min(6, 'password length should be greater than 6').max(12, 'password length should be less than 12')
    })
})

type LoginInputs = z.infer<typeof loginSchema>