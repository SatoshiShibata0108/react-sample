import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = { items: [] };
        this.reloadItemApi = this.reloadItemApi.bind(this);
    }

    reloadItemApi(e) {
        fetch('http://localhost:8080/api/items', {
            method: 'GET',
        }).then(res => {
            if(res.ok) {
                return res.json();
            } else {
                console.log('error!');
            }
        }).then(json => {
            const items = json.map(r => {
                return {
                    id: r.id,
                    name: r.name,
                    price: r.price
                };
            });
            this.setState({ items: items });
        });
    }

    componentWillMount() {
        this.reloadItemApi();
        setInterval(this.reloadItemApi, '5000');
    }

    render() {
            return (
                <div>
                    <h1>アイテム管理</h1>
                    <ItemList items={ this.state.items } />
                </div>
            );
        }
}

class ItemList extends Component {
    render() {
        const itemsMap = this.props.items.map(c => {
            return <Item { ...c } key={ c.id } />;
        });

        return (
            <table>
                <thead>
                    <tr><th>ID</th><th>アイテム名</th><th>値段</th></tr>
                </thead>
                <tbody>{ itemsMap }</tbody>
            </table>
        );
    }
}

function Item (props)　{
    return (
        <tr>
            <td>{ props.id }</td>
            <td>{ props.name }</td>
            <td>{ props.price }</td>
        </tr>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

export default App;
