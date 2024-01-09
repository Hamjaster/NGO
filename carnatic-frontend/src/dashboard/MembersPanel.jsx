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
      width: '90vw',

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


  var handleMemberClick = (id, name) => {
    navigate(`/dashboard/membersDB/member?id=${id}&name=${name}`)
  }

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = async () => {
    const ids = selectedRows.map(item => item.id)
    console.log(ids)
    try {
      const { data } = await axios.delete(`http://localhost:5000/dashboard/members`, {
        data: { ids: ids }
      })
      console.log(data);
      if (data.success) {
        getMembers()
        console.log(data.message)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMembers = async () => {
    setLoading(true)
    const { data } = await axios.get(`${proxy}/dashboard/members`)
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
    getMembers()
  }, [count])

  useEffect(() => {
    console.log(selectedRows)
  }, [selectedRows])

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      cell: row => <span className='whitespace-nowrap cursor-pointer overflow-hidden overflow-ellipsis w-full' row={row} onClick={() => handleMemberClick(row.id, row.name)}>{row.name}</span>
    },
    {
      name: 'PAN',
      selector: row => row.PAN,
    },
    {
      name: 'Email',
      selector: row => row.email,
      width: '25%'
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
      name: 'Donated',
      selector: row => row.donation,
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="flex flex-col justify-evenly h-screen items-center">
      <div className="text my-4 text-5xl font-medium">
        Carnatic Members Table
      </div>

      {!loading && <div className="table">
        <DataTable
          columns={columns}
          data={data}
          customStyles={tableCustomStyles}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          pagination
        />
      </div>}

      <div className="buttons  w-full items-end justify-end flex flex-row space-x-5">
        <div onClick={onOpen} className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3">
          Add Member
        </div>
        <div onClick={handleDelete} className="bg-[#b5c3ff] hover:bg-[#92a6ff] cursor-pointer text-black rounded-xl px-10 py-3">
          Delete Member
        </div>
      </div>

      <Addmember setCount={setCount} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

    </div>
  );
};
