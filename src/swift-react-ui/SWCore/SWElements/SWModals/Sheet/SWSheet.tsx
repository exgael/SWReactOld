import React from 'react';
import { useSheet } from '../../../SWProvider';
import { toJS } from 'mobx';
import {View} from "../../../SWTypes";

export const SWSheet: React.FC<{ view: View }> = ({ view }) => {
    const { hideSheet, sheetContent } = useSheet();

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '20%',
            backgroundColor: 'white',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            transform: 'translateY(0)',
            animation: 'slideIn 0.2s ease-out',
        }}>
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '5px',
                backgroundColor: '#ccc',
                borderRadius: '5px',
            }} />
            <div style={{
                ...view.style,
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: '20px',
            }} {...view.events}>
                {toJS(sheetContent)?.render()}
                <button onClick={toJS(hideSheet)} style={{
                    backgroundColor: '#007aff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}>
                    Hide
                </button>
            </div>
        </div>
    );
};



