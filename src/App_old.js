import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipcode: '',
            address: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({zipcode: e.target.value});
    }

    handleSubmit(e) {
        fetch(`https://api.zipaddress.net/?zipcode=${this.state.zipcode}`, {
            mode: 'cors'
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({address: myJson.data.fullAddress});
            });
        e.preventDefault();
    }

     render() {
       return (
       <React.Fragment>
         <form onSubmit={this.handleSubmit}>
           <p className="App-intro">
             <input type="text" value={this.state.zipcode} onChange={this.handleChange}/>
             <input type="submit" value="検索"/>
           </p>
          </form>
         <p>{this.state.address}</p>
       </React.Fragment>
       );
     }
}

export default App;