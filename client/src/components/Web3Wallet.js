/* eslint-disable no-unused-vars */
import MetaMask from '../img/fox.png'
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import { Breadcrumbs, Button, Container, Divider, Grid, TextField } from '@mui/material';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material';

const Web3Wallet = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [transactionValue, setTransactionValue] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');

  const ConnectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChanged(result[0]);
          toast.success('Wallet connected!');
        })
        .catch(error => {
          toast.error(`An error occurred: ${error.message}`);
        });
    } else {
      toast.warning('Install MetaMask Please!!!');
    }
  };

  const DisconnectWallet = () => {
    setDefaultAccount(null);
    setUserBalance(null);
    toast.info('Wallet disconnected');
  };

  const accountChanged = accountname => {
    setDefaultAccount(accountname);
    getUserBalance(accountname);
  };

  const getUserBalance = accountAddress => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [String(accountAddress), 'latest'] })
      .then(balance => {
        const formattedBalance = ethers.formatEther(balance);
        setUserBalance(formattedBalance);
      });
  };

  // const sendTransaction = async (e) => {
  //   let params = [{
  //     from: "0x1230E01151f01B52EadB544c73c6BA7819B1B6f9",
  //     to: e.target.to_address.value,
  //     gas: Number(21000).toString(16),
  //     gasPrice: Number(2500000).toString(16),
  //     value: Number(1000000000000000).toString(16),
  //   }]

  //   let result = await window.ethereum.request({method:"eth_sendTransaction",params}).catch((err) => {
  //     toast.error(err);
  //   })
  // }
  
  const sendTransaction = async () => {
    debugger;
    if (!transactionValue || !recipientAddress) {
      toast.warning('Please enter both a transaction value and a recipient address');
      return;
    }

    const params = [
      {
        from: defaultAccount,
        to: recipientAddress,
        value: ethers.parseEther(String(transactionValue)),
      },
    ];

    try {
      const gasEstimate = await window.ethereum.request({ method: "eth_estimateGas", params });
      const gasPrice = await window.ethereum.request({ method: "eth_gasPrice" });
      params[0].gas = gasEstimate;
      params[0].gasPrice = gasPrice;

      let result = await window.ethereum.request({method:"eth_sendTransaction",params}).catch((err) => {
           console.log(err);
          })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Grid container spacing={0}>
        <Container maxWidth='lg' className='p-1'>
          <div className='shadow-lg p-3 bg bg-white rounded'>
            <Grid container spacing={2}>
              { defaultAccount ? (
                   <>
                   <Grid item xs={12} > 
                    <Button
                        size='small'
                        variant='contained'
                        color='error'
                        onClick={DisconnectWallet}
                        startIcon={<CancelOutlined />}
                      >
                        Disconnect Wallet
                      </Button>
                   </Grid>
                    <Grid item xs={12} >
                        <p><strong>Wallet Address:</strong> {defaultAccount}</p>                   
                        <p><strong>Wallet Balance:</strong> {userBalance}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        label="Recipient Address"
                        variant="outlined"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        label="Transaction Value (Ether)"
                        variant="outlined"
                        value={transactionValue}
                        onChange={(e) => setTransactionValue(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button color="warning" size="small" variant="contained" onClick={sendTransaction}>
                        Send Ethereum
                      </Button>
                    </Grid>
                 </>
              ) : (
                <Grid item xs={12} >
                    <Button
                      size='small'
                      variant='contained'
                      color='success'
                      onClick={ConnectWallet}
                      startIcon={<img src={MetaMask} alt="MetaMask" style={{ width: '20px', marginRight: '10px' }} />}
                      value="Send"
                    >
                      Connect to Meta Mask
                    </Button>
                </Grid> 
              )}
            </Grid>
          </div>
        </Container>
      </Grid>
      <ToastContainer position='bottom-right' />
    </>
  );
};

export default Web3Wallet;
