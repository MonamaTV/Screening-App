import React from 'react'

const AddressForm = ({moveNext, setModal, setStreetAddress, setTown, setPostalCode}) => {
    return (
        <div className="modal__container">
            <form className="form__modal__container modal__animation">
                <h2>Add A New Client</h2>
                <small>Address Information</small>
                <button type="button"  className="close-modal" onClick={() =>setModal(false)}>&times;</button>
                <br/>
                <div className="modal__input__group id">
                    <label htmlFor="Street Address">Street Address</label>
                    <input
                        onChange={e => setStreetAddress(e.target.value)}
                        type="text" 
                    />
                </div>
                <div className="modal__input__group">
                    <label htmlFor="Town">Town</label>
                    <input 
                        onChange={e => setTown(e.target.value)}
                        name="town"
                        type="text" />
                </div>
                <div className="modal__input__group">
                    <label htmlFor="code">Postal Code</label>
                    <input 
                        onChange={e => setPostalCode(e.target.value)}
                        name="postalCode"
                        type="text" />
                </div>
                <div className="modal__input__group">
                    <input type="checkbox" value="true"  /><small>Copy to Address B</small>
                </div>
                <div className="modal__input__group">
                    <button type="submit" onClick={moveNext}>Next</button>
                </div> 
            </form>
        </div>
    )
}

export default AddressForm
