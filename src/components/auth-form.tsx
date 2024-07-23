"use client";

import { FC, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type AuthFormProps = {
  authType: "register" | "login";
};

type FormData = {
  username: { value: string };
  password: { value: string };
};

const AuthForm: FC<AuthFormProps> = ({ authType }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const sendReq = async (formdata: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${authType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formdata.username.value,
          password: formdata.password.value,
        }),
      });

      if (response.ok) {
        window.location.href = "/chat";
      } else {
        const errorData = await response.json();
        setError(errorData.message || `Failed to ${authType}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = e.currentTarget as unknown as FormData;
    sendReq(formdata);
  };

  return (
    <form
      className="w-4/5 md:w-3/5 h-[70vh] md:h-[70vh]  mx-auto border border-slate-200 rounded-xl shadow-lg shadow-transparent flex flex-col gap-8 justify-center items-center bg-white/50"
      onSubmit={handleOnSubmit}
    >
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold font-serif">Welcome!</h1>
          <p className="text-sm font-light">
            {authType === "login" ? "Login" : "Register"} to continue
          </p>
        </div>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          required
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          required
        />
      </div>
      <Button type="submit" variant={"outline"}>
        {loading ?  <Loader  color="blue"/> : authType.toUpperCase()}
      </Button>
      <div>
        {authType === "login" && (
          <p className="text-sm font-light">
            Create new account?{" "}
            <span
              onClick={() => router.push("/register")}
              className=" hover:cursor-pointer text-slate-700 font-normal"
            >
              {"  "}Signup
            </span>
          </p>
        )}
        {authType === "register" && (
          <p className="text-sm font-light">
            Alredy have account?{" "}
            <span
              onClick={() => router.push("/login")}
              className=" hover:cursor-pointer text-slate-700"
            >
              Login
            </span>
          </p>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default AuthForm;
