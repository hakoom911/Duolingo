"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useExitModal } from '@/store/useExitModal';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function ExitModal(){
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const {isOpen, close} = useExitModal();

    useEffect(()=>setIsClient(true), [])
    if(!isClient){
        return null;
    }

    return <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <div className="flex items-center justify-center w-full mb-5">
                    <Image src='/assets/mascot_sad.svg' alt='Masoct' height={80} width={80} />
                </div>
                <DialogTitle className='text-center font-bold text-2xl'>
                    Wait, don&apos;t go!
                </DialogTitle>
                <DialogDescription className='text-center'>
                    You&apos;re about to leave the lesson. Are you sure?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mb-4'>
                <div className="flex flex-col gap-y-4 w-full">
                    <Button variant={'primary'} className='w-full' size='lg' onClick={close}>keep learning</Button>
                    <Button variant={'danger'} className='w-full' size='lg' onClick={()=>{close(); router.push('/learn')}}>end session</Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}