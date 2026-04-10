'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


const AdminLoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(email.trim().length == 0){
            toast.error("Enter Valid Email");
            return
        }
        if(password.trim().length == 0){
            toast.error("Enter Valid Password")
            return
        }
        const body = {
            email:email,
            password:password,
        }
        setIsLoading(true)
        try {
            const req = await fetch('/api/auth/login',{
                method:"POST",
                headers:{ "Content-Type": "application/x-www-form-urlencoded",},
                body:JSON.stringify(body)
            })
            const data = await req.json();
            if(data.success){
                setEmail('');
                setPassword('');
                router.push('/admin')
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }
        } catch (error : unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-surface text-on-surface font-sans selection:bg-primary/30 selection:text-primary min-h-screen flex items-center justify-center overflow-hidden relative py-16">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-surface-lowest"></div>
                <img 
                    alt="blurred cinematic long exposure" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale brightness-50" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsBaCdljwHNyvN44o8BmO6u6w-VDfuBXWTyKeYpi_6pBrC578ShylEJDUtSgx1xdnzeHojlhJG7icBe_vRvSSLh2Ahku-NxsXWAcgVLFJ9Att4SkEZQ6j4qPrGlLPAS_Io6gPmA6-pCWpJrtbncHLkyyJkn2okICLvsKTCOo872kpy1qQyqP4aMerrJIkRJbXa9Gz4U_zDGKzyn6mu6HOQQAQpSSG_RbSBF12DL2TfSfMz5yGT-tPt6j9qP4g2MbZUtm9xmG4pz0vO" 
                />
                <div className="absolute inset-0 vignette"></div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-surface/40 to-surface-lowest"></div>
            </div>
            <main className="relative z-10 w-full max-w-md px-6">
                <div className="bg-surface/70 backdrop-blur-2xl border border-outline-variant/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)] rounded-lg p-10 md:p-12 flex flex-col items-center">
                    <div className="text-center mb-12">
                        <h1 className="font-display text-3xl font-extrabold tracking-tighter text-on-surface mb-2 uppercase">ADMIN LOGIN</h1>
                        <p className="text-[0.65rem] tracking-[0.3em] uppercase text-on-surface/50 font-medium">Enter the Frame</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="space-y-4">
                            <div className="group input-autofill-custom">
                                <label className="text-[0.7rem] tracking-[0.15em] uppercase text-on-surface/40 mb-2 block ml-1 transition-colors group-focus-within:text-tertiary" htmlFor="name">
                                    Email
                                </label>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-surface-low border border-outline-variant/20 rounded-lg px-4 py-4 text-on-surface placeholder:text-on-surface/20 focus:ring-1 focus:ring-tertiary/30 focus:border-tertiary/30 focus:outline-none transition-all duration-500 font-light" 
                                        id="name" 
                                        name="name" 
                                        placeholder="guest@gmail.com" 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="group input-autofill-custom">
                                <label className="text-[0.7rem] tracking-[0.15em] uppercase text-on-surface/40 mb-2 block ml-1 transition-colors group-focus-within:text-tertiary" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-surface-low border border-outline-variant/20 rounded-lg px-4 py-4 text-on-surface placeholder:text-on-surface/20 focus:ring-1 focus:ring-tertiary/30 focus:border-tertiary/30 focus:outline-none transition-all duration-500 font-light" 
                                        id="password" 
                                        name="password" 
                                        placeholder="••••••••" 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button 
                            className="w-full bg-tertiary text-on-tertiary py-4 rounded-lg text-[0.75rem] font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_-5px_rgba(206,197,182,0.3)] hover:shadow-[0_0_30px_-5px_rgba(206,197,182,0.5)] active:scale-95 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Authenticating...' : 'Login'}
                        </button>
                    </form>
                    <div className="mt-10 flex flex-col items-center space-y-4">
                        <Link 
                            className="text-[0.6rem] tracking-[0.15em] uppercase text-on-surface/40 hover:text-on-surface transition-colors duration-300" 
                            href="#"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <div className="mt-12 text-center opacity-30 group cursor-default">
                    <span className="material-symbols-outlined text-sm align-middle mr-1">encrypted</span>
                    <span className="text-[0.55rem] tracking-[0.2em] uppercase">Secure Access Portfolio 2026</span>
                </div>
            </main>
        </div>
    )
}

export default AdminLoginPage