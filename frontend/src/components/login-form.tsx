import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { setCredentials } from "@/redux/features/auth/authSlice"
import { useLoginMutation } from "@/redux/features/auth/authApiSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type FormDataT = {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState<string | null>(null)
  const [login, { isLoading }] = useLoginMutation()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataT>(
    {
      defaultValues: {
        email: "",
        password: "",
      },
    }
  )

  const onSubmit: SubmitHandler<FormDataT> = async (data) => {
    try {
      const userData = await login(data).unwrap()
      dispatch(setCredentials({ ...userData, email: data.email }))
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      setErr(err?.error);
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...field}
                  />}
                />
                <p>
                  {errors.email?.message}
                </p>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    {...field}
                  />}
                />
                <p>
                  {errors.password?.message}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div>
              <p>
                {err?.error}
              </p>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
