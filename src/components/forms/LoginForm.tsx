import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../api/auth";
import { appContext } from "../../context/AppContextProvider";
import "./form.scss";

interface ILoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
}

const LoginForm = () => {
  const { setUser } = useContext(appContext);
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (values: ILoginFormData) => {
    await fetch(`${BASE_URL}/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "KYCTY",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then(async (res: Response) => {
        if (res.ok) {
          const data = await res.json();
          if (data?.status == "Success") {
            setUser({
              id: data?.data?.id,
              token: data.token,
              name: data?.data?.full_name,
            });
            navigate("/");
          } else {
            setApiError(data?.data?.Message);
          }
        }
      })
      .catch((err: Error) => {
        setApiError(
          err?.message ||
            "Something went wrong! please contact admin or try again."
        );
      });
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
          showPassword: false,
          rememberMe: false,
        }}
        validate={(values: ILoginFormData) => {
          const errors: Partial<ILoginFormData> = {};

          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password is required";
          }

          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched }) => {
          return (
            <Form className="flex flex-col w-full">
              {apiError ? (
                <p className="bg-red-500 text-white p-2 rounded-md mb-[15px]">
                  {apiError}
                </p>
              ) : (
                ""
              )}
              <Field
                className={"form-input"}
                name="email"
                type="email"
                placeholder="Please Enter Your Email"
              />
              {errors.email && touched.email ? (
                <p className="form-error-message mt-[5px]">{errors.email}</p>
              ) : (
                ""
              )}
              <Field
                className={"form-input mt-[15px]"}
                name="password"
                type={values.showPassword ? "text" : "password"}
                placeholder="Please Enter Your Password"
              />
              {errors.password && touched.password ? (
                <p className="form-error-message mt-[5px]">{errors.password}</p>
              ) : (
                ""
              )}
              <div className="flex items-center mt-[15px] gap-2">
                <Field
                  type={"checkbox"}
                  name="showPassword"
                  id={"showPassword"}
                />
                <label htmlFor="showPassword" className="select-none">
                  Show Password
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Field type={"checkbox"} name="rememberMe" id={"rememberMe"} />
                <label htmlFor="rememberMe" className="select-none">
                  Remember Me
                </label>
              </div>

              <button className="form-button mt-[20px] mb-[20px]">
                Sign In
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
