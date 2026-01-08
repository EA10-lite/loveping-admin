import { Formik } from "formik";
import { loginValidation } from "../../../utils/validation";
import { FormField, Submit } from "../../../components";
import { useState } from "react";
import { useAdminStore } from "../../../store/adminStore";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAdminStore();
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        login({
            id: "1234",
            name: "Afigo Efe",
            email: "afigo@email.com",
            role: "admin"
        })

        setLoading(false);
        navigate('/');
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
                            Sign in to manage Loveping’s platform.
                        </p>
                    </div>

                    <div className="form-container w-full">
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            onSubmit={handleSubmit}
                            validationSchema={loginValidation}
                        >
                            {()=> (
                                <div className="form-content w-full space-y-2.5">
                                    <FormField
                                        name="email"
                                        placeholder=""
                                        label="Email Address"
                                        type="email"
                                    />
                                    <FormField
                                        name="password"
                                        placeholder=""
                                        label="Password"
                                        type="password"
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