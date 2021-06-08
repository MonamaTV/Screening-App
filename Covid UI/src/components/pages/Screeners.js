import React, { useState, useEffect } from 'react';
import Table from '../controls/Table';
import './Home.css';
import users from '../../assets/img/users.png';
import Button from '../controls/Button';
import InputSearch from '../controls/InputSearch';
import Modal from '../controls/Modal';
import axios from '../../api/axios';
import ScreenerModal from '../controls/ScreenerModal';
import DeleteModal from '../controls/DeleteModal'
import RowScreeners from '../controls/RowScreeners';

const Screeners = () => {

    const headers = [
        { title: 'Name'},
        { title: 'Email'},
        { title: 'Active'},
        { title: 'Role'},
        { title: 'Actions'}
    ];
    //State variables
    const [screeners, setScreeners] = useState([]);
    // const [screener, setScreener] = useState(null);
    const [modal, setModal] = useState(false);
    //
    const [screenerID, setScreenerID] = useState('');

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    useEffect(() => {

        const fetchData = async () => {
            const { data } = await axios.get("/screeners");
            setScreeners(data);
        };
        fetchData();
    }, []);

    const cancel = () => setOpenDeleteModal(false);

    const deactivateScreener = async () => {

        if(screenerID === "" || screenerID.length < 13) return;

        const screener = {
            _id: screenerID,
            isActive: false,
        }

        const results = await axios.patch(`/screeners/${screenerID}`, screener);

        if (results.status === 200) {
            setScreeners(screeners.filter(screener => screener._id !== screenerID));
            setOpenDeleteModal(false);
        }
    };

    const getScreenerID = ID => {
        setScreenerID(ID);
        setOpenDeleteModal(true);
    }
 
    const openModal = () => {
        setModal(!modal);
    }

    return (
        <div className="components__container">
            <div className="components__head">
                <h1>    
                    <img src={users}  alt=""/>
                    Screeners
                </h1>
                <small style={{marginLeft: '30px'}}>List of all screeners</small>
            </div>
            <div className="data__container">
                <div className="search__add__container">
                    <Button 
                        handleOnPress={openModal}
                        title={"Add Screener"} 
                    />
                    <InputSearch />
                </div>
                <div className="table__data__container">
                    <Table headers={headers}>
                        <RowScreeners rows={screeners} setOpenDeleteModal={getScreenerID}/>
                    </Table>
                </div>
            </div>
            {
                modal &&
                <Modal>
                    <ScreenerModal setModal={setModal} setScreeners={setScreeners} screeners={screeners}/>
                </Modal>
            }
            {  
                openDeleteModal && 
                <Modal >
                    <DeleteModal cancel={cancel} deleteInfo={deactivateScreener} content="Are you sure you want to delete this item"/>
                </Modal>
            }
        </div>
    )
}

export default Screeners;
