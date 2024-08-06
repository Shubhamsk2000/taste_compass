import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaRegBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SuprSendInbox from '@suprsend/react-inbox'
import 'react-toastify/dist/ReactToastify.css'
function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input);
    };

    return (
        <Navbar>
            <Logo to={'/'}>Taste Compass</Logo>
            <FormStyle onSubmit={submitHandler}>
                <div>
                    <FaSearch />
                    <input onChange={(e) => setInput(e.target.value)} type="text" value={input} />
                </div>
            </FormStyle>
            <NotificationIcon>
                <SuprSendInbox
                    workspaceKey="loTm8V73mn3TyPQgfPUM"
                    subscriberId="JftI8NL-bmpW9Bxsb4R4RzYZN_gjjvLz-lngN_og2lE"
                    distinctId="hp15series@gmail.com"
                />
            </NotificationIcon>
        </Navbar>
    );
}

const Navbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #333;
    margin-top:5px;
    border-radius:20px
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
`;

const FormStyle = styled.form`
    flex: 1;
    display: flex;
    justify-content: center;
    
    div {
        position: relative;
        width: 100%;
        max-width: 600px;
    }

    input {
        border: none;
        background-color:white;
        font-size: 1.5rem;
        padding: 1rem 3rem;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }

    svg {
        position: absolute;
        top: 50%;
        color:black;
        left: 0;
        transform: translate(100%, -50%);
    }
`;

const NotificationIcon = styled.div`
    font-size: 1.5rem;
    color: #fff;
    background-color:white;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
`;
export default Search;
