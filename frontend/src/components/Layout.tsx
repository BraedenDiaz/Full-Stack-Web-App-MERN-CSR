import React from "react";
import { Outlet } from "react-router-dom";

export default class Layout extends React.Component
{
    render() 
    {
        return (
            <div>
                <h1>This is a header.</h1>
                <hr />
                <Outlet />
            </div>
        );
    }
}