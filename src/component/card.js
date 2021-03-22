import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Map from "@material-ui/icons/Map";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReactCardFlip from "react-card-flip";
import reactDom from "react-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function SpotCard({
  ID,
  Name,
  DescriptionDetail,
  Phone,
  Address,
  Picture,
  TicketInfo,
  Remarks,
  Position,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={Name} subheader={Address} />
      <CardMedia
        className={classes.media}
        image={Picture ? Picture : "assets/img/No_Image_Available.jpg"} //https://i.imgur.com/WnqAyvj.jpg
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <p>電話：{Phone}</p>
          <p>售票資訊：{TicketInfo}</p>
          <p>{Remarks}</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <a
            target={`https://www.google.com/maps/search/?api=1&query=${Position.PositionLat},${Position.PositionLon}`}
          >
            <Map />
          </a>
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="">
          <Typography paragraph>{DescriptionDetail}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
