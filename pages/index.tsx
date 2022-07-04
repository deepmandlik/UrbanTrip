import { Typography, Box } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { makeStyles } from "@config/makeStyles";
import UrbanMap from "@components/Map/map";

const useStyles = makeStyles()((theme) => ({
  root: {
    background: "#0001",
    height: "100vh",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0006",
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();
  return (
    <div>
      <Head>
        <title>UrbanTrip</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <UrbanMap />
      </div>
    </div>
  );
};

export default Home;
