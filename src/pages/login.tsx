import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Alert } from "@heroui/alert";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { title } from "@/components/primitives";
import { useAuth } from "@/providers/authProvider";
import { fetchAccessToken } from "@/api/auth";
import { Credentials } from "@/types";

export default function LoginPage() {
  const { setToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: fetchAccessToken,
    onSuccess: setToken,
    onError: (error) => setError(error.message),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        to: "/app",
      });
    }
  }, [isAuthenticated, navigate]);

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    } as Credentials,
    onSubmit: async ({ value }) => await mutateAsync(value),
  });

  return (
    <div className="relative flex flex-col h-screen">
      <main className="z-10 flex h-full flex-grow flex-col items-center justify-center">
        <section className="mx-auto w-full max-w-[466px] p-6 flex flex-col">
          <div className="inline-block max-w-lg text-center justify-center">
            <span className={title()}>Welcome to&nbsp;</span>
            <span className={title({ color: "violet" })}>Tasks&nbsp;</span>
          </div>

          <Form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {error && <Alert color="danger" title={error} />}

            <Field
              children={({ state, handleChange, handleBlur }) => (
                <Input
                  isRequired
                  defaultValue={state.value}
                  label="Username"
                  placeholder="Enter your username"
                  type="username"
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
              name="username"
            />
            <Field
              children={({ state, handleChange, handleBlur }) => (
                <Input
                  isRequired
                  defaultValue={state.value}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
              name="password"
            />
            <Button
              className="w-full h-12 mt-1"
              color="primary"
              isLoading={isPending}
              type="submit"
              variant="shadow"
            >
              Log In
            </Button>
          </Form>
        </section>
      </main>
    </div>
  );
}
