import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import { getContents } from "../../apis/fetchFS";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import FolderIcon from "@material-ui/icons/Folder";

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

  const [mounted, setMounted] = useState(false);

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
  function componentIsMounted() {
    setMounted(true);
  }

  function generateBreadcrumbs() {
    let dirNames = history.location.pathname.split("/");
    let linksJSX = [];
    let pathList = [];
    dirNames.forEach(function(key, i) {
      if (i === 0) {
        linksJSX.push(
          <Link
            key={key + i}
            color="inherit"
            onClick={function() {
              history.push("/");
              loadContents();
            }}
            className={classes.breadcrumbs}
          >
            root
          </Link>
        );
      } else if (i === dirNames.length - 1) {
        linksJSX.push(
          <Typography key={key + i} color="textPrimary">
            {key}
          </Typography>
        );
      } else if (i !== 0 && i !== dirNames.length - 1 && key !== '') {
        pathList.push(key);
        let path = "/" + pathList.join("/");
        linksJSX.push(
          <Link
            key={key + i}
            color="inherit"
            onClick={function() {
              history.push(path);
              loadContents();
            }}
            className={classes.breadcrumbs}
          >
            {key}
          </Link>
        );
      }
    });
    return linksJSX;
  }

  function displayContent() {
    if (contents.data.type === "dir") {
      let iconItemsJSX = [];
      for (let [key, value] of Object.entries(contents.data.children)) {
        iconItemsJSX.push(
          <Grid
            item
            key={[key]}
            className={classes.content}
            onClick={function() {
              if (history.location.pathname === "/") {
                history.push("/" + key);
              } else {
                history.push(history.location.pathname + "/" + key);
              }
              loadContents();
            }}
          >
            {value.type === "file" ? (
              <DescriptionIcon fontSize="large" />
            ) : (
              <FolderIcon fontSize="large" />
            )}
            <Typography>{value.name}</Typography>
          </Grid>
        );
      }
      return iconItemsJSX;
    } else if (contents.data.type === "file") {
      return (
        <Grid item>
          <Typography>THIS IS FILE: {contents.data.name}</Typography>
        </Grid>
      );
    } else {
      return <></>;
    }
  }

  async function loadContents() {
    console.log("load");
    fetchingContents();
    let contents = await getContents(history.location.pathname);
    if (contents.error === "Path does not Exist") {
      history.push("/ErrorScreen");
    }
    fetchedContents(contents);
  }

  useEffect(function() {
    if (mounted === false) {
      componentIsMounted();
      window.onpopstate = e => {
        loadContents();
      };
      loadContents();
    }
  });

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={10}
      style={{
        margin: 0,
        width: "100%"
      }}
    >
      {/* Breadcrumb nav */}
      <Grid item>
        <Breadcrumbs aria-label="breadcrumb">
          {generateBreadcrumbs()}
        </Breadcrumbs>
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
            {displayContent()}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default MainPage;
