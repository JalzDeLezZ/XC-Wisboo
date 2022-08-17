import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
    entries: Entry[];

    //Methods
    addNewEntry: (pInn: string) => void;
    updateEntry: (entry: Entry, p2?: boolean) => void;
    deleteEntry: (pInn: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
