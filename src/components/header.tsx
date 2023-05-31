import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Font = styled.div`
  text-decoration: none;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-weight: 800;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  margin-right: 20px;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {
  const { scrollY } = useViewportScroll();
  const navAnimation = useAnimation();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo>
          <Link to="/">
            <Font>shoes-auction</Font>
          </Link>
        </Logo>
        <Items>
          <Item>
            <Link to="/auction">auction </Link>
          </Item>
          <Item>
            <Link to="/chat">chat</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Items>
          <Item>
            <Link to="/logout">logout</Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

export default Header;
