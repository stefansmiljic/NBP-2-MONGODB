import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Admin.css'
import $ from 'jquery';
import AdminCreate from './AdminCreate';
import AdminDelete from './AdminDelete';
import AdminEdit from './AdminEdit';

function Admin(){
    return (
        <div className='main'>
            <AdminCreate></AdminCreate>
            <AdminDelete></AdminDelete>
            <AdminEdit></AdminEdit>
        </div>
    )
}

export default Admin;