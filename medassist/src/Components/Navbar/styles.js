import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Kaushan Script",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#BBE1FA",
    color: "#1b262c",
  },
  icon: {
    color: "#1b262c",
    fontSize: 40,
  },
}));

export default useStyles;
