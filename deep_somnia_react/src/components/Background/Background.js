import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import PropTypes from 'prop-types';
import HeaderLinks from "../Header/HeaderLinks";
import Header from "../Header/Header";
import React from "react";
import Footer from "../Footer/Footer";


const Background = (Component)=>{
    console.log(Component)
    return (props) => (
        <div>
            <Header
                color="transparent"
                routes={[]}
                brand="Deep Somnia"
                rightLinks={<HeaderLinks link="/login" />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white",
                }}
                {...props}
            />
            <div
                style={{
                    minHeight: "100vh",
                    backgroundImage: "url(" + props.image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                }}
            >

                <GridContainer  justifyContent="center">
                    <GridItem  xs={12} sm={12} md={3}>
                        <Component {...props} reqOldPass={false}/>
                    </GridItem>
                </GridContainer>

            </div>
            <Footer />
        </div>
    )

}
Background.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  Background;



