import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from './modeToggle';
import { Button } from '@/components/ui/button';
import { Library, Plus } from 'lucide-react';

export default function Nav(){

    return (
        <div className='w-full py-2 flex items-center justify-between'>
            <h1 className='font-bold text-2xl'>Edtech logo</h1>
            <div className='flex gap-2 text-base'>
                <Button variant="link" className='flex gap-1'>
                    <Library className='w-4' />
                    <p>Library</p>
                </Button>
                <Button variant="link" className='flex gap-1'>
                    <Plus className='w-4' />
                    <p>New Deck</p>
                </Button>
                <ModeToggle />
                <Avatar>
                    <AvatarImage src="avatar_placeholder.webp" />
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}