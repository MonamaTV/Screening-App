import React from 'react';
import deleteImg from '../../assets/img/delete.png';
import editImg from '../../assets/img/edit.png';

const RowScreeners = ({rows, editClient, setOpenDeleteModal}) => {
    return (
        rows.map((row, index) => (
            <tr key={index}>
                <td>{row?.name}</td>
                <td>{row?.email}</td>
                <td>{row?.isActive === true? 'Yes' : 'No'}</td>
                <td>{row?.userType === 1 ? 'Assistant' : 'Teacher'}</td>
                <td className="editImages">
                    <button><img src={editImg} alt="edit icon" onClick={() => editClient(row?._id)}/></button>
                    <button><img src={deleteImg} alt="delete icon" onClick={(e) => setOpenDeleteModal(row?._id)} /></button>
                </td>
            </tr>
        ))
    )
}

export default RowScreeners;
