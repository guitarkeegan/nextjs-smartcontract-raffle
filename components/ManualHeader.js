import {useMoralis} from "react-moralis"
import {useEffect} from "react"

export default function ManualHeader(){

    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis()

    useEffect(()=>{
        if (isWeb3Enabled) return
        // nextjs has issues with window sometimes
        if (typeof window !== "undefined"){
            if (window.localStorage.getItem("connected")){
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect(()=>{
        Moralis.onAccountChanged(account=>{
            console.log(`account changed to ${account}`)
            if (account == null){
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    })

    return (
        <div>
        {
        account 
        ?
            <div>Connected to account: {account.slice(0, 6)}...{account.slice(account.length - 4)}</div>
        :
        <button onClick={
            async () => {await enableWeb3()
            if (typeof window !== "undefined"){
                window.localStorage.setItem("connected", "injected")
// injected would be replaced by the name of the wallet provider
         } }}
         disabled={isWeb3EnableLoading}
         >Connect</button>
        }
        </div>
    )
}