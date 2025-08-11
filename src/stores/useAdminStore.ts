import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStore {
  currentTab: string|null;
  setCurrentTab: (tab: string) => void;

  currentSection: string|null;
  setCurrentSection: (section: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      currentTab: null,
      setCurrentTab: (tab) => set({ currentTab: tab }),
      
      currentSection: null,
      setCurrentSection: (section) => set({ currentSection: section }),
    }),
    {
      name: 'admin-store', // key in localStorage
    }
  )
);

export default useAdminStore;