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
            <div className='components'>
                <AdminCreate></AdminCreate>
                <AdminDelete></AdminDelete>
                <AdminEdit></AdminEdit>
            </div>
            <a href="http://localhost:3000/" className="back-button"><ion-icon name="home"></ion-icon> Почетна страница</a>
        </div>
    )
}

export default Admin;