import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import axios from "axios";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listMyOrders } from "../../Redux/Actions/OrderActions";
import { useEffect } from "react";

const Orders = (props) => {
  const { loading, error, orders } = props;
  const dispatch = useDispatch();

  const orderDelete = useSelector((state) => state.orderDelete);
  const { error:errorDeleteOrder, success:successDeleteOrder } = orderDelete;

 useEffect(() =>{
   dispatch(listMyOrders());
 }, [dispatch,successDeleteOrder]);

 const onDelete  = (id) =>{
    if(window.confirm("Are you sure??")){
      dispatch(deleteOrder(id));
    }
  };

  const GeneratePDF =() =>{
    var doc = new jsPDF("p","pt","a4","pdf");
    doc.html(document.querySelector('.tx'),{
      callback:function(pdf){
        pdf.save("Allorders.pdf");
      }
    });
  };

  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {errorDeleteOrder && (
        <Message variant="alert-danger">{errorDeleteOrder}</Message>
      )}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <div className="tx">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                      key={order._id}
                    >
                      <td>
                        <a href={`/order/${order._id}`} className="link">
                          {order._id}
                        </a>
                      </td>
                      <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>${order.totalPrice}</td>
                      <td> <a className="btn btn-info" href="#"
                          onClick={() => onDelete(order._id)}><i className="far fa-trash-alt"></i>&nbsp; Delete Order </a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
                <p> DATE&nbsp;&nbsp; :&nbsp;&nbsp; {moment().format('LLLL')}<br/>
                    SIGN OF ADMIN&nbsp;&nbsp; : </p>
                          </div>
             
            <br/>
            <center>
            <button type="button" className="btn btn-secondary" onClick={GeneratePDF}> Print Document </button>
            </center>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
