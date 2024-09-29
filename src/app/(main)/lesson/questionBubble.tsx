import Image from 'next/image'

interface Props{
    question: string;
}

export default function QuestionBubble({question}: Props){
    return <div className='flex items-center gap-x-4 mb-6'>
        <Image src='/assets/mascot.svg' alt='mascot' height={60} width={60} className='hidden lg:block'/>
        <Image src='/assets/mascot.svg' alt='mascot' height={40} width={40} className='block lg:hidden'/>
        <div className="relative px-4 py-2 border-2 rounded-xl text-ms lg:text-base">
            {question}
            <div className="absolute -left-3  top-1/2 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"></div>
        </div>
    </div>
}