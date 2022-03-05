import React, { useEffect, useState } from "react";
import style from "../styles/navbar.module.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close";
import Menu from "@mui/icons-material/Menu";
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setMenuIcon(mediaQuery.matches);
  }, []);

  return (
    <div className={style.body}>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item>
          <Typography
            variant={menuIcon ? "h5" : "h2"}
            style={{
              color: "#8a2be2",
              fontWeight: 600,
              marginLeft: 2,
              position: "absolute",
              top: 3,
            }}
          >
            Primal Music
          </Typography>
        </Grid>
        {menuIcon ? (
          menuOpen ? (
            <div onClick={() => setMenuOpen(false)} style={{ zIndex: 5 }}>
              <Close
                sx={{ color: "#8a2be2" }}
                fontSize="large"
                style={{ marginRight: 10 }}
              />
            </div>
          ) : (
            <div onClick={() => setMenuOpen(true)}>
              <Menu
                sx={{ color: "#8a2be2" }}
                fontSize="large"
                style={{ marginRight: 10, zIndex: 2 }}
              />
            </div>
          )
        ) : (
          <Grid item>
            <div className={style.grid__container}>
              <Button
                style={{
                  color: "#8a2be2",
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                About
              </Button>
              <Link href="/login">
                <Button
                  style={{
                    color: "#8a2be2",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  Github
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#8a2be2",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  Login
                </Button>
              </Link>
            </div>
          </Grid>
        )}
      </Grid>
      {menuOpen && (
        <div className={style.down__menu}>
          <p className={style.menu__obj}>
            <Link href="">About</Link>
          </p>
          <hr className={style.divide} />
          <p className={style.menu__obj}>
            <Link href="https://github.com/Seun2255/primal_music">Github</Link>
          </p>
          <hr className={style.divide} />
          <Link href="/login">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 20,
                marginTop: 15,
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
