import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Kaushan Script",
  },
  navbar: {
    backgroundColor: "transparent",
    color: "#1b262c",
  },
  navbarScroll: {
    backgroundColor: "#BBE1FA",
    color: "#1b262c",
  },
  icon: {
    color: "#1b262c",
    fontSize: 40,
  },
  iconScroll: {
    color: "#1b262c",
    fontSize: 40,
  },
}));

export default useStyles;
