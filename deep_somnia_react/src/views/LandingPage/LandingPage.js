import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";
import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import Intro from "./Sections/Intro.js";
import OverView from "./Sections/OverView.js";
import background from "../../assets/img/bg-whale.png";
import NFTMarket from "./Sections/NFTMarket";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Deep Somnia"
        rightLinks={<HeaderLinks link="/login" />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />

                <Parallax filter image={background}>


                    <h1 className={classes.title}>Every dream tells us something...</h1>
                    <br />

                </Parallax>


      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Intro />
          <OverView />
          <NFTMarket/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
