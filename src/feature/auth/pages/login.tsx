import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Alert } from "@heroui/alert";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { title } from "@/shared/components/primitives";
import { useAuth } from "@/shared/hooks/useAuth";
import { fetchAccessToken } from "@/feature/auth/api";
import { Credentials } from "@/feature/auth/model";

export default function LoginPage() {
  const { setToken, isAuthenticated } = useAuth();
  const search = useSearch({ from: "/blankLayout/login" });
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
        to: search.redirect ?? "/app",
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

            <Field name="username">
              {({ state, handleChange, handleBlur }) => (
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
            </Field>
            <Field name="password">
              {({ state, handleChange, handleBlur }) => (
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
            </Field>
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
