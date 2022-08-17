import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { DragEvent, FC, useContext } from "react";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui/UIContext";
import { useRouter } from "next/router";
import {dateFunctions} from '../../utils/'
interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, stopDragging } = useContext(UIContext);
  const xRouter = useRouter();

  const mOnDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("identifier", entry._id);
    startDragging();
  };

  const mOnDragEnd = () => {
    stopDragging();
  };

  const handleClick = () => {
    xRouter.push(`/entries/${entry._id}`);
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={mOnDragStart}
      onDragEnd={mOnDragEnd}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">{dateFunctions.getFormatDistanceToNow(entry.createAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
