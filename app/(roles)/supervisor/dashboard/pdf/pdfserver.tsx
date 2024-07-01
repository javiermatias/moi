"use server";
import React from "react";
import { Page, Text, Document, renderToBuffer } from "@react-pdf/renderer";

const MyDocument = () => (
    
  <Document>
    <Page>
      <Text>React-pdf</Text>
    </Page>
  </Document>

);

export const createPdf = async () => {
  await renderToBuffer(<MyDocument />);
};