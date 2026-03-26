"use client";

import { IDictionary } from "@/app/[lang]/dictionaries/generated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import checkedEnv from "@/lib/checkEnv";
import { IAdminIn, IAdminOut, ZAdminOut } from "@/types/IAdmin";
import { getZApiSuccessResponse } from "@/types/IApiResponse";
import {
  fetchDataError,
  fetchDataIdle,
  fetchDataLoading,
  FetchDataSuccess,
  IFetchDataState,
} from "@/types/IFetchDataState";
import { ISignInFormElement } from "@/types/IFormElement";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import z from "zod/v4";
import { setCookie } from "cookies-next";

const SignIn = ({ signInDict }: { signInDict: IDictionary["SignIn"] }) => {
  const [signInDataState, setSignInDataState] =
    useState<IFetchDataState<IAdminOut>>(fetchDataIdle);

  const errorToast = (text: string) => {
    toast.error(text, {
      position: "bottom-center",
      richColors: true,
      duration: 5000,
    });
  };

  const handleSubmit = async (event: FormEvent<ISignInFormElement>) => {
    event.preventDefault();
    setSignInDataState(fetchDataLoading);

    let signInResponse;

    try {
      signInResponse = await axios.post(
        checkedEnv.NEXT_PUBLIC_BACKEND_URL + checkedEnv.NEXT_PUBLIC_POST_SIGNIN,
        {
          email: event.currentTarget.elements.emailInput.value,
          password: event.currentTarget.elements.passwordInput.value,
        } satisfies IAdminIn,
      );
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 400 || error.response?.status === 401)
      ) {
        setSignInDataState(fetchDataError);
        return;
      }
      setSignInDataState(fetchDataIdle);
      errorToast(signInDict.UnknownError);
      return;
    }

    const signInParseResult = getZApiSuccessResponse(ZAdminOut).safeParse(
      signInResponse.data,
    );

    if (!signInParseResult.success) {
      setSignInDataState(fetchDataIdle);
      console.log(z.prettifyError(signInParseResult.error));
      errorToast(signInDict.UnknownError);
      return;
    }

    setSignInDataState(new FetchDataSuccess(signInParseResult.data.data));
    setCookie(
      checkedEnv.NEXT_PUBLIC_ADMIN_COOKIE_NAME,
      signInParseResult.data.data.token,
      { secure: true, sameSite: "strict" },
    );
  };

  return (
    <Card className="w-full max-w-sm self-center">
      <CardHeader>
        <CardTitle>{signInDict.LoginTitle}</CardTitle>
        <CardDescription>{signInDict.LoginSubTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-in-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{signInDict.Email}</Label>
              <Input
                disabled={signInDataState === fetchDataLoading}
                id="emailInput"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{signInDict.Password}</Label>
              </div>
              <Input
                disabled={signInDataState === fetchDataLoading}
                id="passwordInput"
                type="password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      {signInDataState === fetchDataError && (
        <CardContent>
          <CardDescription className="text-red-500">
            {signInDict.LogInError}
          </CardDescription>
        </CardContent>
      )}
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={signInDataState === fetchDataLoading}
          form="sign-in-form"
          type="submit"
          className="w-full"
        >
          {signInDict.LogIn}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
