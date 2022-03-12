import { container, title } from "../../material-kit-react.js";

import imagesStyle from "../imagesStyles.js";

const profilePageStyle = {
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important",
  },
  name: {
    marginTop: "-80px",
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999",
  },
  navWrapper: {
    margin: "10px auto 10px auto",
    textAlign: "center",
  },
  imageCard : {
    margin: "20px 0px 10px -50px",
    "@media (max-width: 512px)" : {
      margin: "0px 0px 0px 0px",
    },
    "@media (min-width: 513px) and (max-width: 1024px)" : {
      marginLeft: "15%",
      marginRight : "-15%",
    }
  },
  underImageGroup:{
    margin: "20px 0px 10px -20px",
    "@media (max-width: 512px)" : {
      marginLeft: "8%",
      marginRight : "-8%",
    },
    "@media (max-width: 1024px) and (min-width: 513px)" : {
      marginLeft: "2%",
      marginRight : "-2%",
    }
  },

  dream: {
    margin: "20px 0px 10px 0px",
  },
  editSave: {
    margin: "-30px -50px -50px -40px",
  },
  attrbGrid:{
    margin: "-30px -10px -30px -5px",

  },

  delAttrb:{
    display: "none",
    position: "absolute",
    top:"30%",
    left: "70%",
    "@media (max-width: 1024px)" : {
      left: "80%",
    },
  },
  attributeCard :{
    background: "#FFFFFF",
    borderTop: `5px solid #08e7a3`,
    borderBottom: `5px solid #08e7a3`,
    //background: 'radial-gradient(circle, #08e7a3 0%, #02e1ff 100%)',
    height: "100px",
    borderRadius: "20px",
    "&:hover":{
      boxShadow: "0px 0px 20px 10px #0ff",
    }
  },
  attributeContainer: {
    margin: "20px -25px 10px 25px",
  },

  attrCardHeader : {
    color : "#02e1ff",
    marginTop : "-20px"
  },




};

export default profilePageStyle;
