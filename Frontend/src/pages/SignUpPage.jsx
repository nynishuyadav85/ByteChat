import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(true)
    return (
        <div className='min-h-screen grid lg: grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get Started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={""} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>
                                    Full name
                                </span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type='text'
                                    className={`input imput-bordered w-full pl-10`}
                                    placeholder='Jhon Doe'
                                    value={FormData.fullname}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>
                                    Email
                                </span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type='text'
                                    className={`input imput-bordered w-full pl-10`}
                                    placeholder='you@gmail.com'
                                    value={FormData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>
                                    Password
                                </span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className='w-full pl-10 input-bordered'
                                    placeholder='...........'
                                    value={FormData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button type='button'
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className='size-5 text-base-content/40' />
                                    ) :
                                        <Eye className='size-5 text-base-content/40' />
                                    }
                                </button>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='btn btn-primary w-full'
                            disabled={true}
                        >
                            {true ? (
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                    Loading....
                                </>
                            ) : "Create Account"}
                        </button>
                    </form>

                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an Account?{" "}
                            <Link to="/login" className='link link-primary'>
                                Signin
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage