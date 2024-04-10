import React = require("react");
import { Link } from "react-router-dom";
import { ChakraProvider, MenuItem } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, UnorderedList } from '@chakra-ui/react'
function Navbar() {

    return (
    <div>
        <ChakraProvider>
            <Menu>
                <MenuButton style={{fontSize: "45px"}}>Ξ</MenuButton>
                <MenuList >
                    <MenuItem><Link to="/profile">Profile</Link></MenuItem>
                    <MenuItem><Link to="/buddy">Buddy</Link></MenuItem>
                    <MenuItem><Link to="/chatbot">ChatBot</Link></MenuItem>
                    <MenuItem><Link to="/events">Local Happenings</Link></MenuItem>
                    <MenuItem><Link to="/resources">Resources</Link></MenuItem>
                </MenuList>
            </Menu>
        </ChakraProvider>
    </div>
    )

    
        
    
}

export default Navbar