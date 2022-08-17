import { Box, Button, TextField } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

  const [inputValue, setInputValue] = useState("");
  const [validate, setValidate] = useState(false);

  const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const { addNewEntry } = useContext(EntriesContext);
  const { openBoxForm_toggle, toggleFormAdd } = useContext(UIContext);

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setInputValue("");
    setValidate(false);
    openBoxForm_toggle(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
        {/* If is Adding Entry : */}
      {toggleFormAdd ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New Entry"
            autoFocus
            multiline
            label="New Entry"
            helperText={
              inputValue.length <= 0 && validate && "Please enter a valid entry"
            }
            error={inputValue.length <= 0 && validate}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => setValidate(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              color="error"
              onClick={() => openBoxForm_toggle(false)}
            >
              Cancel
            </Button>

            <Button
              variant="outlined"
              color="primary"
              endIcon={<SaveAsIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="outlined"
          fullWidth
          onClick={() => openBoxForm_toggle(true)}
        >
          Add New Task
        </Button>
      )}
    </Box>
  );
};
