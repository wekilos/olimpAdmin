import React from 'react';
import {useHistory} from 'react-router-dom';
import { Button, Result } from 'antd';
import "./404.css";

const NotFound = () => {
    const history = useHistory();
    return(
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => history.goBack()} >Back</Button>}
        />
    )
};

export default NotFound;