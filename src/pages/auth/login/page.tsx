

const Login = () => {
    return (
        <div className="login min-h-screen flex items-center justify-center bg-secondary">
            <div className="form bg-secondary-foreground border-[0.5px] border-primary/10 w-lg rounded-xl px-4 py-12">

                <div className="w-1/2 mx-auto flex flex-col items-center justify-center gap-8">
                    <div className="mx-auto">
                        <img src="/images/Logo.svg" alt="Loveping" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-white">Admin Login</h3>
                        <p className="text-muted">
                            Sign in to manage Loveping’s platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;