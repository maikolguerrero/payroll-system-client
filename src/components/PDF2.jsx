import { Document, Text, Page, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
  },
  title2: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 28,
    color: "#00426F",
  },
  text: {
    fontSize: 18,
  },
  text2: {
    fontSize: 18,
    borderRadius: 10,
    flexWrap: "wrap",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    margin: 6,
    padding: 10,
    gap: 10,
    justifyContent: "center",
  },
  bordes: {
    borderBottom: 3,
    borderTop: 3,
    borderColor: "#000000",
    backgroundColor: "#C5DEFA",
  },
  parragraph: {
    fontSize: 12,
    textAlign: "justify",
    lineHeight: 1.5,
    margin: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  espace: {
    marginBottom: 40
  }
});

function PDF2({ data }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Reporte de nómina</Text>
        
      </Page>
    </Document>
  );
}

export default PDF2;
