import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function Intro() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={12} md={8}>
          <h1 className={classes.title}>Tell your dream to generate unique NFTs</h1>
          <h4 className={classes.description}>
               We convert your dreams to unique NFTs with AI assistance.
          </h4>
        </GridItem>
      </GridContainer>

    </div>
  );
}
