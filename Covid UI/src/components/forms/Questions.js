import React from 'react'
import InputRadio from '../controls/InputRadio'


const Questions = ({moveNext, temperature, setTemperature, setModal, setSoreThroat, setFever, setCough, setLostTasteSmell, setShortnessBreath, setMusclePain}) => {
    

    return (
        <div className="modal__container">
            <form className="form__modal__container modal__animation">
                <h2>Covid Screening</h2>
                <p>Ask these questions to the visitor</p>
                <button type="button" className="close-modal" onClick={() => setModal(false)}>&times;</button>
                <br/>
                <div className="modal__input__group id">
                    <label htmlFor="ID">Temperature</label>
                        <input
                            value={temperature}
                            placeholder="Temp in degrees celcius"
                            onChange={setTemperature}
                            type="text" 
                        />
                </div>
                <div className="modal__input__group id">
                    <InputRadio title="1. Fever?" onSetValue={setFever} />
                </div>
                <div className="modal__input__group id">
                    <InputRadio title="2. Cough?" onSetValue={setCough}/>
                </div>
                <div className="modal__input__group id">
                    <InputRadio title="3. Shortness of breath?" onSetValue={setShortnessBreath}  />
                </div>
                <div className="modal__input__group id">
                    <InputRadio title="4. Sore Throat?" onSetValue={setSoreThroat}/>
                </div>
                <div className="modal__input__group id">
                    <InputRadio title="5. Muscle Pain?" onSetValue={setMusclePain}/>
                </div>
                <div className="modal__input__group id">
                    <InputRadio title="6. Lost taste or smell?" onSetValue={setLostTasteSmell}/>
                </div> 
                <div className="modal__input__group">
                    <button type="submit" onClick={moveNext}>Submit</button>
                </div> 
            </form>
        </div>
    )
}

export default Questions
