import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function NFTMarket() {
  const classes = useStyles();
  return (

        <GridContainer justifyContent = "center" className={classes.marketPlace}>
        <GridItem xs={12} sm={12} md={12} >
          <iframe src='https://testnets.opensea.io/assets/deepsomnia?embed=true'
            width='100%'
            height='100%'
            frameBorder='0'
            allowFullScreen
             title='NFTMarket'/>
        </GridItem>
       </GridContainer>
  );
}
