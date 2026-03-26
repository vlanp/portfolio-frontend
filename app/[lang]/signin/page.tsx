import { ILang } from "@/types/ILang";
import { getDictionary } from "../dictionaries";
import { IDictionary } from "../dictionaries/generated";
import SignIn from "../ui/exclusive/signin-page/signin";
import PageContainer from "../ui/shared/page-container";

const SignInPage = async ({ params }: { params: Promise<{ lang: ILang }> }) => {
  const awaitedParams = await params;
  const lang = awaitedParams.lang;
  const signInDict: IDictionary["SignIn"] = (await getDictionary(lang)).SignIn;
  return (
    <PageContainer className="flex justify-around flex-wrap gap-y-5 w-full">
      <SignIn signInDict={signInDict} />
    </PageContainer>
  );
};

export default SignInPage;
