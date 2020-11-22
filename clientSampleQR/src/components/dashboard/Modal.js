

// // export  function Modal(props) {
// //   console.log(props);
// //   return (
// //     <div>
// //      <h1>{props.auth.QRdata}</h1> 
// //     </div>
// //   )
// // }




// import React from 'react'
// import { connect } from 'react-redux';
// import propTypes from 'prop-types';

// export default function Modal(props) {
//   return ReactDOM.createPortal(
//     <Modal show={this.state.show} onHide={this.handleClose}>
//     <form onSubmit = {this.onSubmit} >  
//         <Modal.Header closeButton>
//         <Modal.Title>{this.state.addTocartPrdouct.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <div className="form-group">
//             <label htmlFor="exampleFormControlInput1" style={{color: "black"}}>Quantity</label>
//             <input 
//             type="number" 

//             value={this.state.quantity}
//             className="form-control" 
//             name="quantity"
//             id="quantity"
//             onChange ={this.onChange} 
//             placeholder=" "/>
//         </div>
//         <div className="form-group">
//             <label htmlFor="exampleFormControlTextarea1"  style={{color: "black"}} >Note</label>
//             <textarea 
//             className="form-control" 
//             value={this.state.note}
//             name ="note"
//             id="note" 
//             onChange ={this.onChange}
//             rows="3"></textarea>
//         </div>
//         </Modal.Body>
//         <Modal.Footer>
//         <Button variant="secondary" onClick={this.handleClose}>
//             Close
//         </Button>
//         <Button 
//         variant="primary" 
//         type="submit"
//         onClick={this.handleClose}
//         >
//             Add to Cart
//         </Button>
//         </Modal.Footer>
//         </form> 
//     </Modal> 
//     ,document.getElementById('portal-root') 
//   )
// }

// Modal.propTypes = {
//   auth:propTypes.object.isRequired,
//   errors:propTypes.object.isRequired,
// };

// const mapStateToProps = (state) =>({
//   auth:state.auth,
//   errors:state.errors,
//   menuData:state.menuData
// });

// export default connect(mapStateToProps,{})(Modal)