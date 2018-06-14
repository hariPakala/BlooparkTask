import React from 'react';
import io from "socket.io-client";
import blogo from '../img/blogo.png';
import '../css/checkoutframe.css';


class CheckoutApp extends React.Component {
  constructor(props)
 {
   super(props);
   this.loginSubmit = this.loginSubmit.bind(this);
   this.handleAutherization = this.handleAutherization.bind(this);

   this.customername = this.customername.bind(this);
   this.customernumber = this.customernumber.bind(this);
   this.customecity = this.customecity.bind(this);
   this.customerzipcode = this.customerzipcode.bind(this);
   this.socket = io('localhost:8080');
    this.state = {
     showloginForm: false,
     showstatusMs: false,
     uval : '',
     upwd : ''
     };
     this.socket.on('RECEIVE_MESSAGE', function(data){
         if (data === "1"){
           window.confirm('Data Submitted');
         }

         else if (data == "2") {
                window.confirm('Zip Code and City are not matching');
         }

         else if (data == "3") {

              window.confirm('Zip code is not found');
         }

     });

 };

 customername(val)
 {
   this.setState({
     cname : val
   });
 }
 customernumber(val)
 {
   this.setState({
     cnum : val
   });
 }

 customecity(val)
 {
   this.setState({
     ccity : val
   });
 }
 customerzipcode(val)
 {
   this.setState({
     czip : val
   });
 }


 handleAutherization(name,number,city,zipcode){

   this.socket.emit('SEND_MESSAGE', {
     cname : name,
     cnumber :number,
     ccity : city,
     czipcode : zipcode
 });

  }


 loginSubmit(event)
 {
   event.preventDefault();
   var self = this;
   self.handleAutherization(this.state.cname,this.state.cnum, this.state.ccity,this.state.czip);
   if(localStorage.getItem('status') === 'Zip Code and City are not matching')
   {
       this.setState(
         {
           showstatusMs: true
         }
       );
   }
   else if (localStorage.getItem('status') === 'Zip code is not found')
   {
       this.setState(
         {
           showstatusMs: true
         }
       );
   }
 }
  render() {
    return <div className='login'>
              <div className="logo">
                  <div className = "logoImg" >
                    <img src={blogo} />
                      <span align = "center"> Bloopark </span>
                  </div>
              </div>
              <form onSubmit= { this.loginSubmit }>
              <Input type='text' name='customername' placeholder='customername'
              onInText={this.customername} />
              <Input type='text' name='customernumber' placeholder='customernumber'
              onInText={this.customernumber}/>
              <Input type='text' name='customecity' placeholder='customecity'
              onInText={this.customecity} />
              <Input type='text' name='customerzipcode' placeholder='customerzipcode'
              onInText={this.customerzipcode}/>
                <button className="Submit" > Submit</button>
                <br />
                {
                      this.state.showstatusMs  ?
                          <label htmlFor= "ss">{localStorage.getItem('status')}</label> :
                          null
                }

              </form>
              </div>
  }
}

// Generic input field
class Input extends React.Component {

    constructor(props)
      {
        super(props);
        this.textChange = this.textChange.bind(this);
        this.state = {
          inText: '',
          };
      }

    textChange(event){
        this.setState({
               inText: event.target.value}
             , () => {
        this.props.onInText(this.state.inText)
      });
      }


  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autoComplete='off'
                onChange={this.textChange.bind(this)}
                value={this.state.inText}/>
              <label htmlFor={ this.props.name } ></label>
           </div>
         }
       }

export default CheckoutApp;
