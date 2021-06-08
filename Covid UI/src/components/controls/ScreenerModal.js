import React, { useState } from 'react';
import './Modal.css';
import axios from '../../api/axios';
const ScreenerModal = ({setModal, setScreeners, screeners}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ID, setID] = useState('');
    const [userType, setUserType] = useState(0);

    const handleSubmitScreener = async (e) => {
        e.preventDefault();

        if(name === "") return;
         
        if(email === "" ) return;

        if(ID === "" || ID.length < 13) return;

        if(userType === 0) return;

        const screener = {
            _id: ID,
            name,
            email,
            userType
        };
        const results = await axios.post("/screeners/register", screener);
        const { data } = results;

        if(results.status === 200) {
            setScreeners([data, ...screeners]);
            setModal(false);
        }
    }
    return (
        <div className="modal__container modal__animation">
            <form className="form__modal__container">
                <h2>Add A New Screener</h2>
                <button type="button" className="close-modal" onClick={(e) => setModal(false)}>&times;</button>
                <br/>
                <div className="modal__input__group">
                    <input type="radio" onChange={() => setUserType(2)}/>Teacher
                    <br/>
                    <input type="radio" onChange={() => setUserType(1)} />Assistant
                </div>
                <div className="modal__input__group id">
                    <label htmlFor="ID">ID</label>
                    <input
                        name="ID"
                        onChange={e => setID(e.target.value)} 
                        type="text" 
                    />
                </div>
                <div className="modal__input__group">
                    <label htmlFor="Name">Fullname</label>
                    <input 
                        name="name"
                        onChange={e => setName(e.target.value)} 
                        type="text" />
                </div>
                <div className="modal__input__group">
                    <label htmlFor="Name">Email</label>
                    <input 
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        type="email" />
                </div>
                <div className="modal__input__group">
                    <button type="submit" onClick={handleSubmitScreener}>Add Screener</button>
                </div>
                
            </form>
        </div>
    )
}

export default ScreenerModal;
