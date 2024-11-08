'use client'

import { useContext, useEffect, useState } from "react"
import { 
    Eye,
    EyeOff,
    LoaderCircle
 } from "lucide-react";
import FormInput from "@/app/components/FormInput";
import Tabs from "@/app/components/Tabs"
import CustomButton from "@/app/components/CustomButton";
import { InfoCard } from "@/app/components/Card";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const [activeTab, setActiveTab] = useState('Sign up');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passVisible, setPassVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const { login, register } = useContext(AuthContext);
    const router = useRouter();
    
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        console.log('Submit initiated: ', event);

        try {
            if (activeTab === 'Sign up') {
                const registerData = await register(email, password)
                    if (!registerData.ok && !registerData.accessToken) {
                        console.log(`Error during registration -> `, registerData)
                        setError(registerData);
                        setLoading(false);
                    } else {
                        // console.log(`Register completed: `, registerData)
                        setLoading(false)
                        router.push('/')
                    }
            } else if (activeTab === 'Log in') {
                const loginData = await login(email, password)
                    if (!loginData.ok && !loginData.accessToken) {
                        console.log(`Error during login -> `, loginData)
                        setError(loginData);
                        setLoading(false);
                    } else {
                        setLoading(false)
                        router.push('/')
                    }
            }
        } catch (error) {
            console.error('Failed form submit for login/signup: ', error)
        }
    }

    const tabs = {
        'Log in': (
            <form onSubmit={handleSubmit}>
                <div className="py-12 flex flex-col gap-12">
                    <FormInput
                        type='email'
                        label="Email"
                        value={email}
                        placeholder="example@gmail.com"
                        onChange={handleEmail}
                        required={true}
                    />
                    <FormInput
                        type={passVisible ? 'text' : 'password'}
                        label="Password"
                        value={password}
                        passwordVisibility={true}
                        placeholder="********"
                        onChange={handlePassword}
                        required={true}
                    />
                    {/* Add loading behavior */}
                    <CustomButton
                        type='submit'
                        className={'w-full'}
                        disabled={!email || !password}
                    >
                        {loading ? (<LoaderCircle size={16} className='animate-spin' />) : ('Log In')}
                    </CustomButton>
                </div>
            </form>
        ),
        'Sign up': (
            <form onSubmit={handleSubmit}>
                <div className="py-12 flex flex-col gap-12">
                    <FormInput
                        type='email'
                        label="Email"
                        value={email}
                        placeholder="example@gmail.com"
                        onChange={handleEmail}
                        required={true}
                    />
                    <FormInput
                        type={passVisible ? 'text' : 'password'}
                        label="Password"
                        value={password}
                        passwordVisibility={true}
                        placeholder="********"
                        msg={
                            <div className="flex flex-col gap-1">
                                <p>Password must contain:</p>
                                <ul className="list-disc pl-4">
                                    <li>At least 8 characters</li>
                                    <li>One uppercase letter</li>
                                    <li>One number</li>
                                    <li>One special character</li>
                                </ul>
                            </div>
                        }
                        onChange={handlePassword}
                        required={true}
                    />
                    {/* Add loading behavior */}
                    <CustomButton
                        type='submit'
                        className={'w-full'}
                        disabled={!email || !password}
                    >
                        {loading ? (<LoaderCircle size={16} className='animate-spin' />) : ('Sign Up')}
                    </CustomButton>
                </div>
            </form>
        )
    }

    return (
        <div className="w-full mt-[128px] flex flex-col items-center justify-center">
            <Tabs
                tabsObj={tabs}
                active={activeTab}
                setActive={setActiveTab}
                className={'w-full max-w-[512px]'}
            >
                <div className="mt-8">
                    {error && (
                        <InfoCard className={'text-sm'}>
                            {error.message}
                        </InfoCard>
                    )}
                    {tabs[activeTab]}
                </div>
            </Tabs>
        </div>
    )
}