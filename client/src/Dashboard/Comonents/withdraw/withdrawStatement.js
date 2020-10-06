import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { MDBDataTable } from 'mdbreact';
import './withdraw.css';
import Axios from 'axios';

const classes = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(4),
      },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
   
  
  }));

  function Copyright() {
    return (
      <Typography variant="body2" color="white" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
 let data = {
    columns: [
      {
        label: 'Sno',
        field: 'Sno',
      },
      {
        label: 'User Id',
        field: 'userId',
      },
      {
        label: 'Level Amount',
        field: 'level',
      },
      {
        label: 'Autopool Amount',
        field: 'autopool',
      },
      {
        label: 'Fund sharing Amount',
        field: 'fund',
      },
      {
        label: 'Recieved Income',
        field: 'recieved',
      },
      {
        label: 'Amount($)',
        field: 'amount',
      },
      {
        label: 'Total',
        field: 'total',
      },
      {
        label: 'Status',
        field: 'status',
      }
    ],
    rows:[]
  };
 



class WithdrawStatement extends React.Component {

  constructor(){
    super();
    this.state={
      data1:{},
      Loading: false
    }
     
  }

 async componentDidMount(){

  this.setState({
    Loading: true
  })

  try{
          const userdata = JSON.parse(sessionStorage.getItem('USER_DETAILS'));
          const row = data.rows;
        
                  console.log(row);

          await  Axios.post('/api/Statement/withdrawStatementGet',{
              _id: userdata._id
            })
            .then(res => {

                        if(parseInt(res.data.status) === parseInt(1))
                        {

                                this.createTable(res.data.user);
                                console.log(data);
                        
                        }
                        else
                        {
                                  this.setState({
                                    Loading: false
                                  })
                        }

            }).catch(err => {

                    this.setState({
                      Loading: false
                    })

            })

    }
    catch(err)
    {
       console.log(" ");
       this.setState({
        Loading: false
      })
    }
  }

  createTable= (members)=> {
    console.log(members);
    let i = 0;
    data.rows = [];
      members.map(Direct => {
        console.log("in");
          i++
          const obj = {
            Sno: i,
            userId:Direct.userId,
            level: Direct.levelIncome.$numberDecimal,
            fund: Direct.fundsharingIncome.$numberDecimal,
            recieved: Direct.recievedIncome.$numberDecimal,
            autopool: Direct.autopoolIncome.$numberDecimal,
            amount: Direct.Amount.$numberDecimal,
            total: Direct.Total.$numberDecimal,
            status: Direct.Status
          }
  
           data.rows.push(obj)
 
          } )
          this.setState({data1:data , Loading: false})
  }
  
  // componentWillUnmount(){
  //   data.rows=[];
  // }

    render(){
      console.log("render");
        return(   <div style={{margin:"0px",padding:"2% 10%"}}>
          
        <div className="Send_Fund_Container">
                <div className="Send_Fund_header" >
                    Withdraw statemnet
                </div>
              
                <div className="Send_Fund_body">
                  {/* Recent Orders */}
                            <Grid item xs={12}>
                            <Paper className={classes.paper} elevate={3}>
                            <div style={{padding:"3%"}}>
                            <React.Fragment>
                    
                            {
                    this.state.Loading ? 
                    (
                      <div style={{
                        width:"100%",
                        display: "flex",
                        justifyContent:"center",
                        alignItems:"center",
                        padding: "2% 0%"
                      }}>
                          Loading....
                      </div>
                    )
                    :
                    <MDBDataTable
                    striped
                    bordered
                    sortable={false}
                    theadColor="#fff"
                    entries={7}
                    small
                    noBottomColumns
                    responsiveSm
                    responsiveMd
                    data={this.state.data1}
                    />
                  }
                                {/* <div className={classes.seeMore}>
                                
                                    <Link color="primary" href="#" >
                                    See more orders
                                    </Link>
                                </div> */}
                                </React.Fragment>
                            </div>
                            </Paper>
                            </Grid>
                        {/* </Grid> */}
                        
                </div>
        </div>
</div>)

    }
}

export default WithdrawStatement;