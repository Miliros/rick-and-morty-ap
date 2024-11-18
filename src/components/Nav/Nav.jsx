import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import logo from "../../assets/logo r&m.png";
import styles from "./Nav.module.css";

export default function NavBar() {
  const [navResponsive, setNavResponsive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleNav = () => setNavResponsive(!navResponsive);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // si hago scroll la fijo
      } else {
        setIsScrolled(false); //  vuelve a ser estática
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed={isScrolled ? "top" : undefined} // Solo si isscrolled es true
      className={styles.navBar}
    >
      <Container fluid>
        <Navbar.Brand href="/" className={styles.brand}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={toggleNav}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={navResponsive ? styles.active : ""}
        >
          <Nav className="ms-auto">
            {location.pathname !== "/home" && (
              <Link to="/home" className={styles.links}>
                <p className={styles.p}>Home</p>
              </Link>
            )}
            {location.pathname !== "/create" && (
              <Link to="/create" className={styles.links}>
                <p className={styles.p}>Create</p>
              </Link>
            )}

            {location.pathname !== "/create" && (
              <div className={styles.searchBar}>
                <SearchBar />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
