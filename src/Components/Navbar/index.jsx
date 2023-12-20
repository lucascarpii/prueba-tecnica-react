import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ShoppingCart } from "../ShoppingCart"
import { ShoppingCartContext } from "../../Context"

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4 capitalize'

  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocaleStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocaleState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocaleStorage || !noAccountInLocaleState

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">
            lucascarpii2002@gmail.com
          </li>
          <li>
            <NavLink to={'/my-orders'} className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink to={'/my-account'} className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sign-in'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
              onClick={() => handleSignOut()}>
              Sign out
            </NavLink>
          </li>
        </>
      )
    } else {
      return (
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={() => handleSignOut()}>
            Sign out
          </NavLink>
        </li>
      )
    }
  }

  return (
    <nav className="flex bg-white justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-base font-normal font-pop">
      <ul className="flex items-center gap-3">
        <li className="font-bold text-lg">
          <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`} >
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/'}
            onClick={() => context.setSearchByCategory('')}
            className={({ isActive }) => isActive ? activeStyle : undefined}>
            All
          </NavLink>
        </li>
        {
          context.categories?.map(category => (
            <li key={category.id}>
              <NavLink
                to={`/category/${category.name.toLowerCase()}`}
                onClick={() => context.setSearchByCategory(category.name)}
                className={({ isActive }) => isActive ? activeStyle : 'capitalize'}>
                {category.name}
              </NavLink>
            </li>
          ))
        }
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  )
}

export { Navbar }