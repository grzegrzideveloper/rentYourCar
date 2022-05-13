import React from "react";
import PromotedOffers from "./PromotedOffers";
import Search from "./Search";
const Main =  () => {
    return (
        <div className="container-fluid">
            <Search/>
            <PromotedOffers/>
        </div>
    );
}

export default Main;