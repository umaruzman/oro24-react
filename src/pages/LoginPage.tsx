import AuthLayout from "../layout/AuthLayout";

import oro24Logo from "../assets/logo.svg";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col px-[20px] py-[60px] min-h-[400px] max-w-[450px] w-full rounded-lg bg-[#ffffffec]">
        <div className="flex flex-col justify-center items-center pb-[40px]">
          <img src={oro24Logo} alt="" className="max-w-[180px] w-full" />
        </div>

        <LoginForm />

        <p className="text-[#888A98] text-[14px]">
          Want to be a partner with ORO24?{" "}
          <a className="text-[#B23280] text-semibold cursor-pointer hover:underline">
            Register Now
          </a>{" "}
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
