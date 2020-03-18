import React from 'react';
import PropTypes from 'prop-types';
import {MDBContainer} from "mdbreact";


function AbstractPage(props) {
    return (
        <>
          {props.header && <MDBContainer fluid className={'header'}>{props.header}</MDBContainer>}
            <MDBContainer fluid className={'main'}>{props.children}</MDBContainer>
          {props.footer && <MDBContainer fluid className={'footer'}>{props.footer}</MDBContainer>}
        </>
    );
}

AbstractPage.propTypes ={
  header:PropTypes.element,
  children:PropTypes.array.isRequired,
  footer:PropTypes.element
};

export default AbstractPage;
