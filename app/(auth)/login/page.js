'use client'

import { useEffect, useState } from "react"
import { 
    Eye,
    EyeOff
 } from "lucide-react";
import FormInput from "@/app/components/FormInput";
import Tabs from "@/app/components/Tabs"
import CustomButton from "@/app/components/CustomButton";

export default function Login() {
    const [activeTab, setActiveTab] = useState('Sign up');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passVisible, setPassVisible] = useState(false);
    
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted', event.target)
        // handle submit of deck creation form
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