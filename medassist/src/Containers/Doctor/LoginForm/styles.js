import { makeStyles } from "@material-ui/core/styles";

const LoginStyles = makeStyles((theme) => ({
  layout: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  button: {
    display: "flex",
    justifyContent: "flex-center",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: "secondary",
  },
}));

export default LoginStyles;
