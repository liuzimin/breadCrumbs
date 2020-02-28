import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { getContents } from "../../apis/fetchFS";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles(theme => ({
  content: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      cursor: "pointer"
    }
  },
  breadcrumbs: {
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function MainPage(props) {
  let history = useHistory();
  const classes = useStyles();

  const [contents, setContents] = useState({
    data: {
      children: {},
      type: "",
      name: ""
    },
    loading: false
  });

  function fetchingContents() {
    setContents({
      ...contents,
      loading: true
    });
  }
  function fetchedContents(data) {
    setContents({
      data: data,
      loading: false
    });
  }

  function generateBreadcrumbs() {
    let dirNames = history.location.pathname.split("/");
    let linksJSX = [];
    dirNames.forEach(function(key, i) {
      if (i !== 0 && i !== dirNames.length - 1) {
        linksJSX.push(
          <Link
            color="inherit"
            onClick={handleClick}
            className={classes.breadcrumbs}
          >
            {key}
          </Link>
        );
      } else if (i === dirNames.length - 1) {
        linksJSX.push(<Typography color="textPrimary">{key}</Typography>);
      }
    });
    return linksJSX;
  }

  function generateIcons() {
    let iconItemsJSX = [];
    for (let [key, value] of Object.entries(contents.data.children)) {
      iconItemsJSX.push(
        <Grid item key={[key]} className={classes.content}>
          <DescriptionIcon fontSize="large" />
          <Typography>{value.name}</Typography>
        </Grid>
      );
    }
    return iconItemsJSX;
  }
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={10}
    >
      {/* Breadcrumb nav */}
      <Grid item>
        <Breadcrumbs aria-label="breadcrumb">
          {generateBreadcrumbs()}
        </Breadcrumbs>
      </Grid>

      <Grid item>
        <Button
          onClick={async function() {
            console.log("path", history.location.pathname);
            fetchingContents();
            let contents = await getContents(history.location.pathname);
            fetchedContents(contents);
          }}
        >
          Api
        </Button>
      </Grid>

      {/* Content Display */}
      <Grid item>
        {contents.loading === true ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={10}
          >
            {generateIcons()}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default MainPage;
