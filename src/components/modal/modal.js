import React from 'react';

export const Modal = ({children}) => {
    return (
        <div className="popup_main_block">
            <div className="popup">
                <div className="popup_content">
                    {children}
                </div>
            </div>
        </div>
    )
};