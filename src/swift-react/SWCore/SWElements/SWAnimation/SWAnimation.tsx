import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {AnimationComponent} from "../../SWTypes/Components";
import {SWView} from "../SWElements";

export const SWWithAnimation: React.FC<{ view: AnimationComponent }> = React.memo(
    ({ view }) => {

        const [isAnimating, setIsAnimating] = useState(true);
        // Define rounded rectangle-specific styles or event overrides here
        const roundedRectangleStyle =  { /* ... */ };
        const roundedRectangleEvents = { /* ... */ };
        return (
            <SWView
                view={view as AnimationComponent}
                overrideStyles={roundedRectangleStyle}
                overrideEvents={roundedRectangleEvents}
            >
                <AnimatePresence>
                    {isAnimating && (
                        <motion.div
                            initial={view.initial}
                            animate={view.animate}
                            exit={view.exit}
                            transition={view.transition}
                        >
                            {view.child.toJSX()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </SWView>
        )
    }
);