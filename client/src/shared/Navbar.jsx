//
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import {
  Button,
  Container,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { logout } from "../redux/auth";
import { Media } from "../utilities/Artsy";
import { MAIN_COLOR } from "../utilities/theme";

//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//

import Footer from "./Layout";

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

const NavItems = [
  {
    name: "الدروس",
    path: "/courses",
  },
  {
    name: " دليل المستخدم",
    path: "/guide",
  },
  {
    name: "الاهداف",
    path: "/goals",
  },

  {
    name: "المساعدة",
    path: "/help",
  },
  {
    name: "الاتصال بنا",
    path: "/contactus",
  },
];
const Navbar = ({ children }) => {
  // ────────────────────────────────────────────────────────────────────────────────
  const dispatch = useDispatch();
  const location = useLocation();
  const [sidebarOpened, setSidebar] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // ────────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Media as={Sidebar.Pushable} at="mobile">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            direction="right"
            inverted
            onHide={() => setSidebar(false)}
            vertical
            visible={sidebarOpened}
          >
            {isAuthenticated ? (
              <>
                <Menu.Item>
                  <Image avatar src="/logo.png" />
                </Menu.Item>
                {user.role === "admin" && (
                  <Menu.Item
                    as={Link}
                    to={"/admin"}
                    onClick={() => setSidebar(false)}
                  >
                    التحكم
                  </Menu.Item>
                )}
                {user.role !== "admin" &&
                  user.role !== "teacher" &&
                  NavItems.map((item) => (
                    <Menu.Item
                      as={Link}
                      to={item.path}
                      active={item.path === location.pathname}
                      onClick={() => setSidebar(false)}
                    >
                      {item.name}
                    </Menu.Item>
                  ))}
                <Menu.Item
                  onClick={() => {
                    dispatch(logout());
                    setSidebar(false);
                  }}
                >
                  خروج
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <Image avatar src="/logo.png" />
                </Menu.Item>
                <Menu.Item as={Link} to="/" onClick={() => setSidebar(false)}>
                  الرئيسية
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/guide"
                  onClick={() => setSidebar(false)}
                >
                  دليل المستخدم
                </Menu.Item>
                <Menu.Item as={Link} to="/login">
                  دخول
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/register"
                  onClick={() => setSidebar(false)}
                >
                  تسجيل
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/goals"
                  onClick={() => setSidebar(false)}
                >
                  الأهداف
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/help"
                  onClick={() => setSidebar(false)}
                >
                  المساعدة
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/contactus"
                  onClick={() => setSidebar(false)}
                >
                  الاتصال بنا
                </Menu.Item>
              </>
            )}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment inverted textAlign="center" vertical>
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item as={Link} to="/">
                    الرئيسية
                  </Menu.Item>
                  <Menu.Item position="right" onClick={() => setSidebar(true)}>
                    <Icon name="align right" />
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            <div style={{ minHeight: "100vh", marginTop: 10 }}>{children}</div>
            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
      <Media greaterThan="mobile">
        <Menu pointing size="huge">
          <Container>
            <Menu.Item>
              <Image avatar src="/logo.png" />
            </Menu.Item>

            {isAuthenticated &&
              user.role !== "admin" &&
              user.role !== "teacher" &&
              NavItems.map((item) => (
                <Menu.Item
                  as={Link}
                  to={item.path}
                  active={item.path === location.pathname}
                  onClick={() => setSidebar(false)}
                  pointing={item.path === location.pathname}
                >
                  {item.name}
                </Menu.Item>
              ))}
            {isAuthenticated && (
              <Menu.Item
                as={Link}
                to={"/questions"}
                onClick={() => setSidebar(false)}
              >
                الأسئلة
              </Menu.Item>
            )}
            {!isAuthenticated ? (
              <>
                <Menu.Item
                  as={Link}
                  to={"/"}
                  active={"/" === location.pathname}
                  onClick={() => setSidebar(false)}
                  pointing={"/" === location.pathname}
                >
                  الرئيسية
                </Menu.Item>
          
                <Menu.Item position="left"></Menu.Item>
                <Menu.Item as={Link} to="/guide">
                  دليل المستخدم
                </Menu.Item>
                <Menu.Item as={Link} to="/goals">
                  الأهداف
                </Menu.Item>
                <Menu.Item as={Link} to="/help">
                  المساعدة
                </Menu.Item>
                <Menu.Item as={Link} to="/contactus">
                  الاتصال بنا
                </Menu.Item>

                <Menu.Item>
                  <Button
                    color={MAIN_COLOR}
                    as={Link}
                    size="medium"
                    to="/login"
                    style={{ marginLeft: 10 }}
                    onClick={() => setSidebar(false)}
                  >
                    دخول
                  </Button>
                  <Button
                    as={Link}
                    size="large"
                    to="/register"
                    style={{ marginLeft: "0.5em" }}
                    onClick={() => setSidebar(false)}
                  >
                    تسجيل
                  </Button>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item position="left"></Menu.Item>

                <Menu.Item>
                  {isAuthenticated &&
                    user.role !== "admin" &&
                    user.role !== "teacher" && (
                      <Button
                        size="medium"
                        as={Link}
                        color={MAIN_COLOR}
                        style={{ marginLeft: "0.5em" }}
                        to="/profile"
                      >
                        حسابي
                      </Button>
                    )}
                  {isAuthenticated && user.role === "admin" && (
                    <Button
                      size="medium"
                      as={Link}
                      color={MAIN_COLOR}
                      style={{ marginLeft: "0.5em" }}
                      to="/admin"
                      onClick={() => setSidebar(false)}
                    >
                      التحكم
                    </Button>
                  )}
                  <Button
                    size="medium"
                    style={{ marginLeft: "0.5em" }}
                    onClick={() => dispatch(logout())}
                  >
                    خروج
                  </Button>
                </Menu.Item>
              </>
            )}
          </Container>
        </Menu>
        <div style={{ minHeight: "100vh" }}>{children}</div>
        <Footer />
      </Media>
    </>
  );
};

export default Navbar;
