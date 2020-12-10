import React from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
    return (
        <div>
            <h1>Index Page</h1>
            <Link to="/map"><button>Enter</button></Link>
        </div>
    )
}