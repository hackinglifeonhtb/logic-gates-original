import React, {useState, useEffect} from 'react';

import {Link, useParams} from 'react-router-dom';

import Header from './Header'

export default function NotFound() {
    return (
        <>
            <Header />
            <div>
                <h1>404 Error</h1>
                <h4>نعتذر هذه الصفحة غير موجودة او غير متاحة حاليا</h4>
            </div>
        </>
    )
}