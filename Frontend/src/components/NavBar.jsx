import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const { logout, authUser } = useAuthStore
  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
              <div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                <MessageSquare className='size-5 text-primary' />
              </div>
              <h1 className='text-lg font-bold'>ByteChat</h1>
            </Link>
          </div>

          {/* Right side of a Navbar */}
          <div className='flex items-center gap-2'>
            <Link to={"/setting"} className={`btn btn-sm gap-2 transition-colors`}>
              <Settings className='size-4' />
              <span className='hidden sm:inline'>
                Setting
              </span>
            </Link>

            {/* These button will only be show when user is authenticated */}
            {authUser && (
              <>
                <Link to={"/profile"} className='btn btn-sm gap-2'>
                  <User className='size-5' />
                  <span className='hidden sm:inline'>
                    Profile
                  </span>
                </Link>
                <button className='flex gap-3 items-center' onClick={logout}>
                  <LogOut className='size-5' />
                  <span className='hidden sm:inline'>
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar