import React from 'react';
import { APP_TITLE } from "../shared/Constant";

const UploadFooter = ()=>{
    const currentYear = new Date().getFullYear();
    return(
        <footer className="footer">
            <p>&copy; {currentYear} {APP_TITLE}. All rights reserved.</p>
        </footer>
    );
};
export default UploadFooter;