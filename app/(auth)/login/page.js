'use client'

import { useContext, useEffect, useState } from "react"
import { 
    Eye,
    EyeOff
 } from "lucide-react";
import FormInput from "@/app/components/FormInput";
import Tabs from "@/app/components/Tabs"
import CustomButton from "@/app/components/CustomButton";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const [activeTab, setActiveTab] = useState('Sign up');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passVisible, setPassVisible] = useState(false);
    const { login, register } = useContext(AuthContext)
    const router = useRouter()
    
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const passVisibilityToggle = () => setPassVisible(!passVisible);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Submit initiated: ', event);
        console.log(`Current email: ${email}; and password: ${password}`)

        return;

        try {
            if (activeTab === 'Sign up') {
                const registerData = await register(email, password)
            } else if (activeTab === 'Log in') {
                const loginData = await login(email, password)
            }
            router.push('/');
        } catch (error) {
            console.error('Failed form submit for login/signup: ', error)
        }
    }

    const tabs = {
        'Log in': (
            <form onSubmit={handleSubmit}>
                <div className="py-12 flex flex-col gap-12">
                    <FormInput
                        type='text'
                        label="Username or email"
                        value={username}
                        placeholder="example@gmail.com"
                        onChange={handleUsername}
                        required={true}
                    />
                    <div className="flex gap-2 items-end">
                        <FormInput
                            type={passVisible ? 'text' : 'password'}
                            label="Password"
                            value={password}
                            placeholder="********"
                            onChange={handlePassword}
                            required={true}
                        />
                        <CustomButton
                            variant="soft"
                            frontIcon={passVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                            text={false}
                            onClick={passVisibilityToggle}
                            className={'h-fit'}
                        ></CustomButton>
                    </div>
                    <CustomButton
                        className={'w-full'}
                    >
                        Log In
                    </CustomButton>
                </div>
            </form>
        ),
        'Sign up': (
            <form onSubmit={handleSubmit}>
                <div className="py-12 flex flex-col gap-12">
                    <FormInput
                        type='text'
                        label="Username"
                        value={username}
                        placeholder="user123"
                        onChange={handleUsername}
                        required={true}
                    />
                    <FormInput
                        type='email'
                        label="Email"
                        value={email}
                        placeholder="example@gmail.com"
                        onChange={handleEmail}
                        required={true}
                    />
                    <div className="flex gap-2 items-end">
                        <FormInput
                            type={passVisible ? 'text' : 'password'}
                            label="Password"
                            value={password}
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
                        <CustomButton
                            variant="soft"
                            frontIcon={passVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                            text={false}
                            onClick={passVisibilityToggle}
                            className={'h-fit'}
                        ></CustomButton>
                    </div>
                    <CustomButton
                        className={'w-full'}
                    >
                        Sign Up
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
            >
                {tabs[activeTab]}
            </Tabs>
        </div>
    )
}