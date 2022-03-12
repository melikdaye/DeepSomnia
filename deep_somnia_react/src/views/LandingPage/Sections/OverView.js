import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import pic1 from "../../../assets/img/digital-wallet.png";
import pic2 from "../../../assets/img/starry-night.png";
import pic3 from "../../../assets/img/nft.png";

const useStyles = makeStyles(styles);

export default function OverView() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={pic1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                 Fill your Somnia wallet
                <br />
              </h4>
              <CardBody style = {{borderRadius : "50px"}}>
                <p className={classes.description}>
                  Buy Somnia Credits to fill your wallet
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain  >
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={pic2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Generate NFTs
                <br />
              </h4>
              <CardBody style = {{borderRadius : "50px"}}>
                <p className={classes.description}>
                  Write your dream and set parameters to generate NFT
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={pic3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                 Download and sell your NFTs
                <br />
              </h4>
              <CardBody style = {{borderRadius : "50px"}}>
                <p className={classes.description}>
                  View your NFTs and download them anytime
                </p>
              </CardBody>

            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
