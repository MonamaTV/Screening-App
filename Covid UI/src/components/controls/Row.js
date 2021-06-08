import React from 'react';
import deleteImg from '../../assets/img/delete.png';
import editImg from '../../assets/img/edit.png';

const Row = ({row, deleteClient, editClient, setOpenDeleteModal}) => {
    return (
        <tr>
            <td>{row?.screener}</td>
            <td>{row?.client}</td>
            <td>{'Yes'}</td>
            <td>{row?.addedAt.slice(0, 10)}</td>
            <td className="editImages">
                <button><img src={editImg} alt="edit icon" onClick={() => editClient(row?._id)}/></button>
                <button><img src={deleteImg} alt="delete icon" onClick={(e) => setOpenDeleteModal(row?._id)} /></button>
            </td>
        </tr>
    )
}
export default Row;
