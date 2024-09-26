'use client'
import React from "react";
import { useState, useEffect, useRef } from "react";
import DeckHubHeader from "@/app/components/DeckHubHeader";

export default function DeckEdit({ props, children, params }) {

    return (
        <div>
            <DeckHubHeader />
            <Tabs />
        </div>
    )
}

function Tabs() {
    const [active, setActive] = useState('first');
    const activeTabClasses = 'text-accent font-bold';
    const unactiveTabClasses = 'text-text-secondary-light dark:text-text-secondary-dark font-light';
    const tabs = ['first', 'second', 'third'];
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

    function renderTabContent(activeTab) {
        let tab = null;

        switch(activeTab){
            case 'first':
                tab = <div>
                    
                </div>
        }

        return tab
    }

    return (
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
                        {['First Section', 'Second Section', 'Third Section'][index]}
                    </button>
                ))}
            </div>
            <span 
                className="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease-in-out"
                style={indicatorStyle}
            />
        </div>
    )
}