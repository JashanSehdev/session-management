"use client";
import { Button, Paper, TextField, Typography } from "@mui/material";
import styles from "./signUp-page.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupInput, signupSchema } from "./signup.type";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<signupInput> = (data) => console.log(data);
  return (
    <Paper className={styles.container}>
      <Typography variant="h5" className={styles.title}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.input}
          fullWidth
          label="username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          className={styles.input}
          fullWidth
          label="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          className={styles.input}
          fullWidth
          label="password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          className={styles.input}
          fullWidth
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Typography variant="body1" component={"span"}>
          Already have an account?
        </Typography>{" "}
        <Link href={"/login"}>
          {" "}
          <Typography
            sx={{ color: "#425B9A", fontWeight: "bolder" }}
            variant="body1"
            component={"span"}
          >
            SignIn
          </Typography>
        </Link>
        <Button className={styles.button} type="submit">
          SignUp
        </Button>
      </form>
    </Paper>
  );
}
