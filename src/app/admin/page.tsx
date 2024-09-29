import dynamic from "next/dynamic";
const App = dynamic(()=> import('./app'), {ssr: false}) 
// just some random comment sd
export default function Admin(){
    return <App/>
}