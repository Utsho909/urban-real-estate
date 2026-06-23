"use client";

import { createContext, useContext, useState } from "react";

interface MenuContextType {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isScrollLocked: boolean;
  setIsScrollLocked: (v: boolean) => void;
}

const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
  isScrollLocked: true, // Default to true so it's locked on initial load during intro
  setIsScrollLocked: () => {},
});

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, isScrollLocked, setIsScrollLocked }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
