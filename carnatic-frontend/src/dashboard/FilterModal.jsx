import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Stack,
  Select,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import MyContext from "../context/context";
import { IoIosArrowDropdown } from "react-icons/io";

const FiltersModal = ({ isOpen, onClose, onSubmit, save }) => {
  const [donorType, setDonorType] = useState("");
  const [projects, setProjects] = useState([]);
  // const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const year = new Date().getFullYear();
  const totalYears = Array.from(new Array(20), (val, index) => year - index);
  const { proxy } = useContext(MyContext);
  const [dropdown, setDropdown] = useState(false);

  // Function to handle form submission
  const handleSubmit = () => {
    // Prepare the filters object
    const filters = {
      donorType,
      projects,
      years,
      startMonth,
      endMonth,
    };
    // Pass the filters object to the onSubmit function
    save(filters);
    // Close the modal
    onClose();
  };

  const getProjects = async () => {
    try {
      const { data } = await axios.get(`${proxy}/projects`);
      console.log(data);
      setAllProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <div className="font-semibold text-xl">Select Type</div>
            <Checkbox
              isChecked={donorType === "guest"}
              onChange={() =>
                setDonorType(donorType === "guest" ? "" : "guest")
              }
            >
              Guest Donors
            </Checkbox>
            <Checkbox
              isChecked={donorType === "member"}
              onChange={() =>
                setDonorType(donorType === "member" ? "" : "member")
              }
            >
              Carnatic Members
            </Checkbox>
            <div className="relative inline-block text-left">
              <div>
                <span
                  onClick={() => setDropdown(!dropdown)}
                  className="rounded-md shadow-sm"
                >
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    Select Year
                    {/* Show an icon to indicate dropdown */}
                    <IoIosArrowDropdown className="text-xl mx-4" />
                  </button>
                </span>
              </div>

              <div
                className={`" ${
                  dropdown ? "" : "hidden"
                } origin-top-right z-50 max-h-56 overflow-y-scroll absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  {totalYears.map((year) => {
                    return (
                      <button
                        onClick={() => {
                          setYears(
                            years.includes(year)
                              ? years.filter((yr) => yr !== year)
                              : [...years, year]
                          );
                        }}
                        className={`${
                          years.includes(year)
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700"
                        } block px-4 py-2 text-sm w-full text-left`}
                        role="menuitem"
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <Select
              placeholder="Start Month"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              {months.map((month) => {
                return (
                  <option key={`${month.number}`} value={month.number}>
                    {month.name}
                  </option>
                );
              })}
              {/* Add more months as needed */}
            </Select>
            <Select
              placeholder="End Month"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
            >
              {months.map((month) => {
                return (
                  <option key={`${month.number}`} value={month.number}>
                    {month.name}
                  </option>
                );
              })}
              {/* Add more months as needed */}
            </Select>
            {/* You can replace the static project options with dynamic options */}
            <div className="font-semibold text-xl">Select Projects</div>
            {allProjects.map((project) => {
              return (
                <Checkbox
                  isChecked={projects.includes(project.title)}
                  onChange={() =>
                    setProjects(
                      projects.includes(project.title)
                        ? projects.filter((pro) => pro !== project.title)
                        : [...projects, project.title]
                    )
                  }
                >
                  {project.title}
                </Checkbox>
              );
            })}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Apply
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FiltersModal;
