import React, { useState }from 'react';
// import Table from './controls/Table';
import './Home.css';

import clientsImg from '../../assets/img/client.png';

// import Button from './controls/Button';
import InputSearch from '../controls/InputSearch';
// import Modal from './controls/Modal';

const Clients = () => {

    const names = ["Vincent", "Monama", "Tadima", "Thandy", "Monada", "Paballo", "Pablo"];

    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState("");
    const list = [];

    const autoFill = (suggestion) => {
        setValue(names.find(s => s === suggestion));
        setSuggestions([])
    }

    const autoComplete = (val) => {
        setValue(val);
        setSuggestions([]);

        names.forEach((name, index) => {
            if(val.length >= 1 && name.substr(0, val.length).toUpperCase() ===  val.toUpperCase()) {
                list.push(names[index]);
            }
        });

        setSuggestions([...list]);
    };




    return (
        <div className="components__container">
            <div className="components__head">
                <h1>    
                    <img src={clientsImg}  alt=""/>
                    Clients
                </h1>
                <small style={{marginLeft: '30px'}}>List of all clients</small>
            </div>
            <div className="data__container">
                <div className="search__add__container">
                    <InputSearch value={value} setValue={autoComplete} />
                    {
                        suggestions.map((suggestion, index) => {
                            return  <p onClick={() => autoFill(suggestion)} key={index}>{suggestion}</p>
                        })
                    }
            
                </div>
                <div className="table__data__container">
                   <h2>Component not implemented because it simply fetches data and displays it</h2>
                </div>
            </div>
            
        </div>
    )
}

export default Clients;
