import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function AsminAssignTodo({ queryHandeler }) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [bool, setBool] = useState(false);
  const [clickSugg, setClickSugge] = useState("");
  const getData = async () => {
    const dummydata = ["user@example.com", "client@example.com"];

    setData(dummydata);

    const token = localStorage.getItem("login_token");


     return fetch("https://multitenancy.onrender.com/user/info", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    getData()
      .then((res) => {
        console.log(res, "resag");
        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handelInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    queryHandeler(input, clickSugg);
  }, [input, queryHandeler, clickSugg]);

  useEffect(() => {
    if (input === "") {
      setSuggestion([]);
    } else {
      console.log(input, "input");
      let formatTextQ = input.trim()?.toLowerCase();

      let newSuggestion =
        data.length > 0 &&
        data
          .filter((elm) => {
            return elm.email?.toLowerCase().indexOf(formatTextQ) !== -1
              ? true
              : false;
          })
          .map((elm) => {
            return elm.email;
          })
          .filter((email) => email !== localStorage.getItem("user_email"));
      if (!newSuggestion) {
        const dumyData = ["user@example.com", "client@example.com"];
        setSuggestion(dumyData);
      } else setSuggestion(newSuggestion);

      console.log(newSuggestion, "new suggestion");
    }
  }, [input, queryHandeler]);

  const handelSetValue = (elm) => {
    setBool(true);
    setClickSugge(elm);
    console.log(input, "input");
  };

  const handelClear = () => {
    setBool(false);
  };

  //styles

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    input: {
      marginRight: theme.spacing(2),
    },
    clearButton: {
      textTransform: "none",
    },
    suggestionContainer: {
      maxHeight: "150px",
      overflowY: "scroll",
      marginTop: theme.spacing(2),
    },
    suggestionItem: {
      cursor: "pointer",
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Box className={classes.container}>
        <TextField
          value={bool ? clickSugg : input}
          onChange={handelInputChange}
          className={classes.input}
        />
        {bool && (
          <Button
            variant="outlined"
            onClick={handelClear}
            className={classes.clearButton}
          >
            Clear
          </Button>
        )}
      </Box>
      {!bool && (
        <Box className={classes.suggestionContainer}>
          {suggestion.length > 0 &&
            suggestion.map((elm, i) => (
              <Box
                key={i + 1}
                onClick={() => handelSetValue(elm)}
                className={classes.suggestionItem}
              >
                <h6>{elm}</h6>
              </Box>
            ))}
        </Box>
      )}
    </>
  );
}
