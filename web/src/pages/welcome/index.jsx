import React from "react";
import {HelloWorld} from "@components/hello-world";
import {Link} from "react-router-dom";

export const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <HelloWorld />
            <Link to={'/docs'}>Guidelines and documentation</Link>
        </div>
    );
}
