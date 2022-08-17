import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const xRouter = useRouter();

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (pInn: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", {
      description: pInn,
    });

    dispatch({
      type: "[Entry] - Add-Entry",
      payload: data,
    });
  };

  const deleteEntry = async (pInn: string) => {
    const { data } = await entriesApi.delete<Entry>(`/entries/${pInn}`);

    dispatch({
      type: "[Entry] - Entry-Delete",
      payload: data,
    });

    enqueueSnackbar("Entry deleted", {
      variant: "error",
      autoHideDuration: 1400,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    })

    // window.location.href = "/";
    xRouter.push("/");

  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({
        type: "[Entry] - Entry-Update",
        payload: data,
      });

      if (showSnackbar) {
        enqueueSnackbar("Entradas atualizadas com sucesso", {
          variant: "success",
          autoHideDuration: 1400,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    console.log(data);
    dispatch({
      type: "[Entry] - Refresh-Data",
      payload: data,
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
