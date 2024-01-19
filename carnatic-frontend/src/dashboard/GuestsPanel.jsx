import React, { useContext, useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import MyContext from '../context/context';
import { useReactToPrint } from 'react-to-print';

const tableCustomStyles = {
    headCells: {
        style: {
            fontSize: '14px',
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

    const [loading, setLoading] = useState(false)
    const { proxy } = useContext(MyContext)
    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const pdfRef = useRef()

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
            width: "5%",
            cell: (row, index, column, id) => { return <>{index + 1}</> }

        },
        {
            name: 'Name',
            selector: row => row.name,

        },
        {
            name: 'Receipt No',
            selector: row => row.receipt,
            width: '5%'
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
            cell: row => <span>{row.email}</span>,
            width: '20%',
            style: {
                fontSize: '16px'
            }
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            width: '15%'
        },
        {
            name: 'Address',
            selector: row => row.address,
        },
        {
            name: 'Membership Request',
            selector: row => row.isContacted,
            cell: row => <span> {row.isContacted ? "Yes" : "No"} </span>,
            width: '5%'
        },
    ];

    const donwloadPDf2 = useReactToPrint({
        content: () => pdfRef.current,
        documentTitle: 'Database',
        onAfterPrint: () => console.log('Save pdf')
    })

    return (
        <div className="flex flex-col justify-evenly py-20 space-y-4 items-center">
            <div ref={pdfRef} className="containerr flex flex-col justify-evenly items-center space-y-8">

                <div className="text my-4 text-5xl font-medium">
                    Guest Members Table
                </div>

                {loading ? <>Loading...</> : <div className="table">
                    <DataTable
                        columns={columns}
                        data={data}
                        customStyles={tableCustomStyles}
                        pagination
                    />
                </div>}

            </div>
            <div onClick={donwloadPDf2} className="buttons  w-full items-end justify-end flex flex-row space-x-5">
                <div className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3">
                    Print / Download
                </div>

            </div>



        </div>
    );
};
