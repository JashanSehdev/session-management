"use client";
import { Button, Paper, TextField, Typography } from "@mui/material";
import styles from "./login-page.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputs, loginSchema } from "./login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { loginUserAsync } from "@/features/auth/handle-auth/auth.action";
import { socket } from "@/lib/socket";
import GlobalModal from "../global-modal/global-modal";

export default function LoginForm() {
  const loading = useAppSelector((state) => state.auth.loading)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver : zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    socket.emit('message',{message: 'message received'}, (ack)=>{
      console.log(ack)
    })
    console.log('event emitted')
    dispatch(loginUserAsync(data))
  }
  return (
    <Paper className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" className={styles.title}>
          {" "}
          Login
        </Typography>
        <TextField
          className={styles.textField}
          fullWidth
          label="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
        <TextField
          className={styles.textField}
          label="password"
          fullWidth
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
           {...register('password')}
        />
        <Typography variant="body1">{`Don't have an account?`}</Typography>{" "}
        <Link href={"/signup"}>
          <Typography
            variant="body1"
            sx={{ color: "#425B9A", fontWeight: "bolder" }}
          >
            Sign up
          </Typography>
        </Link>
        <Button variant="outlined" type='submit' className={styles.button} loading={loading}>
          Login
        </Button>
      </form>
    </Paper>
  );
}
