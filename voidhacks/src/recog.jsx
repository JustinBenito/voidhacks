import React, { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import { createCredential, verifyAssertion } from 'webauthn-json';

const TeachableMachineComponent = () => {


  let mintabi=[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "sendIt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const provider = window.ethereum;
  const Web31 = new Web3(provider);
  
  let mintaddress="0xb74D38bD77E834a731d458eEe6E59D1806ab0f2B"


  let voteaddress="0x1a1A89f57c6C92eDbAF4Aa5e05005e6add0d6CE8"

  let voteabi=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endVoting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nota",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "internalType": "enum Voteit.State",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_choice",
          "type": "bool"
        }
      ],
      "name": "vote",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "hasVoted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const [aadharNumber, setAadharNumber] = useState('');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [votingIndex, setVotingIndex] = useState(0);
  const [seevote, setSee]=useState(false)
  const [aadharname, setName]=useState('')

  const webcamContainerRef = useRef(null);
  const labelContainerRef = useRef(null);
  const webcamRef = useRef(null);
  const [currentPrediction, setCurrentPrediction] = useState('');

  const URL = "https://teachablemachine.withgoogle.com/models/HyxCV8P4C/";
  let model, maxPredictions;

  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSaveAadhar = () => {
    if (aadharNumber.length === 12) {
      if (aadharNumber && account) {
        const storedData = JSON.parse(localStorage.getItem('aadhar')) || {};
        storedData[aadharNumber] = {"account": account, "name":aadharname};
        
        localStorage.setItem('aadhar', JSON.stringify(storedData));
        console.log(storedData);
        showVotingUI()
        alert('Successfully got you in');
      }
    } else {
      alert('Enter the 12 digit Aadhar Number');
    }
  };


  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const accounts = await Web31.eth.getAccounts();
          setAccount(accounts[0]);

          const weiBalance = await Web31.eth.getBalance(accounts[0]);
          const ethBalance = Web31.utils.fromWei(weiBalance, 'ether');
          setBalance(parseFloat(ethBalance));
        } catch (error) {
          console.error('Error connecting to Metamask:', error);
        }
      } else {
        console.error('Metamask not detected');
      }
    };

    loadBlockchainData();
  }, []);

  const handleStart = async () => {
    // Check if the account address matches the stored address for the entered Aadhar number
    let storedData = JSON.parse(localStorage.getItem('aadhar')) || {};
    storedData=storedData[aadharNumber]
    const storedAddress = storedData.account;
    const aadname = storedData.name;
    console.log("aacnt",account)
    console.log(storedAddress)

    if (storedAddress == account) {
      console.log("Hello inside cdn")
      // Assume your sendToken function is asynchronous
      await sendToken();
      // Show the voting UI after sendToken function is complete
      setVotingIndex(null); // Reset the selected voting option
    } else {
      alert('Invalid account address for the entered Aadhar number');
    }
  };

  const sendToken = async () => {
    console.log("Sending token")
    // Assuming you have a contract instance
    const YourSmartContract = new Web31.eth.Contract(mintabi, mintaddress);
    // Assuming sendToken function is present in YourSmartContract
    // You should replace 'YourFunctionName' and 'YourArguments' with actual function and arguments
    await YourSmartContract.methods.sendIt().send({ from: account });
    // Assuming you have a function to show the voting UI
    showVotingUI();
  };

  const vote = async () => {
    
    // Assuming you have another contract instance for voting
    const VotingContract = new Web31.eth.Contract(voteabi, voteaddress);
    // Assuming Vote function is present in VotingContract
    // Replace 'YourVoteArguments' with actual arguments for the Vote function
    await VotingContract.methods.vote(votingIndex).send({ from: account });

    // Alert user about successful voting
    alert('Voting has been successful');
  };

  const showVotingUI = () => {
    // Set the state to show the voting UI
    setSee(true); // Reset the selected voting option
  };


  useEffect(() => {
    const init = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const flip = true;
      webcamRef.current = new tmImage.Webcam(200, 200, flip);
      await webcamRef.current.setup();
      await webcamRef.current.play();
      window.requestAnimationFrame(loop);

      webcamContainerRef.current.appendChild(webcamRef.current.canvas);
      labelContainerRef.current.innerHTML = '';
      for (let i = 0; i < maxPredictions; i++) {
        labelContainerRef.current.appendChild(document.createElement("div"));
      }
    };

    const loop = async () => {
      webcamRef.current.update();
      await predict();
      window.requestAnimationFrame(loop);
    };

    const predict = async () => {
      const predictions = await model.predict(webcamRef.current.canvas);

      // Find the prediction with the highest probability
      const maxPrediction = predictions.reduce((max, prediction) =>
        prediction.probability > max.probability ? prediction : max
      );

      const classPrediction = maxPrediction.className;
      setCurrentPrediction(classPrediction);
    };

    init();

    return () => {
      // Cleanup code if needed
      // E.g., webcamRef.current.stop();
    };
  }, []); // empty dependency array to run the effect only once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center text-white bg-gradient-to-b from-black via-gray-500 to-gray-900 h-screen">
      <h1 className="text-5xl font-bold mb-8 text-white mt-8">🗳 New Indian Voting System</h1>
  
      <div className="relative bg-gray-300 w-full sm:w-96 h-96 sm:h-72 mb-4 rounded-md overflow-hidden">
        {/* Your webcam container component */}
        <div ref={webcamContainerRef} className="absolute inset-0"></div>
      </div>
  
      <div className="bg-gray-300 w-full sm:w-96 h-48 mb-8 rounded-md">
        {/* Display the class with the highest probability */}
        <div className="h-full flex items-center justify-center text-2xl font-semibold">{currentPrediction}</div>
      </div>
  
      {account && (
        <>
          <div className="mt-4">
            <label className="block font-bold text-center text-lg mb-2">Aadhar Number</label>
            <input
              type="text"
              value={aadharNumber}
              onChange={handleAadharChange}
              className="w-full p-2 border rounded-md text-black"
            />
            <label className="block text-lg text-center mt-2 font-bold mb-2">Your Name</label>
            <input
              type="text"
              value={aadharname}
              onChange={handleName}
              className="w-full p-2 border rounded-md text-black"
            />
            <button
              onClick={()=>{handleSaveAadhar();}}
              className="mt-4 flex mx-auto mb-4  bg-green-400 text-white text-center p-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Lets Get in
            </button>
          </div>
        </>
      )}
        <button
        type="button"
        onClick={handleStart}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        I will Vote
      </button>
  
      {/* Show the voting UI when the state is set */}
      {seevote && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2 gap-8 mr-2 text-center">Vote for your Party</h2>
          <div className='gap-4 p-2 flex justify-center align-middle items-center mx-auto'>
            <button
              onClick={() => { setVotingIndex(0); console.log("0"); }}
              className={`bg-orange-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer ${votingIndex === 0 ? 'border border-black' : ''}`}
            >
              Justin Party
            </button>
            <button
              onClick={() => { setVotingIndex(1); console.log("1"); }}
              className={`bg-yellow-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer ${votingIndex === 1 ? 'border border-black' : ''}`}
            >
              Developers Party
            </button>
          </div>
          <button
            onClick={vote}
            className="mt-2 mb-4 flex flex-auto mx-auto bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
          >
            Vote
          </button>
        </div>
      )}
    </div>
  );
  
};

export default TeachableMachineComponent;