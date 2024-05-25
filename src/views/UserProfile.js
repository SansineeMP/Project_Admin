import React, { useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

function User() {
  const URLService = process.env.REACT_APP_API_URL;
  const [AlluserAcc, setAlluserAcc] = useState([]);
  const [userAcc, setUserAcc] = useState([]);
  const [fname, setFname] = useState([]);
  const [lname, setLname] = useState([]);
  const [email, setEmail] = useState([]);
  const [sex, setSex] = useState([]);
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [pack, setpack] = useState([]);
  const [pass_word, setPass_word] = useState([]);
  const [packageAll, setPackageAll] = useState([])
  const [packageID, setPackageID] = useState("")

  const getAlluserAcc = async () => {
    let res = await axios.get(`${URLService}/member/members`);
    setAlluserAcc(res.data);
    console.log(res.data);
  };

  const getuserAcc = async (ID_Member) => {
    let res = await axios.get(`${URLService}/member/member/${ID_Member}`);
    setUserAcc(res.data);
    console.log(res.data);
  };

  const onSaveuser = async () => {
    if (fname != "") {
      let res = await axios.post(`${URLService}/member/member`, {
        firstname: fname,
        surename: lname,
        pass_word: pass_word,
        email: email,
        ID_gender: sex,
        phone: phone,
        address: address,
        ID_package: pack,
      });
      if (res.data != "") {
        console.log("seccess", res.data);
        if(res.data.status == "success"){
          alert('Save success');
          window.location.reload();
        }
        setFname("");
        setLname("");
        setPass_word("");
        setEmail("");
        setSex("");
        setPhone("");
        setAddress("");
        setpack("");
      }
    } else {
      alert("Please enter complete information.");
    }
  };

  const onInputChange = (fieldName, value) => {
    const updatedUserAcc = [...userAcc];
    updatedUserAcc[0][fieldName] = value;
    setUserAcc(updatedUserAcc);
  };

  const onEdit = async () => {
    const res = await axios.put(
      `${URLService}/member/update/${userAcc[0].ID_Member}`,
      {
        firstname: userAcc[0].firstname,
        surename: userAcc[0].surename,
        pass_word: userAcc[0].pass_word,
        email: userAcc[0].Email,
        ID_gender: userAcc[0].ID_gender,
        phone: userAcc[0].phone,
        address: userAcc[0].address,
        ID_package: userAcc[0].ID_package,
      }
    );
    console.log("Edit success", res.data);
    if(res.data.status == "success"){
      alert('Edit success');
      window.location.reload();
    }
    setFname("");
    setLname("");
    setPass_word("");
    setEmail("");
    setSex("");
    setPhone("");
    setAddress("");
    setpack("");
  };

  const onDelete = async (ID_Member) => {
    console.log(ID_Member);
    let res = await axios.delete(`${URLService}/member/deleted/${ID_Member}`);
    if (res.data != "") {
      console.log("Delete Success", res.data);
      if(res.data.status == "success"){
        alert('Delete success');
        window.location.reload();
      }
    }
  };

  const getPackage = async()=>{
    let res = await axios.get(URLService+"/package")
    setPackageAll(res.data)
  }

  const getFilter = async()=>{
    console.log("packageID ",packageID);
    if(packageID == "all"){
      getAlluserAcc();
      setPackageID("")
    }else{
      let res = await axios.get(URLService+"/member/membertype/"+packageID)
      setAlluserAcc(res.data)
      setPackageID("")
    }
    
  }
  useEffect(() => {
    getAlluserAcc();
    getPackage()
  }, []);
  return (
    <div className="pageuser">
      <Container>
        <div className="text-center">
            <button className="btn btn-info" data-toggle="modal"
            data-target="#filter">Filter</button>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-success ml-auto"
            data-toggle="modal"
            data-target="#myModaluser"
          >
            Add User
          </button>
        </div>
        <div className="row">
          <h3>User Appplication</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Firstname</th>
                <th>Lastname</th>
                {/* <th>Password</th> */}
                <th>Email</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Package</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {AlluserAcc.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.firstname}</td>
                  <td>{item.surename}</td>
                  {/* <td>{item.pass_word}</td> */}
                  <td>{item.Email}</td>
                  <th>{item.gender}</th>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.packageDetail}</td>
                  <th>
                    <button
                      type="button"
                      className="btn btn-info"
                      data-toggle="modal"
                      data-target="#myModaledit"
                      onClick={() => getuserAcc(item.ID_Member)}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDelete(item.ID_Member)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <!-- The ModalEdituser --> */}
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
                          Firsname:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="Firsname"
                            value={userAcc?.[0]?.firstname}
                            onChange={(e) =>
                              onInputChange("firstname", e.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Lastname:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="Lastname"
                            value={userAcc?.[0]?.surename}
                            onChange={(e) =>
                              onInputChange("surename", e.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>
                          Password:
                          <input
                            input
                            type="password"
                            className="form-control"
                            id="password2"
                            placeholder="Password"
                            value={userAcc?.[0]?.pass_word}
                            onChange={(e) =>
                              onInputChange("pass_word", e.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Email:
                          <input
                            input
                            type="email"
                            className="form-control"
                            id="email2"
                            placeholder="E-mail"
                            value={userAcc?.[0]?.Email}
                            onChange={(e) =>
                              onInputChange("Email", e.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>
                          Phone:
                          <input
                            input
                            type="text"
                            className="form-control"
                            id="phone2"
                            placeholder="Phone"
                            value={userAcc?.[0]?.phone}
                            onChange={(e) =>
                              onInputChange("phone", e.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Gender:
                          <input
                            input
                            type="text"
                            className="form-control"
                            id="gender2"
                            placeholder="Gender"
                            value={userAcc?.[0]?.ID_gender}
                            onChange={(e) =>
                              onInputChange("sex", e.target.value)
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>
                          Address:
                          <input
                            input
                            type="text"
                            className="form-control"
                            id="address2"
                            placeholder="Address"
                            value={userAcc?.[0]?.address}
                            onChange={(e) =>
                              onInputChange("address", e.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Package:
                          <input
                            input
                            type="text"
                            className="form-control"
                            id="package2"
                            placeholder="Package"
                            value={userAcc?.[0]?.ID_package}
                            onChange={(e) =>
                              onInputChange("ID_Package", e.target.value)
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

        <div className="modal fade" id="filter">
  <div className="modal-dialog">
    <div className="modal-content">

      
      <div className="modal-header">
        <h4 className="modal-title">Filter</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

      
      <div className="modal-body">
      <div className="form-group">
        <select className="form-control" value={packageID} onChange={(e)=>setPackageID(e.target.value)}>
          <option>----------------</option>
          <option value={"all"}>All</option>
          {
            packageAll.map((item,index)=>(
              <option value={item.ID_package}>{item.packageDetail}</option>
            ))
          }
        </select>
<div className="text-center" style={{marginTop:"10px"}}>
  <button className="btn btn-success" onClick={()=>getFilter()} data-dismiss="modal">Search</button>

</div>
      </div>
      </div>

      
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>

        {/* <!-- The ModalAdduser --> */}
        <div className="adduser">
          <div className="modal" id="myModaluser">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                  <h4 className="modal-title">Add user</h4>
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
                          Firsname:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="Firsname"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                          ></input>
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Lastname:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="Lastname"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                          ></input>
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>
                          Password:
                          <input
                            input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={pass_word}
                            onChange={(e) => setPass_word(e.target.value)}
                          ></input>
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Email:
                          <input
                            input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          ></input>
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>
                          Phone:
                          <input
                            input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          ></input>
                        </label>
                      </div>
                      <div className="col-6">
                        <label htmlFor="gender">Gender:</label>
                        <select
                          className="form-control"
                          id="gender"
                          value={sex}
                          onChange={(e) => setSex(e.target.value)}
                        >
                          <option value="">Choose gender</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Orter</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>
                          Address:
                          <input
                            input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          ></input>
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Package:
                          <input
                            input
                            type="text"
                            className="form-control"
                            id="package"
                            placeholder="Package"
                            value={pack}
                            onChange={(e) => setpack(e.target.value)}
                          ></input>
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-success mx-auto"
                      data-dismiss="modal"
                      onClick={() => onSaveuser()}
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

export default User;
