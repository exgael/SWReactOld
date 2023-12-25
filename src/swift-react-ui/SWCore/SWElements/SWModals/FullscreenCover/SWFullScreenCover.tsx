import React from "react";
import {useFullscreenCover} from "../../../SWProvider";
import {View} from "../../../SWTypes";
import { toJS } from 'mobx';

export const SWFullScreenCover: React.FC<{ view: View }> = ({ view }) => {
    const { hideFs, fsContent } = useFullscreenCover();

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
            zIndex: 1000, // Ensure it covers other elements
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'slideIn 0.3s ease-out',
        }}>
            <div style={{
                ...view.style,
                maxHeight: '100%',
                overflowY: 'auto'  // If content is too long
            }} {...view.events}>
                {toJS(fsContent)?.render()}
                <button onClick={toJS(hideFs)} style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    border: 'none',
                    background: 'none',
                    color: 'white',
                    fontSize: '20px',
                    cursor: 'pointer',
                }}>
                    Hide
                </button>
            </div>
        </div>
    );
};
