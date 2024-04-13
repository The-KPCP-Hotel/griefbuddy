import React = require("react");
import { Link } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, UnorderedList } from '@chakra-ui/react'
import Logout from './Logout';

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
                    <MenuItem><Logout/></MenuItem>
                </MenuList>
            </Menu>
        </ChakraProvider>
      {/* <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/buddy">Buddy</Link>
        </li>
        <li>
          <Link to="/chatbot">ChatBot</Link>
        </li>
        <li>
          <Link to="/events">Local Happenings</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul> */}
    </div>
  );
}

export default Navbar;
