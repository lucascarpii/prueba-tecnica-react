import { Link } from "react-router-dom"
import { Layout } from "../../Components/Layout"
import { useContext, useState } from "react"
import { ShoppingCartContext } from "../../Context"

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocaleStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocaleState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocaleStorage || !noAccountInLocaleState

  const renderLogin = () => {
    return (
      <div className="flex flex-col w-80">
        <p className="flex flex-col mb-4">
          <span className="font-base text-sm">Email: </span>
          <span className="p-2 border rounded-lg min-h-[42px]">{parsedAccount?.email}</span>
        </p>
        <p className="flex flex-col mb-4">
          <span className="font-base text-sm">Password: </span>
          <span className="p-2 border rounded-lg min-h-[42px]">{parsedAccount?.password}</span>
        </p>
        <Link to="/">
          <button
            className="bg-black disabled:bg-black/40 text-white font-medium w-full rounded-lg py-3 mt-4 mb-2"
            disabled={!hasUserAnAccount}
          >
            Log In
          </button>
        </Link>
        <div className="text-center">
          <a className="font-base text-xs underline underline-offset-4" href="/">
            Forgot my password
          </a>
        </div>
        <button
          className='border-2 font-medium border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3 transition-all hover:-translate-y-0.5'
          onClick={() => setView('create-user-info')}
          disabled={hasUserAnAccount}>
          Sign up
        </button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <></>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogin()

  return (
    <Layout>
      <h1 className="font-semibold text-2xl text-center mb-6 w-80">Welcome</h1>
      {renderView()}
    </Layout>
  )
}

export { SignIn }
