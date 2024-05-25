import React, { useEffect } from "react";
import { useState } from "react";
import ChartistGraph from "react-chartist";
import axios from "axios";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  const URLService = process.env.REACT_APP_API_URL;
  const [AlluserAcc, setAlluserAcc] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [packagePrice, setPacePrice] = useState([]);
  const [sumprice, setSumprice] = useState([]);
  const [typePriceOne, setTypePriceOne] = useState("");
  const [typePriceTwo, setTypePriceTwo] = useState("");
  const [typePriceTree, setTypePriceTree] = useState("");
  const [namePackageOne, setNamePackageOne] = useState("");
  const [namePackageTwo, setNamePackageTwo] = useState("");
  const [namePackageTree, setNamePackageTree] = useState("");
  const [movieNameOne, setMovieNameOne] = useState("")
  const [movieNameTwo, setMovieNameTwo] = useState("")
  const [movieNameThree, setMovieNameThree] = useState("")
  const [movieLikeOne, setMovieLikeOne] = useState("")
  const [movieLikeTwo, setMovieLikeTwo] = useState("")
  const [movieLikeThree, setMovieLikeThree] = useState("")


  const getMovielike = async()=>{
    let res = await axios.get(URLService+"/movielike/all")
    if(res.data.length > 0 ){
      let movieData = res.data
      setMovieNameOne(movieData[0].Name_movie)
      setMovieNameTwo(movieData[1].Name_movie)
      setMovieNameThree(movieData[2].Name_movie)
      setMovieLikeOne(movieData[0].Likes)
      setMovieLikeTwo(movieData[1].Likes)
      setMovieLikeThree(movieData[2].Likes)
      console.log("movieData[0].Likes ",movieData[0].Likes);
      console.log("movieData[1].Likes ",movieData[1].Likes);
      console.log("movieData[2].Likes ",movieData[2].Likes);
    }
  }
  const getAlluserAcc = async () => {
    let res = await axios.get(`${URLService}/member/members`);
    setAlluserAcc(res.data.length);
    console.log("User",res.data.length);
  };

  const getMovie = async () => {
    // console.log("data",movieData);
    let res = await axios.get(`${URLService}/video/video/getall`);
    setMovieData(res.data.length);
    console.log("Video",res.data.length);
  };

  const getPackage = async () => {
    let res = await axios.get(`${URLService}/package`);
    // console.log("dataPackage", res.data);
    setPackageData(res.data.length);
    console.log("Package",res.data.length);
  };

  const getSumPrice = async () => {
    try {
      let res = await axios.get(`${URLService}/sumprice/total`);
      console.log("SumPrice", res.data); 
      setSumprice(res.data); 
    } catch (error) {
      console.error("Error fetching sumprice:", error);
    }
  };

  const getTypePrice = async () => {
      let res = await axios.get(`${URLService}/sumprice/type`);
      if(res.data.length > 0){
        let packagePrice = res.data
        setTypePriceOne(packagePrice[0].Total)
        setTypePriceTwo(packagePrice[1].Total)
        setTypePriceTree(packagePrice[2].Total)
        setNamePackageOne(packagePrice[0].packageDetail)
        setNamePackageTwo(packagePrice[1].packageDetail)
        setNamePackageTree(packagePrice[2].packageDetail)
        console.log("packagePrice[0].Total",packagePrice[0].Total);
        console.log("packagePrice[1].Total",packagePrice[1].Total);
        console.log("packagePrice[2].Total",packagePrice[2].Total);
      }
    
  };

  useEffect(() => {
    getAlluserAcc();
    getMovie();
    getPackage();
    getMovielike();
    getSumPrice();
    getTypePrice();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">User</p>
                      <Card.Title as="h4">{AlluserAcc}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              {/* <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Video</p>
                      <Card.Title as="h4">{movieData}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              {/* <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Package</p>
                      <Card.Title as="h4">{packageData}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              {/* <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                  <div className="icon-big text-center icon-primary">
                    <i className="fas fa-money-bill-alt text-primary"></i>
                  </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Income</p>
                      <Card.Title as="h4">
                        {sumprice.map((item) => (
                          <span key={item.id}>{item.Total}</span>
                        ))}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              {/* <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Video Like</Card.Title>
                <p className="card-category">Most Like Videos</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        movieNameOne,
                        movieNameTwo,
                        movieNameThree
                      ],
                      series: [
                       [ movieLikeOne,
                        movieLikeTwo,
                        movieLikeThree]
                      ],
                    }}
                    type="Bar"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Package Income</Card.Title>
                <p className="card-category">Package by price</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [typePriceOne, typePriceTwo, typePriceTree],
                      series: [typePriceOne, typePriceTwo, typePriceTree],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  {namePackageOne} <br></br>
                  <i className="fas fa-circle text-danger"></i>
                  {namePackageTwo} <br></br>
                  <i className="fas fa-circle text-warning"></i>
                  {namePackageTree} 
                </div>
                <hr></hr>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
