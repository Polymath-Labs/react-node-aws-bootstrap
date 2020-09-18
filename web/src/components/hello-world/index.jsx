import React, {useEffect} from "react";
import Logger from "@utils/logger";
import config from "@constants/config";
import {ReactComponent as Logo} from '@images/logo.svg';

const logger = new Logger('components/HelloWorld', config.LOGGING["components/HelloWorld"]);

export const HelloWorld = () => {

    useEffect(() => {
        logger.debug('You rock..')
    }, []);

    return (
        <div className="hello-world-component">
            <Logo />
            <h1>Welcome Polymath</h1>
        </div>
    )
}
