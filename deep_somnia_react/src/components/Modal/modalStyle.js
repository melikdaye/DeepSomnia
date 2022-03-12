

const modalStyle = {

    modalBody: {
        position: "fixed",
        inset: "0",
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease-in-out",
        overflow: "hidden",
        zIndex: 999,
        margin: "25%",
        marginTop : "20%",
        marginLeft: "35%",
        width: "30%",
        height: "50%",
        borderRadius : "15px",
    },

    modal_content: {
        width: "90%",
        height: "80%",
        backgroundColor: "#fab54e",
        color: "#00ffdf",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
    },
    closeButton :{
      marginRight : "-85%",
      marginTop: "-8%",
      color: "white"
    }
}
export default modalStyle;