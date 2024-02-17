import styles from "@/src/utils/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/src/graphql/actions/login.action";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [ActivateUser, { loading }] = useMutation(LOGIN_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {};

  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>Forgot your password?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        <br />
        <br />
        <input
          type="submit"
          value="Submit"
          disabled={isSubmitting }
          className={`${styles.button} mt-3 `}
        />

        <br />

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Or Go Back to
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default ForgotPassword;