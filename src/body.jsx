import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Logo from "./images/Logo.svg";
import menu from "./images/Menu.svg";
import imdb from "./images/IMDB.svg";
import Description from "./images/Description Box.svg";
import Icon from "./images/Icon.svg";
import Tomatoes from "./images/Tomatoes.svg";
import { Link } from "react-router-dom";

const Body = () => {
  const [dett, setDett] = useState([]);
  const [movTitle, setMovTitle] = useState("");
  const [fav, setFav] = useState(true);
  const [state, setState] = useState("#D1D5DB");


 
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjA4OTlmZGRkODNlZDM4MWFhNDIzNjNiOTMzMmYxYiIsInN1YiI6IjY0ZmU0ZDhiYzJmZjNkMDExYmQ5Nzc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q1aQsmoI71SVBfYeWNoAVCC2xhyqsR3hC3UYXWOgvww",
    },
  };
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/top_rated", options)
      .then((response) => response.json())
      .then((response) => {
        setDett(response.results.slice(0, 10));
      })
      .catch((err) => console.error(err));
  }, []);

  const search = (e) => {
    setFav(false);
    e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movTitle}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setDett(response.results);
      })
      .catch((err) => console.error(err));

    setMovTitle("");
    // console.log(totalMovie);
  };
 
  return (
    <>
      <Container fluid>
        <Row className="header">
          <Col xs={12} className="px-0">
            <Card className="text-white ">
              <Card.ImgOverlay className="px-md-5">
                <Card.Title>
                  {" "}
                  <Row className="sticky-top">
                    <Col xs={3} className="px-0">
                      <Image className="px-0 " fluid src={Logo} />{" "}
                      <span className="text-start"></span>{" "}
                    </Col>

                    <Col xs={6}>
                      <Form onSubmit={(e) => search(e)}>
                        <Col>
                          <Form.Control
                            className="search text-white"
                            value={movTitle}
                            onChange={(e) => setMovTitle(e.target.value)}
                            placeholder="What do you want to watch?"
                          />
                        </Col>
                      </Form>
                    </Col>

                    <Col xs={3} className="px-0 text-end">
                      <Image fluid src={menu} />
                    </Col>
                  </Row>
                </Card.Title>
                <Row className="fill ">
                  <Col className="d-flex align-items-end align-items-md-center">
                    <Card.Text class=" ">
                      <Image src={Description} fluid />
                    </Card.Text>
                  </Col>
                </Row>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 mb-4">
          <Col xs={12} className="d-flex justify-content-between px-3">
            <span className="fs-3">Featured Movie</span>{" "}
            <span className="d-flex align-items-center text-danger">
              See more
            </span>
          </Col>
        </Row>

        <Row>
          {dett.length > 0
            ? dett.map((res) => {
                return (
                  <Col
                    key={res.id}
                    xs={12}
                    md={4}
                    xl={3}
                    className="d-flex justify-content-around pb-5 position-relative "
                  >
                    <Card className="border-0 shadow-sm " data-testid= "movie-card">

                      <Link to={`/movies/${res.id}`}>
                       
                        <Card.Img
                        data-testid= "movie-poster"
                          fluid
                          className="w-100"
                          variant="top"
                          src={
                            "https://image.tmdb.org/t/p/w500" + res.poster_path
                          }
                        />
                      </Link>

                      <Card.Body className="ps-0">
                        <Card.Text data-testid= "movie-release-date"> {res.release_date}</Card.Text>
                        <Card.Title data-testid= "movie-title">{res.title}</Card.Title>
                        <Card.Text className="d-flex justify-content-between ">
                          <Image src={imdb} /> <Image src={Tomatoes} />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <svg
                      id={res.id}
                      style={{ position: "absolute", right: "30", top: "20" }}
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"

                      onClick={(e) => {
                            console.log(res.id)
                            
                      }}

                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.17157 1.48284C2.73367 -0.0381453 5.26633 -0.0381453 6.82842 1.48284L7.99999 2.62359L9.17157 1.48284C10.7337 -0.0381453 13.2663 -0.0381453 14.8284 1.48284C16.3905 3.00383 16.3905 5.46984 14.8284 6.99083L7.99999 13.6396L1.17157 6.99083C-0.390524 5.46984 -0.390524 3.00383 1.17157 1.48284Z"
                        fill={state}
                      />
                    </svg>
                  </Col>
                );
              })
            : "loading"}
        </Row>

        <Row></Row>
      </Container>
    </>
  );
};

export default Body;
