import React, { useState } from 'react';

import {questionsValidator, 
        clientValidator, 
        addressValidator } from '../../models/Client';
import ClientForm from '../forms/ClientForm';
import AddressForm from '../forms/AddressForm';
import Questions from '../forms/Questions';
import axios from '../../api/axios';


const ClientModal = ({setModal, setScreenigs, screenings}) => {

    const moveNext = (e) => {
        e.preventDefault();
        
        //It verifies the client info
        if(step === 1) {
            
            const error = clientValidator({
                name, 
                surname, 
                age,
                sex,
                cellphone
            });
            
            if(error != null) 
                return;
            setStep(step + 1);
        }
        if(step === 2) {
            
            const error = addressValidator({
                streetAddress,
                town,
                postalCode
            });
            
            if(error != null) 
                return;
            setStep(step + 1);
        }

        if(step === 3) {
            
            const error = questionsValidator({
                fever,
                cough,
                lostTasteSmell,
                musclePain,
                soreThroat,
                shortnessBreath
            });
            
            if(error != null) 
                return;
            setStep(step + 1);
            handleSubmit(e);
        }

    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(step !== 3) return;

        const client = {
            name,
            surname,
            sex,
            age,
            cellphone,
            address: {
                addressA: {
                    streetAddress,
                    town,
                    postalCode
                },
                addressB: {
                    streetAddress,
                    town,
                    postalCode
                }
            }
        }
        const questions = {
            fever,
            cough,
            soreThroat,
            musclePain,
            shortnessBreath,
            lostTasteSmell,
            temperature,
            questions: {
                attendedGathering: false,
                attendedHealthCare: false,
                interprovincialTravel: false,
                possibleCovidContact: false,

            }
        }

        const postClient = await axios.post("/clients", [client, questions]);
    
        const screening = postClient.data[1];

        setScreenigs([screening, ...screenings]);
    }

    //Personal Information
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [cellphone, setCellphone] = useState('');

    //Address Information
    const [streetAddress, setStreetAddress] = useState('');
    const [town, setTown] = useState('');
    const [postalCode, setPostalCode] = useState('');

    //Screening
    const [fever, setFever] = useState('');
    const [cough, setCough] = useState('');
    const [shortnessBreath, setShortnessBreath] = useState('');
    const [soreThroat, setSoreThroat] = useState('');
    const [musclePain, setMusclePain] = useState('');
    const [lostTasteSmell, setLostTasteSmell] = useState('');
    const [temperature, setTemperature] = useState(null);

    const onChangeTemperature = (e) => {
        setTemperature(e.target.value);
    }

    const [step, setStep] = useState(1);

    

    switch (step) {
        case 1: 
            return (
                <ClientForm 
                    moveNext={moveNext} 
                    setModal={setModal}
                    setName={setName}
                    setSurname={setSurname}
                    setCellphone={setCellphone}
                    setAge={setAge}
                    setSex={setSex} />
            )
        case 2: 
            return (
                <AddressForm 
                    moveNext={moveNext} 
                    setModal={setModal}
                    setStreetAddress={setStreetAddress}
                    setTown={setTown}
                    setPostalCode={setPostalCode} />
            )
        case 3: 
            return (
                <Questions
                    moveNext={moveNext} 
                    setModal={setModal}
                    temperature={temperature}
                    setSoreThroat={setSoreThroat}
                    setFever={setFever}
                    setTemperature={onChangeTemperature}
                    setCough={setCough}
                    setLostTasteSmell={setLostTasteSmell}
                    setMusclePain={setMusclePain}
                    setShortnessBreath={setShortnessBreath} />
            )
        default: 
            return (
                <div className="modal__container modal__animation">
                    <div className="form__modal__container">
                        <h2>Report</h2>
                        <button type="button"  onClick={() => setModal(false)} className="close-modal">&times;</button>
                         <h4>{""}</h4>
                        <p  onClick={() => setModal(false)}>CLOSE</p>
                    </div>
                </div>
            )  
    }
}

export default ClientModal;
