import React, { useCallback, useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Addmember from './Addmember';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import MyContext from '../context/context';
import { useNavigate } from 'react-router-dom';


const tableCustomStyles = {
    headCells: {
        style: {
            fontSize: '20px',
            fontWeight: 'bold',
            paddingLeft: '0 8px',
            justifyContent: 'center',
            border: '2px solid #b5c3ff',
        },
    },
    cells: {
        style: {
            fontSize: '17px',
            padding: '15px 10px',
            justifyContent: 'center',
            border: '2px solid #b5c3ff',
            margin: '0px',
        }
    },
    table: {
        style: {
            width: '99vw',

        }
    },
    rows: {
        style: {
            margin: 0
        }
    }

}

export default function MembersPanel() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [loading, setLoading] = useState(false)
    const { proxy } = useContext(MyContext)
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const getGuests = async () => {
        setLoading(true)
        const { data } = await axios.get(`${proxy}/dashboard/guests`)
        console.log(data)
        if (data.success) {
            setData(data.message)
            setLoading(false)
            console.log("got it all members")
        } else {
            setLoading(false)
            console.log(data.message)
        }
    }

    useEffect(() => {
        getGuests()
    }, [count])


    const columns = [
        {
            name: 'S.no',
            selector: row => row.serial,
            cell: (row, index, column, id) => { return <>{index + 1}</> }

        },
        {
            name: 'Name',
            selector: row => row.name,

        },
        {
            name: 'Receipt No',
            selector: row => row.receipt,
        },
        {
            name: 'Timestamp',
            selector: row => row.timestamp,

        },
        {
            name: 'UTR',
            selector: row => row.utr,
        },
        {
            name: 'Amount Donated',
            selector: row => row.amount,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
        },
        {
            name: 'Address',
            selector: row => row.address,
        },
        {
            name: 'Membership Request',
            selector: row => row.isContacted,
            cell: row => <span> {row.isContacted ? "Yes" : "No"} </span>
        },
    ];

    return (
        <div className="flex flex-col justify-evenly h-screen items-center">
            <div className="text my-4 text-5xl font-medium">
                Guest Members Table
            </div>

            {!loading && <div className="table">
                <DataTable
                    columns={columns}
                    data={data}
                    customStyles={tableCustomStyles}
                    pagination
                />
            </div>}

            <div className="buttons  w-full items-end justify-end flex flex-row space-x-5">
                <div className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3">
                    Print / Download
                </div>

            </div>



        </div>
    );
};
