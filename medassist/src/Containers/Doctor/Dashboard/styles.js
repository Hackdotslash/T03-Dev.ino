import { makeStyles } from "@material-ui/core/styles";

const dashboardStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  main: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(6),
  },
  container: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(20),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default dashboardStyles;
