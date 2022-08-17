import type { NextPage } from "next";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";

import { Layout } from "../components/layouts/Layout";
import { EntryList, NewEntry } from "../components/ui";

const PG_Home: NextPage = () => {

  // console.log("ENV", process.env.NEXT_PUBLIC_CLIENT_KEY);

  return (
    <Layout title={"Home | OpenJira by Jalz"}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pending" />

            <NewEntry />

            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="In Process" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completed" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PG_Home;
