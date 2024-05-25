import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Package() {
  const URLService = process.env.REACT_APP_API_URL;
  const [packageData, setPackageData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [price, setPrice] = useState([]);
  const [packageID, setPackageID] = useState([]);

  const getPackage = async () => {
    let res = await axios.get(`${URLService}/package`);
    // console.log("dataPackage", res.data);
    setPackageData(res.data);
    console.log("Package",res.data);
  };

  const getPackageID = async (ID_package) => {
    let res = await axios.get(`${URLService}/package/packageID/${ID_package}`);
    setPackageID(res.data);
    console.log(res.data);
  };

  const onSavePackage = async () => {
    if (price != "") {
      let res = await axios.post(`${URLService}/package/package`, {
        packageDetail: detail,
        packagePrice: price,
      });
      if (res.data != "") {
        console.log("seccess", res.data);
        if(res.data.status == "success"){
          alert('Save success');
          window.location.reload();
        }
        setDetail("");
        setPrice("");
      }
    } else {
      alert("Please enter complete information.");
    }
  };


  const onInputChange = (fieldName, value) => {
    const updatedPackage = [...packageID];
    updatedPackage[0][fieldName] = value;
    setPackageID(updatedPackage);
  };

  const onEdit = async () => {
    const res = await axios.put(
      `${URLService}/package/update/${packageID[0].ID_package}`,
      {
        ID_package : packageID[0].ID_package,
        packageDetail: packageID[0].packageDetail,
        packagePrice: packageID[0].packagePrice,
      }
    );
    console.log("Edit success", res.data);
    if(res.data.status == "success"){
      alert('Edit success');
      window.location.reload();
    }
  };

  // const onEdit = async () => {
  //   const res = await axios.put(
  //     `${URLService}/package/update/${packageID[0].ID_package}`,
  //     {
  //       packageDetail: packageID[0].packageDetail,
  //       packagePrice: packageID[0].packagePrice,
  //     }
  //   );
  //   console.log("Edit success", res.data);
  //   if(res.data.status == "success"){
  //     alert('Edit success');
  //     window.location.reload();
  //   }
  // };


  const onDelete = async (ID_package) => {
    console.log(ID_package);
    let res = await axios.delete(
      `${URLService}/package/deleted/${ID_package}`
    );
    if (res.data != "") {
      console.log("Delete Success", res.data);
    }
  };

  useEffect(() => {
    getPackage();
  }, []);
  return (
    <div className="pagePagkage">
      <Container fluid>
        <div className="row">
          <button
            type="button"
            className="btn btn-success ml-auto"
            data-toggle="modal"
            data-target="#Modalpackage"
          >
            Add Package
          </button>
        </div>
        <div className="container">
          <h3>Promotion Package</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Package Detail</th>
                <th>Package Price</th>
                <th>ID Package</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {packageData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.packageDetail}</td>
                  <td>{item.packagePrice}</td>
                  <td>{item.ID_package}</td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-info"
                      data-toggle="modal"
                      data-target="#myModaledit"
                      onClick={() => getPackageID(item.ID_package)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                  Test modal
                </button>&nbsp; */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDelete(item.ID_package)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <!-- The ModalAdd --> */}
        <div className="addpakage">
          <div className="modal" id="Modalpackage">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                  <h4 className="modal-title">Add Package</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                  <form className="form-inline">
                    <div className="row">
                      <div className="col-6">
                        <label>
                          Package:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="Package Detail"
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                          ></input>
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Price:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          ></input>
                        </label>
                      </div>
                    </div>

                    {/* <div className="row">
                    <div className="col-12">
                      <label>Price:
                        <input input type="text" className="form-control" id="password2" placeholder="Price" ></input>
                      </label>
                    </div> */}
                    {/* <div className="col-6">
                      <label>QRcode:
                      <input
                      type="file"
                      className="form-control-file"
                      id="image"
                      accept="image/*" // Specify the accepted file types (in this case, any image file)
                    
                    /></label>
                    </div> */}
                    {/* </div> */}
                  </form>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-success mx-auto"
                      data-dismiss="modal"
                      onClick={() => onSavePackage()}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary ml-auto mt-2"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- The ModalEditvideo --> */}
        <div className="edit">
          <div className="modal" id="myModaledit">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                  <h4 className="modal-title">Edit User</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                  <form className="form-inline">
                    <div className="row">
                      <div className="col-6">
                        <label>
                          packageDetail:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="packageDetail"
                            value={packageID?.[0]?.packageDetail}
                            onChange={(e) =>
                              onInputChange("packageDetail", e.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          packagePrice:
                          <input
                            type="text"
                            className="form-control"
                            placeholder="packagePrice"
                            value={packageID?.[0]?.packagePrice}
                            onChange={(e) =>
                              onInputChange("packagePrice", e.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-success mx-auto"
                      data-dismiss="modal"
                      onClick={() => onEdit()}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* <!-- Modal footer --> */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary ml-auto mt-2"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Package;
