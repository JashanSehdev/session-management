"use client";
import { Button, Paper, TextField, Typography } from "@mui/material";
import styles from "./login-page.module.css";
import Link from "next/link";

export default function LoginForm() {
    console.log(styles)
  return (
    <Paper className={styles.container}>
      <Typography variant="h5" className={styles.title}> Login</Typography>
      <TextField className={styles.textField} fullWidth label="login" />
      <TextField className={styles.textField} label="password" fullWidth type="password" />
      <Typography variant="body1">{`Don't have an account?`}</Typography> <Link href={"/signup"}><Typography variant="body1" sx={{color:'#425B9A', fontWeight:'bolder'}}>Sign up</Typography></Link>
      <Button variant="outlined" className={styles.button}>Login</Button>
    </Paper>
  );
}
