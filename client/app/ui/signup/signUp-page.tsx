import {  Button, Paper, TextField, Typography } from "@mui/material";
import styles from './signUp-page.module.css'
import Link from "next/link";

export default function SignUpForm () {
    return(
        <Paper className={styles.container}>
            <Typography variant="h5" className={styles.title}>Sign up</Typography>
            <TextField 
                className={styles.input}
                fullWidth
                label='username'
            />

             <TextField 
                className={styles.input}
                fullWidth
                label='email'
            />

             <TextField 
                className={styles.input}
                fullWidth
                label='password'
                type = 'password'
            />
            <TextField 
                className={styles.input}
                fullWidth
                label='Confirm Password'
                type = 'password'
            />
            <Typography variant="body1" component={'span'}>Already have an account?</Typography> <Link href={'/login'}> <Typography sx={{color: '#425B9A' , fontWeight:'bolder'}} variant="body1" component={'span'}>SignIn</Typography></Link> 
            <Button className={styles.button}>SignUp</Button>
        </Paper>
    )
}