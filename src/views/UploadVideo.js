import axios from "axios";
import React, { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function UploadVideo() {
  const [vedioFile, setVedioFile] = useState(null)
  const [posterName, setPosterName] = useState(null)
  const [videoName, setVideoName] = useState("")
  const [videoDetail, setVideoDetail] = useState("")
  const [videoType, setVideoType] = useState("")

  const onSubmit = async()=>{
    const formData = new FormData();
    formData.append('video', vedioFile);
    formData.append('videoType', videoType);
    formData.append('movieName', videoName);
    formData.append('videoDetail', videoDetail);
    let res =  await axios.post('http://localhost:3001/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    if(res.data.status == "success"){
      console.log("data ",res.data);
      console.log("id ",res.data.ID_movie);
      await savePoster(res.data.ID_movie)
    }
  }

  const savePoster = async(id)=>{
    const formData = new FormData();
    formData.append('img', posterName);
    formData.append('ID_movie', id);
    let res =  await axios.post('http://localhost:3001/video/uploadimg', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if(res.data.status == "success"){
      alert('upload success');
      window.location.reload();
    }
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Upload Movie</Card.Title>
              </Card.Header>
              <Card.Body className="upload">
              <form>
                <div className="form-group">
                  <div className="row p-2">
                    <label>NameMovie:  </label>
                    <input input type="text" className="form-control" onChange={(e)=>setVideoName(e.target.value)}  placeholder="NameMovie"></input>
                  </div>
                  <div className="row p-2">
                    <label>Synopsis:  </label>
                    <input input type="text" className="form-control" onChange={(e)=>setVideoDetail(e.target.value)} placeholder="Synopsis"></input>
                  </div>
                  <div className="row p-2">
                    {/* <!-- Large --> */}
                    <label>TypeMovie:</label>
                    <select name="cars" class="custom-select custom-select" onChange={(e)=>setVideoType(e.target.value)}>
                      <option selected>Please select TypeMovie</option>
                      <option value="1">1. Movie</option>
                      <option value="2">2. Drama</option>
                      <option value="3">3. Anime</option>
                    </select>
                  </div>
                  <div className="row p-2">
                    <label htmlFor="video">Choose a video to upload:</label>
                    <input
                      type="file"
                      className="form-control-file"
                      onChange={(e)=>setVedioFile(e.target.files[0])}
                    />
                  </div>
                  <div className="row p-2">
                    <label>Choose file Poster:</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="image"
                      accept="image/*" // Specify the accepted file types (in this case, any image file)
                    onChange={(e)=>setPosterName(e.target.files[0])}
                    />

                  </div>
                </div>

               
              </form>
              <button type="submit" className="btn btn-success mx-auto" onClick={()=>onSubmit()}>
                  Upload Video
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UploadVideo;
