import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    height: "60vh",
    justifyContent: "space-around",
    alignItems: "center",
    background: "rgba(187, 225, 250, 0.4)",
  },
  container: {
    [theme.breakpoints.up("md")]: {
      width: "760px",
    },
  },
  title: {
    color: "#1b262c",
    fontFamily: "Josefin Sans",
    textAlign: "center",
    fontWeight: 900,
  },
  paragraph: {
    color: "#1b262c",
    textAlign: "justify",
    textAlignLast: "center",
    fontFamily: "'Merienda', cursive",
  },
}));

export default useStyles;
