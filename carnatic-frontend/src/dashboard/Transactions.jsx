import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useParams, useSearchParams } from 'react-router-dom'
import MyContext from '../context/context';
import { useReactToPrint } from 'react-to-print';
import DashboardNavbar from './DashboardNav';

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
            width: '90vw',

        }
    },
    rows: {
        style: {
            margin: 0
        }
    }

}

export default function Transactions() {

    const [queryParameters] = useSearchParams()
    let id = queryParameters.get("id")
    let name = queryParameters.get("name")
    const [data, setData] = useState([])
    const { proxy } = useContext(MyContext)
    const pdfRef = useRef()

    const columns = [
        {
            name: 'Receipt No',
            selector: row => row.receipt,
        },
        {
            name: 'UTR No',
            selector: row => row.txnid,
            cell: (r) => { return <>{r.txnid}</> }
        },
        {
            name: 'Timestamp',
            selector: row => row.timestamp,
            cell: row => <span>{row.timestamp}</span>,
            width: '35%'
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            cell: row => <span>{row.amount}</span>,
        },
        {
            name: 'Project',
            selector: row => row.project,
            cell: row => <span>{row.project}</span>,
        },

    ];

    const getTransactions = async () => {
        try {
            const { data } = await axios.get(`${proxy}/dashboard/members/transactions/${id}`)
            console.log(data)
            if (data.success) {
                setData(data.message)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    const donwloadPDf2 = useReactToPrint({
        content: () => pdfRef.current,
        documentTitle: 'Database',
        onAfterPrint: () => console.log('Save pdf')
    })


    return (
        <>
            <DashboardNavbar />
            <div>
                <div className="flex flex-col justify-evenly py-5 space-y-4 items-center">
                    <div ref={pdfRef} className="transactions flex flex-col justify-evenly items-center space-y-6">

                        <div className="text my-4 text-center text-3xl sm:text-5xl font-medium">
                            Transaction Details of {name}
                        </div>

                        <div className="table">
                            <DataTable
                                columns={columns}
                                data={data}
                                customStyles={tableCustomStyles}
                                pagination
                            />
                        </div>
                    </div>

                    <div className="buttons  w-full items-end justify-end flex flex-row space-x-5">
                        <div onClick={donwloadPDf2} className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3">
                            Print / Download Statement
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
