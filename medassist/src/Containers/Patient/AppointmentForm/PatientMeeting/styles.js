import { makeStyles } from "@material-ui/core/styles";

const PatientMeetingStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(10),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  cardContent: {
    flexGrow: 1,
  },

  heading: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    color: "#0f4c75",
  },

  icon: {
    color: "#0f4c75",
    fontSize: 30,
    paddingTop: theme.spacing(0.5),
  },

  footer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },

  button: {
    background: "#3282B8",
    color: "black",
    width: "30%",
  },

  disabled_button: {
    width: "30%",
    background: "#BBE1FA",
    color: "#1b262c",
  },

  typography: {
    margin: theme.spacing(2),
  },
}));

export default PatientMeetingStyles;
