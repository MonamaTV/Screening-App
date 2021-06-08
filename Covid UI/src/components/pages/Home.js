import React, { useEffect, useState } from 'react';
import Table from '../controls/Table';
import './Home.css';
import testingImg from '../../assets/img/covid.png';
import DatePicker from '../controls/DatePicker';
import Button from '../controls/Button';
import InputSearch from '../controls/InputSearch';
import axios from '../../api/axios';
import Modal from '../controls/Modal';
import ClientModal from '../controls/ClientModal';
import DeleteModal from '../controls/DeleteModal';
import RowScreenings from '../controls/RowScreenings';
import { useHistory } from 'react-router-dom';
import EditClientModal from '../controls/EditClientModal';


const Home = () => {
    const history = useHistory();

    //Default date values
    const defaultDateStart = '2020-12-31';
    const defaultDateEnd = '2100-12-12';

    const [modal, setModal] = useState(false);
    const [screenings, setScreenings] = useState([]);
    
    //pagination
    const [pageNumber, setPageNumber] = useState(1);

    //Go back or to the previous page
    const visitNextPage = () => setPageNumber(pageNumber + 1);

    const visitPrevPage = () => {
        if(pageNumber === 1) return;

        setPageNumber(pageNumber - 1);
    }
    
    //Searching values
    const [search, setSearch] = useState('');

    const [dateEnd, setDateEnd] = useState(null);
    const [dateStart, setDateStart] = useState(null);

    //Filter data by date
    const handleSetDateStart = (e) => setDateStart(e.target.value);

    const handleSetDateEnd = (e) => setDateEnd(e.target.value);
    
    const openModal = () => setModal(!modal);

    const [deleteScreening, setDeleteScreening] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    

    const [editModal, setEditModal] = useState(false);
    
    //Open the modal for confirmation and store the id of 'to-be' deleted screening
    const getScreeningID = (id) => {
        setDeleteScreening(id);
        setOpenDeleteModal(true);     
    };
    
    //Closes the delete modal
    const cancel = () => {
        setOpenDeleteModal(false)
        setEditModal(false);
    };
    
    //Opens a screen to edit the data... 
    const editClient = () => {
        setEditModal(true);
    };
    
    //Delete the screening data from the database and from the table
    const deleteScreeningData = async () => {
        setEditModal(false);
        const deleted = await axios.delete(`/screenings/${deleteScreening}`);
        //Status 200 means a successful operation
        if(deleted.status === 200) {
            setOpenDeleteModal(false);
            //Remove the element that has been deleted from the table
            setScreenings(screenings.filter(screening => screening._id !== deleteScreening));
        }
    }

    const searchClient = (e) => {
        if(e.key === "Enter") {
            fetchScreeningData(search);
            setSearch("");
        }
    }
    
    const fetchScreeningData = async (name = "") => {
            
        const { data } = await axios
        .get(`/screenings/${dateStart || defaultDateStart}/${dateEnd || defaultDateEnd}/?page=${pageNumber}&name=${name}`);
        setScreenings(data);
        return data;
    };

    //On load, populate the table with data from the database
    useEffect(() =>{
        fetchScreeningData();    
    }, [pageNumber, dateStart, dateEnd]);
    
    //Table head
    const headers = [
        { title: 'Screener' },
        { title: 'Client'},
        { title: 'High Risk'},
        { title: 'Date Visited'},
        { title: 'Actions'}
    ];


    return (
        <div className="components__container">
            <div className="components__head">
                <h1>    
                    <img src={testingImg}  alt=""/>
                    Screening Data
                </h1>
                <small style={{marginLeft: '30px'}}>List of all added screening data</small>
            </div>
            <div className="data__container">
                <div className="search__add__container">
                    <Button 
                        handleOnPress={openModal}
                        title="Add Client" 
                    />
                    <InputSearch value={search} setValue={setSearch} onPress={searchClient}/>
                    <DatePicker handleDateChange={handleSetDateStart} />
                    <DatePicker handleDateChange={handleSetDateEnd}/>
                </div>
                <div className="table__data__container">
                    <Table headers={headers}> 
                        <RowScreenings rows={screenings} setOpenDeleteModal={getScreeningID} editClient={editClient}/>
                    </Table>
                </div>
                <div className="pagination__container">
                    <button 
                        onClick={visitPrevPage}
                        className="pagination__control"> Prev
                    </button>

                    <button 
                        onClick={visitNextPage}
                        className="pagination__control">Next
                    </button>
                </div>
            </div>
            {
                modal && 
                <Modal>
                    <ClientModal setModal={setModal} setScreenigs={setScreenings} screenings={screenings}/> 
                </Modal>
            }
            {
                editModal && <Modal>
                    <DeleteModal 
                        cancel={cancel}
                        deleteInfo={cancel}
                        confirm="Okay"
                        content="Edit client info is not revelant. Best delete their data and add a new one"
                    />
                </Modal>    
            }
            {
                //Opens modal to confirm the deletion of the selected item
                openDeleteModal && 
                <Modal>
                    <DeleteModal 
                        cancel={cancel}
                        deleteInfo={deleteScreeningData}
                        content="Are you sure you want to delete this item?"
                    />
                </Modal>
            }
        </div>
    )
}
export default Home;
