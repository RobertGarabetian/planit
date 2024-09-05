import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-slate-500">
      <form className=" flex flex-col w-1/4 gap-4">
        <h1 className="text-6xl font-bold  h-auto text-left">Sign In</h1>
        <p className="text-sm text-foreground font-medium">
          Don&apos;t have an account?{" "}
          <Link className="link" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2">
          <label
            className="input input-bordered input-lg flex items-center gap-2"
            htmlFor="email"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input name="email" placeholder="you@example.com" required />
          </label>

          <label
            className="input input-bordered input-lg flex items-center gap-2"
            htmlFor="password"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </label>

          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>

        <button className="btn btn-outline" formAction={signInAction}>
          Sign in
        </button>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
