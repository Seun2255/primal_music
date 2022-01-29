import React, { useState } from "react";
import style from "./styles/navbar.module.css";
import { Grid, Button, Typography } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import Link from "next/link";

const mediaQuery = window.matchMedia("(max-width: 600px)");
const menuIcon = mediaQuery.matches;

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            variant={menuIcon ? "h4" : "h2"}
            style={{
              color: "#8a2be2",
              fontWeight: 600,
              marginLeft: 2,
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
          <Grid
            item
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            direction={"row"}
            style={{ marginRight: 10 }}
          >
            <Button
              style={{
                color: "#8a2be2",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              About
            </Button>
            <Button
              style={{
                color: "#8a2be2",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Github repo
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                fontSize: 24,
                fontWeight: 600,
              }}
              href="mailto:seunemmanuel2255@gmail.com"
            >
              Login
            </Button>
          </Grid>
        )}
      </Grid>
      {menuOpen && (
        <div className={style.down__menu}>
          <p className={style.menu__obj}>
            <a href="#about">About</a>
          </p>
          <hr className={style.divide} />
          <p className={style.menu__obj}>
            <a href="#portfolio">Github repo</a>
          </p>
          <hr className={style.divide} />
          <Link href="\login">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 20,
                marginTop: 15,
              }}
              href="mailto:seunemmanuel2255@gmail.com"
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
