import { Document, Text, Page, StyleSheet, View, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15, // Agregar margen superior para separar la tabla del membrete
    marginBottom: 5,
  },
  headerText: {
    fontSize: 12,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    marginHorizontal: "auto",
    marginTop: 5, // Agregar margen superior para separar la tabla del membrete
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "11%", // Ajustar este valor para que las columnas encajen en la página
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
  },
  tableCellHeader: {
    backgroundColor: "#C5DEFA",
    fontWeight: "bold",
    fontSize: 10,
    padding: 3,
  },
  tableCell: {
    fontSize: 8, // Reducido el tamaño de la fuente de los datos de las nóminas
    padding: 3,
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
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginHorizontal: 'auto',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    fontSize: 12,
    textAlign: 'right',
    width: '60%',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: 'gray',
  },
});

function PDF({ data, company }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          {company.logo && (
            <Image
              style={styles.logo}
              src={`http://localhost:3000/api/uploads/${company.logo}`}
              alt="Company Logo"
            />
          )}
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.title}>Nóminas</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Periodo</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>C.I</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Nombre</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Fecha Inicio</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Fecha Fin</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Salario Base</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Horas Extras</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Salario Bruto</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Salario Neto</Text>
          </View>

          {data.map((item) => (
            <View style={styles.tableRow} key={item.employee_id}>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.period}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.ci}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{`${item.name} ${item.surnames}`}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.start_date.split("T00:00:00.000Z").join("")}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.end_date.split("T00:00:00.000Z").join("")}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.base_salary}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.overtime_hours}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.gross_salary}</Text>
              <Text style={[styles.tableCol, styles.tableCell]}>{item.net_salary}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Page>
    </Document>
  );
}

export default PDF;
