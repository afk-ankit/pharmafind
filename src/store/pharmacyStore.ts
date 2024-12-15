import { create } from "zustand";

interface PharmacyState {
  id: number;
  name: string;
  location: string;
  contact_no: string;
  email: string;
  license_no: string;
}

interface Store {
  pharmacy: PharmacyState | null;
  setPharmacy: (pharmacy: PharmacyState) => void;
  removePharmacy: () => void;
}

export const usePharmacyStore = create<Store>((set) => ({
  pharmacy: null,
  setPharmacy: (pharmacy) => set({ pharmacy }),
  removePharmacy: () => set({ pharmacy: null }),
}));
