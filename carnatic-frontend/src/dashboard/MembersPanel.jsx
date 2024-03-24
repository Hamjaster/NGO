import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import DataTable from "react-data-table-component";
import Addmember from "./Addmember";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import MyContext from "../context/context";
import { useNavigate } from "react-router-dom";
import EditMember from "./EditMember";
import DashboardNavbar from "./DashboardNav";

const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "20px",
      fontWeight: "bold",
      paddingLeft: "0 8px",
      justifyContent: "center",
      border: "2px solid #b5c3ff",
    },
  },
  cells: {
    style: {
      fontSize: "17px",
      padding: "5px 10px",
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
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [member, setMember] = useState({});

  var handleMemberClick = (id, name) => {
    navigate(`/dashboard/membersDB/member?id=${id}&name=${name}`);
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = async (id) => {
    // const ids = selectedRows.map((item) => item.id);
    // console.log(ids);
    try {
      const { data } = await axios.delete(`${proxy}/dashboard/members`, {
        data: { ids: [id] },
      });
      console.log(data);
      if (data.success) {
        getMembers();
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMembers = async () => {
    setLoading(true);
    const { data } = await axios.get(`${proxy}/dashboard/members`);
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
    getMembers();
  }, [count]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => (
        <span
          className=""
          row={row}
          onClick={() => handleMemberClick(row.id, row.name)}
        >
          {row.name}
        </span>
      ),
    },
    {
      name: "PAN",
      cell: (row) => <span>{row.PAN}</span>,
      selector: (row) => row.PAN,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <span>{row.email}</span>,
      width: "25%",
    },
    {
      name: "Phone",
      cell: (row) => <span>{row.phone}</span>,
      selector: (row) => row.phone,
    },
    {
      name: "Address",
      cell: (row) => <span>{row.address}</span>,
      selector: (row) => row.address,
    },
    {
      name: "Donated",
      cell: (row) => <span>{row.donation}</span>,
      selector: (row) => row.donation,
    },
    {
      name: "Action",
      width: "20%",
      cell: (row) => {
        return (
          <div className="space-x-3 flex">
            <div
              onClick={() => {
                setMember(row);
                setEditModalOpen(true);
              }}
              className="bg-[#b5c3ff] cursor-pointer py-3 px-5 rounded-xl"
            >
              Edit
            </div>
            <div
              onClick={() => handleDelete(row.id)}
              className="bg-[#b5c3ff] cursor-pointer py-3 px-3 rounded-xl"
            >
              {row.deactivated ? "Activate" : "Deactivate"}
            </div>
          </div>
        );
      },
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DashboardNavbar />
      <div className="flex flex-col justify-evenly py-5 space-y-4 items-center">
        <div className="text my-4 text-4xl sm:text-5xl text-center font-medium">
          Carnatic Members Table
        </div>

        {loading ? (
          <>Loading...</>
        ) : (
          <div className="table">
            <DataTable
              columns={columns}
              data={data}
              customStyles={tableCustomStyles}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              pagination
            />
          </div>
        )}

        <div className="buttons  w-full items-end justify-end flex flex-row space-x-5">
          <div
            onClick={onOpen}
            className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3"
          >
            Add Member
          </div>
          {/* <div
            onClick={handleDelete}
            className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3"
          >
            Delete Member
          </div> */}
        </div>

        <Addmember
          setCount={setCount}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
        {editModalOpen && (
          <EditMember
            setCount={setCount}
            member={member}
            isOpen={editModalOpen}
            onOpen={() => setEditModalOpen(true)}
            onClose={() => setEditModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}
