import { makeStyles } from "@material-ui/core/styles";

const FooterStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },

  footer: {
    backgroundColor: "#1b262c",
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },

  icon: {
    color: "#ffffff",
    margin: theme.spacing(2),
    fontSize: 30,
  },

  text: {
    color: "#ffffff",
    fontFamily: "Kaushan Script",
  },

  copyright: {
    color: "#ffffff",
  },
}));

export default FooterStyles;
