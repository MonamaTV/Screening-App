import React from 'react';

const ClientForm = ({heading = "Add A New Client", moveNext, setModal, setName, setSurname, setSex, setAge, setCellphone}) => {
    return (
        <div className="modal__container">
            <form className="form__modal__container modal__animation" >
                <h2>{ heading }</h2>
                <small>Personal Information</small>
                <button type="button" className="close-modal" onClick={() => setModal(false)} >&times;</button>
                <br/>
                <div className="modal__input__group id">
                    <label htmlFor="ID">Name</label>
                    <input
                        onChange={e => setName(e.target.value)}
                        type="text" 
                    />
                </div>
                <div className="modal__input__group">
                    <label htmlFor="Name">Surname</label>
                    <input 
                        onChange={e => setSurname(e.target.value)} 
                        type="text" />
                </div>
                <div className="modal__input__group">
                    <label htmlFor="Age">Age</label>
                    <input 
                        onChange={e => setAge(e.target.value)}
                        type="text" />
                </div>
                <div className="modal__input__group">
                    <input 
                        value="1"
                        type="radio"
                        onChange={() => setSex(1)} 
                            />Male
                    <input 
                        value="2"
                        type="radio" 
                        onChange={() => setSex(2)}
                        />Female
                    <input 
                        value="3"
                        type="radio"
                        onChange={() => setSex(3)} 
                        />Other
                </div>
                <div className="modal__input__group">
                    <label htmlFor="Name">Cellphone</label>
                    <input 
                        onChange={e => setCellphone(e.target.value)}
                        type="text" />
                </div>
                <div className="modal__input__group">
                    <button type="submit" onClick={moveNext}>Next</button>
                </div> 
            </form>
        </div>
    )
}

export default ClientForm;
