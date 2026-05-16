'use client';

import { createContext, useContext } from 'react';

export const LayoutContext = createContext({ sidebarOpen: false });
export const useLayout = () => useContext(LayoutContext);