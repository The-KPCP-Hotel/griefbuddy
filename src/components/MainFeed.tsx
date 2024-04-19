import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import MainFeedPost from "./MainFeedPost";

function MainFeed() {


    return (
        <div>
            <h1>Main Feed Component</h1>
            <MainFeedPost></MainFeedPost>
        </div>
    )
}

export default MainFeed