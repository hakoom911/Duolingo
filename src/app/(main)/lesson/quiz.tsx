"use client"

import { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./questionBubble";
import Challenge from "./challenge";
import Confetti from 'react-confetti';
import Footer from "./footer";
import { reduceHearts, upsertChallengeProgress } from "@/app/actions";
import { toast } from "sonner";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import ResultCard from "./resultCard";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/useHeartsModal";
import { usePracticeModal } from "@/store/usePracticeModal";

interface Props{
    initialLessonId: number;
    initialLessonChallenges: any; 
    initialHearts: number;
    initialPercentage: number
    userSubscription: any;
}

export default function Quiz({initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription}: Props){
    const {open: openHeartsModal} = useHeartsModal()
    const {open: openPracticeModal} = usePracticeModal()
    const {width, height} = useWindowSize();
    const router = useRouter();
    const [correctAudio, _c, correctAudioControls] = useAudio({src: '/assets/correct.wav'})
    const [incorrectAudio, _i, incorrectAudioControls] = useAudio({src: '/assets/incorrect.wav'})
    const [finishAudio, _f, finishAudioControls] = useAudio({src: '/assets/finish.mp3'})
    const [lessonId, setLessonId] = useState(initialLessonId)
    const [pending, startTransition] = useTransition()
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage === 100 ? 0: initialPercentage)
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(()=>{
        const uncompletedIndex = challenges.findIndex((challenge: any)=>!challenge.completed)
        return uncompletedIndex === -1? 0: uncompletedIndex;
    }) 
    const challenge = challenges[activeIndex]
    const [selectedOption, setSelectedOption] = useState<Number>()
    const [status, setStatus] = useState<"correct" | "wrong" | 'none'>('none')
    const onSelect = (id: number)=>{
        if(status !== 'none') return ;
        setSelectedOption(id)
    }

    const onNext = ()=>{
        setActiveIndex((current: number)=> current+1)
    }


    useMount(()=>{
        if(initialPercentage === 100){
            openPracticeModal();
        }
    })

    if(!challenge){
        finishAudioControls.play()
        return <>
            {finishAudio}
            <Confetti
                width={width}
                height={height} 
                recycle={false}
                numberOfPieces={500}
                tweenDuration={10000}
            />
             <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                <Image src="/assets/finish.svg" alt="Finish" className="hidden lg:block" height={100} width={100} />
                <Image src="/assets/finish.svg" alt="Finish" className="block lg:hidden" height={50} width={50} />
                <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">Good Job! <br/> You&apos;ve completed the lesson</h1>
                <div className="flex items-center gap-x-4 w-full">
                    <ResultCard variant={'points'} value={challenges.length * 10} />
                    <ResultCard variant={'hearts'} value={hearts} />
                </div>
             </div>
             <Footer lessonId={lessonId} status="completed" onCheck={()=>{
                router.push('/learn')
             }} />
        </>
    }

    const options = challenge.challengeOptions ?? []
    const title = challenge.type === 'ASSIST' ? "Select the correct meaning" : challenge.question;
    const onContinue = ()=>{
        if(!selectedOption) return;
        
        if(status === 'wrong'){
            setStatus("none")
            setSelectedOption(undefined)
            return    
        }

        if(status === 'correct'){
            onNext()
            setStatus("none")
            setSelectedOption(undefined)    
            return
        }
        
        const correctOption = options.find((option: any)=> option.correct)
        if(!correctOption) return;
        if(correctOption && correctOption.id === selectedOption){
            startTransition(()=>{
                upsertChallengeProgress(challenge.id).then((response)=>{
                    if(response?.error === 'hearts'){
                        openHeartsModal()
                        return;
                    }
                    
                    correctAudioControls.play();
                    setStatus('correct')
                    setPercentage(prev=> prev + 100 / challenges.length) 
                    if(initialPercentage === 100){
                        setHearts(prev=> Math.min(prev +1, 5))
                    }
                }).catch(()=>{
                    toast.error("something went wrong, please try again")
                })
            })
        }
        else{
            startTransition(()=>{
                reduceHearts(challenge.id).then((response)=>{
                    if(response?.error === 'hearts'){
                        openHeartsModal()
                        return;
                    }

                    incorrectAudioControls.play();
                    setStatus('wrong')
                    if(!response?.error){
                        setHearts((prev)=> Math.max(prev -1, 0))
                    }
                }).catch(()=> toast.error('something went wrong. please try again'))
            })
        }

    }

    return <>
        {correctAudio}
        {incorrectAudio}
        <Header hearts={hearts} percentage={percentage} hasActiveSubscription={userSubscription?.isActive} />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                        {title}
                    </h1>
                    <div className="">
                        {challenge.type === 'ASSIST' && <QuestionBubble question={challenge.question}/>}
                        <Challenge 
                        options={options}
                        selectedOption={selectedOption}
                        status={status}
                        onSelect={onSelect}
                        disabled={pending}
                        type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer disabled={pending || !selectedOption} status={status} onCheck={onContinue}/>
    </>
}