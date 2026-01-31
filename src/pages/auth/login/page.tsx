import { Formik } from "formik";
import { login as loginService } from "../../../services/auth.service";
import { toast } from "sonner";
import { loginValidation } from "../../../utils/validation";
import { FormField, Submit } from "../../../components";
import { useState } from "react";
import { useAdminStore } from "../../../store/adminStore";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAdminStore();
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (values: { email_address: string; password: string }) => {
        setLoading(true);
        try {
            const response = await loginService(values);
            login(response);
            toast.success("Login successful", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-[0.5px] border-primary/10">
                        <Check className="size-4 text-primary" />
                    </div>
                )
            })
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Invalid credentials", {
                icon: (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-[0.5px] border-primary/10">
                        <X className="size-4 text-primary" />
                    </div>
                )
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login min-h-screen flex items-center justify-center bg-secondary">
            <div className="form bg-secondary-foreground border-[0.5px] border-primary/10 w-xl rounded-xl px-4 py-12">

                <div className="w-1/2 mx-auto flex flex-col items-center justify-center gap-8">
                    <div className="mx-auto">
                        <img src="/images/Logo.svg" alt="Loveping" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-normal text-white">Admin Login</h3>
                        <p className="text-grey text-sm font-normal">
                            Sign in to manage Loveping&apos;s platform.
                        </p>
                    </div>

                    <div className="form-container w-full">
                        <Formik
                            initialValues={{ email_address: "", password: "" }}
                            onSubmit={handleSubmit}
                            validationSchema={loginValidation}
                        >
                            {() => (
                                <div className="form-content w-full space-y-2.5">
                                    <FormField
                                        name="email_address"
                                        placeholder=""
                                        label="Email Address"
                                        type="email"
                                        disabled={loading}
                                    />
                                    <FormField
                                        name="password"
                                        placeholder=""
                                        label="Password"
                                        type="password"
                                        disabled={loading}
                                    />

                                    <div className="mt-6">
                                        <Submit
                                            title="Login"
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;