import React, { useContext, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import axios from 'axios';
import MyContext from '../context/context';

export default function EditMember({ member, isOpen, onClose, setCount }) {

    const { proxy } = useContext(MyContext)


    const [formData, setFormData] = useState({
        name: member.name,
        email: member.email,
        PAN: member.PAN,
        address: member.address,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${proxy}/dashboard/members/edit/${member.id}`, formData);
            console.log('API response:', response.data);
            setCount(c => c + 1)
            onClose()
            // Handle success, show a message, redirect, etc.
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show an error message, etc.
        }
    };

    return (
        <div>
            <Modal size={{ xs: 'full', base: 'full', sm: 'md', md: 'md', lg: 'lg' }} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <div className="mx-5 mt-5 font-roboto">

                            <div className={`w-full`}>

                                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-[#92a6ff]"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-[#92a6ff]"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Phone:</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-[#92a6ff]"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">PAN:</label>
                                        <input
                                            type="text"
                                            name="PAN"
                                            value={formData.PAN}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-[#92a6ff]"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Address:</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-[#92a6ff]"
                                            rows="3"
                                        ></textarea>
                                    </div>


                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="bg-[#92a6ff] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Submit
                                    </button>
                                </form>

                            </div>

                        </div>
                    </ModalBody>

                    <ModalFooter>



                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
