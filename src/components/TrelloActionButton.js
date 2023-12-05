import React, { useState, useReducer } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addList } from "../store/actions";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import TextArea from "react-textarea-autosize";
import Card from "@mui/material/Card";
import listReducer, { initialState } from "../store/reducers/listReducer";

// class TrelloActionButton1 extends React.Component {
//   state = {
//     isFormOpen: false,
//     text: "",
//   };

//   openForm = () => {
//     this.setState({
//       isFormOpen: true,
//     });
//   };

//   closeForm = () => {
//     this.setState({
//       isFormOpen: false,
//     });
//   };

//   handleInputChange = (e) => {
//     this.setState({
//       text: e.target.value,
//     });
//   };

//   handleAddList = () => {
//     const { dispatch } = this.props;
//     const { text } = this.state;

//     if (text) {
//       dispatch(addList(text));
//     }

//     return;
//   };

//   renderAddButton = () => {
//     const { list } = this.props;
//     const buttonText = list ? "Add another list" : "Add another card";
//     const opacity = list ? 1 : 0.5;
//     const color = list ? "white" : "inherit";
//     const backgroundColor = list ? "rgba(0,0,0,.15)" : "inherit";

//     return (
//       <div
//         style={{ ...styles.cotainer, opacity, color, backgroundColor }}
//         onClick={this.openForm}
//       >
//         <Icon>add</Icon>
//         <p>{buttonText}</p>
//       </div>
//     );
//   };

//   renderForm = () => {
//     const { list } = this.props;

//     const buttonTitle = list ? "Add List" : "Add Card";
//     const placeholder = list
//       ? "Enter list title..."
//       : "Enter title for this card...";
//     return (
//       <div>
//         <Card
//           style={{
//             overflow: "visible",
//             minHeight: 80,
//             minWidth: 272,
//             padding: "6px 8px 2px",
//           }}
//         >
//           <TextArea
//             placeholder={placeholder}
//             autoFocus
//             onBlur={this.closeForm}
//             value={this.state.text}
//             onChange={this.handleInputChange}
//             style={{
//               resize: "none",
//               width: "100%",
//               outline: "none",
//               border: "none",
//             }}
//           />
//         </Card>

//         <div style={styles.formButtonGroup}>
//           <Button
//             onMouseDown={this.handleAddList}
//             variant="contained"
//             style={{ color: "white", backgroundColor: "#5aac44" }}
//           >
//             {" "}
//             {buttonTitle}{" "}
//           </Button>
//           <Icon
//             style={{ marginLeft: 8, cursor: "pointer" }}
//             onClick={this.closeForm}
//           >
//             close
//           </Icon>
//         </div>
//       </div>
//     );
//   };
//   render() {
//     return this.state.isFormOpen ? this.renderForm() : this.renderAddButton();
//   }
// }

const TrelloActionButton = ({ list }) => {
  let dispath = useDispatch();

  const [stateDetails, setStateDetails] = useState({
    isFormOpen: false,
    text: "",
  });

  let state = useSelector((state) => state.lists);

  const openForm = () => {
    setStateDetails({
      ...stateDetails,
      isFormOpen: true,
    });
  };

  const closeForm = () => {
    setStateDetails({
      ...stateDetails,
      isFormOpen: false,
    });
  };

  const handleInputChange = (e) => {
    setStateDetails({
      ...stateDetails,
      text: e.target.value,
    });
  };

  const handleAddList = () => {
    const { text } = stateDetails;

    if (text) {
      dispath(addList(text));
    }

    setStateDetails({ ...stateDetails, isFormOpen: false });
  };

  const renderAddButton = () => {
    const buttonText = list ? "Add another list" : "Add another card";
    const opacity = list ? 1 : 0.5;
    const color = list ? "white" : "inherit";
    const backgroundColor = list ? "rgba(0,0,0,.15)" : "inherit";

    return (
      <div
        style={{ ...styles.cotainer, opacity, color, backgroundColor }}
        onClick={openForm}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  const renderForm = () => {
    const buttonTitle = list ? "Add List" : "Add Card";
    const placeholder = list
      ? "Enter list title..."
      : "Enter title for this card...";
    return (
      <div>
        <Card
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <textarea
            placeholder={placeholder}
            autoFocus
            // onBlur={closeForm}
            value={stateDetails.text}
            onChange={handleInputChange}
            style={{
              resize: "none",
              width: "100%",
              outline: "none",
              border: "none",
            }}
          />
        </Card>

        <div style={styles.formButtonGroup}>
          <Button
            onClick={handleAddList}
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            {" "}
            {buttonTitle}{" "}
          </Button>
          <Icon
            style={{ marginLeft: 8, cursor: "pointer" }}
            onClick={closeForm}
          >
            close
          </Icon>
        </div>
      </div>
    );
  };

  return stateDetails.isFormOpen ? renderForm() : renderAddButton();
};
const styles = {
  cotainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
};
// export default connect()(TrelloActionButton);
export default TrelloActionButton;
