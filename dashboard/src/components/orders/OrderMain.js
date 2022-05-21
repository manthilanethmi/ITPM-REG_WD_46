import React from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import moment from "moment";

const OrderMain = () => {
  
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const GeneratePDF =() =>{
    var doc = new jsPDF("p","pt","a4","pdf");
    doc.html(document.querySelector('.xx'),{
      callback:function(pdf){
        pdf.save("Adminorders.pdf");
      }
    });
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2" 
              /> 
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="xx">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
          </div>
                <p> DATE&nbsp;&nbsp; : &nbsp;&nbsp;{moment().format('LLLL')}<br/>
                    SIGN OF ADMIN&nbsp;&nbsp; : </p>
        </div>
        <br/>
            <center>
            <button type="button" className="btn btn-secondary" onClick={GeneratePDF}> Print As PDF </button>
            </center>
      </div>
    </section>
  );
};

export default OrderMain;
