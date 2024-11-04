import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Tabs({ 
    tabsObj, 
    active,
    setActive,
    className,
    children
 }) {

    const tabs = Object.keys(tabsObj)
    const activeTabClasses = 'text-accent font-bold';
    const unactiveTabClasses = 'text-text-secondary-light dark:text-text-secondary-dark font-light';
    const tabRefs = useRef(tabs.map(() => React.createRef()));
    const [indicatorStyle, setIndicatorStyle] = useState({});

    useEffect(() => {
        const activeTab = tabRefs.current[tabs.indexOf(active)].current;
        if (activeTab) {
            setIndicatorStyle({
                left: `${activeTab.offsetLeft}px`,
                width: `${activeTab.offsetWidth}px`
            });
        }
    }, [active]);

    return (
        <div className={`${className}`}>
            <div className="relative">
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            ref={tabRefs.current[index]}
                            onClick={() => setActive(tab)}
                            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${
                                active === tab ? activeTabClasses : unactiveTabClasses
                            }`}
                        >
                            {tabs[index]}
                        </button>
                    ))}
                </div>
                <span
                    className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-in-out"
                    style={indicatorStyle}
                />
            </div>
            <div>
                
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    )
}