import React from 'react'
import './Table.css';

const Table = ({headers, children, editClient, setOpenDeleteModal}) => {
    
    return (
        <table>
            <thead>
                <tr>
                    { headers.map((header, index) => <th key={index}>{header.title}</th>)}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
export default Table;
