import React, { useState, useEffect, useRef } from "react";
import "../../styles/nav.css";
import imgUrl from "../../assets/images/webclub-logo-blue.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  z-index: 1;
  justify-content: center;
  background: #effffa;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 600px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0d0c1d;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: left;
      margin-left: 25%;
    }

    &:hover {
      color: #343078;
    }
  }
`;

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/members">Team</Link>
      <a href="/timeline">Timeline</a>
    </StyledMenu>
  );
};

const StyledBurger = styled.button`
  position: relative;
  /* top: 5%; */
  /* left: 2rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? "#0D0C1D" : "#1490e4")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

const MobileNav = props => {
  function classList(...classes) {
    return classes.filter(item => !!item).join(" ");
  }
  const imageUrl = `url(${imgUrl})`;
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;

  // Code to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 670;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let styles;
  if (props.transp === "false") {
    styles = {
      background: "white"
    };
  } else {
    styles = {
      transition: "2s ease",
      backgroundColor: navBackground ? "white" : "transparent"
    };
  }
  return (
    <div
      className={classList(
        "mnav",
        props.sticky === "true" && "nav-sticky",
        props.sticky === "false" && "nav-fixed"
      )}
      style={styles}
    >
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
      <span className="logo" style={{ backgroundImage: imageUrl }} />
    </div>
  );
};

export default MobileNav;
