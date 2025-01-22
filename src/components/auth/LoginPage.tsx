import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from "../../services/firebase/auth"
import { Logo } from "../common/Logo"
import { GoogleSignInButton } from "../auth/GoogleSignInButton"
import { ErrorAlert } from "../common/ErrorAlert"
import { DecorativeCircles } from "../auth/DecorativeCircles"

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate("/dashboard")
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4 md:px-0">
      <DecorativeCircles />

      <div className="w-full space-y-8 p-6 md:p-52 relative">
        <Logo />

        <div className="space-y-6 md:space-y-8">
          <p className="text-slate-950 font-medium text-sm md:text-xs leading-relaxed max-w-sm">
            Streamline your workflow and track progress effortlessly with our all-in-one task management app.
          </p>

          {error && <ErrorAlert message={error} />}

          <GoogleSignInButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage