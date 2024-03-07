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
import FiltersModal from "./FilterModal";
import { useDisclosure } from "@chakra-ui/react";

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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const pdfRef = useRef();

  const getDonations = async ({
    years,
    projects,
    startMonth,
    endMonth,
    donorType,
  }) => {
    setLoading(true);
    // Join the years and projects arrays into strings
    const yearsString = years && years.join(",");
    const projectsString = projects && projects.join(",");
    const donorTypeString = donorType && donorType.join(",");

    const { data } = await axios.get(
      `${proxy}/dashboard/donations?years=${yearsString}&donorType=${donorTypeString}&projects=${projectsString}&startMonth=${startMonth}&endMonth=${endMonth}`
    );
    console.log(data);

    setData(data);
    setLoading(false);
    console.log("got it ");
  };

  useEffect(() => {
    getDonations({ years: [], projects: [], startMonth: "", endMonth: "" });
  }, [count]);

  const columns = [
    {
      name: "Receipt no.",
      selector: (row) => row.receipt,
      width: "7%",
      cell: (r) => {
        return <>{r.receipt}</>;
      },
    },
    {
      name: "Name",
      cell: (r) => {
        return (
          <>
            {!(r.carnaticDonor && r.guestDonor)
              ? r.carnaticDonor?.name || r.guestDonor?.name
              : "No name"}
          </>
        );
      },
    },
    {
      name: "Project",
      cell: (r) => {
        return <>{r.project}</>;
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
      cell: (row) => (
        <span>{row.carnaticDonor?.email || row.guestDonor?.email}</span>
      ),

      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.phone,

      cell: (r) => {
        return <>{r.carnaticDonor?.phone || r.guestDonor?.phone}</>;
      },
    },
    {
      name: "Address",
      selector: (row) => row.address,
      cell: (r) => {
        return <>{r.carnaticDonor?.address || r.guestDonor?.address}</>;
      },
    },
    {
      name: "Membership/Guest",

      cell: (row) => <span> {!row.guestDonor ? "Member" : "Guest"} </span>,
    },
  ];

  const donwloadPDf2 = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "Database",
    onAfterPrint: () => console.log("Save pdf"),
  });

  const applyFilters = ({
    projects,
    years,
    startMonth,
    endMonth,
    donorType,
  }) => {
    getDonations({ projects, years, startMonth, endMonth, donorType });
  };

  const calculateTotalDonationAmount = (donations) => {
    let totalAmount = 0;

    donations.forEach((donation) => {
      totalAmount += donation.amount;
    });

    return totalAmount;
  };

  return (
    <div className="w-full" ref={pdfRef}>
      <DashboardNavbar />

      <div className="flex flex-col justify-evenly py-3 space-y-4 items-center">
        <div className="containerr flex flex-col justify-evenly items-center space-y-8">
          <div className="w-full flex items-center justify-between">
            <div className="text w-10/12 my-4 text-4xl sm:text-5xl text-center font-medium">
              Donation
            </div>
            <div className="bg-[#b5c3ff] w-1/4 text-center float-right cursor-pointer text-black px-4 py-2 rounded-3xl text-lg">
              Total Donation : {calculateTotalDonationAmount(data)}
            </div>
          </div>

          {loading ? (
            <>Loading...</>
          ) : (
            <div className="table">
              <DataTable
                columns={columns}
                data={data}
                customStyles={tableCustomStyles}
                pagination
              />
            </div>
          )}
        </div>
        <div className="buttons  w-11/12 mx-auto items-end justify-between flex flex-row space-x-5">
          <div
            onClick={onOpen}
            className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black rounded-xl px-10 py-3"
          >
            Filter
          </div>
          <div
            onClick={donwloadPDf2}
            className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3"
          >
            Print / Download
          </div>
        </div>
      </div>

      {isOpen && (
        <FiltersModal save={applyFilters} isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
}
