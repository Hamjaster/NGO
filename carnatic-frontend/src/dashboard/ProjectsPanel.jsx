import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";

export default function ProjectsPanel() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Store the selected project for editing/deleting

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Project Admin Panel
      </h1>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="w-full border-2 border-blue-400 divide-y divide-blue-500">
          <thead className="bg-gray-50">
            <tr className="divide-x text-center divide-blue-500">
              <th
                className="py-3.5 text-center pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                scope="col"
              >
                List of Projects
              </th>
              <th
                className="py-3.5 text-center px-3 text-left text-sm font-semibold text-gray-900"
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-500 bg-white">
            {/* Render project rows */}
            {/* Replace the hardcoded project data with dynamic data from a state or props */}
            <tr className="divide-x divide-blue-500">
              <td className="py-4 text-center pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                Corpus
              </td>
              <td
                className="py-4 text-center px-3 cursor-pointer text-sm text-gray-500"
                onClick={() => {
                  handleEditClick("Corpus");
                }}
              >
                Edit/Hide/Unhide
              </td>
            </tr>
            {/* More project rows */}
            <tr>
              <td
                className="py-4 pl-4 pr-3 text-sm font-medium text-blue-600 cursor-pointer sm:pl-6"
                colSpan="2"
                onClick={handleAddClick}
              >
                + Add Projects
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Render modals */}
      {editModalOpen && (
        <EditProjectModal
          selectedProject={selectedProject}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      {addModalOpen && (
        <AddProjectModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export const AddProjectModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      size={{ xs: "full", base: "full", sm: "md", md: "md", lg: "lg" }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="mx-5 mt-5 font-roboto">
            <div class="relative my-5 z-0 w-full group">
              <input
                class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer"
                placeholder="Add a project"
                required
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <button
            className={`bg-[#4dd7fe] text-lg py-2 w-32 rounded-md hover:bg-[#00c8ff] text-white`}
          >
            Add
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const EditProjectModal = ({ onClose, selectedProject, isOpen }) => {
  const [editedProject, setEditedProject] = useState(selectedProject);

  return (
    <Modal
      size={{ xs: "full", base: "full", sm: "md", md: "md", lg: "lg" }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit the project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="mx-5 mt-5 font-roboto">
            <div class="relative my-5 z-0 w-full group">
              <div className="flex flex-row gap-5">
                <div className={`'`}>
                  <input
                    value={editedProject}
                    onChange={(e) => setEditedProject(e.target.value)}
                    class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <button
            onClick={() => {
              onClose();
            }}
            className={`bg-[#4dd7fe] text-lg py-2 w-32 rounded-md hover:bg-[#00c8ff] text-white`}
          >
            Save
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className={`mx-2 text-lg py-2 w-32 rounded-md bg-red-500 text-white`}
          >
            Delete
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
