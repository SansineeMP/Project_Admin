import React, { useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
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

function VideoList() {
  const URLService = process.env.REACT_APP_API_URL;
  const [movieData, setMovieData] = useState([]);
  const [movieID, setMovieID] = useState([]);
  const [Name, setName] = useState([]);
  const [detail, setDetail] = useState([]);
  const [type, setType] = useState([]);

  const getMovie = async () => {
    // console.log("data",movieData);
    let res = await axios.get(`${URLService}/video/video/getall`);

    console.log("data ", res.data);
    setMovieData(res.data);
  };

  const getMovieID = async (ID_movie) => {
    let res = await axios.get(`${URLService}/video/video/${ID_movie}`);
    setMovieID(res.data);
    console.log(res.data);
  };

  const onInputChange = (fieldName, value) => {
    const updatedMovie = [...movieID];
    updatedMovie[0][fieldName] = value;
    setMovieID(updatedMovie);
  };

  const onEdit = async () => {
    const res = await axios.put(
      `${URLService}/video/update/${movieID[0].ID_movie}`,
      {
        Name_movie: movieID[0].Name_movie,
        // video_name: movieID[0].video_name,
        video_detail: movieID[0].video_detail,
        ID_typeMovie: movieID[0].ID_typeMovie,
      }
    );
    console.log("Edit success", res.data);
    if(res.data.status == "success"){
      alert('Edit success');
      window.location.reload();
    }
    setName("");
    setDetail("");
    setType("");
  };

  const onDelete = async (ID_movie) => {
    console.log(ID_movie);
    let res = await axios.delete(`${URLService}/video/deleted/${ID_movie}`);
    if (res.data != "") {
      console.log("Delete Success", res.data);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">VideoList</Card.Title>
              </Card.Header>
              <Card.Body className="videolist">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Movie Name</th>
                      <th>Video</th>
                      <th>TypeMovie</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movieData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Name_movie}</td>
                        <td>
                          <ReactPlayer
                            controls={true}
                            width={200}
                            height={100}
                            url={`${URLService}/video/${item.video_name}`}
                          />
                        </td>
                        <td>{item.nameTypemovie}</td>
                        <td>
                        <button
                          type="button"
                          className="btn btn-info"
                          data-toggle="modal"
                          data-target="#myModaledit"
                          onClick={() => getMovieID(item.ID_movie)}
                        >
                          Edit
                        </button>&nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => onDelete(item.ID_movie)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
                          Name_movie:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="Name_movie"
                            value={movieID?.[0]?.Name_movie}
                            onChange={(e) =>
                              onInputChange("Name_movie", e.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          Video_name:
                          <input
                            type="text"
                            className="form-control"
                            placeholder="video_name"
                            value={movieID?.[0]?.video_name}
                            onChange={(e) =>
                              onInputChange("video_name", e.target.value)
                            }
                            readOnly
                          />
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label>
                          Video_detail:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="video_detail"
                            value={movieID?.[0]?.video_detail}
                            onChange={(e) =>
                              onInputChange("video_detail", e.target.value)
                            }
                          />
                        </label>
                      </div>
                      <div className="col-6">
                        <label>
                          ID_typeMovie:
                          <input
                            input
                            type="text"
                            className="form-control"
                            placeholder="ID_typeMovie"
                            value={movieID?.[0]?.ID_typeMovie}
                            onChange={(e) =>
                              onInputChange("ID_typeMovie", e.target.value)
                            }
                            readOnly
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
    </>
  );
}

export default VideoList;
