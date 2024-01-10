import React from 'react';
import {FullscreenCoverComponent} from "../../../SWTypes/Components";
import {SWView} from "../../SWElements";

export const SWFullScreenCover: React.FC<{ view: FullscreenCoverComponent }> = React.memo(
    ({view}) => {
        if (!view.show) {
            return null;
        }

        const defaultStyle: React.CSSProperties = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'slideIn 0.3s ease-out',
        };

        view.style = {
            ...defaultStyle,
            ...view.style,
        }

        return (
            <SWView view={view}>
                <div style={{
                    maxHeight: '100%',
                    overflowY: 'auto',
                }}>
                    {view.show.toJSX()}
                    <button onClick={view.onDismiss} style={{
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
            </SWView>
        );
    });
