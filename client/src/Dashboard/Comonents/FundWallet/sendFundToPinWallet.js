import React from 'react';
import './fundWallet.css'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class SendFundToPinWallet extends React.Component{

    constructor(){
        super();
        this.userdata = JSON.parse(sessionStorage.getItem('USER_DETAILS'));
        console.log(this.userdata);
        this.state = {
            id: this.userdata._id,
            active : this.userdata.Active.toLowerCase() === "true" ? true : false,
            _level:0.00,
            _autopool:0.00,
            _fund:0.00,
            _recieved:0.00,
            buttondisable:false,
            Loading : false,
            Err_message: "something",
            open: false,
            
        }
    }

  async  componentDidMount(){

        const Available = parseFloat( this.userdata.levelIncome.$numberDecimal) + 
                          parseFloat( this.userdata.autoPoolIncome.$numberDecimal)+
                          parseFloat( this.userdata.fundSharingIncome.$numberDecimal)+
                          parseFloat( this.userdata.recievedIncome.$numberDecimal)
                          console.log(Available);
    
            if(parseFloat(Available) > parseFloat(0.00)){
            
            
                    const msg =  document.getElementById('Update_Msg');
                    msg.innerHTML = "Enter amount";
                    msg.style.display = "block";
            
            
            }
            else{
                this.setState({buttondisablemember:true,buttondisable:true,Err_message:"SORRY ! can't transfer money due to low balance",open:true})
        
            }

            const userdata = JSON.parse(sessionStorage.getItem('USER_DETAILS'))
            await axios.post('/api/users/getSingleUserDetails',{userid : userdata._id})
          .then(res => {
              console.log(res);
            sessionStorage.setItem('USER_DETAILS',JSON.stringify(res.data.user));
            this.setState({
                levelIncome: parseFloat( res.data.user.levelIncome.$numberDecimal),
                autoPoolIncome: parseFloat( res.data.user.autoPoolIncome.$numberDecimal),
                fundSharingIncome: parseFloat( res.data.user.fundSharingIncome.$numberDecimal),
                recievedIncome: parseFloat( res.data.user.recievedIncome.$numberDecimal),
            })
          })
          .catch(res => {
              console.log(" ");
          })
        
    }

    handleChange = (e) => {
 
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleSubmit = async (e)=> {

        console.log("in submit");

        this.setState({
            Loading : true
        })

        e.preventDefault();

        try{
            
                        if( parseFloat(0.00) < parseFloat(e.target._Send.value)  ){
                            
                                        if(parseFloat(e.target._Send.value) <= parseFloat(e.target._Available.value)){
                                        //await code
                                                    console.log("in axiospin");
                                                   // document.getElementById('ERR_MSG').innerHTML = "";
                                                    await axios.post('/api/users/sendFund/pinWallet',{
                                                        
                                                        //updating Values
                                                        _id:this.state.id,
                                                        useid:this.userdata.userId,
                                                        levelamount:e.target._level.value,
                                                        autoamount:e.target._autopool.value,
                                                        fundamount:e.target._fund.value,
                                                        recievedamount:e.target._recieved.value,
                                                        pinBalance: e.target._Total.value

                                                    }).then(res => {
console.log(res.data);
                                                                if(parseInt(res.data.status) === parseInt(1)){
                                                                            sessionStorage.setItem('USER_DETAILS',JSON.stringify(res.data.user));
                                                                            const userdata = JSON.parse(sessionStorage.getItem('USER_DETAILS'))
                                                                            this.setState({
                                                                                id:userdata._id,
                                                                                levelIncome: parseFloat( userdata.levelIncome.$numberDecimal),
                                                                                autoPoolIncome: parseFloat( userdata.autoPoolIncome.$numberDecimal),
                                                                                fundSharingIncome: parseFloat( userdata.fundSharingIncome.$numberDecimal),
                                                                                recievedIncome: parseFloat( userdata.recievedIncome.$numberDecimal),
                                                                                _level:0.00,
                                                                                _autopool:0.00,
                                                                                _fund:0.00,
                                                                                _recieved:0.00,
                                                                                Loading : false,
                                                                                Err_message : "Successful !",
                                                                                open : true, 
                                                                            })
                                                                }else{
                                                                            this.setState({ Loading : false, Err_message : "UnSuccessful !",
                                                                            open : true,  })
                                                                            window.location.reload()
                                                                }
                                                    }).catch(err => {

                                                        this.setState({ Loading : false })
                                                        window.location.reload()
                                                    })

                                        }else{
                                          //  console.log("3");document.getElementById('ERR_MSG').innerHTML = "please enter valid Amount !"
                                            this.setState({ Loading : false,
                                                Err_message : "please enter valid Amount !",
                                                open : true, })
                                        }

                        }else{
                                        console.log("2");
                                     //   document.getElementById('ERR_MSG').innerHTML = "please enter valid Amount !"
                                        this.setState({ Loading : false,
                                            Err_message :  "please enter valid Amount !",
                                            open : true, })
                        }
        }
        catch(err)
        {
            this.setState({ Loading : false})
        }           

}

handleClose = () =>{
    this.setState({
      open: false
    })
  }

    render()
    {

       
            return(
                <div>
                
                         
                           <div style={{margin:"0px",padding:"2% 10%"}}>
                            <div className="Send_Fund_Container">
                
                                <div className="Send_Fund_header" >
                                     Send Fund To Pin Wallet
                                </div>
                
                                <div id="Update_Msg"  style={{color:"black",display:"none",borderRadius:"3px",backgroundColor:"white",padding:"5px"}}>
                                  
                                  </div>
                
                                  <Snackbar
                        
                                    autoHideDuration={3000}
                                    open={this.state.open}
                                    onClose={() => this.handleClose()}
                                    message={this.state.Err_message}
                                    action={
                                    <React.Fragment>
                                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => this.handleClose()}>
                                        <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </React.Fragment>                         
                                    }
                                />
                
                                   <div className="Send_Fund_body">
                                       
                                      
                
                                    <div style={{padding:"30px 0px"}}>
                                    {/* <Divider/> */}
                                    </div>
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                
                                        <Grid container xs={12} spacing={2}>
                                                <div className="Send_Fund_body_ID" >
                                                    <div className="Send_Fund_body_wallet">
                
                                                    <input type="text" disabled value="LEVEL INCOME($)" className="form-control"></input>
                                                    <input type="text" readOnly value={this.state.levelIncome} className="form-control"></input>
                                                    <input type="number" required min="0" step="any" max={this.state.levelIncome} name="_level" onChange={(e) => this.handleChange(e)} value={this.state._level} className="form-control"></input>
                
                                                    </div >
                                                    <div className="Send_Fund_body_wallet">
                
                                                    <input type="text" readOnly value="AUTOPOOL INCOME($)" className="form-control"></input>
                                                    <input type="text" readOnly value={this.state.autoPoolIncome} className="form-control"></input>
                                                    <input type="number" required min="0" max={this.state.autoPoolIncome} name="_autopool" onChange={(e) => this.handleChange(e)} value={this.state._autopool} className="form-control"></input>
                
                                                    </div>
                                                    <div className="Send_Fund_body_wallet">
                
                                                    <input type="text" readOnly value="FSI($)" className="form-control"></input>
                                                    <input type="text" readOnly value={this.state.fundSharingIncome} className="form-control"></input>
                                                    <input type="number" required min="0" max={this.state.fundSharingIncome} name="_fund" onChange={(e) => this.handleChange(e)} value={this.state._fund} className="form-control"></input>
                
                                                    </div>
                                                    
                                                    <div className="Send_Fund_body_wallet">
                
                                                    <input type="text" readOnly value="RECEIVED FUND($)" className="form-control"></input>
                                                    <input type="text" readOnly value={this.state.recievedIncome} className="form-control"></input>
                                                    <input type="number" required min="0" max={this.state.recievedIncome} name="_recieved" onChange={(e) => this.handleChange(e)} value={this.state._recieved} className="form-control"></input>
                
                                                    </div>
                                                    <div className="Send_Fund_body_Total">
                
                                                    <input type="text" readOnly value="AVAILABLE FUND($)" className="form-control"></input>
                                                    <input type="text" name="_Available" id="Available_Balance" value={(parseFloat(this.state.recievedIncome)+parseFloat(this.state.fundSharingIncome)+parseFloat(this.state.levelIncome)+parseFloat(this.state.autoPoolIncome))} disabled className="form-control"></input>
                                                  
                                                    </div>
                                                    <div id="ERR_MSG"></div>
                                                    <div className="Send_Fund_body_Total">
                
                                                    <input type="text" readOnly value="TRANSFER FUND($)" className="form-control"></input>
                                                    <input type="text" readOnly name="_Send" value={parseFloat(this.state._recieved)+parseFloat(this.state._fund)+parseFloat(this.state._level)+parseFloat(this.state._autopool)} className="form-control"></input>
                
                
                                                    </div>
                
                                                    <div>*5% will be deducted while transferring to pin wallet</div>
                                                    <div className="Send_Fund_body_Total">
                
                                                    <input type="text" readOnly value="TOTAL($)" className="form-control"></input>
                                                    <input type="text" readOnly name="_Total" value={(parseFloat(this.state._recieved)+parseFloat(this.state._fund)+parseFloat(this.state._level)+parseFloat(this.state._autopool))-parseFloat((parseFloat(this.state._recieved)+parseFloat(this.state._fund)+parseFloat(this.state._level)+parseFloat(this.state._autopool))*0.05)} className="form-control"></input>
                
                
                                                    </div>
                                                    <div className="Send_Fund_body_Total">
                
                                                        <button type="submit" disabled={this.state.buttondisable || this.state.Loading } className="btn btn-success" >
                                                        {this.state.Loading ? (<div> <Loader type="ThreeDots" color="#FFF" height={15} width={15} /></div>) : "Transfer"}
                                                        </button>
                
                                                     </div>
                                                </div>
                                        </Grid>
                                    </form>
                                   </div>
                
                
                           </div>
                        </div>
                    
                </div>
          )
        

      
    }
}

export default SendFundToPinWallet;