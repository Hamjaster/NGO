import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import MyContext from "../context/context";
import { useReactToPrint } from "react-to-print";
import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import DashboardNavbar from "./DashboardNav";

const tableCustomStyles = {
  headCells: {
    style: {
      // fontSize: "14px",
      fontWeight: "bold",
      // paddingLeft: "0 4px",
      justifyContent: "center",
      border: "2px solid #b5c3ff",
    },
  },
  cells: {
    style: {
      fontSize: "17px",
      // padding: '15px 10px',
      justifyContent: "center",
      border: "2px solid #b5c3ff",
      margin: "0px",
    },
  },
  table: {
    style: {
      width: "90vw",
    },
  },
  rows: {
    style: {
      margin: 0,
    },
  },
};

export default function MembersPanel() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [loading, setLoading] = useState(false);
  const { proxy } = useContext(MyContext);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const pdfRef = useRef();

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const getGuests = async () => {
    setLoading(true);
    const { data } = await axios.get(`${proxy}/dashboard/guests`);
    console.log(data);
    if (data.success) {
      setData(data.message);
      setLoading(false);
      console.log("got it all members");
    } else {
      setLoading(false);
      console.log(data.message);
    }
  };

  useEffect(() => {
    getGuests();
  }, [count]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  const columns = [
    {
      name: "Receipt no.",
      selector: (row) => row.receipt,
      cell: (r) => {
        return <>{r.receipt}</>;
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,

      cell: (r) => {
        return <>{r.name}</>;
      },
    },
    {
      name: "Timestamp",
      selector: (row) => row.timestamp,

      cell: (r) => {
        return <div className="">{r.timestamp}</div>;
      },
    },
    {
      name: "UTR",
      selector: (row) => row.txnid,
      cell: (r) => {
        return <>{r.txnid}</>;
      },
    },
    {
      name: "Amount Donated",
      selector: (row) => row.amount,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <span>{row.email}</span>,

      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.phone,

      cell: (r) => {
        return <>{r.phone}</>;
      },
    },
    {
      name: "Address",
      selector: (row) => row.address,
      cell: (r) => {
        return <>{r.address}</>;
      },
    },
    {
      name: "Membership Request",
      selector: (row) => row.isContacted,
      cell: (row) => <span> {row.isContacted ? "Yes" : "No"} </span>,
    },
  ];

  const donwloadPDf2 = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "Database",
    onAfterPrint: () => console.log("Save pdf"),
  });

  const handleDelete = async () => {
    const ids = selectedRows.map((item) => item.id);

    console.log(ids);
    try {
      const { data } = await axios.delete(`${proxy}/dashboard/guests`, {
        data: { ids: ids },
      });
      console.log(data);
      if (data.success) {
        getGuests();
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div>
      <DashboardNavbar />

      <center
        className="flex flex-col justify-evenly  space-y-4 items-center"
      >
        <div ref={pdfRef}  className="containerr flex flex-col justify-evenly items-center space-y-8">
          <div  className="text my-4 text-4xl sm:text-5xl text-center font-medium">
            Guests  
          </div>

          {loading ? (
            <>Loading...</>
          ) : (
            <div className="w-[100vw] overflow-x-auto">
              <DataTable
              
                columns={columns}
                data={data}
                customStyles={tableCustomStyles}
                selectableRows
                className="table py-5"
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                pagination
              />
            </div>
          )}
        </div>
        <div  className="buttons  w-full items-end justify-end flex flex-row space-x-5">
          <div
            onClick={donwloadPDf2}
            className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3"
          >
            Print / Download
          </div>
          <div
            onClick={handleDelete}
            className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3"
          >
            Delete
          </div>
        </div>
      </center>
    </div>
  );
}
