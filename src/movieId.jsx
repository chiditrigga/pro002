import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import movie from "./images/tv.svg";
import Calendar from "./images/Calendar.svg";
import Sidepic from "./images/Rectangle 37.svg";

import logout from "./images/Logout.svg";
import Home from "./images/Home.svg";
import Tv from "./images/TV Show.svg";
import group45 from "./images/Movie Projector.svg";
import List from "./images/List.svg";
import Tickets from "./images/Tickets.svg";
import Form from "react-bootstrap/Form";
import "./side.css";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const MovieId = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [imgLoading, setImgLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjA4OTlmZGRkODNlZDM4MWFhNDIzNjNiOTMzMmYxYiIsInN1YiI6IjY0ZmU0ZDhiYzJmZjNkMDExYmQ5Nzc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q1aQsmoI71SVBfYeWNoAVCC2xhyqsR3hC3UYXWOgvww",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        setMovieDetails(response);

        setImgLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  

  
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2} className="side px-0 fi ">
            <div className=" py-3 pb-0">
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                <Image fluid className="mx-auto" src={movie} />
                <span className="ps-5 ps-md-2 ps-lg-2 fw-bold">
                  Movie Box
                </span>{" "}
              </Link>
            </div>
            <Row
              style={{ color: "rgba(102, 102, 102, 1)" }}
              className=" h-75 d-none d-sm-block fw-bold d-flex justify-content-center w-100 mx-auto"
            >
              <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
                <Col xs={12} className="py-3 ps-2 changehov">
                  <Image fluid src={Home} className="pe-2" /> Home
                </Col>
              </Link>
              <Col
                xs={12}
                style={{
                  background: "rgba(190, 18, 60, 0.1)",
                  borderRight: "6px solid rgba(190, 18, 60, 1)",
                }}
                className="py-3 changehov"
              >
                <Image className="pe-2 " fluid src={group45} />{" "}
                <span className="text-baseline">Movies</span>{" "}
              </Col>
              <Col xs={12} className="py-3 mt-2 changehov">
                {" "}
                <Image className="" fluid src={Tv} /> TV Series{" "}
              </Col>
              <Col xs={12} className="py-3 mt-2 changehov">
                <Image fluid src={Calendar} /> Upcoming
              </Col>
              <Col xs={12} className="py-3 mt-2">
                <div
                  className="p-3"
                  style={{
                    border: "1px solid rgba(190, 18, 60, 0.7)",
                    borderRadius: "20px",
                  }}
                >
                  <h6 className="fw-bolder">
                    Play movie quizes and earn free tickets
                  </h6>
                  <p className="fw-light">50k people are playing now</p>
                  <div className="text-center pt-0 mt-0">
                    <Button
                      style={{
                        color: "rgba(190, 18, 60, 1)",
                        background: "rgba(190, 18, 60, 0.2)",
                        border: "rgba(190, 18, 60, 0.2)",
                        borderRadius: "30px",
                      }}
                    >
                      Start playing
                    </Button>
                  </div>
                </div>
              </Col>
              <Col xs={12} className=" changehov">
                {" "}
                <Image fluid src={logout} /> Log out{" "}
              </Col>
            </Row>
          </Col>

          <Col md={10} className="main ">
            <Row>
              <Col className="mx-auto text-center" md={12}>
                {imgLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "60vh", width: "90%" }}
                  >
                    <Spinner animation="border " />{" "}
                  </div>
                ) : (
                  <Image
                    fluid
                    style={{
                      height: "60vh",
                      width: "90%",
                      borderRadius: "20px",
                    }}
                    className="mt-2"
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      movieDetails.poster_path
                    }
                  />
                )}
              </Col>
            </Row>
            <Row className="mx-auto " style={{ width: "90%" }}>
              <Col md={8} className="ps-0">
                <div className="py-1">
                  <span className="fw-bold" data-testid="movie-title">
                    {movieDetails.title}
                  </span>
                  <span data-testid="movie-release-date" className="fw-bold px-5 ">
                    {movieDetails.release_date}
                  </span>
                  <span className="fw-bold" data-testid="movie-runtime">
                    {movieDetails.runtime}
                  </span>
                  m
                </div>

                <div className="overview" data-testid="movie-overview">
                  
                  {movieDetails.overview}
                </div>
                <div className="writers d-grid gap-2">
                  <span className="py-1">
                    Director:{" "}
                    <span style={{ color: "rgba(190, 18, 60, 1)" }}>
                      Joseph Kosinski
                    </span>{" "}
                  </span>
                  <span>
                    Writers:{" "}
                    <span style={{ color: "rgba(190, 18, 60, 1)" }}>
                      Jim Cash, Jack Epps Jr, Peter Craig
                    </span>
                  </span>
                  <span>
                    Stars:{" "}
                    <span style={{ color: "rgba(190, 18, 60, 1)" }}>
                      Tom Cruise, Jennifer Connelly, Miles Teller
                    </span>{" "}
                  </span>
                </div>
                <Row className="pt-2">
                  <Col md={4} className="px-0">
                    {" "}
                    <Button
                      style={{
                        background: "rgba(190, 18, 60, 1)",
                        borderColor: "rgba(190, 18, 60, 1)",
                      }}
                      className="w-100"
                    >
                      Top rated movie#65
                    </Button>
                  </Col>
                  <Col md={8} className="ps-0">
                    {" "}
                    <Form.Select
                      className="w-100 h-100"
                      aria-label="Default select example"
                    >
                      <option>Awards 9 nominations</option>
                      <option value="1">Awards 9 nominations</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="px-0">
                <Button
                  style={{
                    background: "rgba(190, 18, 60, 1)",
                    borderColor: "rgba(190, 18, 60, 1)",
                  }}
                  className="w-100 my-2"
                >
                  <Image fluid src={Tickets} />
                  See Showtimes
                </Button>
                <Button
                  style={{
                    color: "rgba(51, 51, 51, 1)",
                    background: "rgba(190, 18, 60, 0.1)",
                    borderColor: "rgba(190, 18, 60, 0.1)",
                  }}
                  className="w-100 mb-2"
                >
                  <Image fluid src={List} />
                  More watch options
                </Button>
                <Image src={Sidepic} fluid />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieId;
