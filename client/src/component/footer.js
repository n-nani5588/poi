import React from 'react';
import './footer.css';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
export default function DenseAppBar() {
    return (
      <div>
           <Divider />
         <footer className="footer" >
           
            <Grid container xs={12} spacing={2}>
                    <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
                          <Grid conatiner item xs={12} sm={7}>
                                     <Grid item xs={12} >
                                    <div style={{margin:" 0px 0px 20px 0px",
                                                  fontSize:"20px",
                                                  fontWeight:"bold"}}>
                                      ABOUT US
                                    </div>
                                </Grid>
                                     <Grid item>
                                        <div style={{
                                                      fontSize:"15px",
                                                      fontWeight:"normal"}}>
                                         <p>
                                          GENIE TREASURES is a best experienced people's
                                          community where we build social platform and provides
                                          best opportunity to you and your career,
                                        </p>
                                        </div>
                                </Grid>
                                     <Grid item xs={0} sm={8}>
                                  <div style={{padding:"4%"}}>

                                  </div>

                                </Grid>
                               
                          </Grid>
                          <Grid conatiner item xs={12} sm={3}>
                                     <Grid item>
                                          <div style={{display:"flex",
                                                      flexDirection:"column",
                                                      alignContent:"space-around",  
                                                 
                                                      width:"100%",
                                                      
                                                        }}>
                                                  <span style={{fontSize:"20px",
                                                                fontWeight:"bold",
                                                                marginBottom:"3%"}}> Support</span> 

                                                  <span >Email : Facebook@Gmail.com</span>

                                                  <span>	<div className="d-flex justify-content-start social_icon">
                                                              <span><i className="fa fa-facebook-square"></i></span>
                                                              <span><i className="fa fa-google-plus-square"></i></span>
                                                              <span><i className="fa fa-twitter-square"></i></span>
                                                              <span><i className="fa fa-instagram"></i></span>
                                                          </div>
                                                  </span>
                                          </div>
                                          
                                     </Grid> 
                          </Grid>
                          
                    </div>
              
            </Grid>
           <Grid>
             <div style={{padding:"0% 4%"}}>
                    <small class="f6 db ">Copyright © 2016 <b class="ttu">SOME COMPANY Inc</b>., All Rights Reserved</small>
              </div>
           </Grid>
       
         
        
              {/* <a class="link dim gray dib h2 w2 br-100 mr3 " href="#" title="">
                <svg data-icon="facebook" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
                  <title>facebook icon</title>
                  <path d="M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z"></path>
                </svg>
              </a>
              <a class="link dim gray dib h2 w2 br-100 mr3 " href="#" title="">
                <svg data-icon="twitter" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
                  <title>twitter icon</title>
                  <path d="M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4"></path>
                </svg>
              </a>
              <a class="link dim gray dib br-100 h2 w2 mr3 " href="#" title="">
                <svg data-icon="github" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
                  <title>github icon</title>
                  <path d="M0 18 C0 12 3 10 3 9 C2.5 7 2.5 4 3 3 C6 3 9 5 10 6 C12 5 14 5 16 5 C18 5 20 5 22 6 C23 5 26 3 29 3 C29.5 4 29.5 7 29 9 C29 10 32 12 32 18 C32 25 30 30 16 30 C2 30 0 25 0 18 M3 20 C3 24 4 28 16 28 C28 28 29 24 29 20 C29 16 28 14 16 14 C4 14 3 16 3 20 M8 21 A1.5 2.5 0 0 0 13 21 A1.5 2.5 0 0 0 8 21 M24 21 A1.5 2.5 0 0 0 19 21 A1.5 2.5 0 0 0 24 21 z"></path>
                </svg>
              </a>
              <a class="link dim gray dib br-100 h2 w2 mr3 " href="#" title="">
                <svg data-icon="dribbble" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
                  <title>dribbble icon</title>
                  <path d="M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M5 11.5 A12 12 0 0 1 11 5 A46 46 0 0 1 13.5 9.25 A46 46 0 0 1 5 11.5 M15 4 A12 12 0 0 1 21.5 5.25 A46 46 0 0 1 17 7.75 A50 50 0 0 0 15 4 M4 16 A50 50 0 0 0 15 13 A46 46 0 0 1 16 15.5 A26 26 0 0 0 6 22.5 A12 12 0 0 1 4 16 M18.5 11.5 A50 50 0 0 0 25 8 A12 12 0 0 1 28 13.75 A26 26 0 0 0 19.75 14.5 A50 50 0 0 0 18.5 11.5 M17 19.5 A46 46 0 0 1 18 28 A12 12 0 0 1 8.75 25.5 A22 22 0 0 1 17 19.5 M20.75 18.25 A22 22 0 0 1 28 17.75 A12 12 0 0 1 22 26.5 A50 50 0 0 0 20.75 18.25"></path>
                </svg>
              </a>
              <div class="mt4">
                <a href="#" class="f6 link dim gray dib mr3 mr4-ns">Help</a>
                <a href="#" class="f6 link dim gray dib mr3 mr4-ns">Send feedback</a>
                <a href="#" class="f6 link dim gray dib mr3 mr4-ns">Privacy</a>
                <a href="#" class="f6 link dim gray dib">Terms</a>
              </div> */}
        </footer>
      </div>
    );
  }
  


