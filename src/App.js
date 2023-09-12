import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

function App() {
  const [dett, setDett] = useState([]);
  const [movTitle, setMovTitle] = useState("");
  const [totalMovie, setTotalMovie] = useState([])
  const [fav,setFav] = useState(true)

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjA4OTlmZGRkODNlZDM4MWFhNDIzNjNiOTMzMmYxYiIsInN1YiI6IjY0ZmU0ZDhiYzJmZjNkMDExYmQ5Nzc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q1aQsmoI71SVBfYeWNoAVCC2xhyqsR3hC3UYXWOgvww",
    },
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setDett(response.results))
      .catch((err) => console.error(err));
  },[]);

  const subb = (e) => {
    setFav(false)
   e.preventDefault()
  
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movTitle}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setTotalMovie(response.results))
      .catch((err) => console.error(err));
 
 setMovTitle('')

  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="cc ">
              <Card.Img src="" alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>
                  {" "}
                  <Row>
                   
                   <Col xs={4}>
                    MovieBox
                   </Col>

                   <Col xs={4}>
                   <Form onSubmit={e => subb(e)}>
                  
                  <Col>
                    <Form.Control
                      value={movTitle}
                      onChange={(e) => setMovTitle(e.target.value)}
                      placeholder="First name"
                    />
                  </Col>
                
              </Form>
                   </Col>

                   <Col xs={4} className="text-end">
                    Sign in
                   </Col>

                 

                  </Row>
                
                </Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>

        <Row>
          {fav && dett.map((res) => {
            return (
              <Col
                key={res.id}
                xs={12}
                md={4}
                xl={3}
                className="d-flex justify-content-around"
              >
                <Card className="border-0" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={"https://image.tmdb.org/t/p/w500" + res.poster_path}
                  />
                  <Card.Body className="ps-0">
                    <Card.Text>USA {res.release_date}</Card.Text>
                    <Card.Title>{res.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      
        <Row>
        {!fav && totalMovie.map((res) => {
            return (
              <Col
                key={res.id}
                xs={12}
                md={4}
                xl={3}
                className="d-flex justify-content-around"
              >
                <Card className="border-0" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={"https://image.tmdb.org/t/p/w500" + res.poster_path}
                  />
                  <Card.Body className="ps-0">
                    <Card.Text>USA {res.release_date}</Card.Text>
                    <Card.Title>{res.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default App;
