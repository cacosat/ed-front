'use client'

import React from "react";
import { useState, useEffect } from "react";
import { InfoCard } from "@/app/components/Card";
import Tabs from "@/app/components/Tabs";

export default function DeckCreate({ children }) {
    const tabs = {
        'Description': (
            <div>
                description
            </div>
        ), 
        'Preview': (
            <div>
                preview
            </div>
        ), 
    }
    const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0])

    return (
        <div>
            <InfoCard>
            <p>Provide a <span className="text-accent font-medium">detailed description of what you want to be the deck's main topic</span>. This should be primarily focused on the topic you want, but for better results try and also describe the broader field or area in which it is placed.</p>
            </InfoCard>
            <Tabs
                tabsObj={tabs}
                active={activeTab}
                setActive={setActiveTab}
            >
                {tabs[activeTab]}
            </Tabs>
        </div>
    )
}