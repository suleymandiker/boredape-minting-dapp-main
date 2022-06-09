import React, {useEffect,useState} from 'react';
import { initOnboard } from '../utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { config } from '../dapp.config'

import { 
    getTotalSupply,
    getCaptainBalanceOf,
    getFishBalanceOf,
    getYardBalanceOf,
    mintCaptain,
    GetMyStakedCaptain,
    getTotalTonOfAllCaptain,
    claimFish,
    stakeAll,
    unStakeAll,
    getFeedActivity,
    feedYard,
    getYourStakedFish,
    getEstDailyFeed,
    stakeEggForFeed,
    unstakeEggForFeed,
    swapFishForFeed,
    getYardClaimable,
    getEstFishPerDay,
    getCaptionStakeDetails,
    getCaptionUnstakeDetails,
    claimYard,
    levelUpCaptain,
    getCheckSkipCoolingOffAmt,
    skipTimeForLevel,
    getUnstakeList,
    stakeCaptain,
    unstakeCaptain,
    getStakeList,
    mintFish,
    mintFeed
  } from "../utils/interact2"







    

  

  




export default function Fishing() {

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
    const connectedWallets = useWallets()

    const [paused, setPaused] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    const [isPreSale, setIsPreSale] = useState(false)

    const publicMintHandler = async () => {
        setIsMinting(true)
    
        const { success, status } = await publicMint(mintAmount)
    
        setStatus({
          success,
          message: status
        })
    
        setIsMinting(false)
      }



      type FeedActivityObj = {
        tokenId: number;
        levelUp: number;
        skipUp: number;
      }
    
      type FishStateHolders = {
        user: string;
        since: number;
        amount: number;
      }
    
      type CaptainDetails = {
        tokenId: number;
        mintedBy: string;
        currentOwner: string;
        previousPrice: number;
        numberOfTransfers: number;
        forSale: boolean;
        ton: number;
      }
    
    
      type CaptainListDetails = {
        ton: number;
        tokenId: number;
        estEgg: number;
        levelUp: number;
        skipTime: number;
      }
    
      let FeedActivityObjArray: FeedActivityObj[] = []
    
        const [isConnected, setIsConnected] = useState(false);
        const [hasMetamask, setHasMetamask] = useState(false);
        const [signer, setSigner] = useState(undefined);
        const [myaddress, setMyAddress] = useState();
        const [captainBalance, setCaptainBalance] = useState(0);
        const [fishBalance, setFishBalance] = useState(0);
        const [yardBalance, setYardBalance] = useState(0);
        const [myCaptainStake,setMyCaptainStake] = useState<number[]>([]);
        const [loading,setLoading] = useState(false);
        const [myFishTotalTon,setMyFishTotalTon] = useState(0);
        const [totalTon,setTotalTon] = useState(0);
        const [totalClaimable,setTotalClaimable] = useState(0);
        const [estEggPerDay ,setEstEggPerDay ] = useState(0);
        const [feedActivity, setFeedActivity] = useState<FeedActivityObj[]>([]);
        const [stakedFish, setStakedFish] = useState<FishStateHolders>({user:'',since:0,amount:0});
        const [estDailyFeed, setEstDailyFeed] = useState(0);
        const [totalYardClaimAmount, setTotalYardClaimAmount] = useState(0);
        const [captainStakeDetails, setCaptainStakeDetails] = useState<CaptainListDetails[]>([]);
        const [captainUnstakeDetails, setCaptainUnstakeDetails] = useState<CaptainListDetails[]>([]);
        const [eggStakeMax,setEggStakeMax]= useState();
        const [yourEstDailyFeedCalc,setYourEstDailyFeedCalc] = useState(0);
    
        const [eggAmount, setEggAmount] = useState();
    
        const [stakeEggInput, setStakeEggInput] = useState();
        const [stakeEggInputMax, setStakeEggInputMax] = useState();
        const [stakeFeedInput, setStakeFeedInput] = useState();
    
        const [unstakeEggInput, setUnstakeEggInput] = useState();
        const [unstakeEggInputMax, setUnstakeEggInputMax] = useState();
        const [unstakeFeedInput, setUnstakeFeedInput] = useState();
    
        const [swapEggInput, setSwapEggInput] = useState();
        const [swapEggInputMax, setSwapEggInputMax] = useState();
        const [swapFeedInput, setSwapFeedInput] = useState();
    
        const [unstakeCaptainList, setUnstakeCaptionList] = useState();
        const [stakeCaptainList, setStakeCaptionList] = useState();
    
        const [captainMintAmount,setCaptainMintAmount] = useState();
        const [fishMintAmount,setFishMintAmount] = useState();
        const [feedMintAmount,setFeedMintAmount] = useState();
    
        
    
    
    
      
        const [data, setData] = useState([Object]);
    
    
        useEffect(() => {
            const init = async () => {
              if(myaddress) {
              
             
                setCaptainBalance(await getCaptainBalanceOf(myaddress))
                setFishBalance(((await getFishBalanceOf(myaddress) / 1000000000000000000).toFixed(2)))
                setYardBalance(await getYardBalanceOf(myaddress))
                const [tokenIds, myFishTotalTon,totalFishClaimable, estEggPerDay] =  await GetMyStakedCaptain(myaddress)
                setMyCaptainStake(tokenIds)
                setMyFishTotalTon(myFishTotalTon)
                setTotalClaimable(Number((totalFishClaimable/1000000000000000000).toFixed(2)))
                setEstEggPerDay(estEggPerDay)
                setTotalTon(await getTotalTonOfAllCaptain())
                setFeedActivity(await getFeedActivity(myaddress) )
                setStakedFish(await getYourStakedFish(myaddress))
                setEstDailyFeed(await getEstDailyFeed(myaddress))
        
                setTotalYardClaimAmount( (await getYardClaimable(myaddress)).toFixed(3))
                //console.log(feedActivity[1].levelUp)
                //console.log("getYardClaimable:", await getYardClaimable(myaddress))
                console.log("fishBalance:",fishBalance)
                console.log("myCaptainStake",myCaptainStake)
    
                setCaptainStakeDetails(await getCaptionStakeDetails(myaddress));
                setCaptainUnstakeDetails(await getCaptionUnstakeDetails(myaddress));
                console.log("Goster captainUnstakeDetails:", captainUnstakeDetails)
    
                setUnstakeCaptionList(await getUnstakeList(myaddress))
                setStakeCaptionList(await getStakeList(myaddress))
    
                
         
                setEggStakeMax(Number(fishBalance).toFixed(4))
              
        
     
          
           
        
        
             
              }
        
            }
        
            init()
        },[myaddress])
    
        useEffect(() => {
            if (typeof window.ethereum !== "undefined") {
              setHasMetamask(true);
            }
          });
    
    
    
        useEffect(() => {
            let jsonData = [];
            jsonData = require("../data/feature.json");
            //console.log(jsonData)
            setData(jsonData)
        })
    
        
    
        
    
    
    
        const putStakeEggMax = () => {
          
          setStakeEggInput(Number(fishBalance).toFixed(0))
         //  setEggAmount(Number(fishBalance).toFixed(0))
    
    
        }
    
        const putUnstakeEggMax = () => {
          setUnstakeEggInput(Number(stakedFish.amount))
        }
    
        const putSwapEggMax = () => {
          setSwapEggInput(Number(fishBalance).toFixed(0))
        }
    
    
        const addMaxEggUnstake = () => {
    
         setEggAmount(fishBalance)
      
    
      }
    
    
        const handleEggStake = (e) => {
          
    
          setStakeEggInput(e.target.value)
    
    
         
          
        } 
    
    
        const handleCaptainMint = (e) => {
          
    
          setCaptainMintAmount(e.target.value)
    
    
         
          
        } 
    
    
        const handleFishMint = (e) => {
          
    
          setFishMintAmount(e.target.value)
    
    
         
          
        } 
    
        
        const handleFeedMint = (e) => {
          
    
          setFeedMintAmount(e.target.value)
    
    
         
          
        } 
    
    
    
        const handleEggUnstake = (e) => {
          
    
          setUnstakeEggInput(e.target.value)
    
    
          
        } 
    
        
        const handleEggSwap = (e) => {
          
    
          setSwapEggInput(e.target.value)
    
    
          
        } 
    
    
        
    
    
  
    
    
          
      async function claimFishFunc() {
    
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
           await claimFish(myaddress)
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
     
      }
    
    
        async function claimYardFunc() {
    
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
           await claimYard()
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
     
      }
    
    
    
      
    
      const  stakeEggForFeedFunc =  async  (amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
          
    
           await stakeEggForFeed(amount)
           console.log(amount)
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
      const  unstakeEggForFeedFunc =  async  (amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
          
    
           await unstakeEggForFeed(amount)
           console.log(amount)
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
      const  swapFishForFeedFunc =  async  (amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
          
    
           await swapFishForFeed(amount)
           console.log(amount)
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
      const  feedYardFunc =  async  (tokenId:number,amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
          
    
           await feedYard(tokenId, amount)
    
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
    
       const  skipTimeForLevelFunc =  async  (tokenId:number,amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
     
    
           await skipTimeForLevel(tokenId, amount)
      
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
      const  mintCaptainFunc =  async  (myAdress:any,amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
     
    
           await mintCaptain(myAdress, amount)
      
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
    
      const  mintFishFunc =  async  (myAdress:any,amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
     
    
           await mintFish(myAdress, amount)
      
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
      const  mintFeedFunc =  async  (myAdress:any,amount:any) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
     
    
           await mintFeed(myAdress, amount)
      
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
    
      
    
    
      const  levelUpCaptainFunc =  async  (tokenId:number) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
     
    
           await levelUpCaptain(tokenId)
      
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
      const  stakeCaptainFunc =  async  (tokenIds:number[]) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
     
    
           await stakeCaptain(tokenIds)
      
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
    
      const  unstakeCaptainFunc =  async  (tokenIds:number[]) =>  {
        
        if (typeof window.ethereum !== "undefined") {
          setLoading(true)
    
     
    
           await unstakeCaptain(tokenIds)
      
           setLoading(false)
        } else {
          console.log("Please install MetaMask");
        }
      }
    
    

  return(
      <div className="text-white">
                {wallet ? (
                <div>{wallet?.accounts[0]?.address}</div>
                ) : (
                  <button
                    className="font-coiny mt-12 w-full bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-pink-400/50 mx-4 tracking-wide uppercase"
                    onClick={() => connect()}
                  >
                    Connect Wallet
                  </button>
                )}
      </div>
  );

}