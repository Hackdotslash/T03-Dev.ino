import { makeStyles } from "@material-ui/core/styles";

const ListStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(12),
  },
  paperProfile: {
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
  },
  image: {
    width: 200,
    height: 200,
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  details: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
  bio: {
    width: "100%",
    border: "none",
    "& focus": {
      border: "none",
    },
    ...theme.typography.body2,
    resize: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fees: {
    fontSize: "20px",
  },
}));

export default ListStyles;
