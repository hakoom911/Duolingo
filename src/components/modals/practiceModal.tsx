"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { usePracticeModal } from '@/store/usePracticeModal';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function PracticeModal(){
    const [isClient, setIsClient] = useState(false)
    const {isOpen, close} = usePracticeModal();

    useEffect(()=>setIsClient(true), [])
    if(!isClient){
        return null;
    }

    return <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <div className="flex items-center justify-center w-full mb-5">
                    <Image src='/assets/heart.svg' alt='Heart' height={100} width={100} />
                </div>
                <DialogTitle className='text-center font-bold text-2xl'>
                    Practice Lesson!
                </DialogTitle>
                <DialogDescription className='text-center'>
                    Use practice lesson to regain hearts and points. You won&apos;t lose hearts or points in practice lessons. 
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4'>
                <div className="flex flex-col gap-y-4 w-full">
                    <Button variant={'primary'} className='w-full' size='lg' onClick={close}>I understand</Button>
                </div>
            </DialogFooter>
        </DialogContent> 
    </Dialog>
}