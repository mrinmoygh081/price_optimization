"use client";

import { decrement, increment } from "@/lib/features/counterSlice";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Redux Counter App
          </Typography>

          <Typography variant="h1" color="primary" gutterBottom>
            {count}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="primary" size="large" onClick={() => dispatch(increment())}>
              Increment
            </Button>

            <Button variant="outlined" color="secondary" size="large" onClick={() => dispatch(decrement())}>
              Decrement
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
