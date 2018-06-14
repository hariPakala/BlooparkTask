import React, { Component } from 'react';
import CheckoutApp from './Checkout.js';

class App extends Component {
  constructor(props)
{
  super(props);
    this.state = {
      showloginForm: false,
      };
  };


  render() {
    return (
      <div className ="ss">
       <div className="Header">
            <CheckoutApp  parentMethod={this.ath} />
        </div>

      </div>
    );
  }
}

export default App;
