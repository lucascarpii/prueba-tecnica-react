import { Link } from "react-router-dom"
import { Layout } from "../../Components/Layout"

function SignIn() {
  return (
    <Layout>
      <h1 className="font-semibold text-2xl text-center mb-6 w-80">Welcome</h1>
      <div className="flex flex-col w-80">
        <p className="flex flex-col mb-4">
          <span className="font-base text-sm">Email: </span>
          <span className="p-2 border rounded-lg">example@gmail.com</span>
        </p>
        <p className="flex flex-col mb-4">
          <span className="font-base text-sm">Password: </span>
          <span className="p-2 border rounded-lg">********</span>
        </p>
        <Link to="/">
          <button className="bg-black disabled:bg-black/40 text-white font-medium w-full rounded-lg py-3 mt-4 mb-2">
            Log In
          </button>
        </Link>
        <div className="text-center">
          <a className="font-base text-xs underline underline-offset-4" href="/">
            Forgot my password
          </a>
        </div>
        <button className="bg-black disabled:bg-black/40 text-white font-medium w-full rounded-lg mt-6 py-3">
          Sign Up
        </button>
      </div>
    </Layout>
  )
}

export { SignIn }
