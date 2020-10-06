import React from 'react';
import './pinwallet.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Loader from 'react-loader-spinner';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class Activate extends React.Component{


    constructor(){
              super();
              this.userdata = JSON.parse(sessionStorage.getItem('USER_DETAILS'));
              this.state={
                memberName:"",
                _id: this.userdata._id,
                Active: this.userdata.Active.toLowerCase() === "true" ? true : false,
                pins: this.userdata.availablePins,
                pinslength: this.userdata.availablePins.length > 0?false:true,
                memberId:"",
                memberUserId:"",
                disablebutton:true,
                disableCanclebutton:true,
                diasablememberfield: false,
                Loading: false,
                Loading_id : false,
                Err_message: "something",
                open: false,
              }
              console.log(this.userdata.availablePins.length);
    }

    handleMemberId = async (e) => {
      e.preventDefault();
      console.log("in in in ini in i ni nin i ni");
      this.setState({
        Loading_id : true
      })

      try{

                 const id= e.target._memberID.value.toUpperCase();

                if(id === this.userdata.userId){
                  
                   console.log("idididid",this.state.Active);

                    if(this.state.Active){
                      console.log("active active active");
                            // document.getElementById('Update_Msg').innerHTML = "Account is Already Active!"
                             this.setState({Loading_id: false,
                               Err_message: "Account is Already Active!",
                             open: true,})
                    }
                    else
                    {
                              console.log("active");
                              this.setState({
                                  memberName: "Self",
                                  memberId: this.state._id,
                                  disableCanclebutton:false,
                                  diasablememberfield: true,
                                  disablebutton:false,
                                  Loading_id: false
                              })
                              console.log(this.state.pinslength,this.state.disablebutton,this.state.pins);

                     }

                  
                }
                else
                {
                    await axios.get(`/api/users/sendFund/${id}` )
                    .then(res => {
                        if(parseInt(res.data.status) === parseInt(1)){
                          
                                      if(res.data.user.Active.toString() === "false"){

                                                    console.log(res.data.user);
                                                    this.setState({
                                                                memberName : res.data.user.firstName+""+res.data.user.lastName,
                                                                memberId: res.data.user._id,
                                                                memberUserId: res.data.user.userId,
                                                                disablebutton:false,
                                                                disableCanclebutton:false,
                                                                diasablememberfield: true,
                                                                Loading_id: false,
                                                                Err_message: "Enter Pin",
                                                                open: true,
                                                                
                                                    })
                                                    console.log(this.state.pinslength,this.state.disablebutton,this.state.pins,);
                                          //          document.getElementById('Update_Msg').innerHTML = "Enter Pin"

                                      }
                                      else
                                      {
                                                 //   document.getElementById('Update_Msg').innerHTML = "User is Active "
                                                    this.setState({ Loading_id : false,
                                                      Err_message: "User is Active ",
                                                      open: true,
                                                     })
                                      }

                        }else{

                        //    document.getElementById('Update_Msg').innerHTML = "invalid user id"
                            this.setState({ Loading_id : false,
                              Err_message:"invalid user id",
                              open: true,
                             })
                        }
                    }).catch(err => {
                            this.setState({ Loading_id : false})
                    })
                }
        }
        catch(err)
        {
           
                    this.setState({
                      Loading_id : false
                    })
                
           
        }
      
  }

  handleClose = () =>{
    this.setState({
      open: false
    })
  }

  handleSubmit = async () => {

    this.setState({
      Loading : true
    })

    // const memberID = document.getElementById('Member_Id').value
    // console.log(memberID);
    // if(this.state.memberUserId !== document.getElementById('Member_Id').value){
      
    //      console.log(this.state.memberUserId,memberID);
    //      document.getElementById('Err_Msg').innerHTML = "Member Id changed"

    // }
    // else{

    try{

                  axios.post('/api/users/Activate_account',{
                    pin: document.getElementById('Select_Pin').value ,
                    shouldActivateUserId: this.state.memberId,
                    ActivatingId : this.state._id
                  })
                  .then(res => {
console.log(res.data);
                                  if(parseInt(res.data.status) === parseInt(1)){
                                    
                                            sessionStorage.setItem('USER_DETAILS',JSON.stringify(res.data.user1))
                                            this.setState({
                                              memberId:"",
                                              memberName:"",
                                              pins: res.data.user1.availablePins,
                                              pinslength: res.data.user1.availablePins.length > 0?false:true,
                                              memberUserId:"",
                                              disablebutton:true,
                                              disableCanclebutton:true,
                                              diasablememberfield: false,
                                              Loading:  false,
                                              Err_message: "Account Activated",
                                              open: true,

                                            })
                                            console.log(this.state.pinslength,this.state.disablebutton,this.state.pins,);
                                            
                                  }
                                  else
                                  {
                                    console.log("else part is going");
                                              this.setState({
                                                Loading : false,
                                                Err_message: "Error ! something Went Wrong",
                                                open: true,
                                              })
                                  }

                  }).catch(err => {
                    
                              this.setState({
                                  Loading : false
                                })

                  })
      }
      catch(err)
      {
                    this.setState({
                      Loading : false
                    })
      }
    //}

  }

  handleCancel = () => {
      document.getElementById('Member_Id').value = "";
    this.setState({

      disablebutton:true,
      disableCanclebutton:true,
      diasablememberfield:false,
      memberName:"",
    })
  }

  testFuncction =()=> {

      axios.post('/api/users/test')

  }


render(){

  if(this.state.Active){
  return(
          <div style={{margin:"0px",padding:"2% 10%",textTransform:"uppercase"}}>
              <div className="Send_Fund_Container">

                  <div className="Send_Fund_header" >
                      Activate Account
                  </div>
                  {/*   <button onClick={()=> this.testFuncction()} className="btn btn-primary"> test </button>  */}

                    <div className="Send_Fund_body">

                      {/* error msg */}
                      <div id="Update_Msg"  style={{color:"black",display:"block",borderRadius:"3px",backgroundColor:"white",padding:"5px"}}>
                        
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
                  
                      <Grid  container xs={12} >
                      <p style={{fontSize:"10px"}}>*Beware of spaces while entering 
                                              member id</p>
                      <div style={{display:"flex",justifyContent:"space-around",width:"100%"}} > 
                      
                      <form className="Send_Fund_body_ID" onSubmit={(e) => this.handleMemberId(e)}> 
                     
                                   
                                        <Grid item xs={12} sm={6} >
                                         
                                          <p> Member Id : </p>
                                          <input required name="_memberID" disabled={this.state.diasablememberfield} id="Member_Id" type="text" className="form-control"></input>
                                        
                                          </Grid>
                                          <Grid item xs={12} sm={6} >
                                        
                                          <p> Member details :</p>
                                          <input id="Member_Name" type="text" disabled value={this.state.memberName} className="form-control"></input>
                                         
                                          </Grid>
                             
                                          <Grid item xs={12} justify="left" sm={6} >
                                          <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap",padding:"10px"}}>

                                                  <button
                                                  type="submit"
                                                  disabled={!this.state.disableCanclebutton}
                                                  className="btn btn-sm"
                                                  >
                                                      {this.state.Loading_id ? (<div> <Loader type="ThreeDots" color="#FFF" height={30} width={30} /></div>) : "confirm id"}  
                                                  </button>
                                                  <button
                                                  onClick={() => this.handleCancel()}
                                                  disabled={this.state.disableCanclebutton}
                                                  className="btn btn-sm"
                                                  >
                                                    Change id
                                                  </button>
                                           </div>       
                                          </Grid>
                           
                        
 
                      </form>  
                      </div>     
                                        <Grid item xs={12}  >
                                          <p> Enter Pin:</p>
                                              {/* <input type="text"  value="jdvsn" className="form-control"></input> */}
                                              <select id="Select_Pin" className="form-control">
                                                    
                                                      {this.state.pins && this.state.pins.map(pin => 
                                                        <option value={pin}>{pin}</option>
                                                      )}
                                              </select>
                                          </Grid>

                        </Grid>
                        {/* member submit */}

                  
                                  <div style={{padding:"20px 0px"}}>
                                  <Divider/>
                                  </div>


                                  <div className="Send_Fund_body_Total">
                                      <div id="Err_Msg"></div>
                                        <button 
                                        type="button" 
                                        disabled={this.state.disablebutton || this.state.pinslength || this.state.Loading} 
                                        className="btn btn-success" 
                                        onClick={() => this.handleSubmit()}
                                        >
                                          {this.state.Loading ? (<div> <Loader type="ThreeDots" color="#FFF" height={30} width={30} /></div>) : "Activate id"}  
                                        </button>
                                  </div>
                  
                          </div>


            </div>
          </div>
  
  )}
  else
  {
       return(

                <div style={{ width: "100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                padding:"5%",
                color:"black",
                backgroundColor:"#006B94",
                textTransform:"uppercase"}}>

                        Please Activate Your Account
                    
                </div>

       )
  }
}
}