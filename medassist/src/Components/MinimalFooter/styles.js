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

  text: {
    color: "#ffffff",
    fontFamily: "Kaushan Script",
    fontSize: 18,
  },

  copyright: {
    color: "#ffffff",
    fontSize: 16,
  },
}));

export default FooterStyles;
