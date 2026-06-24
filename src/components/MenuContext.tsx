"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface MenuContextType {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  isScrollLocked: boolean;
  setIsScrollLocked: (v: boolean) => void;
  hasIntroPlayed: boolean;
  setHasIntroPlayed: (v: boolean) => void;
}

const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
  isScrollLocked: false,
  setIsScrollLocked: () => {},
  hasIntroPlayed: false,
  setHasIntroPlayed: () => {},
});

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(pathname === "/");
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);

  // Reset menu and scroll lock when navigating between pages
  useEffect(() => {
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsScrollLocked(false);
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <MenuContext.Provider 
      value={{ 
        isOpen, 
        setIsOpen, 
        isScrollLocked, 
        setIsScrollLocked, 
        hasIntroPlayed, 
        setHasIntroPlayed 
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
