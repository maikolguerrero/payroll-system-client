import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Definimos los estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
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
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
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
    width: '40%',  // Ajusta el ancho según sea necesario
  },
  value: {
    fontSize: 12,
    textAlign: 'right',
    width: '60%',  // Ajusta el ancho según sea necesario
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: 'gray',
  },
});

const PDF2 = ({ data, empleados, company, perceptionsData, deductionsData }) => {
  // Encuentra los datos del empleado
  const employee = empleados.find(emp => emp._id === data.employee_id);

  // Encuentra los datos de las percepciones y deducciones
  const perceptions = data.perceptions.map(id => perceptionsData.find(p => p._id === id));
  const deductions = data.deductions.map(id => deductionsData.find(d => d._id === id));

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
        </View>

        <Text style={styles.title}>Recibo de Nómina</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Empleado: {employee ? `${employee.name} ${employee.surnames}` : 'Desconocido'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>C.I: {employee.ci}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Periodo: {data.period}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Inicio: {data.start_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Fin: {data.end_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de Pago: {data.payment_date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Salario Base: {data.base_salary}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Horas Extras: {data.overtime_hours}</Text>
          </View>
        </View>

        <View style={styles.section}>

          <View style={styles.section}>
            <Text style={styles.label}>Deducciones:</Text>
            {deductions.map(deduction => (
              <View style={styles.row} key={deduction._id}>
                <Text style={styles.label}>{deduction.type}: {deduction.amount}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Percepciones:</Text>
            {perceptions.map(perception => (
              <View style={styles.row} key={perception._id}>
                <Text style={styles.label}>{perception.type}: {perception.amount}</Text>
              </View>
            ))}
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Salario Bruto: {data.gross_salary}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Salario Neto: {data.net_salary}</Text>
          </View>


          <View style={styles.footer}>
            <Text>Firma: ___________________________</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDF2;