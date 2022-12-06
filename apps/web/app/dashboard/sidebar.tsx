"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({});

function SidebarNav() {
  let { isOpen } = useContext(SidebarContext);

  return (
    <div>
      <p>Home</p>
      {isOpen && <p>Open</p>}
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState();

  return (
    <SidebarContext.Provider value={{ isOpen }}>
      <SidebarNav />
    </SidebarContext.Provider>
  );
}
