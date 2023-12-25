import React from 'react';
import { useAlert } from '../../../SWProvider';
import { toJS } from 'mobx';
import {View} from "../../../SWTypes";

export const SWAlert: React.FC<{ view: View }> = ({ view }) => {
    const { hideAlert, alertTitle, alertMessage } = useAlert();

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1001, // Higher than the sheet
        }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{alertTitle}</h2>
            <p style={{ margin: '0 0 20px 0' }}>{alertMessage}</p>
            <button onClick={toJS(hideAlert)} style={{
                backgroundColor: '#007aff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
            }}>
                Close
            </button>
        </div>
    );
};

