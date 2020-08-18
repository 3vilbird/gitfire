import React, { useContext, useState } from "react";
import Axios from "axios";
import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Container,
} from "reactstrap";
import UserCard from "../components/UserCard";
import Repos from "../components/Repos";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

const Home = () => {
  const context = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const fetchDetails = async () => {
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      setUser(data);
      console.log({ data });
    } catch (error) {
      toast("not able to locate the user", { type: "error" });
    }
  };

  // keep any page behind a login
  if (!context.user?.uid) {
    return <Redirect to="/signin" />;
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Please provide a username"
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={fetchDetails}>
                Fetch user
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {user ? <UserCard user={user} /> : null}
        </Col>
        <Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
};

export default Home;
